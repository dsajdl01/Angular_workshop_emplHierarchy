describe('Controller: accountInfoController', function() {

	beforeEach(module('myMngtHierarchyApp'));

	
	var ctrl, mockScope, mockCalculateTimeService, mockCommonNodeHeirarchyModel, mockMngtHierarchyProvider;

	var selectedNode_1 = {
						"name": "Bob",
						"id": 101,
						"parentsId": 100,
						"child": [{
								"name": "David",
								"id": 106,
								"parentsId": 105,
								"child": []
							}]
						};
						
	var detailsNode_1 = {"id": 101, "dob": "28/02/1976","start": "10/02/2005","possition": "Senior Developer","comments": "Work with smile in our company."};
	var detailsNode_2 = {"id": 106, "dob": "20/10/1979","start": "10/02/2006","possition": "Juniot Developer","comments": "Concentrate on AngulaJS, Java and REST Full services."};

	beforeEach(module(function($provide)
	{
		mockCalculateTimeService = {
			calculateDiffYearToCurrentDayFromFormatDay: function(dob){
				if(dob == "28/02/1976") return 40;
				else if (dob == "10/02/2005") return 5;
				else if (dob == "10/02/2006") return 4;
				else return 37;
			},
			calculateDiffDaysToCurrentDayFromFormatDayAndYear: function(startWorkingDay, yearsWorking){
				if(startWorkingDay == "10/02/2005" && yearsWorking == 5) return 63;
				else return 105;
			}
		};

		mockCommonNodeHeirarchyModel = {
			selectedTopNode: function(){}
		}; 

		mockMngtHierarchyProvider = {
			getSelectedNodeDetails: function(getselectedNode){
				if(getselectedNode == 101) return detailsNode_1;
				else return detailsNode_2;
			}
		};

		mockScope = {
            $watch : function(watchExpression) {
            	watchExpressionFunction = watchExpression;
            }
        }

		$provide.value('calculateTimeService', mockCalculateTimeService);
		$provide.value('commonNodeHeirarchyModel', mockCommonNodeHeirarchyModel);
		$provide.value('mngtHierarchyNodeServiceProvider', mockMngtHierarchyProvider);
		$provide.value("$scope", mockScope);
	}));

	beforeEach(inject(function($controller)
	{
		spyOn(mockScope, '$watch').and.callThrough();
        ctrl = $controller('accountInfoController');
        expect(mockScope.$watch).toHaveBeenCalledWith(jasmine.any(Function));
    }));

    it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should watch initilalize instance variables when any nodes is changed', function(){
    	mockCommonNodeHeirarchyModel.selectedTopNode = selectedNode_1;
    	var watchObject =  watchExpressionFunction();
    	
    	expect(ctrl.possition).toEqual("Senior Developer");
    	expect(ctrl.dob).toEqual("28/02/1976");
    	expect(ctrl.age).toEqual(40);
    	expect(ctrl.startWorkingDay).toEqual("10/02/2005");
    	expect(ctrl.comments).toEqual("Work with smile in our company.");
    	expect(ctrl.yearsWorking).toEqual(5);
    	expect(ctrl.daysWorking).toEqual(63);
    });

    it('should change instance variables when new node is selected', function(){
    	mockCommonNodeHeirarchyModel.selectedTopNode = selectedNode_1.child[0];
    	var watchObject =  watchExpressionFunction();
    	
    	expect(ctrl.possition).toEqual("Juniot Developer");
    	expect(ctrl.dob).toEqual("20/10/1979");
    	expect(ctrl.age).toEqual(37);
    	expect(ctrl.startWorkingDay).toEqual("10/02/2006");
    	expect(ctrl.comments).toEqual("Concentrate on AngulaJS, Java and REST Full services.");
    	expect(ctrl.yearsWorking).toEqual(4);
    	expect(ctrl.daysWorking).toEqual(105);
    })

});