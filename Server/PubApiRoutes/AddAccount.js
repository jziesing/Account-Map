/*
 * @ContactRoutes.js
 */
"use strict";


let AddAccountHelper = require('./AddAccountHelper');


class AddAccount {

    constructor() {
        this.ahelper = new AddAccountHelper();
		// methods
        this.AddAccountPost = this.AddAccountPost.bind(this);
    }
    /*  @route: /new/account
     *     - POST
     */
    AddAccountPost(req, res) {
        console.log('AddAccountPost');
        res.setHeader('Content-Type', 'application/json');
        return this.ahelper.addAccount(req.body)
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });

    }

}

module.exports = AddAccount;
