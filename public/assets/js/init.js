$(document).ready(function () {



    //------------Jennifer ------------------------//
    // Hide Task Form
    $("#taskForm").hide()

    // View current Events on Dashboard
    $.ajax({
        method: "GET",
        url: "/api/dashboard",
    })
        .then(function (data) {
            var eventInfo = $("<div>")
            for (i = 0; i < data.length; i++) {
                eventInfo.append(
                    `<h4>${data[i].eventName}</h4>
                    <p>Your event will be on ${data[i].eventDate.slice(0, 10)}, and you are expecting ${data[i].attendees} guests at your ${data[i].eventType} party. The time of day of your pary is during ${data[i].timeOfDay}.</p>`
                )

                if (data[i].dress) {
                    eventInfo.append(`
                    <p>The dress code is ${data[i].dress} </p>
                    `)
                }
                if (data[i].alcohol === true) {
                    eventInfo.append(`
                    <p>You want alcohol at your event.</p>
                    `)
                }
                if (data[i].cake === true) {
                    eventInfo.append(`
                    <p>You want to have cake.</p>
                    `)
                }
                if (data[i].decorations === true) {
                    eventInfo.append(`
                    <p>You want to have decorations.</p>
                    `)
                }
                if (data[i].food === true) {
                    eventInfo.append(`
                    <p>You want to have food.</p>
                    `)
                }
                if (data[i].themed === true) {
                    eventInfo.append(`
                    <p>You want to have a themed party.</p>
                    `)
                }

                eventInfo.append(`
                <button class="addTaskToEvent" data-id=${data[i].id} class="btn ">Add Tasks</button>
                `)
                eventInfo.append(`
                <button class="delEvent" data-id=${data[i].id} class="btn ">Delete Event</button>
                `)
            }
            $(".eventArea").append(eventInfo)
            console.log(data)

        });
    // Create New Event
    $("#submitSurvey").on("click", function (e) {
        e.preventDefault();
        var formIsValid = $("#createEventForm")[0].checkValidity();
        console.log(formIsValid)
        if (formIsValid) {
            var eventData = {}
            $('.eventInput').each(function () {
                var value = $(this).val().trim();
                var id = $(this).attr('id');
                if (value !== null || value !== undefined) {
                    value = value.trim()
                    if (value.length > 0) {
                        eventData[id] = value;
                    }
                }
            });

            $('.eventSelect').each(function () {

                var value = $(this).val();
                var id = $(this).attr('id');

                if (value === null || value === undefined || value === "empty") {
                    // not sure how to fix this issue with the selects !== not working
                } else {
                    value = value.trim()
                    if (value.length > 0 && value !== undefined) {
                        eventData[id] = value;
                    }
                }
            })

            console.log(eventData)

            $.post("/api/event/new", eventData, function (res) {
                console.log(res)
                location.reload()
            })
        }
        else {
            return console.log("Form is not completed")
        }


    });

    //------------ Task CRUD------------------//

    // Display Form to Create new Task
    $("#createTask").on("click", function () {
        $("#taskForm").show()

    });


    // Add new Task
    $("#submitNewTask").on("click", function () {
        console.log('submit new task enter');
        var newTask = {
            taskName: $("#newTaskName").val().trim(),
            taskType: true,
            importance: "Urgent",
            taskStatus: true,
            userID: 1,
            // eventID: 
        }
        console.log('submit new task going to send');
        $.ajax({
            method: "POST",
            url: "/api/tasks/create",
            body: newTask
        })
            .then(function (data) {
                console.log(data)
            });
        console.log('submit new task should have sent');
        $("#taskForm").hide()

        $("#newTaskName").val("")
    });

    // View All Tasks
    $("#openTask").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/tasks/all",
        })
            .then(function (data) {
                console.log(data)
            });
    });

    // Delete Tasks
    $(".delTask").on("click", function () {
        $.ajax({
            method: "DELETE",
            url: "/api/tasks/delete/:id",
        })
            .then(function (data) {
                console.log(data)
            });
    });
    //------------ Task CRUD------------------//
    //------------ Event CRUD------------------//





    // View Current Event




    // View Past Events
    $("#viewPastEvents").on("click", function () {

        $.ajax({
            method: "GET",
            url: "/api/event/past",
        })
            .then(function (data) {
                console.log(data)
            });
    });

    // Delete Event
    $(".eventArea").on("click", ".delEvent", function () {
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/events/delete/" + id,
        })
            .then(function (data) {
                console.log("This will be deleted")
                console.log(data)
                location.reload()
            });
    });
});

$(document).ready(function () {
    $('.modal').modal();
    $('input#input_text, textarea#textarea2').characterCounter();
    $('select').formSelect();
    $('.datepicker').datepicker();
    $('#textarea1').val('New Text');
    M.textareaAutoResize($('#textarea1'));
});


//------------ Event CRUD------------------//



//------------Jennifer ------------------------//






//------------ Thor ------------------------//

$(document).ready(function () {
    // Function for checking input passwords on register form to make sure they match
    var password = document.getElementById("userpass");
    var confirm_password = document.getElementById("confirmpassword");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords don't match!");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

});




//------------ Thor ------------------------//



//------------ Mel ------------------------//







//------------ Mel ------------------------//

$(document).ready(function () {
    // This WILL work because we are listening on the 'document', 
    // for a click on an element with an ID of #test-element
    $(document).on("getElementById", "#items", function () {

        console.log('changing task');
        var changeTask = {
            taskName: $("#taskName").val().trim(),
            taskStatus: false,
        }
        console.log('submit new task going to send');
        $.ajax({
            method: "PUT",
            url: "/api/tasks/???",
            body: changeTask
        })
            .then(function (data) {
                console.log(data)
            });
        console.log('task has been modified');

    });

});


//------------ Nick ------------------------//


// $(document).ready(function () {
//     $('.modal').modal();
//     $('input#input_text, textarea#textarea2').characterCounter();
//     $('select').formSelect();
//     $('.datepicker').datepicker();
//     $('#textarea1').val('New Text');
//     M.textareaAutoResize($('#textarea1'));
// });

// $("#submitSurvey").on("click", function (event) {
//     event.preventDefault();

//     // Conditional for form validation checks for any empty input areas, which will set my formCompleted variable to false
//     var formCompleted = true;

//     if ($("#eventName").val() === "" || $("#eventDate").val() === "") {
//         formCompleted = false;
//     }

//     if (formCompleted) {

//         // Grab all survey responses and store them in an object
//         var newEvent = {
//             name: $("#eventName").val().trim(),
//             responses: [
//                 $("#eventDate").val(),
//                 $("#eventType").val(),
//                 $("#attendees").val().trim(),
//                 $("#timeOfDay").val(),
//                 $("#dress").val(),
//                 $("#themed").val(),
//                 $("#food").val(),
//                 $("#decorations").val(),
//                 $("#cake").val(),
//                 $("alcohol").val(),
//             ]
//         };

//         console.log(newEvent);

//         // Post request for the newEvent object that also returns data from about their best match calculated on the apiRoutes.js
//         $.post("/api/tasks/create", newEvent, function (data) {
//             // Trigger my modal popup with info about the match found for the user
//             $("#createdEvent").html(data.name);
//             $("#createdDate").text(data.response[0]);
//             $("#createdType").text(data.response[1]);
//             $("#createdAttendees").text(data.response[2]);
//             $("#createdTimeOfDay").text(data.response[3]);
//             $("#createdAttire").text(data.response[4]);
//             $("#createdThemed").text(data.response[5]);
//             $("#createdFood").text(data.response[6]);
//             $("#createdDecorations").text(data.response[7]);
//             $("#createdAlcohol").text(data.response[8]);


//         });
//     } else {
//         // Alert user if they failed to respond to all form elements
//         alert("⚠️ Please complete the Event Name and Date before submitting! ⚠️");
//     }
// });



//------------ Nick ------------------------//