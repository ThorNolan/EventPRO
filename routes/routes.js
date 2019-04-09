var router = express.Router();

var taskControllers = require("../controllers/taskcontroller");

router.post("/api/tasks/create", function(req, res) {
    taskControllers.create(req, res);
})