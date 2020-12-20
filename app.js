const express = require("express"); //including express.js package
const bodyParser = require("body-parser"); //including body parser package
const ejs = require("ejs"); //including ejs package
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/ghumatMogi",{
  useNewUrlParser : true,
  useUnifiedTopology : true
});


//--------------------------------- GROUP REQUEST REGISTRATION SCHEMA ----------------------------------

const groupSchema = new mongoose.Schema({

  _id : mongoose.Schema.Types.ObjectId,

  groupName : {
    type : String,
    required :[true , "Please give a name of your group!!"]
  },
  groupLeader : {
    type : String,
    required : [true , "Name of your group leader Please!!"]
  },
  // groupMembers : [{
  //   type : mongoose.Schema.Types.ObjectId,
  //   required : [true , "Enter the name and role of your members.!"],
  //   ref : 'Member'
  // }],
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

// const memberSpecification = new mongoose.Schema({
//   memberName : {
//     type : String,
//     required : [true , "Enter your member name"]
//   },
//
//   role : {
//     type : String,
//     required : [true, "Enter the role,Eg: Ghumat vadak,Shamel vadak etc."]
//   },
//
//   grpName : {
//     type : mongoose.Schema.Types.ObjectId,
//     ref : 'Group'
//   }
// });
//
// const Member = mongoose.model("Member",memberSpecification);


//--------------------------------- VENDOR REGISTRATION SCHEMA ----------------------------------

const vendorSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,

  vendorName : {
    type : String,
    required : [true , "Your Name Please"]
  },

  vendorAddress : {
    type : String,
    required : [true, "Where is your Bussiness Situated ?"]
  },

  vendorContact : {
    type : Number,
    required : [true, "Your Contact No. Please !!"]
  },

  vendorItems : {
    type :String,
    required : [true , "Enter the Item Name!"]
  }
});
const Vendor = mongoose.model("Vendor",vendorSchema);


// const itemsPrice = new mongoose.Schema({
//   instrument : {
//     type : String,
//     required : [true, "instrument name"]
//   },
//
//   price : {
//     type : Number,
//     required : [true, "instrument Price"]
//   },
//
//   venName : {
//     type : mongoose.Schema.Types.ObjectId,
//     ref : 'Vendor'
//   }
// });
// const Item = mongoose.model("Item",itemsPrice);


//--------------------------------- QUOTE SCHEMA ------------------------------------

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


//--------------------------------- QUOTE SCHEMA ------------------------------------

const masterSchema = new mongoose.Schema({
  masterName : {
    type : String,
    required : [true, "Name of Master"]
  },
  masterAge : {
    type : Number,
    required : [true, "Age of the Master"]
  },
  masterAddress : {
    type : String,
    required : [true,"Place of Stay"]
  },
  groupsTeaching : {
    type : String,
    required : [true,"How many groups Guiding"]
  },
  masterAchievements : {
    type : String,
    required : [true,"Awards/Prizes of Master"]
  }
});
const Master = mongoose.model("Master",masterSchema);


//route for home page
app.get("/",function(req,res){

  res.render("home");

});



//route for compose post page
app.get("/compose",function(req,res){

  Quote.find({},function(err,foundQuotes){
    if(!err){
      res.render("compose",{
        quotes : foundQuotes
      });
    }
  });



});


//route for groups request form page
app.get("/groups",function(req,res){

  Group.find({},function(err,foundGroups){
    if (!err) {
      res.render("groups",{
        groups : foundGroups
      });
    }
  });
});


//route for vendor register form page
app.get("/vendors",function(req,res){

Vendor.find({},function(err,foundVendors){
  if (!err) {
    res.render("vendors",{
      vendors : foundVendors
    });
  }
});
});

//route for Masters view  page
app.get("/masters",function(req,res){

Master.find({},function(err,foundMasters){
  if (!err) {
    res.render("masters",{
      masters : foundMasters
    });
  }
  });
});


app.get("/composeForm",function(req,res){

  res.render("composeForm");

});


app.get("/groupsRequestForm",function(req,res){

  res.render("groupsRequestForm");

});



app.get("/vendorRegisterForm",function(req,res){

  res.render("vendorRegisterForm");

});

app.get("/masterEntryForm",function(req,res){

  res.render("masterEntryForm");

});


//route for individual group page
app.get("/group/:groupId",function(req,res){

  const requestedGroupId = req.params.groupId;

  Group.findOne({_id : requestedGroupId},function(err,group){
    if(!err){
        res.render("group",{
          grpName:group.groupName,
          grpLeader:group.groupLeader,
          grpMaster:group.groupMaster,
          grpAddress : group.groupAddress,
          grpAarat : group.aarat,
          aaratLyrics : group.aaratLyrics,
          cont: group.whatsappContact
        });
      }
    });
});





//post route of compose page
app.post("/composeForm",function(req,res){
  const quote = new Quote ({
    content : req.body.postContent,
    name : req.body.postAuthorName
  });

  quote.save(function(err){
    if(!err){
      res.redirect("/compose")
    }
  });
});


//post route of groups request form page
app.post("/groupRequestForm",function(req,res){
  const groupRequest = new Group ({
    _id :  new mongoose.Types.ObjectId(),
    groupName : req.body.grpName,
    groupLeader : req.body.grpLeaderName,
    groupMaster : req.body.grpMasterName,
    groupAddress : req.body.grpAddr,
    aarat : req.body.aaratName,
    aaratLyrics : req.body.aaratLyrics,
    whatsappContact : req.body.grpContact
  });

  groupRequest.save(function(err){
    if (err) {
      console.log(err);
    }else{
        res.redirect("/groups");
    }
  });
});

//post route of vendor register form page
app.post("/vendorRegisterForm",function(req,res){

  const newVendor = new Vendor({
      _id : new mongoose.Types.ObjectId(),
      vendorName : req.body.venName,
      vendorAddress : req.body.venAddr,
      vendorContact : req.body.venContact,
      vendorItems : req.body.venItems
  });

  newVendor.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/vendors");
    }
  });
});


app.post("/masterEntryForm",function(req,res){

  const newMaster = new Master({
    masterName : req.body.mastName,
    masterAge : req.body.mastAge,
    masterAddress : req.body.mastAddr,
    groupsTeaching : req.body.grpTeaching,
    masterAchievements : req.body.mastAchievements
  });

  newMaster.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/masters");
    }

  });
});


// app.post("/memberForm",function(req,res){
//   const members = new Member ({
//     memberName : req.body.memberName,
//     memberRole: req.body.memberRole,
//     groupName : req.body.grpname
// });
//
//   members.save(function(err){
//     if(!err){
//       res.redirect("/groupRequestForm")
//     }
//   });
// });


var port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server Started Successfully!!");
});
