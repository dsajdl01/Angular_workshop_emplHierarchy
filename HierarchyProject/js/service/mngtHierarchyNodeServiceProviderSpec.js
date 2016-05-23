describe('Service: mngtHierarchyNodeServiceProvider', function() {


	var service, hierarchyNodeServiceMock, commonNodeHeirarchyModelMock, modalDialogBoxServiceMock, locationMock;
	var rootNode = [{"name": "Sandra","id": 100,"parentsId": null, "access": "admin", "child": [
				{"name":"Bob","id": 101,"parentsId": 100, "access": "user", "child": []}]}];
	var nodesDetails = [
		{"id": 100, "pathToNode": "Sandra","dob": "28/02/1976","start": "09/12/2001","possition": "Senior Developer",
            "comments": "Work with smile in our company.", "fullname": "Bob Bobek", "email": null, "password": "1234567890"},
		{"id": 101, "pathToNode": "Sandra>Bod", "dob": "28/02/1981","start": "05/02/2005","possition": "Junior Developer",
            "comments": "Work with hard for our company.", "fullname": "Sandra Smith", "email": "s.smith@example.com", "password": "1234567890"}];
	
	var path = ["Sandra", "Sandra>Bob"];
	
	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{
		hierarchyNodeServiceMock = {
			success: true,
			getSelectedNode: function(rootNode, fail){
					if(this.success){
						rootNode(true);
					} else {
						fail(false)
					}
			},
			getNodesDetails: function(nodesDetails, fail){
				if(this.success){
					nodesDetails(true);
				} else {
					fail(false)
				}
			}
		};
		
		modalDialogBoxServiceMock = {
			shareModalData: {},
			showDialog: function(){},
			notify: function(){},
			setTemplate: function(){}
		};

        locationMock = {
            path: function(path) {}
        };
		
		commonNodeHeirarchyModelMock = {
			allNodesDetails: nodesDetails,
			rootNode: rootNode,
			nodesDetails: nodesDetails,
            selectedTopNode: rootNode[0] 
		};

		$provide.value('hierarchyNodeService', hierarchyNodeServiceMock);
		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchyModelMock);
		$provide.value('modalDialogBoxService', modalDialogBoxServiceMock);
        $provide.value('$location', locationMock);
	}));
	
	beforeEach(inject(function($injector, _$httpBackend_) {
		httpBackend = _$httpBackend_;
		service = $injector.get('mngtHierarchyNodeServiceProvider');
	}));

	it('should be defined', function()
	{
        expect(service).toBeDefined();
    });

    it('should be true when loadTopNode is called and nodes are successfully loaded', function()
    {
    	hierarchyNodeServiceMock.success = true;
    	var callbackCalled = false;

    	var callback = function(responce) {
    		expect(responce).toBeTruthy();
        	callbackCalled = true; 
        };

        spyOn(service, 'loadTopNode').and.callThrough();
        spyOn(commonNodeHeirarchyModelMock, 'rootNode');
    	service.loadTopNode(callback);
    	expect(callbackCalled).toBeTruthy();
    	expect(service.loadTopNode).toHaveBeenCalled(); 
    });

    it('should be false when loadTopNode is called and nodes are unsuccessfully loaded', function()
    {
    	hierarchyNodeServiceMock.success = false;
    	var callbackCalled = false;

    	var callback = function(responce) {
    		expect(responce).toBeFalsy();
        	callbackCalled = true; 
        };

        spyOn(service, 'loadTopNode').and.callThrough();
    	service.loadTopNode(callback);
    	expect(callbackCalled).toBeTruthy();
    	expect(service.loadTopNode).toHaveBeenCalled();
    });

    it('should be true when loadNodeDetails is called and details are successfully loaded', function()
    {
    	hierarchyNodeServiceMock.success = true;
    	var callbackCalled = false;

    	var callback = function(responce) {
    		expect(responce).toBeTruthy();
        	callbackCalled = true; 
        };

       	spyOn(service, 'loadNodeDetails').and.callThrough();
        spyOn(commonNodeHeirarchyModelMock, 'nodesDetails')
    	service.loadNodeDetails(callback);
    	expect(callbackCalled).toBeTruthy();
    	expect(service.loadNodeDetails).toHaveBeenCalled(); 
    });

    it('should be false when loadNodeDetails is called and details are unsuccessfully loaded', function()
    {
    	hierarchyNodeServiceMock.success = false;

    	var callbackCalled = false;

    	var callback = function(responce) {
    		expect(responce).toBeFalsy();
        	callbackCalled = true; 
        };

       	spyOn(service, 'loadNodeDetails').and.callThrough();
    	service.loadNodeDetails(callback);
    	expect(callbackCalled).toBeTruthy();
    	expect(service.loadNodeDetails).toHaveBeenCalled(); 
    });

    it('should show assume dialog box when displayAssumeDialogBox is called', function()
    {
    	spyOn(modalDialogBoxServiceMock, 'setTemplate');
    	spyOn(modalDialogBoxServiceMock, 'notify').and.callThrough();

    	modalDialogBoxServiceMock.showDialog = function () {
            modalDialogBoxServiceMock.notify("Sandra>Bob");
        };

    	var callback = function(responce) {
    		expect(responce).toEqual("Bob");
        	callbackCalled = true;
        };

        service.displayAssumeDialogBox(path, callback);
        expect(modalDialogBoxServiceMock.setTemplate).toHaveBeenCalledWith('js/views/assumeIdentityTemplate.html');
        expect(callbackCalled).toBeTruthy(); 
    });

    it('should show assume dialog box when displayAssumeDialogBox is called and call false when user close window', function()
    {
    	spyOn(modalDialogBoxServiceMock, 'setTemplate');
    	spyOn(modalDialogBoxServiceMock, 'notify').and.callThrough();

    	modalDialogBoxServiceMock.showDialog = function() {
            modalDialogBoxServiceMock.notify(false);
        };

    	var callback = function(responce) {
    		expect(responce).toBeFalsy();
        	callbackCalled = true;
        };

        service.displayAssumeDialogBox(path, callback);
        expect(modalDialogBoxServiceMock.setTemplate).toHaveBeenCalledWith('js/views/assumeIdentityTemplate.html');
        expect(callbackCalled).toBeTruthy(); 
    });

    it('should show about dialog box when displayAboutDialogBox is called', function()
    {
    	spyOn(modalDialogBoxServiceMock, 'setTemplate');
    	modalDialogBoxServiceMock.showDialog = function () {};

    	service.displayAboutDialogBox();
    	expect(modalDialogBoxServiceMock.setTemplate).toHaveBeenCalledWith("js/views/aboutTemplate.html");
    });

    it('should return selected node details when getSelectedNodeDetails is called', function()
    {
    	expect(service.getSelectedNodeDetails(100)).toEqual(nodesDetails[0]);
    });

    it('should return selected node details when getSelectedNodeDetails is called II', function()
    {
    	expect(service.getSelectedNodeDetails(101)).toEqual(nodesDetails[1]);
    });

    it('should redirect to personalInfo page when checkIfPersonalDetailsAreInseared() is called and data is missing', function(){

        spyOn(locationMock, 'path');

        service.checkIfPersonalDetailsAreInseared();

        expect(locationMock.path).toHaveBeenCalledWith('/personalInfo')
    });

    it('should not be redirect when checkIfPersonalDetailsAreInseared() is called and data is entered', function(){

        commonNodeHeirarchyModelMock.selectedTopNode = rootNode[0].child[0];
        spyOn(locationMock, 'path');

        service.checkIfPersonalDetailsAreInseared();

        expect(locationMock.path).not.toHaveBeenCalled();
    });
});