'use strict';
var express = require('express');
var router = express.Router();
// var sleep = require('sleep');
var config = require('../config');
const {
    json
} = require('body-parser');
const e = require('express');



router.get('/', function (req, res, next) {
    var tempUser = {
        displayName: null,
        email: null
    };
    
    if (req.user) {
        tempUser = {
            displayName: req.user.profile.displayName,
            email: req.user.profile.email,
        }

        // config.postgresQueryExecute(`select exists(select 1 
        //     from manager_info 
        //     where report_to_level_3_emailid = '${tempUser.email}')`, (res) => {

        //     console.log('cleck email validation');
        //     console.log(res);

        //     if (res.rows[0].exists) {
        //         res.render('index', {
        //             data: {
        //                 user: tempUser
        //             }
        //         });
        //     } else
        //         res.redirect('/auth/signout');

        // }, (err) => {
        //     res.redirect('/auth/signout');
        // })

        res.render('index', {
            data: {
                user: tempUser
            }
        });

    } else{
        res.render('index', {
            data: {
                user: tempUser
            }
        });
    }

});

router.get('/home', function (req, res, next) {

    var tempUser = {
        displayName: null,
        email: null
    };
    if (req.user) {
        tempUser = {
            displayName: req.user.profile.displayName,
            email: req.user.profile.email,
        }
    }
    res.render('home', {
        data: {
            user: tempUser
        }
    });
});

router.get('/individual-card-manager', function (req, res, next) {

    if (!req.isAuthenticated()) {
        // if (!true) {
        res.redirect('/')
    } else {
        var tempUser = {
            displayName: null,
            email: null
        };
        if (req.user) {
            tempUser = {
                displayName: req.user.profile.displayName,
                email: req.user.profile.email,
            }
        }

        res.render('smml', {
            data: JSON.stringify({
                err: false,
                msg: '',
                data: [],
                user: tempUser
            })
        });

        // var queryStr = `select full_name as name, email, standard_title, id as manager_id, personnel_nbr
        // from manager_info where report_to_level_3_emailid = '${tempUser.email}'`
        // config.postgresQueryExecute(queryStr, (response) => {
        //     res.render('smml', {
        //         data: JSON.stringify({
        //             err: false,
        //             msg: '',
        //             data: response.rows || [],
        //             user : tempUser
        //         })
        //     });
        // }, (err) => {
        //     console.log(err);
        //     res.render('smml', {
        //         data: JSON.stringify({
        //             err: true,
        //             msg: 'Something went wrong. Please try again.',
        //             data: [],
        //             user : tempUser || {}
        //         })
        //     });
        // })
    }


});

router.get('/manager-view', function (req, res, next) {

    if (!req.isAuthenticated()) {
        // if (!true) {
        res.redirect('/')
    } else {
        try {
            var tempData = req.query.data;
            var manager = decodeURIComponent(tempData);
            var parseManager = JSON.parse(manager);

            var manager_id = parseManager.personnel_nbr;
            var manager = parseManager.email;

            if (manager && manager_id) {
                res.render('manager-view', {
                    data: {
                        manager: manager,
                        manager_id: manager_id
                    }
                });
            } else {
                res.redirect('/');
            }
        } catch (error) {
            res.redirect('/');
        }
    }


});

router.get('/individual-card', function (req, res, next) {
    if (!req.isAuthenticated()) {
        // if (!true) {
        res.redirect('/')
    } else {
        try {
            var tempUser = {
                displayName: null,
                email: null
            };
            if (req.user) {
                tempUser = {
                    displayName: req.user.profile.displayName,
                    email: req.user.profile.email,
                }
            }

            var tempData = req.query.data;
            var talent = decodeURIComponent(tempData);
            var parseTalent = JSON.parse(talent);
            console.log(parseTalent)
            if (parseTalent.personnel_nbr && parseTalent.email) {
                res.render('individual_card', {
                    data: talent,
                    data1: tempUser
                });
            } else {
                res.redirect('/')
            }
        } catch (error) {
            console.log('catch block')
            res.redirect('/')
        }
    }
});

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard.html');
});

router.get('/nominate-talent', function (req, res, next) {
    res.render('globalView.html');
});

// router.get('/logout', (req, res, next) => {
//     // sess.destroy((err) => {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     res.clearCookie('email');
//     //     console.log(sess);
//     //     res.send('logout');
//     // });
//     // req.logout();
//     sess = null;
//     // req.logout();
//     res.clearCookie('graphNodeCookie');
//     res.send('logout');
// });


module.exports = router;