'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*
        Siempre empezaremos definiendo el modelo Js a referenciar
        Seguido de los datos: 
        as: que servirá de alias en las consultas y mixins
      	
        foreignKey: Aquí especificamos de acuerdo con la función.
          1.- belongsTo: 'El campo en esta tabla que es FK es:'
          2.- hasOne, hasMany, belongsToMany: 'El campo en la otra tabla que es FK es:'
  
        through: Solo funciona en belongsToMany, especiifica la tabla pivote usando el modelo js
      */
      // Users.belongsTo(models.MODELNAME1, {as: 'country', foreignKey: 'country_id'})
      // Users.hasOne(models.Profiles, {as: 'profiles', foreignKey: 'user_id'})
      // Users.hasMany(models.Profiles, {as: 'profiles', foreignKey: 'user_id'})
      // Users.belongsToMany(models.MODELNAME4, {as: 'votes', through: models.Votes, foreignKey: 'user_id'})

      // Relations - USERS

      Users.hasMany(models.Profiles, { as: 'profile', foreignKey: 'user_id' })

      // Consejo avanzado, esta aquí por si más adelante hay una lección.
      // Algunas veces, el scope tendrá includes
      // para evitar errores es usual usarlo así
      // Users.addScope('scope_name', {})
    }
  };
  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email_verified: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Users',  // Hacemos la diferencia del modelo
    tableName: 'users',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'first_name', "last_name", "email", "username"]
      },
      user_info: {
        attributes: ['id', "email", "username"]
      },
      check_user: {
        attributes: ['id', 'first_name', "last_name", "email", "username", "password"]
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return Users
}