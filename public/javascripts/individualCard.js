var app = angular.module('individualApp', []);

app.controller('individualCntrl', function ($scope, $http, $window) {
    console.log('individualCard');

    $scope.new_activity = "";
    $scope.inprocess_activity = "";
    $scope.blocker_activity = "";
    $scope.success_activity = "";

    $scope.talentDocuments = [];
    $scope.activities = ''
    $scope.fileExtention = {
        ".pdf": "images/fileicon/pdf_icon.svg",
        ".html": "images/fileicon/html_icon.svg",
        ".avi": "images/fileicon/avi_icon.svg",
        ".doc": "images/fileicon/doc_icon.svg",
        ".docx": "images/fileicon/doc_icon.svg",
        ".exe": "images/fileicon/exe_icon.svg",
        ".mp3": "images/fileicon/mp3_icon.svg",
        ".mp4": "images/fileicon/mp4_icon.svg",
        ".txt": "images/fileicon/txt_icon.svg",
        ".xls": "images/fileicon/xls_icon.svg",
        ".xlsx": "images/fileicon/xls_icon.svg"

    }

    $scope.userInit = function (user) {
        var tempVar = JSON.parse(user);
        $scope.UserInfo = tempVar;
    }

    $scope.init = function (data) {
        try {
            $scope.talentInfo = JSON.parse(data);
            console.log($scope.talentInfo);
            $scope.talentDetails = [];
            $scope.projectDetails = [];

            $http({
                method: 'POST',
                url: 'api/individualTalentDetails',
                data: $scope.talentInfo
            }).then(function (data) {
                if (data.data.length != 0) {
                    console.log(data);
                    console.log('data.data.activity', data.data.activities)
                    $scope.activities = data.data.activities;
                    $scope.talentDetails = data.data.talent[0];
                    $scope.projectDetails = data.data.project || [];
                    $scope.foundationInfo = (data.data.foundation && data.data.foundation[0]) || {
                        "is_mobile_status": null,
                        "is_mobile_description": null,
                        "tolarance_description": null,
                        "tolarance_status": null,
                        "rotation_status": null,
                        "rotation_description": null,
                        "intent_to_stay_status": null,
                        "current_state_status": null,
                        "previous_awards": null,
                        "aspiring_to_awards": null,
                        "manager_note": null,
                        "talent_id": $scope.talentDetails.talent_id,
                        "stay_or_move_status": null,
                        "email": $scope.talentDetails.email
                    };
                    $scope.foundationAwards = data.data.awards || [];
                    $scope.primary_area = data.data.primary_area || [];
                    $scope.tech_skills = data.data.tech_skills || [];
                    $scope.non_tech_skills = data.data.non_tech_skills || [];
                    $scope.ms_certificate = data.data.ms_certificate || [];
                    $scope.certificate3rd = data.data.certificate3rd || [];
                    $scope.user_certificate = (data.data.user_certificate && data.data.user_certificate[0]) || {
                        "certificate3rd": null,
                        "created_at": null,
                        "email": $scope.talentDetails.email,
                        "industry_certificate": null,
                        "ms_certificate": null,
                        "non_tech_skills": null,
                        "primary_tech": null,
                        "talent_id": $scope.talentDetails.talent_id,
                        "tech_skills": null
                    };
                    $scope.development = (data.data.development && data.data.development[0]) || {
                        "key_actions_priorities": null,
                        "lessons_learned_last_quarter": null,
                        "lessons_learned_next_quarter": null,
                        "description": null,
                        "common_internal_motivators": null,
                        "common_external_motivators": null,
                        "motivator_notes": null,
                        "top_soft_skillS_assign_for_development": null,
                        "top_soft_skillS_assign_for_development_note": null,
                        "common_external_internal_motivators_notes": null,
                        "talent_is_on_rotation": null,
                        "note_for_rotation_detail_status": null,
                        "note_for_rotation_plan": null,
                        "talent_is_on_which_success_plan": null,
                        "current_program_attendence_status": null,
                        "consider_future_program_attendence_status": null,
                        "talent_id": $scope.talentDetails.talent_id,
                        "past_program_attendence": null,
                        "training_opportunities": null,
                        "who_is_on_the_succession_on_the_plan": null,
                        "email": $scope.talentDetails.email,
                        "month3": null,
                        "month6": null,
                        "month9": null,
                        "talent_needs_rotaion": null,
                    };
                    $scope.common_tags = data.data.common_tags || [];
                    $scope.past_prog_att = data.data.past_prog_att || [];
                    $scope.current_prog_att = data.data.current_prog_att || [];
                    $scope.future_prog_att = data.data.future_prog_att || [];
                    $scope.bootcamps = data.data.bootcamps || [];
                    $scope.soft_skills = data.data.soft_skills || [];
                    $scope.external_skills = data.data.external_skills || [];
                    $scope.internal_skills = data.data.internal_skills || [];
                    $scope.training_cert = data.data.training_cert || [];
                    $scope.talentDocuments = data.data.talentDocuments || [];
                    $scope.tagGroup = ($scope.common_tags && $scope.common_tags[0] && $scope.common_tags[0].tags) || null;

                    $scope.tagCalloutFunct($scope.tagGroup, null);

                    $scope.dataMotivator($scope.tagGroup);
                }
            }, function (err) {
                alert('somethong went wrong.')
            })
        } catch (error) {
            $scope.talentInfo = null;
        }

    }

    // devlopment plan

    $scope.save_plane = function (mode) {
        console.log(" save_plane ===>>", mode)
        var talentDetails = $scope.talentDetails;
        var talentInfo = $scope.talentInfo;

        console.log(" development -->>", $scope.development);
        $http({
            method: 'POST',
            url: 'api/savePlane',
            data: { mode: mode, data: talentDetails, talentInfo: talentInfo }
        }).then(function (data) {
            if (data.data.length != 0) {
                console.log(data.data);
                $scope.planedata = data.data || []
                var planeData = data.data || [];

                var data = ['Q1']
                q1result = planeData.filter(i => data.includes(i.scheduled_on))
                $scope.Q1DATA = q1result

                var data2 = ['Q2']
                q2data = planeData.filter(i => data2.includes(i.scheduled_on))
                $scope.Q2DATA = q2data

                var data3 = ['Q3']
                q3data = planeData.filter(i => data3.includes(i.scheduled_on))
                $scope.Q3DATA = q3data

                var data4 = ['Q4']
                q4data = planeData.filter(i => data4.includes(i.scheduled_on))
                $scope.Q4DATA = q4data


                var data5 = ['Immediate Activity']
                immediatedata = planeData.filter(i => data5.includes(i.scheduled_on))
                $scope.Q5DATA = immediatedata


                console.log(" q1data ==>", q1result);
                console.log(" q2data ==>", q2data);
                console.log(" q3data ==>", q3data);
                console.log(" q4data ==>", q4data);
                console.log(" immediatedata ==>", immediatedata);
            }
        }, function (err) {
            alert('somethong went wrong.')
        })

    }

    $scope.update_devlopmentplan = function () {

        console.log(" Q1DATA ==>>", $scope.Q1DATA);
        console.log(" q1plan ->>", $scope.Q2DATA);
        console.log(" q2plan ->>", $scope.Q3DATA);
        console.log(" q3plan ->>", $scope.Q4DATA);
        console.log(" q4plan ->>", $scope.Q5DATA);

        console.log("development ==>>", $scope.development)

        $http({
            method: 'POST',
            url: 'api/UpdateDevlopementData',
            data: { Q1DATA: $scope.Q1DATA, Q2DATA: $scope.Q2DATA, Q3DATA: $scope.Q3DATA, Q4DATA: $scope.Q4DATA, Q5DATA: $scope.Q5DATA }
        }).then(function (data) {
            // if (data.data.length != 0) {
            //     console.log(data);
            // }
        }, function (err) {
            alert('somethong went wrong.')
        })


    }
    // devlopment plan end 

    $scope.editCancelFunct = function (method, mode) {
        if (mode == 'initialise') {
            if (method == 'foundation')
                foundationInfo_prev = angular.copy($scope.foundationInfo);
            else if (method == 'certificate')
                user_certificate_prev = angular.copy($scope.user_certificate);
            else if (method == 'development')
                development_prev = angular.copy($scope.development);
        } else if (mode == 'cancel') {
            if (method == 'foundation')
                $scope.foundationInfo = foundationInfo_prev
            else if (method == 'foundation')
                $scope.user_certificate = user_certificate_prev
            else if (method == 'development')
                $scope.development = development_prev
        }
    }

    $scope.talentProjectFunct = function (project, talent, mode, proj_id) {
        if (talent && project) {
            talent.project = project;
            talent.mode = mode;
            talent.proj_id = proj_id;
            console.log('project');
            console.log(talent);
            $scope.projectDetails = []
            $http({
                method: 'POST',
                url: 'api/insertProjectDetails',
                data: talent
            }).then(function (data) {
                if (data.data.length != 0) {
                    console.log(data);
                    $scope.projectDetails = data.data || [];
                }
            }, function (err) {
                alert('somethong went wrong.')
            })
        }
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
            var talentData = {};
            talent.mode = mode;
            console.log(talent);
            $http({
                method: 'POST',
                url: 'api/escalateTalent',
                data: talent
            }).then(function (data) {
                if (data.data) {
                    console.log(data);
                    talentData = data.data[0]
                    // var currentTalent = talentList.find(ele => ele.email == $scope.talentDetails.email)
                    $scope.talentDetails.status = talentData.status;
                    $scope.talentDetails.comment = talentData.comment;
                    $scope.talentDetails.create_at = talentData.create_at;
                }
            },
                function (err) {
                    alert('Somenthing went wrong')
                })
        }
    }

    $scope.submitIndividualDetails = function (info, mode) {

        if (mode == 'foundation') {
            if (info) {

                console.log(JSON.stringify(info))

                $http({
                    method: 'POST',
                    url: 'api/foundationInfoUpdate',
                    data: info
                }).then(function (data) {
                    if (data) {
                        console.log(data);
                        $scope.foundationInfo = data.data[0];
                    }
                    // $scope.$apply();
                }, function (err) {
                    $scope.showModal('error', 'Server is busy please. Please try after some time.')
                })

            }
        } else if (mode == 'certificate') {
            if (info) {
                $http({
                    method: 'POST',
                    url: 'api/certificateInfoUpdate',
                    data: info
                }).then(function (data) {
                    if (data) {
                        console.log(data);
                        $scope.user_certificate = data.data[0];
                    }
                    // $scope.$apply();
                }, function (err) {
                    $scope.showModal('error', 'Server is busy please. Please try after some time.')
                })
            }
        } else if (mode == 'development') {
            if (info) {
                $http({
                    method: 'POST',
                    url: 'api/developmentInfoUpdate',
                    data: info
                }).then(function (data) {
                    if (data) {
                        console.log(data);
                        $scope.development = data.data[0];
                    }
                    // $scope.$apply();
                }, function (err) {
                    $scope.showModal('error', 'Server is busy please. Please try after some time.')
                })
            }
        }
    }

    $scope.save_tags = function (tag, mode, description, tag_id) {
        if (tag && mode) {
            $http({
                method: 'POST',
                url: 'api/saveCommonTag',
                data: {
                    tag: tag,
                    mode: mode,
                    description: description,
                    tag_id: tag_id,
                    email: $scope.talentDetails.email
                }
            }).then(function (data) {
                if (data) {
                    console.log(data);
                    if (mode == 'save_tag' || mode == 'remove_tag') {
                        $scope.common_tags = data.data;
                        $scope.tagGroup = ($scope.common_tags && $scope.common_tags[0] && $scope.common_tags[0].tags) || null;
                        $scope.dataMotivator($scope.tagGroup);
                        $scope.tagCalloutFunct($scope.tagGroup, null);
                    }
                    else if (mode == 'tag_description' || mode == 'remove_description')
                        $scope.group_tags = data.data;
                    // tagCalloutFunct($scope.tagGroup, null)

                }
            }, function (err) {
                console.log('user save tag error')
            })
        }
    }

    $scope.tagCalloutFunct = function (tag, ele) {
        $scope.group_tags = [];
        $scope.tagGroup = tag;
        if ($scope.tagGroup) {
            $scope.showGroupTag = true;

            $http({
                method: 'POST',
                url: 'api/callGroupTag',
                data: {
                    tag: tag,
                    email: $scope.talentDetails.email
                }
            }).then(function (data) {
                if (data) {
                    console.log(" SSS ", data);
                    $scope.group_tags = data.data || [];
                } else {
                    $scope.group_tags = [];
                }
            }, function (err) {
                console.log('user save tag error')
            })
        } else {
            $scope.showGroupTag = false;
            $scope.group_tags = [];
        }
    }

    // upload file //
    $scope.getFileDetails = function (tagId) {


        var filedata = document.getElementById('fileid')
        var fileinfo = filedata.files[0]
        console.log(fileinfo)

        if (fileinfo) {
            var fileJson = {
                name: fileinfo.name,
                extension: '.' + fileinfo.name.split('.').pop(),
                size: fileinfo.size,
                loading: true
            }

            var fd = new FormData();
            fd.append('file', fileinfo);
            fd.append('userdata', JSON.stringify($scope.talentInfo))

            if (fileinfo.size < (1024 * 1024 * 1024)) {
                $scope.talentDocuments.push(fileJson);
                $http({
                    method: 'POST',
                    url: 'api/uploadfile',
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity,
                    data: fd
                }).then(function (response) {
                    console.log(response)
                    var fileStatus = response.data;
                    // console.log(fileStatus)
                    if (!fileStatus.error)
                        $scope.talentDocuments = fileStatus.data || []
                    else {
                        $scope.showModal('error', fileStatus.msg);
                    }

                }, function (err) {
                    $scope.showModal('error', 'Server is busy please. Please try after some time.')
                    $scope.talentDocuments.pop()
                })
            } else {
                $scope.showModal('information', 'File should be less than 1GB.')
            }
            document.getElementById(tagId).innerHTML = document.getElementById(tagId).innerHTML;
        }
    };
    // upload file end 

    $scope.deleteDocumentFunc = function (data, mode) {
        $scope.deleteDocument = null;
        console.log(data)
        if (data) {
            $scope.deleteDocument = data;
            $scope.showModal('confirm', `Are you sure you want to delete '${data.name}'?`);
        }
    }

    $scope.documentFucniton = function (data, mode) {
        var tempData = data;
        tempData.mode = mode;

        // $window.open(`api/documentDownlaod?newfilename=${tempData.newfilename}&mode=${mode}&email=${tempData.email}&id=${tempData.id}&talent_id=${tempData.talent_id}`)

        $http({
            method: 'POST',
            url: `api/documentDownlaod`,
            // url: `api/documentDownlaod?newfilename=${tempData.newfilename}&mode=${mode}&email=${tempData.email}&id=${tempData.id}&talent_id=${tempData.talent_id}`,
            data: tempData
        }).then(function (response) {
            console.log(response)
            if (mode != 'download') {
                $scope.talentDocuments = response.data || [];
            } else {
                $window.open('api/downloadDocument?path=' + response.data)
            }
        }, function (err) {
            console.log(err)
        })
    }


    //Activity
    $scope.saveActivity = function (mode) {
        var p_mode = mode;
        var email = $scope.talentDetails.email;
        var activity_name = $scope.activity;
        var scheduled_on = $scope.schedulded_on;
        var created_by = $scope.talentDetails.manager;
        var manager_email = $scope.talentDetails.manager_email;
        var standard_title = $scope.talentDetails.standard_title;
        console.log('standard_title', standard_title)
        console.log('scheduled_on', scheduled_on)
        // console.log('manager_email',manager_email)
        // console.log('created_by',created_by)
        console.log(p_mode, activity_name, scheduled_on, email, created_by, manager_email, standard_title)
        $http({
            method: 'POST',
            url: 'api/addActivity',
            data: {
                p_mode: p_mode,
                activity_name: activity_name,
                scheduled_on: scheduled_on,
                email: email,
                created_by: created_by,
                manager_email: manager_email,
                standard_title: standard_title
            }
        }).then(function (data) {
            if (data) {
                console.log(data);

                listActivityStatus()
            }
        }, function (err) {
            console.log('user save tag error')
        })


    }

    $scope.submitfun = function (status, index) {
        // debugger;           

        var curr_status = angular.element(this);

        curr_status.removeClass("status_new");
        curr_status.removeClass("status_inprocess");
        curr_status.removeClass("status_blocker");
        curr_status.removeClass("status_success");

        if (status == "New") {
            curr_status.addClass("status_new");
        }
        else if (status == "InProcess") {
            curr_status.addClass("status_inprocess");
        }
        else if (status == "Blocker") {
            curr_status.addClass("status_blocker");
        }
        else {
            curr_status.addClass("status_success");
        }


        // alert('status' +status)
        console.log('status', status)
        // alert('index' +$scope.activities[index].name)
        console.log('activity', $scope.activities[index].name)
        var activity_status = status;
        var activity_name = $scope.activities[index].name;
        updateActivityStatus(activity_status, activity_name)
    }


    function updateActivityStatus(activity_status, activity_name) {

        var email = $scope.talentDetails.email;
        console.log('activity_name', activity_name)
        $http({
            method: 'POST',
            url: 'api/updateActivityStatus',
            data: {
                name: activity_name,
                status: activity_status,
                email: email
            }
        }).then(function (data) {
            if (data) {
                console.log(data);
            }
        }, function (err) {
            console.log('user save tag error')
        })
    }
    function listActivityStatus() {
        var email = $scope.talentDetails.email;
        console.log('email', email)
        $http({
            method: 'POST',
            url: 'api/listActivityStatus',
            data: {
                email: email
            }
        }).then(function (data) {
            if (data) {
                console.log('data', data.data[0]._sittm_save_activities);
                console.log('data.data.activitylist----', data[0])
                // console.log('data.data.activitylist----', data[0]._sittm_save_activities[5].activity_name)
                $scope.activities = data.data[0]._sittm_save_activities || [];
            }
        }, function (err) {
            console.log('user save tag error')
        })
    }


    // drop down//
    $scope.dataMotivator = function (data) {
        console.log(" dataMotivator ==>>", data);
        var tag = data
        if (tag == 'Motivators') {
            console.log(" in if condition");

            var tagname = tag;
            $http({
                method: 'POST',
                url: 'api/data_Motivator',
                data: { tag: tagname }
            }).then(function (data) {
                if (data.data.length != 0) {
                    console.log("## ", data);
                    $scope.tagsdescriptionDATA = data.data || [];
                }
            }, function (err) {
                console.log(" err ", err);
            })
        } else if (tag == 'Skill') {
            var tagname = tag;
            $http({
                method: 'POST',
                url: 'api/data_Motivator',
                data: { tag: tagname }
            }).then(function (data) {
                if (data.data.length != 0) {
                    console.log("## ", data);
                    $scope.tagsdescriptionDATA = data.data || [];
                }
            }, function (err) {
                // alert('somethong went wrong.')
                console.log(" err ", err);

            })

        } else {
            console.log(" else block");
            $scope.tagsdescriptionDATA = []
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