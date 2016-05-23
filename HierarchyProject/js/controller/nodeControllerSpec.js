describe('Controller: nodeController', function() {
	
	var ctrl, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock, windowMock, calculateTimeMock;

	var selectedNode = [{"name": "Bob", "id": 101,"parentsId": 100, "access": "admin",
						"child": [{"name": "David","id": 106,"parentsId": 101, "access": "user", "child": []},
						 {"name": "Fred", "id": 107, "parentsId": 101, "access": "user","child": []},
						 {"name": "Kaith", "id": 108, "parentsId": 101, "access": "viewer", "child": []}]}];

	var detailsNode = [{"id": 101, "dob": "28/02/1976","start": "10/02/2005",
			"possition": "Senior Developer","comments": "Work with smile in our company."},
	 		{"id": 106, "dob": "20/10/1979","start": "10/02/2006","possition": "Junior Developer",
	 							"comments": "Concentrate on AngulaJS, Java and REST Full services."},
			{"id": 107, "dob": "28/11/1981","start": "20/07/2010","possition": "Junior Angular Developer",
	 							"comments": "Concentrate on front end especially on AngulaJS."},
			{"id": 108, "dob": "30/11/1982","start": "20/07/2014","possition": "Designer",
	 							"comments": "Concentrate on user requirements and designing user interface."}];

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{
		commonNodeHeirarchyModelMock = {
			nodesDetails: detailsNode,
			selectedTopNode: selectedNode[0],
			rootNode: selectedNode,
			userSelectedNode: selectedNode[0].child[0]
		};

		mngtHierarchyProviderMock = {
			getSelectedNodeDetails: function(nodeId){
				if(nodeId == 108) {
					return detailsNode[3];
				}
				else if (nodeId == 106) {
					return detailsNode[1]
				}
				else if (nodeId == 107) {
					return detailsNode[2];
				}
				else {
					return {};
				}
			},
            checkIfPersonalDetailsAreInseared: function(){}
		};

		calculateTimeServiceMock = {
			getCurrentDate: function(){
				return "25/04/2016";
			}
		};

		windowMock = {
            confirm: function(message) {
                return userPromptResult;
            }
        };

		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchyModelMock);
		$provide.value('mngtHierarchyNodeServiceProvider', mngtHierarchyProviderMock);
		$provide.value('calculateTimeService', calculateTimeServiceMock);
		$provide.value('$window', windowMock);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('nodeController');
    }));

	it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should initialize instance variables when ini() is called', function(){
    	ctrl.init();
    	expect(ctrl.titleOfNode).toEqual("David");
		expect(ctrl.numberOfChild).toEqual("David does not have any child.");
		expect(ctrl.profesionInfo).toEqual("David works as Junior Developer.");
		expect(ctrl.workSince).toEqual("David has been working for our company since 10/02/2006");
		expect(ctrl.commensData).toEqual("Concentrate on AngulaJS, Java and REST Full services.");
		expect(ctrl.detailsTitle).toEqual("David comments:");
    });

    it('should delete node from top root when deleteNode() is called', function(){
    	userPromptResult = true;
   		spyOn(ctrl, 'removeNodesFromTree').and.callThrough();
   		expect(selectedNode[0].child.length).toEqual(3);

    	ctrl.deleteNode(selectedNode[0].child[0]);
    	expect(ctrl.removeNodesFromTree).toHaveBeenCalled();
    	expect(selectedNode[0].child.length).toEqual(2);
    });

    it('should delete node from top root when deleteNode() is called and user approved is false', function(){
    	userPromptResult = false;
   		spyOn(ctrl, 'removeNodesFromTree').and.callThrough();
   		expect(selectedNode[0].child.length).toEqual(2);
   		
    	ctrl.deleteNode(selectedNode[0].child[0]);
    	expect(ctrl.removeNodesFromTree).not.toHaveBeenCalled();
    	expect(selectedNode[0].child.length).toEqual(2);
    });

    it('should create a new node with id -1 into patents child ', function(){
    	spyOn(ctrl, 'createNewChildNodeForUserToEdit').and.callThrough();
    	expect(selectedNode[0].child[0].child.length).toEqual(0);

    	//adding new node
    	ctrl.createNewChildNodeForUserToEdit(selectedNode[0].child[0]);
    	expect(ctrl.createNewChildNodeForUserToEdit).toHaveBeenCalled();
    	expect(selectedNode[0].child[0].child.length).toEqual(1);

    	//deleting new added node
    	userPromptResult = true;
    	spyOn(ctrl, 'removeNodesFromTree').and.callThrough();
    	ctrl.deleteNode(selectedNode[0].child[0].child[0]);
    	expect(ctrl.removeNodesFromTree).toHaveBeenCalled();
    	expect(selectedNode[0].child[0].child.length).toEqual(0);
    });

     it('The node should be in start editing instance variable when editingStart() is called', function(){
    	spyOn(ctrl, 'editingStart').and.callThrough();

    	ctrl.editingStart(selectedNode[0].child[0]);
    	expect(ctrl.editingStart).toHaveBeenCalled();
    	expect(ctrl.commonNodeHeirarchyModel.editingNode).toEqual(selectedNode[0].child[0]);
    });

    it('should retuen supply name when user create node and do not supply with name', function(){
    	var newName = "";
    	var obj = ctrl.validateNewNodeName(newName); 
    	expect(obj.message).toEqual(" Please supply a name");
    	expect(obj.valid).toBeFalsy();
    });

    it('should retuen Cannot contain characters ... when user create node and add invalid characters name', function(){
    	var newName = "bob/lik";
    	var obj = ctrl.validateNewNodeName(newName); 
    	expect(obj.message).toEqual(" Cannot contain characters: \\  /  |  :  ;  ,  .  <  >");
    	expect(obj.valid).toBeFalsy();
    });

    it('should retuen name is already used when user create node and add same name that already exist in hierarchy', function(){
    	var newName = "Kaith";
    	var obj = ctrl.validateNewNodeName(newName);
    	expect(obj.message).toEqual(" The name is already in used");
    	expect(obj.valid).toBeFalsy();
    });

    it('should retuen empty message and true when user create new name that is valid', function(){
    	var newName = "Adam";
    	var obj = ctrl.validateNewNodeName(newName);
    	expect(obj.message).toEqual("");
    	expect(obj.valid).toBeTruthy();
    });

    it('should update selected node name when updateSelectedNodeName() is called', function(){
    	var node = {"name": "Kaith", "id": 108, "parentsId": 101, "child": [] };
    	ctrl.commonNodeHeirarchyModel.editingNode = node;
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("Kaith");
    	spyOn(ctrl, 'updateSelectedNodeName').and.callThrough();

    	ctrl.updateSelectedNodeName("Sandra");
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("Sandra");
    	expect(ctrl.updateSelectedNodeName).toHaveBeenCalled();
    });

     it('should update selected node name when updateSelectedNodeName() is called', function(){
    	var node = {"name": "Kaith", "id": 108, "parentsId": 101, "child": [] };
    	ctrl.commonNodeHeirarchyModel.editingNode = node;
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("Kaith");
    	spyOn(ctrl, 'updateSelectedNodeName').and.callThrough();

    	ctrl.updateSelectedNodeName("Sandra");
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("Sandra");
    	expect(ctrl.updateSelectedNodeName).toHaveBeenCalled();
    });

    it('should give a new id and create a new node details when updateSelectedNodeName() is called and id is -1', function(){
    	var node = {"name": "", "id": -1, "parentsId": 101, "child": [] };
    	ctrl.commonNodeHeirarchyModel.editingNode = node;
    	expect(ctrl.commonNodeHeirarchyModel.nodesDetails.length).toBe(4);
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("");
    	spyOn(ctrl, 'updateSelectedNodeName').and.callThrough();

    	ctrl.updateSelectedNodeName("Alan");
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("Alan");
    	expect(ctrl.updateSelectedNodeName).toHaveBeenCalled();
    	var len = ctrl.commonNodeHeirarchyModel.nodesDetails.length;
    	expect(len).toBe(5);
    	expect(ctrl.commonNodeHeirarchyModel.nodesDetails[len -1].start).toEqual("25/04/2016");
    });

    it('should delete a new nodewhen updateSelectedNodeName() is called and id is -1 without any name', function(){

    	spyOn(ctrl, 'createNewChildNodeForUserToEdit').and.callThrough();
    	//to the selected node does not have any child so the length should be 0
    	expect(selectedNode[0].child[0].child.length).toEqual(0);

    	//adding new node
    	ctrl.createNewChildNodeForUserToEdit(selectedNode[0].child[0]);
    	expect(ctrl.createNewChildNodeForUserToEdit).toHaveBeenCalled();
    	//to the selected node was added 1 child so the length should be 1
    	expect(selectedNode[0].child[0].child.length).toBe(1);
   
    	ctrl.commonNodeHeirarchyModel.editingNode = selectedNode[0].child[0].child[0];
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.id).toBe(-1)
    	expect(ctrl.commonNodeHeirarchyModel.editingNode.name).toEqual("");
    	spyOn(ctrl, 'updateSelectedNodeName').and.callThrough();

    	//updated selected node without name with id -1 should be deleted.
    	ctrl.updateSelectedNodeName("");
    	expect(ctrl.updateSelectedNodeName).toHaveBeenCalled();
    	//selected node should have child 0 as it was deteted.
    	expect(selectedNode[0].child[0].child.length).toBe(0);
    });

	it('should put a node as selected node and initilaze variable when userSelectedNode is called', function(){
		ctrl.userSelectedNode(selectedNode[0].child[1]);
		expect(ctrl.titleOfNode).toEqual("Kaith");
		expect(ctrl.numberOfChild).toEqual("Kaith does not have any child.");
		expect(ctrl.profesionInfo).toEqual("Kaith works as Designer.");
		expect(ctrl.workSince).toEqual("Kaith has been working for our company since 20/07/2014");
		expect(ctrl.commensData).toEqual("Concentrate on user requirements and designing user interface.");
		expect(ctrl.detailsTitle).toEqual("Kaith comments:");
	})
});