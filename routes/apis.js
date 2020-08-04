'use strict';
var express = require('express');
var router = express.Router();

const fs = require("fs");

const Manager = require('../controller/ManagerController/ManagerView')
const IndividualCard = require('../controller/IndividualCardController/IndividualCard')
const HomeController = require('../controller/HomeController/HomeNominateTalent')

// devlopment plan
router.post('/savePlane', function (req, res, next) {
    IndividualCard.savePlane_details(req, res, next);
});
router.post('/UpdateDevlopementData', function (req, res, next) {
    IndividualCard.UpdateDevlopement_detail(req, res, next);
});
// devlopment plan end
router.post('/managerViewsDetails', function (req, res, next) {
    Manager.ManagerView(req, res, next);
});

router.post('/smmlManagerViewsDetails', function (req, res, next) {
    Manager.SmmlManagerView(req, res, next);
});

router.post('/smmlDeleteTalent', function (req, res, next) {
    Manager.smmlDeleteTalent(req, res, next);
});

router.post('/escalateTalent', function (req, res, next) {
    Manager.EscalateTalent(req, res, next);
});

router.post('/individualTalentDetails', function (req, res, next) {
    IndividualCard.IndividualDetails(req, res, next);
});

router.post('/insertProjectDetails', function (req, res, next) {
    IndividualCard.IndividualProjectDetails(req, res, next);
});

router.post('/foundationInfoUpdate', function (req, res, next) {
    IndividualCard.FoundationDataUpdate(req, res, next);
});

router.post('/certificateInfoUpdate', function (req, res, next) {
    IndividualCard.CertificateDataUpdate(req, res, next);
});

router.post('/developmentInfoUpdate', function (req, res, next) {
    IndividualCard.DevelopmentDataUpdate(req, res, next);
});

router.post('/saveCommonTag', function (req, res, next) {
    IndividualCard.SaveCommonTags(req, res, next);
});

router.post('/callGroupTag', function (req, res, next) {
    IndividualCard.CallGroupTags(req, res, next);
});

router.post('/documentDownlaod', function (req, res, next) {
    IndividualCard.DocumentFunction(req, res, next);
});

router.get('/downloadDocument', function (req, res, next) {
    res.download('./public/download/' + req.query.path);
});

// upload file
router.post('/uploadfile', function (req, res, next) {
    IndividualCard.UploadFile(req, res, next);
});
// upload file end
router.post('/nominateTalent', function (req, res, next) {
    HomeController.NominateTalent(req, res, next);
});

router.post('/saveTalent', function (req, res, next) {
    HomeController.saveTalent(req, res, next);
});

router.post('/getTalentinfo', function (req, res, next) {
    HomeController.getTalentinfo(req, res, next);
});


router.post('/addActivity', function (req, res, next) {
    IndividualCard.AddActivity(req, res, next);
});
router.post('/updateActivityStatus', function (req, res, next) {
    IndividualCard.updateActivityStatus(req, res, next);
});

router.post('/listActivityStatus', function (req, res, next) {
    IndividualCard.listActivityStatus(req, res, next);
});

router.post('/data_Motivator', function (req, res, next) {
    IndividualCard.dataMotivator_details(req, res, next);
});
module.exports = router;