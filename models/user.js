'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isTeacher: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    cathedraId: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Cathedra, { foreignKey: 'cathedraId', as: 'cathedra' });

    User.belongsToMany(models.Monograph, {
      through: {
        model: models.UserPosts,
        unique: false
      },
      foreignKey: 'userId',
      constraints: false
    });

    User.belongsToMany(models.Periodicity, {
      through: {
        model: models.UserPosts,
        unique: false
      },
      foreignKey: 'userId',
      constraints: false
    });

    User.belongsToMany(models.Thesis, {
      through: {
        model: models.UserPosts,
        unique: false
      },
      foreignKey: 'userId',
      constraints: false
    });
  };

  return User;
};
