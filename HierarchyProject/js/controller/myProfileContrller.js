/**
* Created by david on 15/04/16.
*/
myMngtHierarchyApp.controller('myProfileContrller',['commonNodeHeirarchyModel', 'mngtHierarchyNodeServiceProvider', 'toaster',
				 function(commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider, toaster) {

	var self = this;

	self.init = function()
	{
		self.showInputForms = false;
		self.btnName = "Save";
		var emplDetails = getEmlpDetails();
		self.username = commonNodeHeirarchyModel.user.username;
		self.employeeName = commonNodeHeirarchyModel.userSelectedNode.name;
		self.Access = commonNodeHeirarchyModel.userSelectedNode.access;
		self.dob = emplDetails.dob;
		self.email = emplDetails.email;
		self.position = emplDetails.possition;
		self.startDay = emplDetails.start;
		self.employeeFullName = emplDetails.fullname;
		self.hasAccess = doesUserHasAccessToModified();
		self.oldPassword = null;
		self.newPassword = null;
		self.confirmPassword = null;
		self.btnEqualValue = true;
		setOriginalValues();
	}

	self.showPasswordFields = function()
	{
		self.showInputForms = (self.showInputForms) ? false : true;
		self.oldPassword = null;
		self.newPassword = null;
		self.confirmPassword = null;
		self.makeChange();
		setMessagesToNull();
	}

	self.makeChange = function()
	{
		self.btnEqualValue = equal();
		self.btnName = (self.btnEqualValue)? "Done": "Save";
	}

	self.save = function(){
		setMessagesToNull();
		if(isPaswordValid())
		{
			if(self.oldPassword)
			{
				if(oldPasswordMatch())
				{
					savePassword();
					self.showInputForms = self.showPasswordFields();
					saveUserInputDate();
				}
				else
				{
					self.old_passwordMsg = "Incorrect Current Password";
				}
			}
			else
			{
				saveUserInputDate();
			}
		}
		else
		{
			displayPasswordMessage();
		}
	}
	var setMessagesToNull = function()
	{
		self.old_passwordMsg = null;
		self.confirm_passwordMsg = null;
		self.new_passwordMsg = null;
	}

	var displayPasswordMessage = function()
    {
        if(!self.confirmPassword)
        {
            if(!self.confirmPassword && !self.oldPassword)
            {
                self.old_passwordMsg = "Current password is required.";
                self.confirm_passwordMsg = true;
            }
            else if (!self.confirmPassword && !self.newPassword)
            {
                self.new_passwordMsg = true;
                self.confirm_passwordMsg = true;
            }
            else
            {
                self.confirm_passwordMsg = true;
            }
        }
        else if (!self.newPassword)
        {
            if(!self.newPassword && !self.oldPassword)
            {
                self.new_passwordMsg = true;
                self.old_passwordMsg = "Current password is required.";
            }
            else
            {
                self.new_passwordMsg = true;
            }
        }
        else
        {
            self.old_passwordMsg = "Current password is required.";
        }
    }

	var savePassword = function()
	{
		var emplDetails = getEmlpDetails();
		emplDetails.password = self.newPassword;
	}

	var saveUserInputDate = function()
	{
		var emplDetails = getEmlpDetails();
		emplDetails.email =  self.email;
		emplDetails.possition = self.position;
		emplDetails.dob = self.dob;
		emplDetails.start = self.startDay;
		emplDetails.fullname = self.employeeFullName;
		commonNodeHeirarchyModel.userSelectedNode.name = self.employeeName; 
		commonNodeHeirarchyModel.user.username = self.username;
		setOriginalValues();
		commonNodeHeirarchyModel.hasPersonalData = false;
		self.btnName = "Done";
		self.btnEqualValue = true;
		toaster.pop("success","Done", "The data was successfully saved.");
	}

	var oldPasswordMatch = function()
	{
		var emplDetails = getEmlpDetails();
		return self.oldPassword == emplDetails.password
	}

	var isPaswordValid = function()
	{
        if(!self.confirmPassword && !self.oldPassword && !self.newPassword)
        {
            return true;
        }
        if(self.confirmPassword && self.oldPassword && self.newPassword)
        {
            return true;
        }
        return false;
    }

	var setOriginalValues = function()
	{
		self.originalUsername = self.username;
		self.originalEmplName = self.employeeName;
		self.originalDob = self.dob;
		self.originalEmail = self.email;
		self.originalPosition = self.position;
		self.originalStartDate = self.startDay;
		self.originalEmplFullName = self.employeeFullName;
		self.originalOldPassword = self.oldPassword;
		self.originalNewPassword = self.newPassword;
		self.originalConfirmPassword = self.confirmPassword;
	}

	var equal = function()
	{
		return self.originalEmplName == self.employeeName
				&& self.originalDob == self.dob
				&& self.originalEmail == self.email
				&& self.originalPosition == self.position
				&& self.originalStartDate == self.startDay
				&& self.originalEmplFullName == self.employeeFullName
				&& self.originalOldPassword == self.oldPassword
				&& self.originalNewPassword == self.newPassword
				&& self.originalConfirmPassword == self.confirmPassword
				&& self.originalUsername == self.username;
	}

	var doesUserHasAccessToModified = function()
	{
		return !(commonNodeHeirarchyModel.userSelectedNode.access == "admin"
			|| commonNodeHeirarchyModel.userSelectedNode.access == "viewer");
	}

	var getEmlpDetails = function()
	{
		return mngtHierarchyNodeServiceProvider.getSelectedNodeDetails(commonNodeHeirarchyModel.userSelectedNode.id);
	}
}]);