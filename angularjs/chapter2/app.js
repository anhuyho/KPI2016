var todoApp = angular.module("todoApp", []);
todoApp.run(function($rootScope, $http){
    $http.get('todo.json').success(function (data) {
        $rootScope.items = data;
    });
})
todoApp.controller("ToDoCtrl", function($scope, $rootScope) {
    // $scope.todo = {
    //             user: "Adam",
    //             items: [{
    //                 action: "Buy Flowers",
    //                 done: false
    //             }, {
    //                 action: "Get Shoes",
    //                 done: false
    //             }, {
    //                 action: "Collect Tickets",
    //                 done: true
    //             }, {
    //                 action: "Call Joe",
    //                 done: false
    //             }]
    //         };;
    $scope.todo = {
                 user: "Adam",
    };
    $scope.todo.items = $rootScope.items;
    $scope.incompleteCount = function() {
        var count = 0;
        angular.forEach($scope.todo.items, function(item) {
            if (!item.done) {
                count++;
            }
        });
        return count;
    }
    $scope.warningLevel = function() {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    }
    $scope.addNewItem = function(actionText) {
        $scope.todo.items.push({
            action: actionText,
            done: false
        });
    }
});
todoApp.filter("checkedItems", function () {
    return function (items, showComplete) {
            var resultArr = [];
            angular.forEach(items, function (item) {
            if (item.done == false || showComplete == true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});
