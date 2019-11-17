Delivery
"http://www.tao.lu/Ontologies/TAODelivery.rdf#Delivery"

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#CustomLabel"
    Label which show for test-takers

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#AssembledDeliveryOrigin"
    The original test/template of the delivery

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#PeriodStart"
    The start date of the delivery

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#PeriodEnd"
    The end date of the delivery


"http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecution"
DeliveryExecution

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionDelivery"
    Delivery of this execution

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionSubject"
    test-taker of the delivery execution

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStart"
    Timestamp of the delivery execution start

    "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatus"
    Status of a delivery execution

        "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusActive"
        Active status of a delivery execution

        "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusFinished"
        Finished status of a delivery execution

        "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusPaused"
        Paused status of a delivery execution

        "http://www.tao.lu/Ontologies/TAODelivery.rdf#DeliveryExecutionStatusAbandoned"
        Abandoned status of a delivery execution

"http://www.tao.lu/Ontologies/TAOTest.rdf#Test"
Test

    "http://www.tao.lu/Ontologies/TAOTest.rdf#TestContent"
    Test Content
    
    "http://www.tao.lu/Ontologies/TAOTest.rdf#TestModel"
    Test Model

http://www.tao.lu/Ontologies/TAOGroup.rdf
$deliveryId -> $deliveryUri
search group filterBy "http://www.tao.lu/Ontologies/TAOGroup.rdf#Deliveries"=$deliveryUri

Une fois que j'ai une DeliveryExecution (class PHP, pas ressource RDF attention), je peux utiliser taoQtiTest/models/classes/TestSessionService.php::getTestSession puis ensuite récupérer le temps, le nombre d'items, le nombre d'items complétés...

    
