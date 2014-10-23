function validateEmail(email) {
  // http://stackoverflow.com/a/46181/11236

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module Binding.Mode {

  export var twoway = WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
    WinJS.Binding.defaultBind(source, sourceProps, dest, destProps);
    dest.onchange = function () {
      var d = dest[destProps[0]];
      var s = source[sourceProps[0]];

      if (sourceProps.length > 1) {

        var obj = source[sourceProps[0]];
        var i = 1;

        while (i < sourceProps.length - 1) {
          obj = obj[sourceProps[i]];
          i++;
        }

        s = obj[sourceProps[sourceProps.length - 1]];
        if (s !== d) {
          obj[sourceProps[sourceProps.length - 1]] = d;
        }

      } else if (s !== d) {
        source[sourceProps[0]] = d;
      }

    }
});

  WinJS.Namespace.define("Binding.Mode", {
    twoway: Binding.Mode.twoway
  });

}

module PanelPage {
  "use strict";

  export module Modal {

    var isInitialized: boolean = false;
    export var isValidated: boolean = false;
    var dialog;

    export var callBackFunction: Function;

    export function show(sourceURL, options, CallBack?: Function): void {

      if (CallBack != undefined) {
        callBackFunction = function () { return CallBack(); };
      }

      var modalDialog = CleanModalContent();
      WinJS.UI.processAll(document.getElementById("dialogElement")).done(function () {
        WinJS.UI.Pages.render(sourceURL, modalDialog, options).done(function () {

          dialog = document.querySelector("#dialogElement").winControl;
          dialog.show();

          isInitialized = true;
          isValidated = false;

        });
      });

    }

    function CleanModalContent() {
      var modalDialog = document.getElementById("modalContent");
      modalDialog.winControl && modalDialog.winControl.unload && modalDialog.winControl.unload();
      WinJS.Utilities.empty(modalDialog);
      return modalDialog;
    }

    export function hide(): void {

      if (isInitialized && this.isValidated) {
        CleanModalContent();
        dialog.hide();

        if (callBackFunction != undefined) {
          callBackFunction();
        }

      }

    }

  }

}


module Binding.Collection {

  //  export var ResetSelectRepeater = function (selectHtmlElement: string[], optionsList: any, onChange: any): any {

  //  var selector;
  //  var i = 0;

  //  if (selectHtmlElement.length > 1) {

  //    $.each(selectHtmlElement, function (key: number, value: string) {

  //      selector = document.getElementById(value);

  //      if (selector.winControl != null && selector.winControl != undefined) {

  //        $("#" + value).prop("selectedIndex", -1);
  //        $("#" + value).prop("value", 0);
  //        $("#" + value).trigger('change');

  //        if (i != 0) {
  //          selector.winControl.data = new WinJS.Binding.List([]);
  //          selector.disabled = true;
  //        }
  //      }

  //      i++;

  //    });

  //  }

  //  selector = document.getElementById(selectHtmlElement[0]);
  //  if (selector.winControl != null && selector.winControl != undefined) {
  //    selector.winControl.data = new WinJS.Binding.List(optionsList);
  //    selector.addEventListener("change", onChange, false);
  //    selector.disabled = true;
  //    if (optionsList != null && optionsList.length > 0) {
  //      selector.disabled = false;
  //    }
  //    $(selector).prop("selectedIndex", -1);
  //    $(selector).prop("value", 0);
  //    $(selector).trigger('change');
  //  }

  //}


  export module Select {

    export var Refresh = function (selectHtmlElement: string[], optionsList: any, onChange: any): any {

      var selector;
      var i = 0;

      if (selectHtmlElement.length > 1) {

        $.each(selectHtmlElement, function (key: number, value: string) {

          selector = document.getElementById(value);

          if (selector.winControl != null && selector.winControl != undefined) {

            $("#" + value).prop("selectedIndex", -1);
            $("#" + value).prop("value", 0);
            $("#" + value).trigger('change');

            if (i != 0) {
              selector.winControl.data = new WinJS.Binding.List([]);
              selector.disabled = true;
            }
          }

          i++;

        });

      }

      selector = document.getElementById(selectHtmlElement[0]);
      if (selector.winControl != null && selector.winControl != undefined) {
        selector.winControl.data = new WinJS.Binding.List(optionsList);
        selector.addEventListener("change", onChange, false);
        selector.disabled = true;
        if (optionsList != null && optionsList.length > 0) {
          selector.disabled = false;
        }
        $(selector).prop("selectedIndex", -1);
        $(selector).prop("value", 0);
        $(selector).trigger('change');
      }

    }

  }

}

