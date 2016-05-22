var myMngtHierarchyApp = angular.module('myMngtHierarchyApp', [
	'toaster',
	'ngRoute',
	'ngResource',
	'ngMessages',
	'mgcrea.ngStrap'
	]);

myMngtHierarchyApp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

    $rootScope.$on('$routeChangeStart', function (event, next) {
    	if(!Auth.checkIfAssumedIdentity(next)){
    		event.preventDefault();
            $location.path("/templateAssumeIdentity");
    	} 
    	else if (!Auth.checkPermissionForView(next)){
            event.preventDefault();
            $location.path("/homeViewAccount");
        }
    });
  }]);

myMngtHierarchyApp.config(['$routeProvider', function($routeProvider) {
	  $routeProvider

      // Add more views here for routing
	  .when('/homeViewAccount', {
		  templateUrl: 'js/views/selectedNodeInfo.html',
		  requireAssumedIdentity: false,
		  requirePersonalDataEntry: false,
		  requiresAuthentication: false
	  })
	  .when('/viewAccountInfo',{
	  	templateUrl: 'js/views/accountManagementHierarchyInfo.html',
	  	requireAssumedIdentity: true,
	  	requiresAuthentication: true,
	  	requirePersonalDataEntry: false,
  	 	permissions: ["admin", "viewer"]
	  })
	  .when('/templateAssumeIdentity',{
	  	templateUrl: 'js/views/AssumeIdentityTemplate.html',
	  	requireAssumedIdentity: false,
	  	requirePersonalDataEntry: false,
	  	requiresAuthentication: false
	  })
	  .when('/myProfile',{
	  	templateUrl: 'js/views/myProfile.html',
	  	requireAssumedIdentity: true,
	  	requirePersonalDataEntry: false,
	  	requiresAuthentication: false
	  })
	  .when('/personalInfo',{
	  	templateUrl: 'js/views/personalInfoForm.html',
	  	requireAssumedIdentity: true,
	  	requiresAuthentication: true,
	  	requirePersonalDataEntry: true,
	  	personalDataEntry: ["email", "dob"]
	  })
	  .otherwise({redirectTo: '/homeViewAccount'})
	}]
);