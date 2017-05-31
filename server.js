var express = require("express");
var app= express();
var router = express.Router();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var path = require("path");
var Contact = require("./models/contact");


var jwt = require("jsonwebtoken");
var morgan = require("morgan");

var config = require("./config");
var User = require("./models/contact");

app.use(morgan('dev'));
app.set('secretkey',config.SECRET); // to set the key
console.log(app.get('secretkey')); //to get the key value




app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


mongoose.connect("mongodb://localhost/contactlist-app", function(){
	console.log("Succesfully connected to Database");
})

/*mongoose.connect(config.DATABASECON,function(){
	console.log("db connected successfully...");
})
*/





router.post("/", function(request, response){
	var contactObj = request.body;

	Contact.createContact(contactObj, function(err, contactObj){
		if(err){
			throw err;
		}
		response.json(contactObj)
	})
})

//for authentication
router.post("/authenticate" , function(req,res){
var username = req.body.fname;
var password = req.body.password;
User.getUserByName(username , function(err,user){
	if(err){
		throw err;
		console.log("wrong");
	}

	if(!user){
		console.log("hii");
res.json({success : false,
          message : "authentication failed , user not found"
        })
	}
	else if(user)
	{
if(user.password != password ){
	res.json({
		success : false,
		message : "authentication failed , password not matched"
	})
	}
else{
var token = jwt.sign(user , app.get('secretkey'))
res.json({
	success : true,
	message : "here is your token",
	token : token
})
}

}

});
})


app.use("/", router)

var PORT = process.env.PORT || 1336;
app.listen(PORT, function(){
	console.log("Server is listtening at PORT " + PORT)
})