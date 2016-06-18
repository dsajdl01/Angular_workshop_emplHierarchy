describe('Controller: Auth', function() {

	var service, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock;

	var view = {};

	var details = [{"id": 101, "dob": "18/10/1973", "start": "28/09/2006","possition": "Developer",
		"comments": "Working as full-stacker developer.","fullname": "Bob Freeman","email":
		"bob.freeman@example.co.uk","password": "1234"},
		{"id": 102, "dob": null, "start": "21/02/2008","possition": "Developer",
		"comments": "Working as Java developer.","fullname": "Adam Smith","email":
		null,"password": "1234"}];

    var userDetails = {"isLogin": true};

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{
		commonNodeHeirarchyModelMock = {
			isUserAssumeIdentity: true,
			selectedTopNode: {'access': 'admin'},
			userSelectedNode: {"id": 101},
            user: userDetails
		};

		mngtHierarchyProviderMock = {
			getSelectedNodeDetails: function(nodeId){
				if(nodeId == 101) return details[0]
				else return details[1]
			}
		};

		$provide.value("mngtHierarchyNodeServiceProvider", mngtHierarchyProviderMock);
		$provide.value("commonNodeHeirarchyModel", commonNodeHeirarchyModelMock);
	}));

	beforeEach(inject(function($injector, _$httpBackend_) {
		httpBackend = _$httpBackend_;
		service = $injector.get('Auth');
	}));

    it('should be defined - Controller', function()
    {
        expect(service).toBeDefined();
    });

    it('should return false if the user is not login', function(){
        var userDt = {"isLogin": false};
        commonNodeHeirarchyModelMock.user = userDt;
        expect(service.checkPermissionForView(view)).toBeFalsy();
    });

    it('Should return true if the requireAssumedIdentity is undefined', function(){

    	expect(service.checkIfAssumedIdentity(view)).toBeTruthy()
    });

    it('Should return true if the requireAssumedIdentity is false', function(){
    	view.requireAssumedIdentity = false;
    	expect(service.checkIfAssumedIdentity(view)).toBeTruthy();
    });

    it('should return true if the user assume identity and page require assume identity', function(){
    	view.requireAssumedIdentity = true;
    	expect(service.checkIfAssumedIdentity(view)).toBeTruthy();
    });

    it('should return false if the user did not assume identity and page require assume identity', function(){
    	commonNodeHeirarchyModelMock.isUserAssumeIdentity = false;
    	view.requireAssumedIdentity = true;

    	expect(service.checkIfAssumedIdentity(view)).toBeFalsy();
    });

    it('should return true if view does not have defined permission', function(){
    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

    it('should return true if view has requiresAuthentication set to false', function(){
    	view.requiresAuthentication = false;
    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

     it('should return true if view has requiresAuthentication set true and permission IS undefined', function(){
    	view.requiresAuthentication = true;
    	view.permissions = undefined;

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

    it('should return true if view has requiresAuthentication set true and permission set to view and admin', function(){
    	view.requiresAuthentication = true;
    	view.permissions = ["admin", "viewer"];

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

    it('should return false if view has requiresAuthentication set to true and permission set to view and user', function(){
    	view.requiresAuthentication = true;
    	view.permissions = ["user", "viewer"];

    	expect(service.checkPermissionForView(view)).toBeFalsy();
    });

    it('should return false if view has requiresAuthentication set to true, permission to view and admin and selectedTopNode is user', function(){
    	commonNodeHeirarchyModelMock.selectedTopNode.access = "user";
    	view.requiresAuthentication = true;
    	view.permissions = ["admin", "viewer"];

    	expect(service.checkPermissionForView(view)).toBeFalsy();
    });

    it('should return true if the view has retquireAuth to true, permission to admin and personalDataEntry is undefined', function(){
    	view.requiresAuthentication = true;
    	view.permissions = ["admin", "viewer"];
    	view.personalDataEntry = undefined;

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

    it('should return true (access view) if the view has retquireAuth to true, permission to admin and personalDataEntry undefined', function(){
    	view.requiresAuthentication = true;
    	view.requirePersonalDataEntry = true;
    	view.permissions = ["admin", "viewer"];
    	view.personalDataEntry = undefined;

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

    it('should return false (not access view) if the view has retquireAuth to true, permission to admin and personalDataEntry is entered', function(){
    	view.requiresAuthentication = true;
    	view.requirePersonalDataEntry = true;
    	view.permissions = ["admin", "viewer"];
    	view.personalDataEntry = ["email", "dob"];

    	expect(service.checkPermissionForView(view)).toBeFalsy();
    });

    it('should return true (access view) if the view has retquireAuth to true, permission to admin and personalDataEntry is not entered', function(){
    	commonNodeHeirarchyModelMock.userSelectedNode = {"id": 102}
    	view.requiresAuthentication = true;
    	view.requirePersonalDataEntry = true;
    	view.permissions = ["admin", "viewer"];
    	view.personalDataEntry = ["email", "dob"];

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    });

     it('should return false (access view) if the view has retquireAuth to true, permission to admin and personalDataEntry has incorrect valeu', function(){
        commonNodeHeirarchyModelMock.userSelectedNode = {"id": 102}
        view.requiresAuthentication = true;
        view.requirePersonalDataEntry = true;
        view.permissions = ["admin", "viewer"];
        view.personalDataEntry = ["fullname", "email"];

        expect(service.checkPermissionForView(view)).toBeFalsy();
    });

    it('should return true (access view) if the view has retquireAuth to true, permission to admin and personalDataEntry contains only email', function(){
    	details[1].email = "adam@example.co.uk";
    	commonNodeHeirarchyModelMock.userSelectedNode = {"id": 102}
    	view.requiresAuthentication = true;
    	view.requirePersonalDataEntry = true;
    	view.permissions = ["admin", "viewer"];
    	view.personalDataEntry = ["email", "dob"];

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    	details[1].email = null; // as it is object set email back to null after execution
    });

    it('should return true (access view) if the view has retquireAuth to true, permission to admin and personalDataEntry contains only day of Bithday', function(){
    	details[1].dob = "03/07/1980";
    	commonNodeHeirarchyModelMock.userSelectedNode = {"id": 102}
    	view.requiresAuthentication = true;
    	view.requirePersonalDataEntry = true;
    	view.permissions = ["admin", "viewer"];
    	view.personalDataEntry = ["email", "dob"];

    	expect(service.checkPermissionForView(view)).toBeTruthy();
    	details[1].dob = null;  // as it is object set dob back to null after execution
    });

    it('should return true if the parameter of userHasPermission function contains admin', function(){
    	var permission = ["admin", "viewer"];
    	expect(service.userHasPermission(permission)).toBeTruthy();
    });

    it('should return false if the parameter of userHasPermission function does not contains admin', function(){
    	var permission = ["viewer", "user"];
    	expect(service.userHasPermission(permission)).toBeFalsy();
    });
});