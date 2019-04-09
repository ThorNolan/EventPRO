//------------Jennifer ------------------------//



//------------ Task CRUD------------------//

// Display Form to Create new Task
$("#createTask").on("click", function(){

})

// Add new Task
$("#submitNewTask").on("click", function(){
    var newTask = {
        taskName: "Call People",
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
        .then( function(data){
            console.log(data)
        });
})

// View Completed Tasks
$("#completedTask").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/api/tasks/completed",
      })
        .then( function(data){
            console.log(data)
        });
})

// View Open Tasks
$("#openTask").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/api/tasks/open",
      })
        .then( function(data){
            console.log(data)
        });
})

// Delete Tasks
$(".delTask").on("click", function(){
    $.ajax({
        method: "DELETE",
        url: "/api/tasks/delete/:id",
      })
        .then( function(data){
            console.log(data)
        });
})
//------------ Task CRUD------------------//
//------------ Event CRUD------------------//


// Create New Event
$("#submitSurvey").on("click", function(){
    var newEvent= {
        eventName: "Call People",
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
        .then( function(data){
            console.log(data)
        });
})

// View Current Event
$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "/api/dashboard",
      })
        .then( function(data){
            console.log(data)
        });
});

// View Past Event
$("#viewPastEvents").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/api/event/past",
      })
        .then( function(data){
            console.log(data)
        });
})

// Delete Event
$(".delEvent").on("click", function(){
    $.ajax({
        method: "DELETE",
        url: "/api/events/delete/:id",
      })
        .then( function(data){
            console.log(data)
        });
})


//------------ Event CRUD------------------//



//------------Jennifer ------------------------//





//------------ Thor ------------------------//







//------------ Thor ------------------------//



//------------ Mel ------------------------//







//------------ Mel ------------------------//


//------------ Nick ------------------------//







//------------ Nick ------------------------//