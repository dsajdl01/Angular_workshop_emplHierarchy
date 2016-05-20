'use strict';

describe('directive: editNodeInPlace', function() {

	var element, scopeExternal, scopeInternel, commonNodeHeirarchy, nodeForDirective;
    var inputElement, spanElement;

    beforeEach(module('myMngtHierarchyApp'));


    beforeEach(module(function($provide)
	{ 
		commonNodeHeirarchy = {
			userSelectedNode: null
		};
		scopeInternel = null;
		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchy);
	}));



    beforeEach(inject(function($rootScope, $compile, $templateCache) {

    	scopeExternal = $rootScope.$new();

    	var directiveTemplate = null;
	    var req = new XMLHttpRequest();
	    req.onload = function() {
	        directiveTemplate = this.responseText;
	    };
	    // ref: http://stackoverflow.com/questions/15214760/unit-testing-angularjs-directive-with-templateurl
	    // Note that the relative path may be different from your unit test HTML file.
	    // Using `false` as the third parameter to open() makes the operation synchronous.
	    // Gentle reminder that boolean parameters are not the best API choice.
	    req.open("get", "../../js/views/accounts.html", false);
	    req.send();
	    $templateCache.put("js/views/accounts.html", directiveTemplate);

    	nodeForDirective = {id: 10, name: "David"};
		commonNodeHeirarchy.userSelectedNode = nodeForDirective;    	

    	scopeExternal.nodeCtrl = {
    		userSelectedNode: function(node) {},
    		updateSelectedNodeName: function(newName) {},
    		"commonNodeHeirarchy": commonNodeHeirarchy
		};

		scopeExternal.s = {id:10, name:"nodeName"};

    	element = angular.element(
	    	'<edit-node-in-place ' +
				'select="nodeCtrl.userSelectedNode(s)" '+
	 			'value="{{s.name}}"' +
	 			'update="nodeCtrl.updateSelectedNodeName(newName)"'+
	 			'is-selected-condition="{{s.id == nodeCtrl.commonNodeHeirarchy.userSelectedNode.id}}">'+
	 		'</edit-node-in-place>');

	 	element = $compile(element)(scopeExternal);

	 	scopeExternal.$digest();

	 	scopeInternel = element.isolateScope();

	 	spanElement = angular.element(element.children()[0]);
        inputElement = angular.element(element.children()[1]);

    }));

    it("should setup the node for the directive", function() {
        expect(scopeInternel.value).toEqual("nodeName");
        expect(scopeInternel.update).toEqual(jasmine.any(Function));
        expect(scopeInternel.select).toEqual(jasmine.any(Function));
        expect(scopeInternel.isSelectedCondition).toBeTruthy();
    });

  //  it("should call back to the nodeCtrl when the <span> is selected", function() {
//        spyOn(scopeExternal.nodeCtrl, "userSelectedNode");

   //     var spanElement = angular.element(  element.children()[0] );
        //console.log("\n\nelem: ", spanElement, "\n\nfsfsf:",  scopeInternel.select )
    //    spanElement.triggerHandler('click');
      //  console.log("hhh---", spanElement, "\n\n>>>>- " , spanElement.triggerHandler('click'));
    //    console.log("\n\n>>>>- " , scopeExternal.nodeCtrl);

  //      expect(scopeExternal.nodeCtrl.userSelectedNode).toHaveBeenCalledWith(nodeForDirective);
 //   });
});