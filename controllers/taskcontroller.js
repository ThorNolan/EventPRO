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
    viewAll: function(req, res){
        db.Tasks
        .findAll()
        .then(function(result){
            var taskobj = {
                tasks: result
            }
            return res.render("dashboard", taskobj)
            // res.json(result)
        })
        .catch(function(err) {
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