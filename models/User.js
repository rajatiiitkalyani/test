const mongoose =require('mongoose');
const Schema =mongoose.Schema;



const employerSchema = new Schema({
	name:{
		type:String,
		require:true
	},
	phone:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true
	},
	Time:{
		type:Date,
		default:Date.now()
	}

},{timestamp:true})

module.exports=Users=mongoose.model('users',employerSchema);