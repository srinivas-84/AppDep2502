const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require('path');


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads",express.static('uploads'));
app.use(express.static(path.join(__dirname, 'client', 'build')));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})

const upload = multer({ storage: storage });

// app.get("*",(req,res)=>{
//   res.sendFile("./client/build/index.html");
// });

app.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body);
    let userArr = await user.find().and([{email:req.body.email}]);
    if (userArr.length > 0){
        let isValidPassword = await bcrypt.compare(req.body.password,userArr[0].password)
        if(isValidPassword === true){
            let token = jwt.sign({email:req.body.email,password:req.body.password},"haaa")
            let dataToSend = {
               firstName: userArr[0].firstName,
               lastName: userArr[0].lastName,
               age: userArr[0].age,
               email: userArr[0].email,
               mobileNo: userArr[0].mobileNo,
               profilePic: userArr[0].profilePic,
               token:token
            }
            res.json({status:"Success",msg:"Credentials are correct",data:dataToSend});
        }else{
            res.json({status:"Failure",msg:"Invalid password"});
        }
    }else{
        res.json({status:"Failure", msg:"User does not exist"});
    }
});

app.post("/validateToken",upload.none(),async(req,res)=>{
    console.log(req.body);
    let decryptedCredentials = jwt.verify(req.body.token,"haaa");
    console.log(decryptedCredentials);
    let userArr = await user.find().and([{email:decryptedCredentials.email}]);
    if (userArr.length > 0){
        if(userArr[0].password === decryptedCredentials.password){
            
            let dataToSend = {
               firstName: userArr[0].firstName,
               lastName: userArr[0].lastName,
               age: userArr[0].age,
               email: userArr[0].email,
               mobileNo: userArr[0].mobileNo,
               profilePic: userArr[0].profilePic,
               token:token
            }
            res.json({status:"Success",msg:"Credentials are correct",data:dataToSend});
        }else{
            res.json({status:"Failure",msg:"Invalid password"});
        }
    }else{
        res.json({status:"Failure", msg:"User does not exist"});
    }
});

app.post("/signup",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file); 
    let hashedPassword = await bcrypt.hash(req.body.password,10)
    try{
        let newUser = new user ({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:hashedPassword,
            mobileNo:req.body.mobileNo,
            profilePic:req.file.path
        });
        console.log("Successfully inserted the data into DB")
        await user.insertMany([newUser]);
        res.json({status:"Success", msg:"Account created successfully"});
    }catch(err){
        console.log("Unable to insert the data into DB");
        res.json({status:"Failed", mag:"Unable to create account"});
    }
})

app.patch("/editProfile",upload.single("profilePic"),async(req,res)=>{
    try {
        if(req.body.firstName.trim().length > 0){
        await user.updateMany({email:req.body.email},{firstName:req.body.firstName});
    }
    if(req.body.lastName.trim().length > 0){
        await user.updateMany({email:req.body.email},{lastName:req.body.lastName});
    }
    if(req.body.age.trim().length > 0){
        await user.updateMany({email:req.body.email},{age:req.body.age});
    }
    if(req.body.password.trim().length > 0){
        await user.updateMany({email:req.body.email},{password:req.body.password});
    }
    if(req.body.mobileNo.trim().length > 0){
        await user.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo});
    }
    if(req.file){
        await user.updateMany({email:req.body.email},{profilePic:req.file.path});
    }
    res.json({status:"success",msg:"account updated successfully"});
    } catch (err) {
        res.json({status:"failure",msg:"unable to update"});
    }
})

app.delete("/deleteProfile",upload.none(),async (req,res)=>{
    let deleteResult = await user.deleteMany({email:req.body.email})
    if(deleteResult.deletedCount > 0){
        res.json({status:"Success",msg:"Account is deleted successfully"});
    }else{
        res.json({status:"Failure",msg:"Unable to delete the account"})
    }
})

app.listen(3690,()=>{
    console.log("Listening to port 3690");
});

let userSchema = new mongoose.Schema({
            firstName:String,
            lastName:String,
            age:Number,
            email:String,
            password:String,
            mobileNo:Number,
            profilePic:String
});

let user = new mongoose.model("brn",userSchema,"users");

let connectToMDB = async ()=>{
    try{
            await mongoose.connect("mongodb+srv://srinivasb:srinivasb@cluster0.livgqvw.mongodb.net/BRN2502?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Successfully connected to MDB");
        }catch(err){
            console.log("Unable to connect to MDB");
        }
}
connectToMDB();
