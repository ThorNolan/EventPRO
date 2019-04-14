var Sequelize = require("sequelize");

module.exports = function(sequelize, Sequelize) {
// Creates a "Users" model that matches up with DB
var Users = sequelize.define("Users", {
    userName: {
        type: Sequelize.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
            len: [1, 250]
        }
    },

    userType: {
        type: Sequelize.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: true,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
            len: [1, 250]
        }
    },

    userPassword: {
        type: Sequelize.STRING,

        allownull: false
    }


});

Users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Users.hasMany(models.Events, {
      onDelete: "cascade"
    })
  };


return Users;
};



