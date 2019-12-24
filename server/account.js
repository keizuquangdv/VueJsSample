var db = require('./auth');

function getAllAccount(req, res, next) {
    try {
        console.log('getAllAccount');
        db.query('SELECT Id, Name, billingcity, billingstreet, billingstate, billingcountry, fax, currencyisocode FROM salesforce.Account', '', false, true)
        .then(function(accountLst) {
            console.log('Account has been Queried')
            console.log(accountLst);
            res.send(JSON.stringify(accountLst));
        })
        .catch(next);
    } catch (err) {
        console.log(err);
    }
}

function getAccountDetail(req, res, next) {
    try {
        console.log('getAccountDetail');
        var id = req.params.id;
        console.log('AccountId: ' + id);
        db.query('SELECT Id, Name, billingcity, billingstreet, billingstate, billingcountry, fax, currencyisocode, cleanstatus FROM salesforce.Account WHERE Id=' + id, '', true, true)
        .then(function(accountDetail) {
            console.log('Onr account has been Queried')
            res.send(JSON.stringify(accountDetail));
        })
        .catch(next);
    } catch (err) {
        console.log(err);
    }
}

exports.getAllAccount = getAllAccount;
exports.getAccountDetail = getAccountDetail;