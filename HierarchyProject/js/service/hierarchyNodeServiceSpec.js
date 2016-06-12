describe('Service: hierarchyNodeService', function() {

	var service, httpBackend;
	var contextRoot = 'https://raw.githubusercontent.com/dsajdl01/Angular_workshop_emplHierarchy/master/';
    var contextRootBranch = 'https://raw.githubusercontent.com/dsajdl01/Angular_workshop_emplHierarchy/logIn.branch/';

	var nodes = [{"name": "Sandra","id": 100,"parentsId": null,"child": [
				{"name":"Bob","id": 101,"parentsId": 100,"child": []}]}];
	var nodeDetails = [
		{"id": 100, "dob": "28/02/1976","start": "09/12/2001","possition": "Senior Developer","comments": "Work with smile in our company."},
		{"id": 101, "dob": "28/02/1981","start": "05/02/2005","possition": "Junior Developer","comments": "Work with hard for our company."}];
				
    var login = [{"nodeId": 101, "username": "bob", "password": "1234567890", "administrator": false }];

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(inject(function($injector, _$httpBackend_) {
		httpBackend = _$httpBackend_;
		service = $injector.get('hierarchyNodeService');
	}));

	it('should be defined', function()
	{
        expect(service).toBeDefined();
    });

    it('should load nodes hierarchy when getSelectedNode is called', function()
    {
    	httpBackend.whenGET(contextRoot + 'dataNodeHierarchy.json').respond(200, nodes);
        httpBackend.expectGET(contextRoot + 'dataNodeHierarchy.json');

        var callbackCalled = false;

        var callback = function(responce) {
          	expect(responce).toEqual(nodes);
        	callbackCalled = true; 
        };

        service.getSelectedNode(callback, function(){});
        httpBackend.flush();
        expect(callbackCalled).toBeTruthy();

    });

    it('should call back failure function when getSelectedNode returns an error code', function()
    {
    	httpBackend.whenGET(contextRoot + 'dataNodeHierarchy.json').respond(500, 'Some error');
        httpBackend.expectGET(contextRoot + 'dataNodeHierarchy.json');

        var callbackCalled = false;

        var failCallback = function(responce) {
        	expect(responce.data).toEqual("Some error");
        	callbackCalled = true; 
        };

        service.getSelectedNode(function(){}, failCallback);
        httpBackend.flush();
        expect(callbackCalled).toBeTruthy();
    });

    it('should load each node details when getNodesDetails is called', function()
    {
    	httpBackend.whenGET(contextRoot + 'node_data.json').respond(200, nodeDetails);
        httpBackend.expectGET(contextRoot + 'node_data.json');

        var callbackCalled = false;

        var callback = function(responce) {
        	expect(responce).toEqual(nodeDetails);
        	callbackCalled = true; 
        };

        service.getNodesDetails(callback, function(){});
        httpBackend.flush();
        expect(callbackCalled).toBeTruthy();
    });

    it('should call back failure function when getNodesDetails returns an error code', function()
    {
    	httpBackend.whenGET(contextRoot + 'node_data.json').respond(500, "Internal error");
        httpBackend.expectGET(contextRoot + 'node_data.json');

        var callbackCalled = false;

        var failCallback = function(responce) {
        	expect(responce.data).toEqual("Internal error");
        	callbackCalled = true; 
        };

        service.getNodesDetails(function(){}, failCallback);
        httpBackend.flush();
        expect(callbackCalled).toBeTruthy();
    });

    it('should load user details when getLoginDetails is call', function()
    {
        httpBackend.whenGET(contextRootBranch + 'usersProfileLogin.json').respond(200, login);
        httpBackend.expectGET(contextRootBranch + 'usersProfileLogin.json');

        var callbackCalled = false;

        var callback = function(responce) {
            expect(responce).toEqual(login);
            callbackCalled = true;
        };

        service.getLoginDetails(callback, function(){});
        httpBackend.flush();
        expect(callbackCalled).toBeTruthy();
    });

    it('should call back failure function when getLoginDetails returns an error code', function()
    {
        httpBackend.whenGET(contextRootBranch + 'usersProfileLogin.json').respond(500, "Internal error");
        httpBackend.expectGET(contextRootBranch + 'usersProfileLogin.json');

        var callbackCalled = false;

        var failCallback = function(responce) {
            expect(responce.data).toEqual("Internal error");
            callbackCalled = true;
        };

        service.getLoginDetails(function(){}, failCallback);
        httpBackend.flush();
        expect(callbackCalled).toBeTruthy();
    });
});