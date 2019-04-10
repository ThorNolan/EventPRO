

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
        dress: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },


        attendees: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },

        themed: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },

        food: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },


        decorations: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },

        cake: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },

        alcohol: {
            type: Sequelize.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
        },


    });

    Events.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Events.hasMany(models.Tasks, {
            onDelete: "cascade"
        });
        Events.belongsTo(models.Users, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }

        });
    };


    return Events;
};








