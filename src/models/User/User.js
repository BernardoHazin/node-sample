const {hashPassword, comparePassword} = require('../../controllers/userController/functions')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(128).BINARY,
      defaultValue: '-'
    },
    password: {
      type: DataTypes.STRING(128).BINARY,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  User.prototype.comparePassword = comparePassword
  
  User.associate = function (models) {
    // Set Associations
    // User.belongsTo(models.Wallet, {foreignKey: 'wallet'})
  }

  return User
}
