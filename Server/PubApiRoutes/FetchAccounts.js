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
    }
    /*  @route: /new/account
     *     - POST
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

}

module.exports = FetchAccounts;
