'use strict';
module.exports = (sequelize, DataTypes) => {
  const Monograph = sequelize.define('Monograph', {
    author: DataTypes.INTEGER,
    subauthors: DataTypes.STRING,
    title: DataTypes.STRING,
    section: DataTypes.STRING,
    monographPages: DataTypes.STRING,
    printPages: DataTypes.STRING,
    pages: DataTypes.STRING,
    year: DataTypes.INTEGER,
    annotations: DataTypes.TEXT,
    isbn: DataTypes.STRING,
    doi: DataTypes.STRING,
    isEuLanguage: DataTypes.BOOLEAN,
    files: DataTypes.STRING,
  }, {});
  Monograph.associate = function(models) {
    Monograph.belongsToMany(models.User, {
      through: {
        model: models.UserPosts,
        unique: false,
        scope: {
          postType: 'monograph'
        }
      },
      foreignKey: 'postId',
      constraints: false
    })
  };
  return Monograph;
};
