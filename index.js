const express= require("express")
const app = express();
const router = express.Router();
const userroutes = require("./routes/users")
const db = require("./models")
require("dotenv").config();
const PORT = process.env.port || 4000;

//middleware
app.use(express.json());



//middleware
app.use("/users", userroutes);

app.get("/", (req, resp)=> {
    resp.send("data");
})
app.listen(PORT, ()=> {
    console.log(`server running at ${PORT}`)
});