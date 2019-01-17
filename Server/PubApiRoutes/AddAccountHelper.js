/*
 * @AddAccountHelper.js
 */
"use strict";

const { Client } = require('pg');

class AddAccountHelper {

    constructor() {
		// methods
        this.addAccount = this.addAccount.bind(this);
    }

    addAccount(reqBodyForm) {
        return new Promise((resolve, reject) => {
            console.log(reqBodyForm);

            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            currclient.connect();

            currclient.query('INSERT INTO Salesforce.Account(Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry) VALUES($1, $2, $3, $4, $5, $6) RETURNING ID;', [reqBodyForm.name, reqBodyForm.street, reqBodyForm.city, reqBodyForm.state, reqBodyForm.zip, reqBodyForm.country],(err, res) => {
                if (err){
                    reject();
                }
                currclient.end();
                resolve(res.rows);
            });
        });

    }

}

module.exports = AddAccountHelper;
