'use strict';
module.exports = (sequelize, DataTypes) => {
  const Periodicity = sequelize.define('Periodicity', {
    author: DataTypes.INTEGER,
    subauthors: DataTypes.STRING,
    udc: DataTypes.STRING,
    title: DataTypes.STRING,
    journal: DataTypes.STRING,
    issueNumber: DataTypes.INTEGER,
    journalPages: DataTypes.STRING,
    pages: DataTypes.STRING,
    annotations: DataTypes.TEXT,
    issn: DataTypes.STRING,
    doi: DataTypes.STRING,
    isScopusAndWS: DataTypes.BOOLEAN,
    isScientometrics: DataTypes.BOOLEAN,
    isProfessional: DataTypes.BOOLEAN,
    isElectronic: DataTypes.BOOLEAN,
    files: DataTypes.STRING,
  }, {});
  Periodicity.associate = function(models) {
    Periodicity.belongsToMany(models.User, {
      through: {
        model: models.UserPosts,
        unique: false,
        scope: {
          postType: 'periodicity'
        }
      },
      foreignKey: 'postId',
      constraints: false
    })
  };
  return Periodicity;
};
