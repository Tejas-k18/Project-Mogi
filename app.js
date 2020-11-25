//jshint esversion:6

const express = require("express"); //including express.js package
const bodyParser = require("body-parser"); //including body parser package
const ejs = require("ejs"); //including ejs package
const _ = require("lodash") // including lodash package
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/ghumatMogi",{
  useNewUrlParser : true,
  useUnifiedTopology : true
});

const memberSpecification = new mongoose.Schema({
  memberName : {
    type : String,
    required : [true , "Enter your member name"]
  },

  role : {
    type : String,
    required : [true, "Enter the role,Eg: Ghumat vadak,Shamel vadak etc."]
  }
});

const Member = mongoose.model("Member",memberSpecification);

const groupSchema = new mongoose.Schema({
  groupName : {
    type : String,
    required :[true , "Please give a name of your group!!"]
  },
  groupLeader : {
    type : String,
    required : [true , "Name of your group leader Please!!"]
  },
  groupMembers : {
    type : [memberSpecification],
    required : [true , "Enter the name and role of your members.!"]
  },
  groupMaster : {
    type : String,
    required : [true , "Name of your group teacher Please!!"]
  },
  groupAddress :{
    type : String,
    required : [true, "Where is your group from,Eg:Mapusa,Panjim"]
  },
  aarat : {
    type : String,
    required : [true, "Enter the aarat name to be uploaded"]
  },
  aaratLyrics : {
    type : String,
    required : [true, "Add your Aarat Lyrics"]
  },
  whatsappContact : {
    type : Number,
    required : [true, "Whatsapp CONTACT for any other info"]
  }
});
const Group = mongoose.model("Group",groupSchema);


const itemsPrice = new mongoose.Schema({
  instrument : {
    type : String,
    required : [true, "instrument name"]
  },

  price : {
    type : Number,
    required : [true, "instrument Price"]
  }
});
const Item = mongoose.model("Item",itemsPrice);

const vendorSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true , "Your Name Please"]
  },

  address : {
    type : String,
    required : [true, "Where is your Bussiness Situated ?"]
  },

  contact : {
    type : Number,
    required : [true, "Your Contact No. Please !!"]
  },

  items : {
    type :[itemsPrice],
    required : [true, "your selling item n Price"]
  }
});
const Vendor = mongoose.model("Vendor",vendorSchema);


const quoteSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, "Please Enter Your Name"]
  },

  content : {
    type : String,
    required : [true, "Please Enter your Quote"]
  }
});
const Quote = mongoose.model("Quote",quoteSchema);


//route for home page
app.get("/",function(req,res){

Quote.find({},function(err,foundQuotes){
  if(!err){
    res.render("home",{
      quotes : foundQuotes
    });
  }
});
});

//route for about us page
app.get("/about",function(req,res){

  res.render("about");

});


//route for contact us page
app.get("/contact",function(req,res){

  res.render("contact");

});


//route for compose post page
app.get("/compose",function(req,res){

  res.render("compose");

});



//post route of compose page
app.post("/compose",function(req,res){
  const quote = new Quote ({
    content : req.body.postContent,
    name : req.body.postAuthorName
  });

  quote.save(function(err){
    if(!err){
      res.redirect("/")
    }
  });
});

var port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server Started Successfully!!");
});
