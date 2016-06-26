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
        	checkIfAssumedIdentity: function(next) {
        		if(this.assumedIdentity) return this.assumedIdentity;
        		else return this.assumedIdentity;
        	},
        	checkPermissionForView: function(next) {
        		if(this.hasPermission) return this.hasPermission;
        		else return this.hasPermission;
        	}
        };

        $provide.value('$location', locationMock);
        $provide.value('Auth', authMock);
    }));

    beforeEach(inject(function(_$rootScope_)
    {
            $rootScope = _$rootScope_;
    }));

    it('should be defined', function()
    {
        expect(myMngtHierarchyApp).toBeDefined();
    });

    it('should test routes and load particular or html page view', inject(function ($route)
    {
		expect($route.routes['/homeViewAccount'].templateUrl).toEqual('js/views/selectedNodeInfo.html');

		expect($route.routes['/viewAccountInfo'].templateUrl).toEqual('js/views/accountManagementHierarchyInfo.html');

		expect($route.routes['/templateAssumeIdentity'].templateUrl).toEqual('js/views/AssumeIdentityTemplate.html');

		expect($route.routes['/myProfile'].templateUrl).toEqual('js/views/myProfile.html');

		expect($route.routes['/personalInfo'].templateUrl).toEqual('js/views/personalInfoForm.html');

		expect($route.routes[null].redirectTo).toEqual('/homeViewAccount');
	}));

	it('should redirect to template Assume Identity when user does not assumed identity', function()
	{
		authMock.assumedIdentity = false;
		spyOn(locationMock, 'path');

		$rootScope.$broadcast("$routeChangeStart", "next");
		expect(locationMock.path).toHaveBeenCalledWith("/templateAssumeIdentity");
	});

	it('should redirect to homeViewAccount view when user assumed identity and does not has permission', function()
	{
		authMock.assumedIdentity = true;
		authMock.hasPermission = false;
		spyOn(locationMock, 'path');

		$rootScope.$broadcast("$routeChangeStart", "next");
		expect(locationMock.path).toHaveBeenCalledWith("/homeViewAccount");
	});

	it('should redirect to particular view if user assumed identity and has permission', function()
	{
		authMock.assumedIdentity = true;
		authMock.hasPermission = true;
		spyOn(locationMock, 'path');

		$rootScope.$broadcast("$routeChangeStart", "next");
		expect(locationMock.path).not.toHaveBeenCalled();
	});
});