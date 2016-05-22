
myMngtHierarchyApp.factory('Auth', [ 'commonNodeHeirarchyModel', 'mngtHierarchyNodeServiceProvider',
 function(commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider) {
	return new Auth(commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider);
}]);
// http://www.stefanoscerra.it/permission-based-auth-system-in-angularjs/
function Auth(commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider)
{

	var self = this;

	self.checkIfAssumedIdentity = function(view)
    {
		if(!view.requireAssumedIdentity)
        {
			return true;
		}
        return isUserAssumedIdentity();
	}

    self.checkPermissionForView = function(view)
    {
        if (!view.requiresAuthentication)
        {
            return true;
        }

        var result = userHasPermissionForView(view);

        if(!view.requirePersonalDataEntry){
            return result;
        }
        return hasEnterPeronalDate(view);
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

    var userHasPermissionForView = function(view)
    {
        if(!view.permissions || !view.permissions.length)
        {
            return true;
        }
        return self.userHasPermission(view.permissions);
    };

    var hasEnterPeronalDate = function(view)
    {
        if(!view.personalDataEntry || !view.personalDataEntry.length)
        {
            return true;
        }
        return isPersonalDataEntered(view.personalDataEntry);
    }

    var isPersonalDataEntered = function(personalData)
    {
        var details = getDetails();
        var result = false;
        angular.forEach(personalData, function(data, index) {
            if(!getDetailsValue(data, details)){
                result = true;
            }
        });
        return result;
    }

    var getDetailsValue = function(data, details){
        switch(data)
        {
            case 'email':
                return details.email;
            case 'dob':
                return details.dob;
            default:
                return null;
        }
    }

    var getDetails = function()
    {
        return mngtHierarchyNodeServiceProvider.getSelectedNodeDetails(commonNodeHeirarchyModel.userSelectedNode.id);
    }

    var isUserAssumedIdentity = function()
    {
        return commonNodeHeirarchyModel.isUserAssumeIdentity;
    }
}