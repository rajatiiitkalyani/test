const isvalidphone = function validphone(body) {
	// body...
	var error;
	if (!body.name) {
		error = "Please enter the name";
		return {"value":error}
	}
	else if (!body.phone){
		error="Please enter the phone no.";
		return {"value":error}
	}
	else if (!body.password) {
		error="Please enter the password";
		return {"value":error}
	}
	else if (body.phone) {

		k=body.phone.length
		l=body.phone[0]
		if(k!=10 || l=='0'){
		error="please enter the valid Phone no.";
		return {"value":error}
	}
		else{
			return {"value":"valid"}
		}
	}
	
}
const isvalidphonelogin=function validphone(body){
	var error;
	if (!body.phone) {
		error="Please enter the phone no."
		return {"value":error}
	}
	if (!body.password) {
		error="Please enter the password."
		return {"value":error}
	}
	else if (body.phone) {

		k=body.phone.length
		l=body.phone[0]
		if(k!=10 || l=='0'){
		error="please enter the valid Phone no.";
		return {"value":error}
	}
		else{
			return {"value":"valid"}
		}
	}
}
module.exports.isvalidphone=isvalidphone
module.exports.isvalidphonelogin=isvalidphonelogin