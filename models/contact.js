var mongoose = require("mongoose");
var contactSchema= mongoose.Schema({
	fname : {
		type : String,
		required: true
	},
	lname : {
		type : String,
		required: true
	},
	email :{
		type : String,
		required : true
	},
	password : {
		type : String,
		required: true
	},
	reenterpassword : {
		type : String,
		required: true
	},
	mobile : {
		type : String,
		required : true
	},
	dob : {
		type : String,
		required : true
	},
});

var Contact = module.exports = mongoose.model("contact", contactSchema, "contact");


module.exports.createContact = function(contactObj, callback){
	return Contact.create(contactObj, callback)
}

