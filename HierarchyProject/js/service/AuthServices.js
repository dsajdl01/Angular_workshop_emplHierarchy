
myMngtHierarchyApp.factory('Auth', [ 'commonNodeHeirarchyModel', function(commonNodeHeirarchyModel) {
	return new Auth(commonNodeHeirarchyModel);
}]);
// http://www.stefanoscerra.it/permission-based-auth-system-in-angularjs/
function Auth(commonNodeHeirarchyModel)
{

	var self = this;

	self.checkIfAssumedIdentity = function(view){
		if(!view.requireAssumedIdentity){
			return true;
		}
		return isUserAssumedIdentity();
	}    
     
    var isUserAssumedIdentity = function(){
    	console.log(commonNodeHeirarchyModel.isUserAssumeIdentity);
    	return commonNodeHeirarchyModel.isUserAssumeIdentity;
    }

    self.checkPermissionForView = function(view)
    {
        if (!view.requiresAuthentication)
        {
            return true;
        }
        return userHasPermissionForView(view);
    };
     
     
    var userHasPermissionForView = function(view){
        if(!view.permissions || !view.permissions.length)
        {
            return true;
        } 
        return self.userHasPermission(view.permissions);
    };
     
    self.userHasPermission = function(permissions)
    {     
        var found = false;
        angular.forEach(permissions, function(permission, index)
        {
            if (commonNodeHeirarchyModel.selectedTopNode.access.indexOf(permission) >= 0)
            {
                found = true;
                return;
            }                        
        });
        return found;
    };
}