myMngtHierarchyApp.factory('hierarchyNodeService',
							['$resource', '$http',function($resource, $http){
	return new hierarchyNodeService($resource, $http);
}]);

function hierarchyNodeService($resource, $http){
	this.$resource = $resource;
	this.$http = $http;
	var self = this;
	
	self.getSelectedNode = function(success, fail) {

		 var URL = 'https://raw.githubusercontent.com/dsajdl01/Angular_workshop_emplHierarchy/master/dataNodeHierarchy.json';

		return $http( {
						method: 'GET',
						url: URL
					})
					.then(function successCallBack(topRoot){
						success(topRoot.data);
					},
					function errorCallBack(error){
						fail(error);
					});
	};

	self.getNodesDetails = function(success, fail){
	
		var URL = 'https://raw.githubusercontent.com/dsajdl01/Angular_workshop_emplHierarchy/master/node_data.json';
		
		return $http( {
						method: 'GET',
						url: URL
					})
					.then(function successCallBack(topRoot){
						success(topRoot.data);
					},
					function errorCallBack(error){
						fail(error);
					});
	}
}
