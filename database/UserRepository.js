const db = require("../models")

class UserRepository{

    static async save(u){
        var user = db.User.build(u);
        return user.save().then((data)=>  data);
    }

    static async getAllUsers(){
      return db.User.findAll();
    }

    static async getUserById(uid){
      return db.User.findOne({include: [{model: db.Post}]},{where: {id: uid}});
    }

   static async deleteUserById(uid){
      return db.User.destroy({where: { id: uid}});
    }

    static async updateUserById(u, userid){
      await db.User.update(u, {where: {id: userid}});
      return db.User.findByPk(userid);
    }
}

module.exports = UserRepository;