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


ApiRoutes.get("/fetch/accounts/", PubFetchAccounts.FetchAccountsGet);


/*
 * export
 */
module.exports = ApiRoutes;
