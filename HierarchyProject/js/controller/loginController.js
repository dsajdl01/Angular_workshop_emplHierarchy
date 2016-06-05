myMngtHierarchyApp.controller('loginController', [ 'commonNodeHeirarchyModel', 'modalDialogBoxService', 'hierarchyNodeService', '$location', 'Auth',
  function(commonNodeHeirarchyModel, modalDialogBoxService, hierarchyNodeService, $location, Auth) {

    var self = this;
    self.user = {};
    self.user.username = "";
    self.user.password = "";
    self.failed = false;
    var userDetails;
    self.commonNodeHeirarchyModel = commonNodeHeirarchyModel;

    self.init = function(){
        hierarchyNodeService.getLoginDetails(function(userLogin){
          userDetails = userLogin;
            console.log("loginController: ", userLogin);
          },
          function(fail) {
          }
        );
    }
 
    self.login = function() {
      if(isUserAndPasswordExist()){
           console.log("login userDetails: ", self.user.username, self.user.password, true);
           self.commonNodeHeirarchyModel.isLogIn = true;
           modalDialogBoxService.notifyAndHide(self.user);
      } else {
        // display message
        console.log("false===>");
      }
    };

    var isUserAndPasswordExist = function(){
      for(var i = 0; i < userDetails.length; i++){
        console.log(userDetails[i]);
        if(userDetails[i].username == self.user.username && userDetails[i].password == self.user.password){
          return true;
        }
      }
      return false;
    }
}]);