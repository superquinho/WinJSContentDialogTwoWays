module Pages {
  "use strict";


  var groups = [
    { id: 1, title: 'Group A' },
    { id: 2, title: 'Group B' },
    { id: 3, title: 'Group C' }
  ];

  var teams = [
    { id: 1, groupId: 1, name: 'Brazil' },
    { id: 2, groupId: 1, name: 'Croatia' },
    { id: 3, groupId: 1, name: 'Mexico' },
    { id: 4, groupId: 1, name: 'Cameroon' },

    { id: 5, groupId: 2, name: 'Spain' },
    { id: 6, groupId: 2, name: 'Netherland' },
    { id: 7, groupId: 2, name: 'Chile' },
    { id: 8, groupId: 2, name: 'Australia' },

    { id: 9, groupId: 3, name: 'Colombia' },
    { id: 10, groupId: 3, name: 'Greece' },
    { id: 11, groupId: 3, name: 'Ivory Coast' },
    { id: 12, groupId: 3, name: 'Japan' }

  ];

  var players = [
    { id: 1, teamId: 1, name: 'Neymar' },
    { id: 2, teamId: 1, name: 'Robinho' },
    { id: 3, teamId: 1, name: 'Kaka' },

    { id: 4, teamId: 2, name: 'Dont know' },
    { id: 5, teamId: 2, name: 'Weirdo' },
    { id: 6, teamId: 2, name: 'Dinko' },

    { id: 7, teamId: 3, name: 'Ochoa' },
    { id: 8, teamId: 3, name: 'Moreno' },
    { id: 9, teamId: 3, name: 'Raul Jimenez' },
    { id: 10, teamId: 3, name: 'Pulido' },

    { id: 11, teamId: 4, name: 'Etoo' },
    { id: 12, teamId: 4, name: 'Song' },
    { id: 13, teamId: 4, name: 'Mbia' },

    { id: 14, teamId: 6, name: 'Robben' },
    { id: 15, teamId: 6, name: 'Blind' },
    { id: 16, teamId: 6, name: 'Vlaar' },

  ];


  var txtName;
  var txtId;
  var data: TestTeam;

  var Dummy = WinJS.UI.Pages.define('/pages/dd_dummy/dd_dummy.html', {
    ready: function (element, options: TestTeam) {

      if (options !== undefined) {
        data = options;

        Binding.Collection.Select.Refresh(["groupSelect", "teamSelect", "playerSelect"], groups, GroupSelectChange);
        Binding.Collection.Select.Refresh(["teamSelect", "playerSelect"], GetTeamsByGroupId(data.group.id), SubGroupChange);
        Binding.Collection.Select.Refresh(["playerSelect"], GetPlayersByTeamsId(data.group.team.id), function () { return; });

        WinJS.Binding.processAll(document.getElementById("dummyPage"), data).done(function () {

        });

      }

      var btnWelcome = document.getElementById("btnWelcome");
      txtName = <HTMLInputElement>document.getElementById("txtName");
      btnWelcome.addEventListener("click", function () {
        txtName = <HTMLInputElement>document.getElementById("txtName");
        txtId = <HTMLInputElement>document.getElementById("txtId");
        document.getElementById("welcomeText").innerHTML = "Hello " + txtName.value + "<br/>" + "Group " + groups[parseInt($('#groupSelect').val()) - 1].title + " Team " + teams[parseInt($('#teamSelect').val()) - 1].name + ((parseInt($('#playerSelect').val()) - 1) >= 0 ? " and Player " + players[parseInt($('#playerSelect').val()) - 1].name : "") + " selected!";

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

  function GetTeamsByGroupId(groupId: number) {
    return $.grep(teams, function (e) { return e.groupId == groupId; });
  }

  function GetPlayersByTeamsId(teamId: number) {
    return $.grep(players, function (e) { return e.teamId == teamId; });
  }

  function GroupSelectChange(e) {

    var groupTeams = GetTeamsByGroupId(parseInt($('#groupSelect').val()));    // $.grep(teams, function (e) { return e.groupId == groupIdSelect; });
    Binding.Collection.Select.Refresh(['teamSelect', 'playerSelect'], groupTeams, SubGroupChange);

  }

  function SubGroupChange(e) {

    var groupPlayers = GetPlayersByTeamsId(parseInt($('#teamSelect').val()));  //   $.grep(players, function (e) { return e.teamId == teamIdSelect; });
    Binding.Collection.Select.Refresh(['playerSelect'], groupPlayers, PlayerChange);

  }

  function PlayerChange(e) {
    //alert("Group " + groups[parseInt($('#groupSelect').val()) - 1].title + " Team " + teams[parseInt($('#teamSelect').val()) - 1].name + " and Player " + players[parseInt($('#playerSelect').val()) - 1].name + " selected!");
  }

}