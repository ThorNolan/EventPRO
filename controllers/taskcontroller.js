var db = require("../models");

module.exports = {
    create: function(req, res){
        if (req.isAuthenticated()){
            var id = req.session.passport.user;

            var newTask = {
                taskName: req.body.taskName,
                taskType: req.body.taskType,
                importance: req.body.importance,
                taskStatus: req.body.taskStatus,
                eventNameTask: req.body.eventNameTask,
                UserId: id
            }
            console.log("Denis is the best TA", newTask)
        db.Tasks
        .create(newTask)
        .then(function(result){
            res.json(result)
        })
        .catch(function(err) {
            console.log(err)
        })
        } else {
            res.redirect("/");
        }
        
    },
    viewAll: function(req, res){
        db.Tasks
        .findAll()
        .then(function(result){
            // console.log(taskobj.tasks)
            // console.log("*********")
            
            // console.log(taskobj.tasks[0].taskName)
            // console.log(taskobj.tasks[0].importance)
            console.log(result);
            res.json(result);
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