describe('Controller: Auth', function(){

	var service, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock; 

	var view = {};

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{
		commonNodeHeirarchyModelMock = {
			isUserAssumeIdentity: true
		};

		mngtHierarchyProviderMock = {};

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

});