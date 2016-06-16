describe('Controller: formController', function() {

	var ctrl, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock, scopeMock, toasterMock;
	
	var selectedNode = {"name": "Bob", "id": 101,"parentsId": 100, "access": "admin",
						"child": [{"name": "David","id": 106,"parentsId": 105, "access": "user", "child": []}]};

	var detailsNode = [{"id": 101, "dob": "28/02/1976","start": "10/02/2005",
			"possition": "Senior Developer","comments": "Work with smile in our company."},
	 		{"id": 106, "dob": "20/10/1979","start": "10/02/2006","possition": "Junior Developer",
	 							"comments": "Concentrate on AngulaJS, Java and REST Full services."}];

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{
		commonNodeHeirarchyModelMock = {
            selectedTopNode: selectedNode,
			userSelectedNode: selectedNode,
			nodesDetails: detailsNode
		};

		mngtHierarchyProviderMock = {
			getSelectedNodeDetails: function(nodeId){
				if(nodeId == 101) return detailsNode[0];
				else return detailsNode[1];
			}
		};

		toasterMock = {
			pop: function(error,message, option) {}
		};

		scopeMock = {
            $watch : function(watchExpression, listener) {
            	watchExpressionFunction = watchExpression;
            	watchListenerFunction = listener;
            }
        };

		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchyModelMock);
		$provide.value('mngtHierarchyNodeServiceProvider', mngtHierarchyProviderMock);
		$provide.value('toaster', toasterMock);
		$provide.value("$scope", scopeMock);
	}));

	beforeEach(inject(function($controller)
	{
		spyOn(scopeMock, '$watch').and.callThrough();
        ctrl = $controller('formController');
        expect(scopeMock.$watch).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    }));

	it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should watch the userSelectedNode and refresh the user list when node changes', function()
    {
    	var watchedObject = watchExpressionFunction();
        expect(watchedObject).toBe(commonNodeHeirarchyModelMock.userSelectedNode);

     	watchListenerFunction();
     	expect(ctrl.btnSave).toBeTruthy();
     	expect(ctrl.btnName).toEqual("Save");
     	
        expect(ctrl.hasAccess).toBeFalsy();
        expect(ctrl.modified).toBeFalsy();
        expect(ctrl.access).toEqual("admin");
     	expect(ctrl.startDay).toEqual("10/02/2005");
     	expect(ctrl.position).toEqual("Senior Developer");
     	expect(ctrl.comment).toEqual("Work with smile in our company.");

     	expect(ctrl.origineStartDay).toEqual("10/02/2005");
		expect(ctrl.OriginePosition).toEqual("Senior Developer");
		expect(ctrl.OriginComment).toEqual("Work with smile in our company.");
    });

    it('should watch the userSelectedNode and refresh the user list when node changes', function()
    {
    	commonNodeHeirarchyModelMock.userSelectedNode = selectedNode.child[0];
    	var watchedObject = watchExpressionFunction();
        expect(watchedObject).toBe(commonNodeHeirarchyModelMock.userSelectedNode);

     	watchListenerFunction();
     	expect(ctrl.btnSave).toBeTruthy();
     	expect(ctrl.btnName).toEqual("Save");
        expect(ctrl.hasAccess).toBeFalsy();

        expect(ctrl.modified).toBeFalsy();
        expect(ctrl.access).toEqual("user");
     	expect(ctrl.startDay).toEqual("10/02/2006");
     	expect(ctrl.position).toEqual("Junior Developer");
     	expect(ctrl.comment).toEqual("Concentrate on AngulaJS, Java and REST Full services.");

     	expect(ctrl.origineStartDay).toEqual("10/02/2006");
		expect(ctrl.OriginePosition).toEqual("Junior Developer");
		expect(ctrl.OriginComment).toEqual("Concentrate on AngulaJS, Java and REST Full services.");
    });

     it('should watch the userSelectedNode and refresh the user list when node changes_II', function()
    {
        commonNodeHeirarchyModelMock.selectedTopNode = selectedNode.child[0];
        commonNodeHeirarchyModelMock.userSelectedNode = selectedNode.child[0];
        var watchedObject = watchExpressionFunction();
        expect(watchedObject).toBe(commonNodeHeirarchyModelMock.userSelectedNode);

        watchListenerFunction();
        expect(ctrl.btnSave).toBeTruthy();
        expect(ctrl.btnName).toEqual("Save");
        expect(ctrl.hasAccess).toBeFalsy();

        expect(ctrl.modified).toBeTruthy();
        expect(ctrl.access).toEqual("user");
        expect(ctrl.startDay).toEqual("10/02/2006");
        expect(ctrl.position).toEqual("Junior Developer");
        expect(ctrl.comment).toEqual("Concentrate on AngulaJS, Java and REST Full services.");

        expect(ctrl.origineStartDay).toEqual("10/02/2006");
        expect(ctrl.OriginePosition).toEqual("Junior Developer");
        expect(ctrl.OriginComment).toEqual("Concentrate on AngulaJS, Java and REST Full services.");
    });

    it('should set button visible if values are different and if values get same button is disabled', function()
    {
    	commonNodeHeirarchyModelMock.userSelectedNode = selectedNode.child[0];
    	var watchedObject = watchExpressionFunction();
        expect(watchedObject).toBe(commonNodeHeirarchyModelMock.userSelectedNode);

     	watchListenerFunction();
     	expect(ctrl.btnSave).toBeTruthy();
     	expect(ctrl.btnName).toEqual("Save");
        expect(ctrl.hasAccess).toBeFalsy();
        expect(ctrl.modified).toBeFalsy(); 
        expect(ctrl.access).toEqual("user");

     	// chenging value of the position
     	ctrl.position = "Java Developer";
		ctrl.makeChange();    
		expect(ctrl.btnSave).toBeFalsy();
     	expect(ctrl.btnName).toEqual("Save"); 

     	// chenging position to origine value	
     	ctrl.position = "Junior Developer";
		ctrl.makeChange();    
		expect(ctrl.btnSave).toBeTruthy();
     	expect(ctrl.btnName).toEqual("Save"); 
    });

    it('should save details and update origine values when save button is pressed', function()
    {
    	var watchedObject = watchExpressionFunction();
        expect(watchedObject).toBe(commonNodeHeirarchyModelMock.userSelectedNode);
        // getting selected data.
     	watchListenerFunction();
     	expect(ctrl.btnSave).toBeTruthy();
     	expect(ctrl.btnName).toEqual("Save");
        expect(ctrl.hasAccess).toBeFalsy();

        expect(ctrl.modified).toBeFalsy();
        expect(ctrl.access).toEqual("admin");
     	expect(ctrl.startDay).toEqual("10/02/2005");
     	expect(ctrl.position).toEqual("Senior Developer");
     	expect(ctrl.comment).toEqual("Work with smile in our company.");

     	expect(ctrl.origineStartDay).toEqual("10/02/2005");
		expect(ctrl.OriginePosition).toEqual("Senior Developer");
		expect(ctrl.OriginComment).toEqual("Work with smile in our company.");

		// simulating changing data where makeChange() function is executed.
		ctrl.startDay = "10/02/2005";
		ctrl.position = "Senior Java Developer";
		ctrl.comment = "Work with smile and with enthusiasm in our company.";
		ctrl.makeChange();
		expect(ctrl.btnSave).toBeFalsy();

		// on save() function is executed when user press button. 
		ctrl.save();
		spyOn(toasterMock, 'pop');
		expect(ctrl.btnSave).toBeTruthy();
     	expect(ctrl.btnName).toEqual("Done");
     	expect(ctrl.origineStartDay).toEqual("10/02/2005");
		expect(ctrl.OriginePosition).toEqual("Senior Java Developer");
		expect(ctrl.OriginComment).toEqual("Work with smile and with enthusiasm in our company.");
    });
});