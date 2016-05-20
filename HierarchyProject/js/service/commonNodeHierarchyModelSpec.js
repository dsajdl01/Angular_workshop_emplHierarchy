describe('Service: commonNodeHeirarchyModel', function() {

	var service;

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(inject(function($injector) {
		service = $injector.get('commonNodeHeirarchyModel');
	}));

	it('should be defined', function() {
        expect(service).toBeDefined();
    });

    it('should defined variables to empty array', function()
    {
    	var obj = {};
    	expect(service.rootNode).toEqual(obj);
    	expect(service.nodesDetails).toEqual(obj);
		expect(service.selectedTopNode).toEqual(obj);
		expect(service.allNodesDetails).toEqual([]);
		expect(service.userSelectedNode).toEqual(obj);
		expect(service.editingNode).toEqual(obj);
    });
});