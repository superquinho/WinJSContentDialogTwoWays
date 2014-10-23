module Pages {
  "use strict";

  var txtName;
  var txtId;
  var data: TestObject; 

  //
  var Dummy = WinJS.UI.Pages.define('/pages/lvw_dummy/lvw_dummy.html', {
    ready: function (element, options: TestObject) {

      if (options !== undefined) {
        data = options;

        WinJS.Binding.processAll(document.getElementById("dummyPage"), data);

      }

      var btnWelcome = document.getElementById("btnWelcome");
      txtName = <HTMLInputElement>document.getElementById("txtName");
      btnWelcome.addEventListener("click", function () {
        txtName = <HTMLInputElement>document.getElementById("txtName");
        txtId = <HTMLInputElement>document.getElementById("txtId");
        document.getElementById("welcomeText").innerHTML = "Hello " + txtName.value;
        data.image = '/images/Strawberry.png';

        PanelPage.Modal.isValidated = false;
        if (txtName.value !== null && txtName.value !== '') {
          PanelPage.Modal.isValidated = true;
        }

      });

      var btnClose = document.getElementById("closeButton");
      btnClose.addEventListener("click", function () {

        if (PanelPage.Modal.isValidated) {
          PanelPage.Modal.hide();
        } else {
          document.getElementById("welcomeText").innerHTML = "Modal not Validated! Click on 'Say Hello' button";
        }

      });
    }
  });
}