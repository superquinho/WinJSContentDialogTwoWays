var TwoWays;
(function (TwoWays) {
    "use strict";

    var dataBindingListInternal = [];
    var bindingL;
    var dataBindingList;

    var groups = [
        { id: 1, title: 'Group 1' },
        { id: 2, title: 'Group 2' },
        { id: 3, title: 'Group 3' }
    ];

    WinJS.UI.processAll().done(function () {
        for (var i = 0; i < 100; i++) {
            dataBindingListInternal.push({
                title: 'Item ' + i.toString(),
                image: (((i % 2) == 0) ? '/images/Banana.png' : '/images/Mint.png'),
                backColor: 'rgba(255,0,0,0.5)',
                group: { id: (((i % 2) == 0) ? 1 : 2), subGroup: { id: 1 } }
            });
        }

        bindingL = new WinJS.Binding.List(dataBindingListInternal);

        var listViewControl = PopulateListView();

        listViewControl.layout = new WinJS.UI.GridLayout({
            groupHeaderPosition: "top",
            groupInfo: {
                enableCellSpanning: true,
                cellWidth: 130,
                cellHeight: 130
            }
        });

        listViewControl.itemTemplate = function (itemPromise) {
            return itemPromise.then(function (item) {
                var itemTemplate = getTemplateForItem(item);
                var container = document.createElement("div");
                itemTemplate.winControl.render(item.data, container).done();
                return container;
            });
        };

        listViewControl.oniteminvoked = WinJS.Utilities.markSupportedForProcessing((function (ev) {
            var index = ev.detail.itemIndex;
            var item = dataBindingList.getAt(index);

            // ...
            var bindingItem = WinJS.Binding.as(item);

            WinJS.Binding.processAll(document.getElementById('itemGlanceview'), bindingItem).done(function () {
                PanelPage.Modal.show("/pages/lvw_dummy/lvw_dummy.html", bindingItem, TwoWays.RefreshAll);
            });
        }).bind(this));
    });

    function GroupKey(item) {
        var group = groups.filter(function (element, index, array) {
            return (element.id == item.group.id);
        })[0];
        if (group == undefined) {
            groups.push({ id: item.group.id, title: 'Group ' + item.group.id });
            group = groups.filter(function (element, index, array) {
                return (element.id == item.group.id);
            })[0];
        }
        return group.title;
    }
    ;

    function GroupData(item) {
        var group = groups.filter(function (element, index, array) {
            return (element.id == item.group.id);
        })[0];
        return { title: group.title };
    }
    ;

    function GroupSorter(leftKey, rightKey) {
        var r = 0;
        if (leftKey < rightKey) {
            r = -1;
        } else if (leftKey == rightKey) {
            r = 0;
        } else {
            r = 1;
        }
        return r;
    }
    ;

    function getTemplateForItem(item) {
        var itemData = item.data;

        if (itemData.isFeatured)
            return document.querySelector('#dataTemplateFeatured');

        return document.querySelector('#dataTemplate');
    }

    function PopulateListView() {
        var listView = document.getElementById("demolistview");
        if (listView === null || listView.winControl === undefined)
            return;
        var listViewControl = listView.winControl;

        dataBindingList = bindingL.createGrouped(GroupKey, GroupData, GroupSorter);

        listViewControl.itemDataSource = dataBindingList.dataSource;
        listViewControl.groupDataSource = dataBindingList.groups.dataSource;

        listViewControl.groupHeaderTemplate = document.querySelector("#groupTemplate");

        listViewControl.forceLayout();
        WinJS.UI.process(listViewControl.element);

        return listViewControl;
    }

    function RefreshAll() {
        WinJS.UI.processAll().done(function () {
            PopulateListView();
            WinJS.Binding.processAll(document.getElementById("demolistview"), dataBindingList).done();
        });
    }
    TwoWays.RefreshAll = RefreshAll;
})(TwoWays || (TwoWays = {}));

var TestObject = (function () {
    function TestObject(t, i, b, g) {
        this.title = t;
        this.image = i;
        this.group = g;
        this.backColor = b;
    }
    return TestObject;
})();

var TestGroup = (function () {
    function TestGroup(i, sg) {
        this.id = i;
        this.subGroup = sg;
    }
    return TestGroup;
})();

var TestSubGroup = (function () {
    function TestSubGroup(i) {
        this.id = i;
    }
    return TestSubGroup;
})();
//# sourceMappingURL=listview.js.map
