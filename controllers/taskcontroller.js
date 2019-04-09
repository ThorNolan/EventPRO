var db = require("../models");

module.exports = {
    create: function(req, res){
        db.Task
        .create(req.body)
        .then(function(result){
            res.json(result)
        })
        .catch(function(err) {console.log(err)}
        )
    },

}