<?php
/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 */

namespace oat\taoDeliveryRdf\controller;

use core_kernel_classes_Class;
use core_kernel_classes_Property;
use core_kernel_classes_Resource;
use oat\oatbox\service\ServiceManager;
use oat\taoDelivery\model\AssignmentService;
use oat\taoDelivery\model\execution\DeliveryExecutionInterface;
use oat\taoDelivery\model\execution\ServiceProxy;
use oat\taoDelivery\model\execution\StateService;
use oat\taoQtiTest\models\TestSessionService;
use qtism\common\datatypes\Duration;
use qtism\data\AssessmentTest;
use taoDelivery_models_classes_execution_KeyValueService;
use taoQtiTest_helpers_TestRunnerUtils;
use taoQtiTest_models_classes_QtiTestService;

class RestSupervision extends \tao_actions_RestController
{
    const DELIVERY_ID_PARAM = 'deliveryId';
    const TEST_TAKER_ID_PARAM = 'testTakerId';
    const URI_PREFIX = 'http://tao.tbagrel1.com/tao_test.rdf#';
    const MALFORMED_URI_PREFIX = 'http_2_tao_0_tbagrel1_0_com_1_tao_test_0_rdf_3_';

    const DELIVERY_CLASS_URI = 'http://www.tao.lu/Ontologies/TAODelivery.rdf#AssembledDelivery';
    const DELIVERY_PROPERTY_NAME = 'http://www.tao.lu/Ontologies/TAODelivery.rdf#CustomLabel';
    const DELIVERY_PROPERTY_TEST = 'http://www.tao.lu/Ontologies/TAODelivery.rdf#AssembledDeliveryOrigin';
    const DELIVERY_PROPERTY_OPENING_TIME = 'http://www.tao.lu/Ontologies/TAODelivery.rdf#PeriodStart';
    const DELIVERY_PROPERTY_CLOSING_TIME = 'http://www.tao.lu/Ontologies/TAODelivery.rdf#PeriodEnd';

    const SUPERVISION_STATUS_DISCONNECTED = 'disconnected';
    const SUPERVISION_STATUS_CONNECTED = 'connected';
    const SUPERVISION_STATUS_IN_PROGRESS = 'inProgress';
    const SUPERVISION_STATUS_FINISHED = 'finished';

    const TEST_TAKER_PROPERTY_FIRSTNAME = 'http://www.tao.lu/Ontologies/generis.rdf#userFirstName';
    const TEST_TAKER_PROPERTY_LASTNAME = 'http://www.tao.lu/Ontologies/generis.rdf#userLastName';
    const TEST_TAKER_PROPERTY_LOGIN = 'http://www.tao.lu/Ontologies/generis.rdf#login';

    const TEST_CLASS_URI = 'http://www.tao.lu/Ontologies/TAOTest.rdf#Test';

    /**
     * Returns supervision info about one specific delivery or all deliveries
     * (depending on the presence of the REST_DELIVERY_ID request param).
     */
    public function delivery()
    {
        try {
            if ($this->hasRequestParameter(self::DELIVERY_ID_PARAM)) {
                $deliveryId = $this->getRequestParameter(self::DELIVERY_ID_PARAM);
                if (!$this->isValidDeliveryId($deliveryId)) {
                    throw new \common_exception_NotFound("Unable to find delivery with ID $deliveryId");
                }

                $this->returnSuccess(array('delivery' => $this->deliveryInfo($deliveryId)));
            } else {
                $result = [];
                foreach ($this->deliveryIds() as $deliveryId) {
                    $result[] = $this->deliveryInfo($deliveryId);
                }

                $this->returnSuccess(array('deliveries' => $result));
            }
        } catch (\Exception $e) {
            $this->returnFailure($e);
        }
    }

    /**
     * Returns supervision info about one specific test taker or all test takers of a specified delivery
     * (depending on the presence of the REST_TEST_TAKER_ID request param).
     */
    public function testTaker()
    {
        try {
            if (!$this->hasRequestParameter(self::DELIVERY_ID_PARAM)) {
                throw new \common_exception_RestApi('A delivery ID must be specified to retrieve the associated test taker(s)');
            }
            $deliveryId = $this->getRequestParameter(self::DELIVERY_ID_PARAM);
            if (!$this->isValidDeliveryId($deliveryId)) {
                throw new \common_exception_NotFound("Unable to find delivery with ID $deliveryId");
            }

            if ($this->hasRequestParameter(self::TEST_TAKER_ID_PARAM)) {
                $testTakerId = $this->getRequestParameter(self::TEST_TAKER_ID_PARAM);
                if (!$this->isValidTestTakerId($deliveryId, $testTakerId)) {
                    throw new \common_exception_RestApi("Test taker with ID $testTakerId is not associated with the delivery $deliveryId");
                }

                $this->returnSuccess(array('testTaker' => $this->testTakerInfo($deliveryId, $testTakerId)));
            } else {
                $result = [];
                foreach ($this->testTakerIds($deliveryId) as $testTakerId) {
                    $result[] = $this->testTakerInfo($deliveryId, $testTakerId);
                }

                $this->returnSuccess(array('testTakers' => $result));
            }
        } catch (\Exception $e) {
            $this->returnFailure($e);
        }
    }

    private function isConnected($testTakerId) {
        return in_array($testTakerId, $this->connectedTestTakerIds());
    }

    private function startsWith($string, $startString)
    {
        $len = strlen($startString);
        return (substr($string, 0, $len) === $startString);
    }

    private function connectedTestTakerIds()
    {
        // https://stackoverflow.com/questions/675913/looping-through-all-a-servers-sessions-in-php

        $connectedTestTakerIds = [];
        $sessionDir = session_save_path();
        $sessionIds = scandir($sessionDir);
        foreach ($sessionIds as $sessionId) {
            $sessionId = str_replace('sess_', '', $sessionId);
            if (strpos($sessionId, '.') === false) {
                $serialized_data = file_get_contents("${sessionDir}/sess_${sessionId}");
                $unserialized_data = unserialize(explode('|', $serialized_data, 2)[1]);
                if (!empty($unserialized_data)) {
                    $connectedTestTakerIds[] = $this->uriToId($unserialized_data['common_session_Session']->getUser()->getIdentifier());
                }
            }
        }

        return $connectedTestTakerIds;
    }

    private function isValidDeliveryId($deliveryId)
    {
        return in_array($deliveryId, $this->deliveryIds());
    }

    private function isValidTestTakerId($deliveryId, $testTakerId)
    {
        return in_array($testTakerId, $this->testTakerIds($deliveryId));
    }

    private function deliveryIds()
    {
        $delivery_class = new core_kernel_classes_Class(self::DELIVERY_CLASS_URI);
        $deliveries = $delivery_class->getInstances(true);
        $result = [];

        foreach($deliveries as $delivery) {
            $result[] = $this->uriToId($delivery->getUri());
        }

        return $result;
    }

    private function testTakerIds($deliveryId)
    {
        /** @var AssignmentService $assignmentService */
        $assignmentService = ServiceManager::getServiceManager()->get(AssignmentService::SERVICE_ID);
        $result = [];
        foreach($assignmentService->getAssignedUsers($this->idToUri($deliveryId)) as $testTakerUri) {
            $result[] = $this->uriToId($testTakerUri);
        }

        return $result;
    }

    private function deliveryInfo($deliveryId)
    {
        $deliveryUri = $this->idToUri($deliveryId);
        $delivery = new core_kernel_classes_Resource($deliveryUri);

        $testUri = $this->extractProperty($delivery, self::DELIVERY_PROPERTY_TEST);
        $test = new core_kernel_classes_Resource($testUri);
        $testService = taoQtiTest_models_classes_QtiTestService::singleton();
        $nbQuestion = 0;
        foreach ($testService->getTestItems($test) as $item) {
            $nbQuestion++;
        }
        /** @var AssessmentTest $assessmentTest */
        $assessmentTest = $testService->getDoc($test)->getDocumentComponent();
        /** @var Duration $testDuration */
        $testDuration = $assessmentTest->getTimeLimits()->getMaxTime();
        return array(
            'id' => $deliveryId,
            'label' => $delivery->getLabel(),
            'name' => strval($this->extractProperty($delivery, self::DELIVERY_PROPERTY_NAME)),
            'openingTime' => (int) strval($this->extractProperty($delivery, self::DELIVERY_PROPERTY_OPENING_TIME)),
            'closingTime' => (int) strval($this->extractProperty($delivery, self::DELIVERY_PROPERTY_CLOSING_TIME)),
            'testLabel' => $test->getLabel(),
            'testDuration' => $testDuration->getSeconds(true),
            'testNbQuestion' => $nbQuestion
        );
    }

    private function deliveryExecutionOf($deliveryId, $testTakerId)
    {
        $deliveryUri = $this->idToUri($deliveryId);
        $delivery = new core_kernel_classes_Resource($deliveryUri);
        $testTakerUri = $this->idToUri($testTakerId);
        $stateService = $this->getServiceManager()->get(StateService::SERVICE_ID);

        $deliveryExecutions = [];
        $deliveryExecutionService = ServiceProxy::singleton();
        $states = $stateService->getDeliveriesStates();
        foreach ($states as $state) {
            $deliveryExecutions = array_merge($deliveryExecutions, $deliveryExecutionService->getDeliveryExecutionsByStatus($testTakerUri, $state));
        }

        $associatedDeliveryExecutions = array();
        foreach ($deliveryExecutions as $deliveryExecution) {
            if ($delivery->equals($deliveryExecution->getDelivery())) {
                $associatedDeliveryExecutions[] = $deliveryExecution;
            }
        }
        $length = count($associatedDeliveryExecutions);
        if ($length === 1) {
            return $associatedDeliveryExecutions[0];
        } else if ($length === 0) {
            return null;
        } else {
            throw new \Exception('Too many delivery executions found for test taker ' . $testTakerId . ' on delivery ' . $deliveryId);
        }
    }

    private function testTakerInfo($deliveryId, $testTakerId)
    {
        $testTaker = new core_kernel_classes_Resource($this->idToUri($testTakerId));


        if ($this->isConnected($testTakerId)) {
            $deliveryExecution = $this->deliveryExecutionOf($deliveryId, $testTakerId);

            if (is_null($deliveryExecution)) {
                $status = self::SUPERVISION_STATUS_CONNECTED;
                $deliveryStartingTime = null;
                $testQuestionNo = null;
            } else {
                /** @var TestSessionService $testSessionService */
                $testSessionService = $this->getServiceManager()->get(TestSessionService::SERVICE_ID);
                $testSession = $testSessionService->getTestSession($deliveryExecution);

                $state = $deliveryExecution->getState();
                if ($this->startsWith($state,  DeliveryExecutionInterface::STATE_ACTIVE) || $this->startsWith($state,  DeliveryExecutionInterface::STATE_PAUSED)) {
                    $status = self::SUPERVISION_STATUS_IN_PROGRESS;
                    $deliveryStartingTime = (int) explode(' ', $deliveryExecution->getStartTime())[1];
                    $testQuestionNo = taoQtiTest_helpers_TestRunnerUtils::testCompletion($testSession);
                } else if ($this->startsWith($state,  DeliveryExecutionInterface::STATE_FINISHED) || $this->startsWith($state,  DeliveryExecutionInterface::STATE_TERMINATED)) {
                    $status = self::SUPERVISION_STATUS_FINISHED;
                    $deliveryStartingTime = (int) explode(' ', $deliveryExecution->getStartTime())[1];
                    $testQuestionNo = null;
                } else {
                    throw new \Exception('Unknow status for test taker ' . $testTakerId . ' on delivery ' . $deliveryId . ': ' . $state);
                }
            }
        } else {
            $status = self::SUPERVISION_STATUS_DISCONNECTED;
            $deliveryStartingTime = null;
            $testQuestionNo = null;
        }

        return array(
            'id' => $testTakerId,
            'login' => strval($this->extractProperty($testTaker, self::TEST_TAKER_PROPERTY_LOGIN)),
            'firstname' => strval($this->extractProperty($testTaker, self::TEST_TAKER_PROPERTY_FIRSTNAME)),
            'lastname' => strval($this->extractProperty($testTaker, self::TEST_TAKER_PROPERTY_LASTNAME)),
            'status' => $status,
            'deliveryStartingTime' => $deliveryStartingTime,
            'testQuestionNo' => $testQuestionNo
        );
    }

    private function uriToId($uri)
    {
        if (substr($uri, 0, strlen(self::URI_PREFIX)) == self::URI_PREFIX) {
            return substr($uri, strlen(self::URI_PREFIX));
        } else {
            throw new \Exception('Cannot remove prefix "' . self::URI_PREFIX . '" from URI "' . $uri . '"');
        }
    }

    private function malformedUriToId($uri)
    {
        if (substr($uri, 0, strlen(self::MALFORMED_URI_PREFIX)) == self::MALFORMED_URI_PREFIX) {
            return substr($uri, strlen(self::MALFORMED_URI_PREFIX));
        } else {
            throw new \Exception('Cannot remove prefix "' . self::MALFORMED_URI_PREFIX . '" from URI "' . $uri . '"');
        }
    }

    private function idToUri($id)
    {
        return self::URI_PREFIX . $id;
    }

    private function extractProperty($obj, $propertyUri)
    {
        $property = new core_kernel_classes_Property($propertyUri);
        return $obj->getOnePropertyValue($property);
    }
}
