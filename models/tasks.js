var Sequelize = require("sequelize");

module.exports = function(sequelize, Sequelize) {
var Tasks = sequelize.define("Tasks", {
    taskName: {
        type: Sequelize.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
            len: [1, 250]
        }
    },

    taskType: {
        type: Sequelize.BOOLEAN,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        defaultValue: true,
        }
    ,
    importance: {
        type: Sequelize.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        validate: {
            len: [1, 250]
        }
    },
    // taskDate: {
    //     type: Sequelize.DATE,
    //     // AllowNull is a flag that restricts a todo from being entered if it doesn't
    //     // have a text value
    //     // allowNull: false,
    // },

    taskStatus: {
        type: Sequelize.BOOLEAN,
        // defaultValue is a flag that defaults a new todos complete value to false if
        // it isn't supplied one
        defaultValue: true,
    },



});

Tasks.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Tasks.belongsTo(models.Events, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false}

    });
    Tasks.belongsTo(models.Users, {
        onDelete: "cascade",
        foreignKey: {
          allowNull: false}
  
      });
  };




return Tasks;
};



// CREATE TABLE tasks
// (
// taskId int NOT NULL AUTO_INCREMENT,
// tasktName varchar(255) NOT NULL,
// taskType BOOLEAN DEFAULT false,
// taskDate DATE NOT NULL,
// importance varchar,
// eventStatus BOOLEAN DEFAULT true,
// PRIMARY KEY (taskId),
// FOREIGN KEY (userId) REFERENCES users(userId),
// FOREIGN KEY (eventId) REFERENCES events(eventId)
// );