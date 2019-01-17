/*
 * @ClientRouter.js
 */
"use strict";


var ClientRouter = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');

ClientRouter.get('*', function(req, res) {

    let clientRoutes = require('../Client/src/Routes.js');

    if(clientRoutes != null) {
        ReactRouter.match({
            routes: clientRoutes,
            location: req.url
        }, function(error, redirectLocation, renderProps) {
            if(renderProps) {
                var html = ReactDOMServer.renderToString(
                    <ReactRouter.RouterContext {...renderProps}
                        createElement={function(Component, renderProps) {
                            return <Component {...renderProps} />;
                        }}
                    />
                );
                res.send(html);
            } else {
                res.status(404).send('Not Found');
            }
        });
    }
});

module.exports = ClientRouter;
