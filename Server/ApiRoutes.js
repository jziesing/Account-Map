/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
    PublicAddAccount = require('./PubApiRoutes/AddAccount'),
    PublicFetchAccounts = require('./PubApiRoutes/FetchAccounts'),
    ApiRoutes = express.Router(),
    PubAddAccount = new PublicAddAccount(),
    PubFetchAccounts = new PublicFetchAccounts();



/*
 *  routes
 */
// add account
ApiRoutes.post("/new/account/", PubAddAccount.AddAccountPost);

// get parent accounts
ApiRoutes.get("/fetch/accounts/", PubFetchAccounts.FetchAccountsGet);
// get child accounts
ApiRoutes.get("/fetch/account/:parentAccountId", PubFetchAccounts.FetchChildAccountsGet);


/*
 * export
 */
module.exports = ApiRoutes;
