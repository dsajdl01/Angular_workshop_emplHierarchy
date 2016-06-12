myMngtHierarchyApp.controller('loginController', [ 'commonNodeHeirarchyModel', 'modalDialogBoxService', 'hierarchyNodeService',
  function(commonNodeHeirarchyModel, modalDialogBoxService, hierarchyNodeService) {

    var self = this;
    self.user = {};
    var userDetails;
    self.commonNodeHeirarchyModel = commonNodeHeirarchyModel;

    self.init = function(){
        self.user.username = "";
        self.user.password = "";
        self.failed = false;
        self.errorMessage = false;
        hierarchyNodeService.getLoginDetails(function(userLogin)
        {
            userDetails = userLogin;
        },
        function(fail)
        {
            modalDialogBoxService.notifyAndHide(false);
        });
    }
 
    self.login = function()
    {
      var user = isUserAndPasswordExist();
      if(user)
      {
           console.log("login userDetails: ", self.user.username, self.user.password, true);
           self.commonNodeHeirarchyModel.user.isLogin = true;
           self.commonNodeHeirarchyModel.user.administrator = user.administrator;
           self.commonNodeHeirarchyModel.user.id = user.nodeId;
           self.commonNodeHeirarchyModel.user.username = user.username;
           modalDialogBoxService.notifyAndHide(true);
      }
      else
      {
        self.errorMessage = "Username or password is incorrect!";
      }
    };

    var isUserAndPasswordExist = function()
    {
      for(var i = 0; i < userDetails.length; i++)
      {
        if(userDetails[i].username == self.user.username && userDetails[i].password == self.user.password) {
          return userDetails[i];
        }
      }
      return false;
    }
}]);