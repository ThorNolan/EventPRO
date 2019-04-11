$(document).ready(function () {



    //------------Jennifer ------------------------//
    // Hide Task Form
    $("#taskForm").hide()


    //------------ Task CRUD------------------//

    // Display Form to Create new Task
    $("#createTask").on("click", function () {
        $("#taskForm").show()

    })

    // Add new Task
    $("#submitNewTask").on("click", function () {
        var newTask = {
            taskName: $("#taskName").val().trim(),
            taskType: "Birthday",
            importance: "Urgent",
            eventStatus: true,
            eventID: 1,
            userID: 1,
        }
        $.ajax({
            method: "POST",
            url: "/api/tasks/create",
            body: newTask
        })
            .then(function (data) {
                console.log(data)
            });
        $("#taskForm").hide()
        $("#taskName").val("")
    })

    // View All Tasks
    $("#openTask").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/tasks/all",
        })
            .then(function (data) {
                console.log(data)
            });
    })

    // Delete Tasks
    $(".delTask").on("click", function () {
        $.ajax({
            method: "DELETE",
            url: "/api/tasks/delete/:id",
        })
            .then(function (data) {
                console.log(data)
            });
    })
    //------------ Task CRUD------------------//
    //------------ Event CRUD------------------//


    // Create New Event
    $("#submitSurvey").on("click", function () {
        var newEvent = {
            eventName: $("#eventName").val().trim(),
            eventType: "Birthday",
            eventDate: "Urgent",
            eventStatus: true,
            taskID: 1,
            userID: 1,
        }
        $.ajax({
            method: "POST",
            url: "/api/event/new",
            body: newEvent
        })
            .then(function (data) {
                console.log(data)
            });
    })

    // View Current Event
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: "/api/dashboard",
        })
            .then(function (data) {
                console.log(data)
            });
    });

    // View Past Event
    $("#viewPastEvents").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/event/past",
        })
            .then(function (data) {
                console.log(data)
            });
    })

    // Delete Event
    $(".delEvent").on("click", function () {
        $.ajax({
            method: "DELETE",
            url: "/api/events/delete/:id",
        })
            .then(function (data) {
                console.log(data)
            });
    })
})


//------------ Event CRUD------------------//



//------------Jennifer ------------------------//






//------------ Thor ------------------------//







//------------ Thor ------------------------//



//------------ Mel ------------------------//







//------------ Mel ------------------------//


//------------ Nick ------------------------//


$(document).ready(function () {
    $('.modal').modal();
    $('input#input_text, textarea#textarea2').characterCounter();
    $('select').formSelect();
    $('.datepicker').datepicker();
    $('#textarea1').val('New Text');
    M.textareaAutoResize($('#textarea1'));
});

$("#submitSurvey").on("click", function (event) {
    event.preventDefault();

    // Conditional for form validation checks for any empty input areas, which will set my formCompleted variable to false
    var formCompleted = true;

    if ($("#eventName").val() === "" || $("#eventDate").val() === "") {
        formCompleted = false;
    }

    if (formCompleted) {

        // Grab all survey responses and store them in an object
        var newEvent = {
            name: $("#eventName").val().trim(),
            responses: [
                $("#eventDate").val(),
                $("#eventType").val(),
                $("#attendees").val().trim(),
                $("#timeOfDay").val(),
                $("#dress").val(),
                $("#themed").val(),
                $("#food").val(),
                $("#decorations").val(),
                $("#cake").val(),
                $("alcohol").val(),
            ]
        };

        console.log(newEvent);

        // Post request for the newEvent object that also returns data from about their best match calculated on the apiRoutes.js
        $.post("/api/tasks/create", newEvent, function (data) {
            // Trigger my modal popup with info about the match found for the user
            $("#createdEvent").html(data.name);
            $("#createdDate").text(data.response[0]);
            $("#createdType").text(data.response[1]);
            $("#createdAttendees").text(data.response[2]);
            $("#createdTimeOfDay").text(data.response[3]);
            $("#createdAttire").text(data.response[4]);
            $("#createdThemed").text(data.response[5]);
            $("#createdFood").text(data.response[6]);
            $("#createdDecorations").text(data.response[7]);
            $("#createdAlcohol").text(data.response[8]);


        });
    } else {
        // Alert user if they failed to respond to all form elements
        alert("⚠️ Please complete the Event Name and Date before submitting! ⚠️");
    }
});



//------------ Nick ------------------------//