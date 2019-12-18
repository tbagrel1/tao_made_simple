<section id="<?=get_data('id')?>-container">
	<header>
        <h1><?=get_data('title')?></h1>
	</header>
	<div>
		<div id="<?=get_data('id')?>-tree"></div>
	</div>
	<footer>
		<button id="saver-action-<?=get_data('id')?>" class="btn-info small" type="button" ><?=tao_helpers_Icon::iconSave().__('Save')?></button>
	</footer>
</section>

<script type="text/javascript">
require(['jquery', 'generis.tree.select', 'helpers'], function($, GenerisTreeSelectClass, helpers) {
        new GenerisTreeSelectClass('#<?=get_data('id')?>-tree', '<?=get_data('dataUrl')?>', {
                actionId: '<?=get_data('id')?>',
                saveUrl: '<?=get_data('saveUrl')?>',
                saveData: {
                        resourceUri: '<?=get_data('resourceUri')?>',
                        propertyUri: '<?=get_data('propertyUri')?>'
                },
                checkedNodes: <?=json_encode(tao_helpers_Uri::encodeArray(get_data('values')))?>,
                serverParameters: {
                        openNodes: <?=json_encode(get_data('openNodes'))?>,
                        rootNode: <?=json_encode(get_data('rootNode'))?>
                },
                saveCallback: function() {
					helpers._load(
							helpers.getMainContainerSelector()
							,<?= json_encode(_url('editDelivery'))?>
							,{uri: '<?=get_data('resourceUri')?>'}
						);
                },
                paginate: 10
        });
});
</script>
