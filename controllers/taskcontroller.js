var db = require("../models");

module.exports = {
    create: function(req, res){
        db.Tasks
        .create(req.body)
        .then(function(result){
            res.json(result)
        })
        .catch(function(err) {
            console.log(err)
        })
    },
    viewComplete: function(req, res){
        db.Tasks
        .findAll({
            where: {
                taskStatus: 1
            }
        })
        .then(function(result){
            res.json(result)
        })
        .catch(function(err) {
            console.log(err)
        })
    },
    viewOpen: function(req, res){
        db.Tasks
        .findAll({
            where: {
                taskStatus: 0
            }
        })
        .then(function(result){
            res.json(result)
        })
        .catch(function(req, res) {
            console.log(err)
        })
    },
    deleteTask: function(req, res){
        db.Task
        .destroy({
            where: {
              id: req.params.id
            }
          }).then(function(dbTask) {
            res.json(dbTask);
          });
    }
}