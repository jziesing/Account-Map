/*
 * @FetchAccountsHelper.js
 */
"use strict";

const { Client } = require('pg');


class FetchAccountsHelper {

    constructor() {
		// methods
        this.fetchAccounts = this.fetchAccounts.bind(this);
    }

    fetchAccounts() {
        return new Promise((resolve, reject) => {

            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            currclient.connect();

            currclient.query('SELECT Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry FROM Salesforce.Account;', (err, res) => {
                if (err){
                    reject();
                }
                currclient.end();
                resolve(res.rows);
            });
        });

    }

}

module.exports = FetchAccountsHelper;
