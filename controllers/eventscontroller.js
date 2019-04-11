var db = require("../models");

module.exports = {
    create: function (req, res) {
        db.Events
            .create(req.body)
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    viewCurrentEvent: function (req, res) {
        console.log(req.body)
        res.json(true)
        db.Events
            .findAll({
                where: {
                    eventStatus: 1
                }
            })
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    viewPastEvents: function (req, res) {
        db.Events
            .findAll({
                where: {
                    eventStatus: 0
                }
            })
            .then(function (result) {
                res.json(result)
            })
            .catch(function (req, res) {
                console.log(err)
            })
    },
    deleteEvent: function(req, res){
        db.Events.destroy({
            where: {
              id: req.params.id
            }
          }).then(function(dbEvents) {
            res.json(dbEvents);
          });
    }
}