$(document).ready(function () {
  //------------Jennifer ------------------------//

  //------------ Event CRUD------------------//

  // View Current Events when click on current events link on NavBar
  $("#viewCurrentEvents").on("click", function () {
    $(".eventArea").empty()
    location.reload()

  });
  // View current Events on Dashboard
  $.ajax({
    method: "GET",
    url: "/api/dashboard",
  })
    .then(function (data) {
      var eventInfo = $("<div>")
      
      for (i = 0; i < data.length; i++) {
        $("#eventNameTask").append(`<option value="${data[i].eventName}">${data[i].eventName}</option>`);

        eventInfo.append(
          `<div class='eventDisplay'><h4>${data[i].eventName}</h4>
                    <p class='surveyAnswerDisplay'>Your event will be on ${data[i].eventDate.slice(0, 10)}, and you are expecting ${data[i].attendees} guests to be attending this ${data[i].eventType}. This event will be happening during ${data[i].timeOfDay}.</p>`
        )

        if (data[i].dress) {
          eventInfo.append(`
                    <p class='surveyAnswerDisplay'>Dress code: ${data[i].dress}   </p>
                    `)
        }
        if (data[i].alcohol === true) {
          eventInfo.append(`
                    <p class='surveyAnswerDisplay'>Beverages will be served <a href='https://www.google.com/maps/search/liquor+store/' target="_blank"><i class="material-icons">local_bar</i></a>  </p>
                    
                    `)
        }
        if (data[i].cake === true) {
          eventInfo.append(`
                  <p class='surveyAnswerDisplay'>There will be dessert! <a href='https://www.google.com/maps/search/cake/' target="_blank"> <i class="fas fa-birthday-cake"></i></a>  </p>
                    
                    `)
        }
        if (data[i].decorations === true) {
          eventInfo.append(`
                    <p class='surveyAnswerDisplay'>Going to need some decorations <a href='https://www.google.com/maps/search/decorations' target="_blank"> <i class="fas fa-ribbon"></i>  </p>
                    `)
        }
        if (data[i].food === true) {
          eventInfo.append(`
                    <p class='surveyAnswerDisplay'>Food will be served <a href='https://www.google.com/maps/search/restaurants' target="_blank"> <i class="fas fa-utensils"></i>  </p>
                    `)
        }
        if (data[i].themed === true) {
          eventInfo.append(`
                    <p class='themeOptions surveyAnswerDisplay'>This event will have a theme <a href='https://www.partycity.com/pi-theme-party-ideas' target="_blank"> <i class="fas fa-paw"></i>  </p>
                    `)
        }
        eventInfo.append(`<br>
        <button class="viewEvent btn" data-name="${data[i].eventName}">View Tasks</button>
        `)
        eventInfo.append(`
                <button class="delEvent btn" data-id=${data[i].id}>Delete Event</button>
                `)
        eventInfo.append(`
                <button class="pastEvent btn" data-id=${data[i].id}>Make This a Past Event</button></div>
                `)
      
      }

      $(".eventArea").append(eventInfo)

      $("#eventNameTask").formSelect();

    });


  // Click listener for creating new event on submission of new event form.
  $("#submitSurvey").on("click", function (e) {
    e.preventDefault();
    var formIsValid = $("#createEventForm")[0].checkValidity();
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
      $('#modal1').modal('close');
      $.post("/api/event/new", eventData, function (res) {
        location.reload()
      })
    }
    else {
      return alert("⚠️ Please complete the required fields before submitting! ⚠️")
    }
  });

  // View Past Events
  $("#viewPastEvents").on("click", function () {
    $(".eventArea").empty()
    $(".eventArea").append("<h4 class='black-text flow-text'> Past Events:</h4>")
    $(".eventArea").append("<hr>")
    $.ajax({
      method: "GET",
      url: "/api/event/past/",
    })
      .then(function (data) {

        var eventInfo = $("<div>")
        for (i = 0; i < data.length; i++) {
        
          eventInfo.append(
            `<h4>${data[i].eventName}</h4>
                    <p class='surveyAnswerDisplay'>Your event took place on ${data[i].eventDate.slice(0, 10)}. You were expecting ${data[i].attendees} guests at your ${data[i].eventType} event. The event took place during ${data[i].timeOfDay}.</p>`
          )
          if (data[i].dress) {
            eventInfo.append(`
                        <p class='surveyAnswerDisplay'>The dress code was ${data[i].dress}.  </p>
                        `)
          }
          if (data[i].alcohol === true) {
            eventInfo.append(`
                        <p class='surveyAnswerDisplay'>Alcoholic beverages were served </p>        
                        `)
          }
          if (data[i].cake === true) {
            eventInfo.append(`
                        <p class='surveyAnswerDisplay'>Dessert was served </p>
                        
                        `)
          }
          if (data[i].decorations === true) {
            eventInfo.append(`
                        <p class='surveyAnswerDisplay'>The place was decorated </p>
                        `)
          }
          if (data[i].food === true) {
            eventInfo.append(`
                        <p class='surveyAnswerDisplay'>Food was served </p>
                        `)
          }
          if (data[i].themed === true) {
            eventInfo.append(`
                        <p class='themeOptions surveyAnswerDisplay'>There was a theme! </p>
                        `)
          }

        };
        $(".eventArea").append(eventInfo);
        $("#eventTaskDisplayArea").empty()
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
        location.reload()
      });
  });

  // Change Event from Current to Past
  $(".eventArea").on("click", ".pastEvent", function () {
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/event/past/" + id,
    }).then(function (data) {
        location.reload(true)
      })
  })
});


//------------ Event CRUD------------------//


//------------ Task CRUD------------------//

$(".eventArea").on("click", ".viewEvent", function () {
  // $("#items").empty()
  // $("#items2").empty()

  // console.log('view event tasks');
  // console.log($(this).text())
  
  var eventName = $(this).data('name')
  console.log(eventName)
  $.ajax({
    method: "GET",
    url: "/api/tasks/all/" ,
  })
    .then(function (data) {
  $("#items").empty()
  $("#items2").empty()

      for (i = 0; i < data.length; i++) {

        // if (data[i].eventNameTask === 1) {
        if (data[i].eventNameTask === eventName){
        if (data[i].taskStatus) {
          $("#items").append("<li class='center taskActive'>" + data[i].taskName + "</li>")
        }
        else {
          $("#items2").append("<li class='center taskInactive'>" + data[i].taskName + "</li>")
        }
      }

      }
    });

})

$(".viewEventTasks", function () {
  console.log("What isnt this working?")
})

// Add new Task
$("#submitNewTask").on("click", function () {
  var eventId = $("#")
  console.log('submit new task enter');
  var newTask = {
    taskName: $("#newTaskName").val().trim(),
    taskType: false,
    importance: $("#newTaskImportance").val().trim(),
    taskStatus: true,
    eventNameTask: $("#eventNameTask").val().trim()


    // eventID: 
  }
  console.log('submit new task going to send', newTask);
  // $.ajax({
  //     method: "POST",
  //     url: "/api/tasks/create",
  //     body: newTask
  // })
  $.post("/api/tasks/create", newTask)
    .then(function (data) {
      console.log(data)
      location.reload();
    })

  console.log('submit new task should have sent');
  $("#taskForm").hide()

  $("#newTaskName").val("")
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

// Initialization for materialize javascript based components
$(document).ready(function () {
  $('.tap-target').tapTarget();
  $('.modal').modal();
  $('.fixed-action-btn').floatingActionButton();
  $('input#input_text, textarea#textarea2').characterCounter();
  $('select').formSelect();
  $('.datepicker').datepicker();
  $('#textarea1').val('New Text');
  M.textareaAutoResize($('#textarea1'));
});



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

$(document).ready(function () {
  
  var m;

  for (m = 0; m < items.length; m++) {


  }

 if (jQuery('#items')[m].hasAttribute('taskActive')){

 }
  $(document).on("getElementById", "#items", function () {

   

    console.log('changing task');
    var changeTask = {
      taskStatus: false,
    }
    console.log('submit new task going to send');
    $.ajax({
      method: "PUT",
      url: "/api/tasks/modify",
      body: changeTask
    })
      .then(function (data) {
        console.log(data)
      });
    console.log('task has been modified');

    $.post("/api/tasks/create", newTask)
    .then(function (data) {
      console.log(data)
      location.reload();
    })

  });

});

//------------ Mel ------------------------//


