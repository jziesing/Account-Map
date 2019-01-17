/*
 * @ContactRoutes.js
 */
"use strict";


let FetchAccountsHelper = require('./FetchAccountsHelper');
const { Client } = require('pg');

class FetchAccounts {

    constructor() {
        this.ahelper = new FetchAccountsHelper();
		// methods
        this.FetchAccountsGet = this.FetchAccountsGet.bind(this);
        this.FetchChildAccountsGet = this.FetchChildAccountsGet.bind(this);
    }
    /*  @route: /fetch/accounts/
     *     - GET
     */
    FetchAccountsGet(req, res) {
        console.log('FetchAccountsGet');
        res.setHeader('Content-Type', 'application/json');

        return this.ahelper.fetchAccounts()
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });
    }
    /*  @route: /fetch/account/{parent_account_id}
     *     - GET
     */
    FetchChildAccountsGet(req, res) {
        console.log('FetchChildAccountsGet, account id :: ' + req.params.parentAccountId);
        res.setHeader('Content-Type', 'application/json');

        return this.ahelper.fetchChildAccounts(req.params.parentAccountId)
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });
    }

}

module.exports = FetchAccounts;
