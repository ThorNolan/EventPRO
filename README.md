![EventPro logo](/public/assets/images/event-pro-3-logo.png "EventPro Logo Image")
=================================================================
Our second project for our full-stack coding bootcamp, EventPRO is an event planning application that provides users with a centralized location to create and manage to-do’s around their upcoming events. Users can log-in to the app, and their login data will be stored (and their password encrypted with bcrypt) so that they can log back in when revisiting the app and have immediate access to their personalized dashboard containing both past and present events and their tasks.

From their dashboard, they can create new events, manage tasks and add and modify items, select past events, and order and mark tasks based on priority by dragging and reordering them. Being a planning-oriented application, we wanted a smooth interface that would allow user's to easily keep track of their events and to-do's without extensive explanation of features and without interfering with user's flow. 

And we don't expect our users to do everything themselves, which is why we provide links to helpful stores in their area with directions based on information they've provided about what they'll be expecting at their event-need a cake for your friend's birthday party? Click the blue cake icon and see some bakeries in your area. Whether it’s a birthday party, mother's day, or an after work social function, EventPRO’s got you covered.

![demo gif](/public/assets/images/eventpro-demo.gif "demo gif of EventPRO in action")

## 🔑 How to Use the App:

The application is intuitive and requires little to no prior knowledge before being ready to use.

Follow the steps below to begin planning and organizing to-do's:

1. Create an individual user profile and log in. User data is stored in a MySQL database using a passport local sign-up/sign-in strategy, and passwords are encrypted with bCrypt
   
2. Create an event
   
3. Create tasks for the created event and assign users to each individual task
   
4. As tasks are completed users can drag them to a completed state

## 📁 Deployment Instructions

This app has been deployed to Heroku, and the link can be found [here](LIVE LINK HERE "live link"). If you would like to run the app locally, follow these instructions: 

1. Clone this repository down to your machine.
   
2. Enter `npm install` into your command line after navigating into the root directory, which will install the dependencies listed in the package.json.
   
3. Enter `node server.js`, which will initiate the server on http://localhost:8080.
   
4. Navigate to http://localhost:8080 in your browser, or ctrl-click the link that will be logged to your console. Now get planning!

## 🔧 Technologies Used  

+ **HTML5** and **CSS3** for page content and styling.

+ **Handlebars** for templating and generating HTML content, served up through our routes from our server.

+ **Materialize.css** as a CSS framework for applying styles and using components based on Google's Material UI.

+ **JavaScript** for the app's logic.
  
+ **Node.JS** for the app's server environment.

+ **NPM** for installation of the packages required by the app:
  + **express**
  + **express-session**
  + **cookie-parser**
  + **express-handlebars**
  + **mysql2**
  + **sequelize**
  + **passport**
  + **passport-local**
  + **dotenv**
  + **bcrypt**
  
+ **MySQL** for database creation and storing persistent data.
  
+ **Heroku** for live deployment and hosting.
  
+ **Sortable.js** CDN for drag/sort functionality for to-do's. They can be re-ordered by priority or moved between incomplete and completed states, which will alter the data-attribute of the task being dragged.
  
+ The app follows the **MVC (Model, View, Controller)** architecture paradigm:
  
![mvc pic](/public/assets/images/mvc1.PNG "MVC architecture") ![mvc pic](/public/assets/images/mvc2.png "MVC architecture")


## 🌟 Acknowledgements

We would like to thank our instructor Jerome, our awesome TA's Sajeel, Jacob, and Jimmy, and our visiting instructor Amber for all of their help along the way. Figuring out passport user authentication and all of our routes and database relations would have been much more difficult without their help.
    
## 🔗 Authors 

+ Melanie Marsollier—https://github.com/Mel-Marsollier
+ Jennifer Powell—https://github.com/jerpowel321
+ Thor Nolan—https://github.com/ThorNolan
+ Nick Tom—https://github.com/nicky2quicky


