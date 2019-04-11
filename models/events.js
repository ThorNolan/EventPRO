var Sequelize = require("sequelize");

module.exports = function (sequelize, Sequelize) {
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
          
            allowNull: false
        },

        eventStatus: {
            type: Sequelize.BOOLEAN,
           
            defaultValue: true
        },
        dress: {
            type: Sequelize.STRING
        
        },


        attendees: Sequelize.INTEGER,

        themed: {
            type: Sequelize.BOOLEAN
         
        },

        food: {
            type: Sequelize.BOOLEAN
        
        },


        decorations: {
            type: Sequelize.BOOLEAN
            
        },

        cake: {
            type: Sequelize.BOOLEAN
            
        },

        alcohol: {
            type: Sequelize.BOOLEAN
            
        },

        timeOfDay: {
            type: Sequelize.STRING
          }

    });

    Events.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Events.hasMany(models.Tasks, {
            onDelete: "cascade"
        });
        Events.belongsTo(models.Users, {
            onDelete: "cascade",
            foreignKey: "UserId"

        });
    };


    return Events;
};








