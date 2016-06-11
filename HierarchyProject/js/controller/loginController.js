myMngtHierarchyApp.controller('loginController', [ 'commonNodeHeirarchyModel', 'modalDialogBoxService', 'hierarchyNodeService', '$location', 'Auth', 'toaster',
  function(commonNodeHeirarchyModel, modalDialogBoxService, hierarchyNodeService, $location, Auth, toaster) {

    var self = this;
    self.user = {};
    var userDetails;
    self.commonNodeHeirarchyModel = commonNodeHeirarchyModel;

    self.init = function(){
        self.user.username = "";
        self.user.password = "";
        self.failed = false;
        self.errorMessage = false;
        hierarchyNodeService.getLoginDetails(function(userLogin){
            userDetails = userLogin;
          },
          function(fail) {
            toaster.pop("error","ERROR!","An error occer while app was downloading data.");
            modalDialogBoxService.hideDialog()
          }
        );
    }
 
    self.login = function() {
      var user = isUserAndPasswordExist();
      if(user){
           console.log("login userDetails: ", self.user.username, self.user.password, true);
           self.commonNodeHeirarchyModel.user.isLogin = true;
           self.commonNodeHeirarchyModel.user.administrator = user.administrator;
           self.commonNodeHeirarchyModel.user.id = user.nodeId;
           self.commonNodeHeirarchyModel.user.username = user.username;
           modalDialogBoxService.notifyAndHide(self.user);
      } else {
        self.errorMessage = "Username or password is incorrect!";
      }
    };

    var isUserAndPasswordExist = function(){
      for(var i = 0; i < userDetails.length; i++){
        console.log(userDetails[i]);
        if(userDetails[i].username == self.user.username && userDetails[i].password == self.user.password){
          return userDetails[i];
        }
      }
      return false;
    }
}]);