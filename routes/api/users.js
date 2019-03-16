const express = require('express');
const router = express.Router();
const User=require('../../models/User')
const validator = require('../../validator/validators.js');
const passport=require('passport')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var keys =require('../../config/keys');


router.post('/signup',function signup(req,res) {
	// body...
	var validate = validator.isvalidphone(req.body)
	if (validate["value"]!="valid") {
	res.send(validate)
    }
	else if (validate["value"]=="valid") {
		
		var salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(req.body.password,salt,10)
	User.findOne({'phone':req.body.phone},function isuser(err,result) {
		if (err){
			console.log(err)
		}
	    if (result) {
	    	res.send({"value":`${result.name} , You have already signed up at ${result.Time.toLocaleString()}`})
	    }
	    else if (result={}) {
	    	var newuser= new User({
	    		name : req.body.name,
	    		phone : req.body.phone,
	    		password : hash
	    	});
	    	console.log(newuser);
	    	if (newuser.name&&newuser.phone&&newuser.password) {
	    	newuser.save(function save(err){
	    		if (err) {
	    			console.log(err)
	    		}
	    		res.send({"value":"Signed up successfully"})
	    	})
	      }
	    }
	
	})
	}
	
})

router.post('/login',function login(req,res){

	var validate = validator.isvalidphonelogin(req.body)
	if (validate["value"]!="valid") {
	res.send(validate)
    }
	else if (validate["value"]=="valid") {

	    User.findOne({'phone':req.body.phone},function isuser(err,user) {
		if (err){
			res.send(err)
		}
	    if (user) {
	    	var hash= user.password
	    	if(bcrypt.compareSync(req.body.password, hash)) {
	    		const payload = { id: user.id, name: user.name, phone:user.phone };
	    		jwt.sign(
						  payload
						  ,keys.jwtkey, { expiresIn: '1h' },
						  (err,token)=>{
	    		res.json({
	    			success: true,
	    			token :'Bearer '+ token
	    		})
	    	});
			    
			} else {
			     res.send({"value":"Phone or Password incorrect"})
			}

	    }
	    else if (user={}) {
	    	res.send({"value":"Please signup first"})
	    }
	})
	}
})

// current user route
// router.get('/current',passport.authenticate('jwt',{session:false}, function currentuser(req,res) {
// 	// body...
// 	res.json({
// 		id:req.user.id,
// 		phone:req.user.phone,
// 		name:req.user.name
// 	})
// }):
// ):
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      // id: req.user.id,
      name: req.user.name,
      phone: req.user.phone
    });
  }
);


module.exports =router;