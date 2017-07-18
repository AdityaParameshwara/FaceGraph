/**
 * Created by Adhitya on 18-05-2017.
 */
(function (app) {
    'use strict';

    app.registerModule('fbgs', ['angularUtils.directives.dirPagination', 'angularMoment']);
    app.registerModule('fbgs.routes', ['ui.router']);
}(ApplicationConfiguration));
