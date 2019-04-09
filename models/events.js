

module.exports = function(sequelize, Sequelize) {
var Events = sequelize.define("Events", {
    eventName: {
        type: Sequelize.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
            len: [1, 250]
        }
    },

    eventType: {
        type: Sequelize.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
            len: [1, 250]
        }
    },
    
    eventDate: {
        type: Sequelize.DATE,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
    },

    eventStatus: {
        type: Sequelize.BOOLEAN,
        // defaultValue is a flag that defaults a new todos complete value to false if
        // it isn't supplied one
        defaultValue: true,
    },


    taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Tasks', // Can be both a string representing the table name or a Sequelize model
            key: 'id'
        }
    }
    ,

    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users', // Can be both a string representing the table name or a Sequelize model
            key: 'id'
        }
    }


});

return Events;
};









// CREATE TABLE events
// (
// eventId int NOT NULL AUTO_INCREMENT,
// eventName varchar(255) NOT NULL,
// eventType varchar(255) NOT NULL,
// eventDate DATE NOT NULL,
// eventStatus BOOLEAN DEFAULT true,
// PRIMARY KEY (eventId),
// FOREIGN KEY (userId) REFERENCES users(userId),
// FOREIGN KEY (taskId) REFERENCES tasks(taskId)
// );