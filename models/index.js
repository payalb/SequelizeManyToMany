'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User.belongsToMany(db.User,{as: "User" ,through: "User_Follower", foreignKey: "f_id"});//User has association with Followers
db.User.belongsToMany(db.User, {as: "Follower", through: "User_Follower", foreignKey: "u_id"})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({force: true}).then(async()=>{

 var user = await db.User.create({ "firstname": "payal", "lastname": "bansal","email": "bansal@gmail.com", "password": "payal123"})
 var follower1 = await  db.User.create({ "firstname": "f1", "lastname": "test","email": "f1@gmail.com", "password": "f1"})
 var follower2 = await  db.User.create({ "firstname": "f2", "lastname": "test","email": "f2@gmail.com", "password": "f2"})
  await user.addFollower(follower1);
 await user.addFollower(follower2);
  console.log(JSON.stringify(await user.getFollower()));
    module.exports = db;
   }).catch((e)=>{
    console.log(e);
  });
 