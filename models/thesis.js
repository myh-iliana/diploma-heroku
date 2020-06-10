'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thesis = sequelize.define('Thesis', {
    author: DataTypes.INTEGER,
    subauthors: DataTypes.STRING,
    udc: DataTypes.STRING,
    title: DataTypes.STRING,
    conference: DataTypes.STRING,
    city: DataTypes.STRING,
    dates: DataTypes.STRING,
    collectionPages: DataTypes.STRING,
    pages: DataTypes.STRING,
    annotations: DataTypes.TEXT,
    issn: DataTypes.STRING,
    doi: DataTypes.STRING,
    isScopusAndWS: DataTypes.BOOLEAN,
    isScientometrics: DataTypes.BOOLEAN,
    isInternational: DataTypes.BOOLEAN,
    files: DataTypes.STRING,
  }, {});
  Thesis.associate = function(models) {
    Thesis.belongsToMany(models.User, {
      through: {
        model: models.UserPosts,
        unique: false,
        scope: {
          postType: 'thesis'
        }
      },
      foreignKey: 'postId',
      constraints: false
    })
  };
  return Thesis;
};
