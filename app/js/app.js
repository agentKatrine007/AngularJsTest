var myApp = angular.module('myApp', ['ngRoute']);

myApp.run(function($rootScope) {
    $rootScope.users =[{
            name: 'Вася Пупкин',
            position: "Директор",
            photo: "http://www.grandars.ru/images/1/review/id/3212/bf3b3936d3.jpg",
            key_skills: "руководство"
        },
        {
            name: 'Иван Иваныч',
            position: "Программист JavaScript",
            photo: "http://www.jewage.org/w/images/thumb/b/b2/I1704422576.png/570px-I1704422576.png?20101003112716",
            key_skills: "javascript"
        }];

    $rootScope.currentUser = null;
});

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: "pages/list_employees.html",
            controller: 'ListEmployeesController'
        })
        .when('/new', {
            templateUrl: "pages/new_employee.html",
            controller: 'NewEmployeeController'
        })

        .when('/details', {
            templateUrl: "pages/employee_details.html",
            controller: 'EmployeeDetailsController'
        })
        .otherwise({redirectTo: '/list'})
});

myApp.controller('ListEmployeesController', function ($scope, $rootScope, $location) {

    console.log("ListEmployeesController");
    $scope.users = $rootScope.users;
    $scope.users.doClick = function(user) {
        $rootScope.currentUser = user;
        $location.path('/details');
        $scope.$apply();
    };
    $rootScope.currentUser = null;
});

myApp.controller('NewEmployeeController', function ($scope,  $rootScope, $location) {

    console.log("NewEmployeeController");
    $scope.send = function (user) {

        if(user != null && !angular.isUndefined(user.name)
                    && !angular.isUndefined(user.name)
                    && !angular.isUndefined(user.position)
                    && !angular.isUndefined(user.photo)
                    && !angular.isUndefined(user.key_skills)) {
            $rootScope.users.push(user);
            $location.path('/list');
            $scope.$apply();
        } else {
            $scope.error = "Заполните все поля";
        }
    };

    $scope.cancel = function (user) {
        $location.path('/list');
        $scope.$apply();
    };
    $rootScope.currentUser = null;
});

myApp.controller('EmployeeDetailsController', function ($scope, $rootScope, $location) {

    console.log("EmployeeDetailsController");
    $scope.user = $rootScope.currentUser;

    if($scope.user == null) {
        $location.path('/list');
        $scope.$apply();
    }
});
