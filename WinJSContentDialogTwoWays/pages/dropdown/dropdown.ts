
module DropDown {
  "use strict";

  var dataBindingListInternal: TestTeam;
  var bindingL: TestTeam;
  var dataBindingList: WinJS.Binding.GroupedSortedListProjection<TestTeam>;

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

  WinJS.UI.processAll().done(function () {

    dataBindingListInternal = new TestTeam(111, 'MVP selected', '/images/Banana.png', 'rgba(255,0,0,0.5)', new objGroup(2, '', new Team(6, 0, '', new Player(16, 0, ''))));

    bindingL = WinJS.Binding.as(dataBindingListInternal);

    Binding.Collection.Select.Refresh(["groupSelect", "teamSelect", "pSelect"], groups, GroupSelectChange);
    Binding.Collection.Select.Refresh(["teamSelect", "pSelect"], GetTeamsByGroupId(dataBindingListInternal.group.id), SubGroupChange);
    Binding.Collection.Select.Refresh(["pSelect"], GetPlayersByTeamsId(dataBindingListInternal.group.team.id), function () { return; });

    WinJS.Binding.processAll(document.getElementById('itemGlanceview'), bindingL).done();

    document.getElementById("showButton").addEventListener("click", function (e) {
      PanelPage.Modal.show("/pages/dd_dummy/dd_dummy.html", bindingL, null);
    }, false);

  });

  function GetTeamsByGroupId(groupId: number) {
    return $.grep(teams, function (e) { return e.groupId == groupId; });
  }

  function GetPlayersByTeamsId(teamId: number) {
    return $.grep(players, function (e) { return e.teamId == teamId; });
  }

  function GroupSelectChange(e) {

    var groupTeams = GetTeamsByGroupId(parseInt($('#groupSelect').val())); 
    Binding.Collection.Select.Refresh(['teamSelect', 'pSelect'], groupTeams, SubGroupChange);

  }

  function SubGroupChange(e) {

    var groupPlayers = GetPlayersByTeamsId(parseInt($('#teamSelect').val()));
    Binding.Collection.Select.Refresh(["pSelect"], groupPlayers, PlayerChange);

  }

  function PlayerChange(e) {
    //alert("Group " + groups[parseInt($('#groupSelect').val()) - 1].title + " Team " + teams[parseInt($('#teamSelect').val()) - 1].name + " and Player " + players[parseInt($('#pSelect').val()) - 1].name + " selected!");
  }


}

class TestTeam {

  id: number;
  title: string;
  image: string;
  backColor: string;
  group: objGroup;

  constructor(id: number, t: string, i: string, b: string, g: objGroup) { this.id = id; this.title = t; this.image = i; this.backColor = b; this.group = g; }
}

class objGroup {
  id: number;
  title: string;
  team: Team;

  constructor(i: number, title: string, team: Team) { this.id = i; this.title = title; this.team = team; }
}

class Team {
  id: number;
  groupId: number;
  name: string;
  player: Player;

  constructor(i: number, g: number, name: string, p: Player) { this.id = i; this.groupId = g; this.name = name; this.player = p; }
}

class Player {
  id: number;
  teamId: number;
  name: string;

  constructor(i: number, t: number, name: string) { this.id = i; this.teamId = t; this.name = name; }
}

