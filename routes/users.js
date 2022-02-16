const express= require("express")
const app = express();
const router = express.Router();
const UserRepository = require("../database/UserRepository")
const db = require("../models")

router.route("/").post(async (req,resp)=>{
    var u = req.body ;
    UserRepository.save(u).then((data)=> 
       resp.status(201).send(data)
    ).catch((err)=> resp.status(500).send({"Error": err}))
}).get(async (req,resp)=>{
    UserRepository.getAllUsers().then((data)=> 
       resp.send(data)
    ).catch((err)=> resp.status(500).send({"Error": err}))
});

router.route("/:userid").get(async (req,resp)=>{
    var uid = req.params.userid ;
    UserRepository.getUserById(uid).then((data)=> 
       resp.send(data)
    ).catch((err)=> resp.status(500).send({"Error": err}))
}).delete(async (req, resp)=> {
    UserRepository.deleteUserById(req.params.userid).then((data)=> {
        resp.status(200).send();
    }).catch((err)=> resp.status(500).json({"Error": err}))
}).put(async (req, resp)=> {
    UserRepository.updateUserById(req.body, req.params.userid).then((data)=> {
        resp.status(200).send(data);
    }).catch((err)=> resp.status(500).json({"Error": err}))
})



module.exports= router