var config = require('../../config').pool;

const sendMail = require('../common-controller/CommonMail');

function ManagerView(req, res, next) {
    var managerData = {
        "manager": [],
        "talent": []
    };

    try {
        var mode, id, manager;

        if (req.body.mode) {
            mode = req.body.mode;
        }
        if (req.body.id) {
            id = req.body.id;
        }
        if (req.body.manager) {
            manager = req.body.manager;
        }

        config.connect((err, client, done) => {
            if (err) throw err;
            console.log(`select _sittm_manager_details('${mode}', '${manager}', ${id})`);
            client.query(`select _sittm_manager_details('${mode}', '${manager}', ${id})`, (err, data) => {
                done()
                if (err) throw err;
                else {
                    managerData = {
                        "manager": data.rows[0]._sittm_manager_details || [],
                        "talent": data.rows[1]._sittm_manager_details || []
                    }
                    res.send(managerData);
                }
            })
        })
    } catch (err) {
        console.log(err);
        res.send(managerData);
    }
}
exports.ManagerView = ManagerView;


function EscalateTalent(req, res, next) {
    var datalist = [];
    try {
        var mode, id, manager, email, comment, email_id;

        console.log(req.body)

        if (req.body.p_id) {
            id = req.body.p_id;
        }
        if (req.body.mode) {
            mode = req.body.mode;
        }
        if (req.body.manager) {
            manager = req.body.manager;
        }
        if (req.body.email) {
            email = req.body.email;
        }
        if (req.body.comment) {
            comment = req.body.comment;
        }
        if (req.body.email_id) {
            email_id = req.body.email_id;
        }

        config.connect((err, client, done) => {
            if (err) throw err;
            var qurStr = `select _sittm_escalate_talent('${mode}', '${manager}', ${id}, '${email}', '${comment}')`;
            console.log(qurStr);
            client.query(qurStr, (err, data) => {
                done()
                if (err) throw err;
                else {
                    datalist = data.rows[0]._sittm_escalate_talent || [];
                    var mailHtml = '';
                    var mailSub = '';
                    if (mode == 'escalate_talent') {
                        mailHtml = `Hello,<br><br>The risk flag has been escalated for ${email} by Rohit.<br>Comment/ Reason: ${comment}<br><br>Time Zone: ${new Date()}<br><br>Please take prior actions to retain this talent.<br><br>Thank You<br>Secure Infra Team`;
                        mailSub = `Flag Escalation - ${email}`
                    } else if (mode == 'remove_escalation') {
                        mailHtml = `Hello,<br><br>The risk flag escalation has been removed for ${email} by Rohit.<br>Comment/ Reason: ${comment}<br><br>Time Zone: ${new Date()}<br><br>Thank You<br>Secure Infra Team `;
                        mailSub = `Remove Flag Escalation - ${email}`;
                    }

                    var mailBody = {
                        from: 'pratik.khadse@click2cloud.net',
                        to: email_id,
                        // to: 'jyoti.tumsare@click2cloud.net',
                        cc: "jyoti.tumsare@click2cloud.net, v-kalrka@microsoft.com",
                        subject: mailSub,
                        text: 'SITTM Escalation Details',
                        html: mailHtml
                        // html body'
                    }
                    sendMail.sendMail(mailBody, (response) => {
                        console.log('Mail response', response)
                    }, (err) => {
                        console.log('Mail error', err)
                    })
                    res.send(datalist);
                }
            })
        })
    } catch (err) {
        console.log(err);
        res.send();
    }
}
exports.EscalateTalent = EscalateTalent;


function SmmlManagerView(req, res, next) {
    var mailid = req.body.mail_id

    try {
        if (mailid) {
            config.connect((err, client, done) => {
                if (err) throw err;
                var queryStr = `select full_name as name, email, standard_title, id as manager_id, personnel_nbr
                from manager_info where report_to_level_3_emailid = '${mailid}'`
                console.log(queryStr);
                client.query(queryStr, (err, response) => {
                    done()
                    if (err) throw err;
                    else {

                        res.send(response.rows || []);
                    }
                })
            })
        } else {
            res.send([]);
        }
    } catch (error) {
        res.send([]);
    }
}
exports.SmmlManagerView = SmmlManagerView;

function smmlDeleteTalent(req, res, next) {

    var manager = req.body.manager || '';
    var pr_id = req.body.personnel_nbr || 0;
    var email = req.body.email || '';
    var dataList = [];

    try {
        config.connect((err, client, done) => {
            if (err) throw err;
            var queryStr = `
            update talent_info set is_deleted = true where reports_to_email_name= '${manager}' and personnel_nbr = ${pr_id} and email ='${email}';

            select ti.full_name, ti.email, ti.standard_title, ti.personnel_nbr, ti.company_country, et.comment, et.status, et.create_at, ti.reports_to_email_name as manager
			from talent_info ti
			left join escalate_talent et
			on ti.email = et.email and ti.personnel_nbr = et.personnel_nbr
			where reports_to_email_name= '${manager}' and is_deleted = false;`
            console.log(queryStr);
            client.query(queryStr, (err, response) => {
                done()
                if (err) throw err;
                else {
                    console.log(response);
                    dataList = response[1].rows || [];
                    res.send(dataList);
                }
            })
        })
    } catch (error) {
        res.send([]);
    }

}
exports.smmlDeleteTalent = smmlDeleteTalent;