var express = require("express")
var router = express.Router();

router.get('/', function(req, res){
    res.render('sign-in')
})

//-------------- View Dashboard ----------------------------//
router.get("/api/dashboard", function(req, res) {
    eventControllers.viewCurrentEvent(req, res);
})

//------------------- Task Routes --------------------------//
var taskControllers = require("../controllers/taskcontroller");

router.post("/api/tasks/create", function(req, res) {
    taskControllers.create(req, res);
})

router.get("/api/tasks/completed", function(req, res) {
    taskControllers.viewComplete(req, res);
})

router.get("/api/tasks/all", function(req, res) {
    taskControllers.viewAll(req, res);
})

router.get("/api/tasks/delete/:id", function(req, res) {
    taskControllers.deleteTask(req, res);
})

// Mel stub don't delete without permission//
router.update("/api/tasks/modift/:id", function(req, res) {
    taskControllers.deleteTask(req, res);
})

// Mel stub don't delete without permission//


//------------------- Event Routes --------------------------//
var eventControllers = require("../controllers/eventscontroller");

router.route("/api/event/new")
    // .get(eventControllers.viewPastEvents)
    .post(eventControllers.create);

router.get("/api/event/past", function(req, res) {
    eventControllers.viewPastEvents(req, res);
})

router.put("/api/event/past/:id", function(req, res) {
    eventControllers.makeEventPast(req, res);
})                  

router.delete("/api/events/delete/:id", function(req, res) {
    eventControllers.deleteEvent(req, res);
})

//------------------- Survey Routes --------------------------//
router.get("/api/survey", function(req, res) {
    res.render("events")
})

module.exports = router;