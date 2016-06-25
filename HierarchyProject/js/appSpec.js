'use strict';
describe('myMngtHierarchyApp: module', function() {

	var $rootScope, locationMock, authMock;

  	beforeEach(module('myMngtHierarchyApp'));

     beforeEach(module(function($provide) {
        locationMock = {
			path: function(path) {}
        };

        authMock = {
        	hasPermission: true,
        	assumedIdentity: true, 
        	checkIfAssumedIdentity: function(next){
        		if(this.assumedIdentity) return this.assumedIdentity;
        		else return this.assumedIdentity;
        	},
        	checkPermissionForView: function(next){
        		if(this.hasPermission) return this.hasPermission;
        		else return this.hasPermission;
        	}
        };

        $provide.value('$location', locationMock);
        $provide.value('Auth', authMock);
    }));

    beforeEach(inject(function(_$rootScope_, $templateCache) {
            $rootScope = _$rootScope_;

            // We need add the template entry into the templateCache if we ever
            // specify a templateUrl
            $templateCache.put('js/views/selectedNodeInfo.html', '');
            $templateCache.put('js/views/accountManagementHierarchyInfo.html', '');
            $templateCache.put('js/views/AssumeIdentityTemplate.html', '');
            $templateCache.put('js/views/myProfile.html', '');
            $templateCache.put('js/views/personalInfoForm.html', '');
    }));

    it('should be defined', function() {
        expect(myMngtHierarchyApp).toBeDefined();
    });


    it('should test routesgo load particular ,html page view', inject(function ($route) {

		expect($route.routes['/homeViewAccount'].templateUrl).toEqual('js/views/selectedNodeInfo.html');

		expect($route.routes['/viewAccountInfo'].templateUrl).toEqual('js/views/accountManagementHierarchyInfo.html');

		expect($route.routes['/templateAssumeIdentity'].templateUrl).toEqual('js/views/AssumeIdentityTemplate.html');

		expect($route.routes['/myProfile'].templateUrl).toEqual('js/views/myProfile.html');

		expect($route.routes['/personalInfo'].templateUrl).toEqual('js/views/personalInfoForm.html');

		expect($route.routes[null].redirectTo).toEqual('/homeViewAccount');

	}));

	it('should redirect to template Assume Identity when user does not assumed identity', function() {
		authMock.assumedIdentity = false,
		spyOn(locationMock, 'path');

		$rootScope.$broadcast("$routeChangeStart", "dds");
		expect(locationMock.path).toHaveBeenCalledWith("/templateAssumeIdentity");
	});

});