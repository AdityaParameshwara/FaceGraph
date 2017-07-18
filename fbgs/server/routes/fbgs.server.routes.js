/**
 * Created by Adhitya on 03-06-2017.
 */
var fbgsController = require("../controller/fbgs.server.controller");

module.exports = function(app){

    app.route("/saveFrequentlySearchedUsers").post(fbgsController.saveFreqSearchedUser);
    app.route("/getFrequentlySearchedUsers").post(fbgsController.getFreqSearchedUser);
    app.route("/getFavouriteUsers").post(fbgsController.getFavouriteUsers);
    app.route("/updateFavouriteUsers").post(fbgsController.updateFavouriteUsers);

    app.route("/saveFrequentlySearchedPages").post(fbgsController.saveFreqSearchedPage);
    app.route("/getFrequentlySearchedPages").post(fbgsController.getFreqSearchedPage);
    app.route("/getFavouritePages").post(fbgsController.getFavouritePages);
    app.route("/updateFavouritePages").post(fbgsController.updateFavouritePages);

    app.route("/saveFrequentlySearchedEvents").post(fbgsController.saveFreqSearchedEvent);
    app.route("/getFrequentlySearchedEvents").post(fbgsController.getFreqSearchedEvent);
    app.route("/getFavouriteEvents").post(fbgsController.getFavouriteEvents);
    app.route("/updateFavouriteEvents").post(fbgsController.updateFavouriteEvents);
};
