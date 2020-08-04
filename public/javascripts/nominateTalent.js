angular.module('NominateViewApp', []).controller('NominateViewCntrl', function ($scope, $http) {
    console.log("NominateViewApp")
    var label_motivational_factor = 'Motivational Factor'
    var label_deliverables = 'Deliverables'
    var label_quick_facts = 'Quick Facts'
    $scope.checkUserMsg = '';
    var enteredalias = ''
    var isEmptyAlias = ''

    $scope.init = function (data) {
        try {
            userData = JSON.parse(data);
            $scope.User = userData.user;
            console.log($scope.User);
        } catch (err) {
            console.log(err);
            $scope.User = undefined;

        }
    }

    // Check TALENT  Exist
    $scope.getdetails = function (data) {
        $scope.uname=data;
        if ($scope.uname.length > 0 && $scope.uname.length != 0) {
            $http({
                method: 'POST',
                url: 'api/getTalentinfo',
                data: {
                    p_mode: 'get_talent_details'
                }
            }).then(function (data) {
                if (data.data) {
                    console.log(data.data._sittm_nominate_talent);
                    userList = data.data._sittm_nominate_talent
                  console.log("userList", userList)
                   
                    var i = 0
                    var checkAlias = 'false';
                    for (i = 0; i < userList.length; i++) {
                        enteredalias = escape($scope.uname).toUpperCase()
                        console.log('Coverted dalias..', enteredalias)
                        if (enteredalias.length == 0)
                            console.log("userList[i].email", userList[i].email)
                        // To check alias already exit
                        if (userList[i].email.trim() == enteredalias.trim() && userList[i].email.trim() === enteredalias.trim()) {
                            checkAlias = 'true'
                            $scope.mobility = userList[i].is_the_person_mobile_status;
                            $scope.travel_tolerance = userList[i].tolarance_to_travel_status;
                            $scope.project = userList[i].user_project_name;
                            var tag_name = userList[i].tag_name;
                            console.log('userList[i].description', userList[i].description)
                            if (tag_name) {
                                if (tag_name.includes('motiva') || tag_name.includes('Motivat')) {
                                    $scope.motivator = userList[i].description;
                                } else {
                                    $scope.motivator = ''
                                }
                            }
                            if (tag_name) {
                                if (tag_name.includes('deliver') || tag_name.includes('Deliverables')) {
                                    $scope.delivberables = userList[i].description;
                                } else {
                                    $scope.delivberables = ''
                                }
                            }
                            if (tag_name) {
                                if (tag_name.includes('Quick') || tag_name.includes('quick')) {
                                    $scope.facts = userList[i].description;
                                } else {
                                    $scope.facts = ''
                                }
                            }
                            // $scope.training_opportunities=userList[i].training_cert;
                            $scope.interest = userList[i].area_of_interest;
                            
                        }
                    }
                    if (checkAlias == 'true') {
                        $scope.checkUserMsg = "Alias already exist"
                    } else {
                        $scope.checkUserMsg = ''
                    }

                }
            },
                function (err) {
                    $scope.showModal('error', 'Something went wrong. Please try again.')
                })
        } else {
            $scope.checkUserMsg = '';
        }


    }
    $scope.nominateTalent = function (data) {
        $scope.checkUserMsg = '';
        $scope.uname = '';
        $scope.mobility = '';
        $scope.project = '';
        $scope.motivator = '';
        $scope.interest = ''
        $scope.facts = ''
        $scope.delivberables = '';
        var nominatetalent = data;
        console.log(nominatetalent);
        $http({
            method: 'POST',
            url: 'api/nominateTalent',
            data: {
                nominate: nominatetalent
            }
        }).then(function (data) {
            if (data.data) {
                console.log('data', data.data.rows[0]._sittm_nominate_talent)
                console.log('data', data.data.rows[1]._sittm_nominate_talent)
                $scope.training_opportunities = data.data.rows[0]._sittm_nominate_talent
                $scope.manager = data.data.rows[1]._sittm_nominate_talent

            }
        },
            function (err) {
                $scope.showModal('error', 'Something went wrong. Please try again.')
            })
    }

    $scope.submitTalent = function (data,training_selected,manager_selected) {
        $scope.training_selected=training_selected
        $scope.manager_selected=manager_selected
        console.log(' $scope.checkUserMs', $scope.checkUserMsg)
        console.log(' $scope.enteredalias', enteredalias)
        console.log(' training_selected',$scope.training_selected)
        console.log(' manager_selected',$scope.manager_selected)
        isEmptyAlias = $scope.uname

        if (enteredalias.length == 0) {
            isEmptyAlias = 'Alias cannot be empty'
            $scope.showModal('information', isEmptyAlias)
            console.log(isEmptyAlias)
        } else {
            if ($scope.checkUserMsg == '') {
                console.log(' savetalent');
                // $scope.saveTalent = {};
                var p_mode = data;
                console.log("p_mode", p_mode)
                var alias = enteredalias;
                var mobility = $scope.mobility;
                var travel_tolerance = $scope.travel_tolerance;
                var project = $scope.project;
                var motivator = $scope.motivator;
                var training_opportunities =$scope.training_selected;
                var area_of_interest = $scope.interest;
                var facts = $scope.facts;
                var delivberables = $scope.delivberables;
                var label_facts = $scope.label_facts;
                var manager =  $scope.manager_selected;
                console.log('label_motivational_factor', label_motivational_factor)
                console.log('label_deliverables', label_deliverables)
                console.log('label_quick_facts', label_quick_facts)
                console.log('manager', $scope.manager)
                $http({
                    method: 'POST',
                    url: 'api/saveTalent',
                    data: {
                        p_mode: p_mode,
                        alias: alias,
                        mobility: mobility,
                        travel_tolerance: travel_tolerance,
                        project: project,
                        motivator: motivator,
                        training_opportunities: training_opportunities.trim(),
                        area_of_interest: area_of_interest,
                        facts: facts,
                        delivberables: delivberables,
                        label_motivational_factor: label_motivational_factor,
                        label_deliverables: label_deliverables,
                        label_quick_facts: label_quick_facts,
                        manager: manager.trim(),

                    }
                }).then(function (data) {
                    $scope.showModal('success', 'Talent Added Successfully.')
                    // if (data.data) {
                    //     // console.log(data);
                    //     //    $scope.training_opportunities = data.data._sittm_nominate_talent
                    //     // console.log(' trainng_opportunities---', $scope.training_opportunities)
                    // }
                },
                    function (err) {
                        // alert('Somenthing went wrong')
                        $scope.showModal('error', 'Something went wrong. Please try again.')
                    })

            } else {
                // alert('Talent already exist')
                $scope.showModal('information', 'Talent already exist')
                console.log('Alias cannot register ')
            }
        }

    }

    // ------ Alert message method ------//
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

