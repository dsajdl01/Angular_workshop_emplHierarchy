describe('Controller: helpMyProfileController', function(){

	beforeEach(module('myMngtHierarchyApp'));

	var ctrl, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock, locationMock;

	var detailsNode = [{"id": 101, "dob": "28/02/1976","start": "10/02/2005",
			"possition": "Senior Developer","comments": "Work with smile in our company.", "fullname": null, "email": null, "password": null},
	 		{"id": 102, "dob": "20/10/1979","start": "10/02/2006","possition": "Junior Developer",
	 							"comments": "Concentrate on AngulaJS, Java and REST Full services.", "fullname": null, "email": "bob@example.com", "password": null}];

	var nodesId = [{"id": 101}, {"id": 102}];
	
	beforeEach(module(function($provide)
	{
		commonNodeHeirarchyModelMock = {
			userSelectedNode: nodesId[0]
		};
			
		mngtHierarchyProviderMock = {
			getSelectedNodeDetails: function(nodeId) {
				if(nodeId == 101) return detailsNode[0];
				else if (nodeId = 102) return detailsNode[1];
				else return null;
			}
		};

		locationMock = {
			path: function(path) {}
		}

		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchyModelMock);
		$provide.value('mngtHierarchyNodeServiceProvider', mngtHierarchyProviderMock);
		$provide.value('$location', locationMock);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('helpMyProfileController');
    }));

    it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should initialize instance variable when init() function is called', function(){
    	ctrl.init();

    	expect(ctrl.dob).toEqual("28/02/1976");
    	expect(ctrl.email).toBeNull();
    	expect(ctrl.internalErrorMessage).toBeNull();
    	expect(ctrl.btnName).toEqual("Save");
    });

    it('should internalErrorMessage be initialize when user try to save without entering email', function(){
    	ctrl.save();
    	expect(ctrl.internalErrorMessage).toEqual("Your data has not been saved. Please, check your data and try it again.");
    });

    it('should relocate page when save btn is pressed and data are entered', function(){
    	commonNodeHeirarchyModelMock.userSelectedNode = nodesId[1];
    	ctrl.init();
    	spyOn(locationMock, 'path');

    	ctrl.save();
    	expect(ctrl.dob).toEqual("20/10/1979");
    	expect(ctrl.email).toEqual("bob@example.com");
    	expect(locationMock.path).toHaveBeenCalledWith("/homeViewAccount");
    });
});