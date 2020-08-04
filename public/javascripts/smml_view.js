angular.module('smmlApp', []).controller('smmlController', function ($scope, $http) {

    $scope.deleteTalentFunc = function (talent) {
        if (talent) {
            console.log(talent);
            $scope.deleteTalent = talent;
        } else {
            $scope.deleteTalent = null;
        }
    }

    $scope.confirmDeleteTalent = function (talent) {
        if (talent) {
            $http({
                "method": "POST",
                "url": "api/smmlDeleteTalent",
                "data": talent
            }).then(function (response) {
                console.log(response);
                $scope.talentList = response.data || [];
            }, function (err) {
                $scope.showModal('error', 'Something went wrong.')
            })
        } else {
            $scope.showModal('error', 'Something went wrong.')
        }
    }


    $scope.init = function (data) {

        var parseData = JSON.parse(data);
        console.log(parseData);

        if (parseData.err) {
            $scope.showModal('error', parseData.msg);
        }

        $scope.UserInfo = parseData.user;

        if (parseData.user) {
            $http({
                "method": "POST",
                "url": "api/smmlManagerViewsDetails",
                "data": {
                    "mail_id": $scope.UserInfo.email,
                }
            }).then(function (response) {
                console.log(response);
                $scope.managerInfoList = response.data || [];
                console.log($scope.managerInfoList);

                $scope.selectedManager = $scope.managerInfoList[0] || {};
                if ($scope.managerInfoList.length != 0)
                    $scope.getManagerInfo($scope.selectedManager);

            }, function (err) {
                $scope.showModal('error', 'Something went wrong.')
            })
        } else {
            $scope.showModal('error', 'Something went wrong.')
        }


    }

    $scope.getManagerInfo = function (manager) {
        $scope.selectedManager = manager;
        $scope.managerDetails = {};
        $scope.talentList = [];

        if (manager.email && manager.personnel_nbr) {
            $http({
                "method": "POST",
                "url": "api/managerViewsDetails",
                "data": {
                    "manager": manager.email,
                    "id": manager.personnel_nbr,
                    "mode": "get_manager_info"
                }
            }).then(function (response) {
                console.log(response);
                $scope.managerDetails = (response.data && response.data.manager[0]) || {};
                $scope.talentList = (response.data && response.data.talent) || [];
            }, function (err) {
                $scope.showModal('error', 'Something went wrong.')
            })
        } else {
            $scope.showModal('error', 'Something went wrong.')
        }
    }

    $scope.hrefDirectFunct = function (data) {
        if (data)
            return encodeURIComponent(JSON.stringify(data));
    }


    $scope.escalateModelFunct = function (talent) {
        $scope.escalateModel = {};
        if (talent) {
            console.log(talent);
            $scope.escalateModel = {
                'name': talent.full_name,
                'email': talent.email,
                'title': talent.standard_title,
                'p_id': talent.personnel_nbr,
                'comment': talent.comment,
                'manager': talent.manager,
                'create_at': talent.create_at,
                'email_id': $scope.UserInfo.email
            }
        }
    }

    $scope.escalateTalentFunct = function (talent, mode) {
        if (talent) {
            talent.mode = mode;
            console.log(talent);
            $http({
                method: 'POST',
                url: 'api/escalateTalent',
                data: talent
            }).then(function (data) {
                    if (data.data) {
                        console.log(data);
                        $scope.talentList = data.data
                    }
                },
                function (err) {
                    // alert('Somenthing went wrong')
                    $scope.showModal('error', 'Something went wrong. Please try again.')
                })
        }
    }

    $scope.showModal = function (alertType, message1) {
        $scope.primary_alert_msg = message1;

        if (alertType.toLowerCase() == 'error') {
            angular.element("#errorModal").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });

        } else if (alertType.toLowerCase() == 'information') {
            angular.element("#infoModal").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        } else if (alertType.toLowerCase() == 'confirm') {
            angular.element("#confirmModal").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        } else if (alertType.toLowerCase() == 'success') {
            angular.element("#successModal").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
            // $scope.$apply()
        } else if (alertType.toLowerCase() == 'warning') {
            angular.element("#warningModal").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        }

    }

});