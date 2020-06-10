'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPosts = sequelize.define('UserPosts', {
    userId: {
      type: DataTypes.INTEGER,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: null
    },
    postType: DataTypes.STRING
  }, {
    timestamps: false,
  });
  UserPosts.associate = function(models) {
    // associations can be defined here
  };
  return UserPosts;
};
