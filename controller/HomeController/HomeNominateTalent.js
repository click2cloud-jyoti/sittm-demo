var config = require('../../config').pool;

function NominateTalent(req, res, next) {
    var nominate = '';
    var is_deleted = false
    console.log('HomeController')
    if (req.body.nominate) {
        nominate = req.body.nominate;

    }
    console.log('nominate', nominate)
    config.connect((err, client, done) => {
        if (err) throw err;
        else {
            var qurStr = `select _sittm_nominate_talent('${nominate}','','','','','','','','','','','','','','${is_deleted}',0)`;
            console.log(qurStr);
            client.query(qurStr, (err, response) => {
                done();
                // console.log('dataList',dataList)
                if (err) throw err;
                if (response) {
                    // dataList = response.rows[0]
                    // response.rows[0]
                    console.log('dataList', response)
                    // dataList = response.rows[0]._sittm_nominate_talent || [];
                    res.send(response);
                }
            })
        }
    })
}

exports.NominateTalent = NominateTalent;

function saveTalent(req, res, next) {
    console.log('HomeController saveTalent..')
    var p_mode = '';
    var p_alias = '';
    var p_mobility = '';
    var p_travel_tolerance = '';
    var p_project = '';
    var p_motivator = '';
    var p_training_opportunities = '';
    var p_area_of_interest = '';
    var p_quick_facts = '';
    var p_delivberables = '';
    var p_tagname = '';
    var p_label_motivational_factor = '';
    var p_label_deliverables = '';
    var p_label_quick_facts = '';
    var p_manager = '';
    if (req.body.p_mode) {
        p_mode = req.body.p_mode;
        console.log(p_mode)
    }
    if (req.body.alias) {
        p_alias = req.body.alias;
        console.log(p_alias)
    }
    if (req.body.mobility) {
        p_mobility = req.body.mobility;
        console.log(p_mobility)
    }
    if (req.body.travel_tolerance) {

        p_travel_tolerance = req.body.travel_tolerance;
        console.log(p_travel_tolerance)
    }
    if (req.body.project) {
        p_project = req.body.project;
        console.log(p_project)
    }
    if (req.body.motivator) {
        p_motivator = req.body.motivator;
        console.log(p_motivator)
    }
    if (req.body.training_opportunities) {
        p_training_opportunities = req.body.training_opportunities;
        console.log(p_training_opportunities)
    }
    if (req.body.area_of_interest) {
        p_area_of_interest = req.body.area_of_interest;
        console.log(p_area_of_interest)
    }
    if (req.body.facts) {
        p_quick_facts = req.body.facts;
        console.log(p_quick_facts)
    }

    if (req.body.delivberables) {
        p_delivberables = req.body.delivberables;
        console.log(p_delivberables)
    }

    if (req.body.label_motivational_factor) {
        p_label_motivational_factor = req.body.label_motivational_factor;
        console.log("p_label_motivational_factor", p_label_motivational_factor)
    }
    if (req.body.label_deliverables) {
        p_label_deliverables = req.body.label_deliverables;
        console.log("p_label_deliverables", p_label_deliverables)
    }
    if (req.body.label_quick_facts) {
        p_label_quick_facts = req.body.label_quick_facts;
        console.log("p_label_quick_facts", p_label_quick_facts)
    }

    if (req.body.manager) {
        p_manager = req.body.manager;
        console.log("manager", p_manager)
    }


    var personnel_nbr = getRandomString();
    console.log('personnel_nbr', personnel_nbr)
    config.connect((err, client, done) => {
        if (err) throw err;
        else {
            var qurStr = `select _sittm_nominate_talent('${p_mode}','${p_alias}',
            '${p_mobility}','${p_travel_tolerance}','${p_project}','${p_motivator}','${p_quick_facts}','${p_delivberables}',
            '${p_label_motivational_factor}','${p_label_deliverables}','${p_label_quick_facts}','${p_training_opportunities}','${p_area_of_interest}','${p_manager}',false,'${personnel_nbr}')`;
            console.log(qurStr);
            client.query(qurStr, (err, response) => {
                done();
                // console.log('dataList',dataList)
                if (err) throw err;
                if (response) {
                    dataList = response.rows[0]
                    console.log('dataList', response)
                    // dataList = response.rows[0]._sittm_nominate_talent || [];
                    res.send(dataList);
                }
            })
        }
    })
}

exports.saveTalent = saveTalent;

function getTalentinfo(req, res, next) {
    var is_deleted = false
    var p_mode = '';
    console.log(req.body.p_mode)
    p_mode = req.body.p_mode;
    config.connect((err, client, done) => {
        if (err) throw err;
        else {
            var qurStr = `select _sittm_nominate_talent('${p_mode}','',
            '','','','','','',
            '','','','','','','${is_deleted}',0)`;
            console.log(qurStr);
            client.query(qurStr, (err, response) => {
                done();
                // console.log('dataList',dataList)
                if (err) throw err;
                if (response) {
                    dataList = response.rows[0]
                    console.log('dataList', response)
                    // dataList = response.rows[0]._sittm_nominate_talent || [];
                    res.send(dataList);
                }
            })
        }
    })
}
exports.getTalentinfo = getTalentinfo;
function getRandomString() {
    const uniqueRandom = require('unique-random');
    const random = uniqueRandom(1, 100000);
    return random();
}
exports.getRandomString = getRandomString;
