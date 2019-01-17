"use strict";


let React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,
    Layout = require("./pages/Layout/Layout.js"),
    AccountMap = require("./pages/AccountMap/AccountMap.js"),
    NewAccount = require("./pages/NewAccount/NewAccount.js");



module.exports = (
	<Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={AccountMap} />
            <Route path="new" component={NewAccount} />
        </Route>
    </Router>
);
