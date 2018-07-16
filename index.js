var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//const users=[];

app.get('/listAllUsers',(req,res)=>{
fs.readFile('./users.json', 'utf-8', function(err, data) {
if (err) throw err
var arrayOfObjects = JSON.parse(data)
res.send(arrayOfObjects);
});

});


app.post('/profile/addUser/',(req,res)=>{
var usersList=[];
var newUser;
//console.log('New User created is '+JSON.stringify(newUser));
fs.readFile('./users.json', 'utf-8', function(err, data) {
if (err) throw err
usersList = JSON.parse(data);
console.log('Data in the User\'s array is'+JSON.stringify(usersList));
console.log('Data in the User\'s array is'+JSON.stringify);
console.log(usersList.users.length);
newUser={

id:usersList.users.length+1,
imageName:req.body.imageName,
userName: req.body.userName,
mobileNumber:req.body.mobileNumber,
profession:req.body.profession,
emailId:req.body.emailId

};

usersList.users.push(newUser);

console.log('Finally the data in the USer DB is '+JSON.stringify(usersList));
fs.writeFile('./users.json', JSON.stringify(usersList), 'utf-8', function(err) {
if (err) throw err

console.log('JSON File updated!')});

}); 

res.send('<html><body><h1>Data Inserted Sucessfully</h1>'

//+req.body.imageName
//+'<table border='1'>'+
// +'<tr><td>Id</td><td>imageName</td><td>userName</td><td>mobileNumber</td><td>profession</td></tr>' 
//+'<table/>'+
+'</body></html>');
});

app.post('/profile/upDateUser/',(req,res)=>{
const email=req.body.email;
fs.readFile('./users.json', 'utf-8', function(err, data) {
if (err) throw err
var arrayOfObjects = JSON.parse(data);
arrayOfObjects.users.forEach(function(element) {
if(element.emailId == email){

//JSON.stringify(

//console.log('Got it'+JSON.stringify(element));

res.send('<html><body><h3>UPDATE THE VALUES TO CHANGE</h3><form action="http://127.0.0.1:3000/profile/upDateUserSucessfull/'+element.id+'" method="POST" id="onuform"><table boder="1">'
+'<tr><td>Email Id:</td><td><input type="text" name="emailId" disabled value="'+element.emailId+'"</td></tr>'
+'<tr><td>Image Name:</td><td><input type="text" name="imageName" value="'+element.imageName+'"</td></tr>'
+'<tr><td>User Name:</td><td><input type="text" name="userName" value="'+element.userName+'"</td></tr>'
+'<tr><td>Mobile Number:</td><td><input type="text" name="mobileNumber" value="'+element.mobileNumber+'"</td></tr>'
+'<tr><td>Profession:</td><td><input type="text" name="profession" value="'+element.profession+'"</td></tr>'
+'<tr><td><button type="submit" id="onuform" value="UPDATE"><strong>Submit</strong></button></tr></td>'
+'<table></form></body></html>');}

//else{res.send('<html><body><h2>Sorry no such registered mail Id Exist</h2></body></html>');}

});

})});



app.post('/profile/upDateUserSucessfull/:id',(req,res)=>{
var i=0;
// res.send('Hello');
var j;
fs.readFile('./users.json', 'utf-8', function(err, data) {
var arrayOfObjects = JSON.parse(data)
//console.log(arrayOfObjects);
for(var i=0;i<arrayOfObjects.users.length;i++)
{

//Dout === and == 

 if(arrayOfObjects.users[i].id == req.params.id){

    j=i;
	console.log(JSON.stringify(arrayOfObjects.users[i])+"We r in"+j);
	arrayOfObjects.users[i].imageName=req.body.imageName;
	arrayOfObjects.users[i].userName=req.body.userName;
	arrayOfObjects.users[i].profession=req.body.profession;
	arrayOfObjects.users[i].mobileNumber=req.body.mobileNumber;

} 

}

console.log("Updated "+JSON.stringify(arrayOfObjects.users[0]));
fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
if (err) throw err
  console.log('JSON File updated!')});
})//readFile*/
res.send('<h1>Sucessfuly Updated</h1>');
});

app.post('/profile/deleteUser/',(req,res)=>{
const email=req.body.email; 
fs.readFile('./users.json', 'utf-8', function(err, data) {
if (err) throw err
var arrayOfObjects = JSON.parse(data);
arrayOfObjects.users.forEach(function(element) {
if(element.emailId === email){
	//JSON.stringify(
	//console.log('Got it'+JSON.stringify(element));
	res.send('<html><body><h3>Are You Sure To Delete The User !!!</h3><form action="http://127.0.0.1:3000/profile/deleteUserSucessfull/'+element.id+'" method="POST" id="onuform"><table boder="1">'
	+'<tr><td>Email Id:</td><td><input type="text" name="emailId" disabled value="'+element.emailId+'"</td></tr>'
	+'<tr><td>Image Name:</td><td><input type="text" name="imageName" disabled value="'+element.imageName+'"</td></tr>'
	+'<tr><td>User Name:</td><td><input type="text" name="userName"disabled value="'+element.userName+'"</td></tr>'
	+'<tr><td>Mobile Number:</td><td><input type="text" name="mobileNumber" disabled value="'+element.mobileNumber+'"</td></tr>'
	+'<tr><td>Profession:</td><td><input type="text" name="profession" disabled value="'+element.profession+'"</td></tr>'
	+'<tr><td><button type="submit" id="onuform" value="UPDATE"><strong>Submit</strong></button></tr></td>'
	+'<table></form></body></html>');}

//else{res.send('<html><body><h2>Sorry no such registered mail Id Exist</h2></body></html>');}
});
})});


app.post('/profile/deleteUserSucessfull/:id',(req,res)=>{
var i=0;
// res.send('Hello');
var j;
fs.readFile('./users.json', 'utf-8', function(err, data) {
var arrayOfObjects = JSON.parse(data)
//console.log(arrayOfObjects);
for(var i=0;i<arrayOfObjects.users.length;i++)
 {
//Dout === and == 
	if(arrayOfObjects.users[i].id == req.params.id){
	j=i;
	console.log(JSON.stringify(arrayOfObjects.users[i])+"We r in"+j);
	delete arrayOfObjects.users[i];
 } 
}
fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
if (err) throw err
console.log('JSON File updated!')});
})//readFile*/
res.send('<h1>Sucessfuly Deleted</h1>');
});


app.post('/profile/userDetails/',(req,res)=>{
const email=req.body.email; 
fs.readFile('./users.json', 'utf-8', function(err, data) {
if (err) throw err
var arrayOfObjects = JSON.parse(data);
arrayOfObjects.users.forEach(function(element) {
if(element.emailId === email){
res.send('<html><body><h3>USER\'S DETAILS !!!</h3><form method="POST" id="onuform"><table boder="1">'
+'<tr><td>Email Id:</td><td><input type="text" name="emailId" disabled value="'+element.emailId+'"</td></tr>'
+'<tr><td>Image Name:</td><td><input type="text" name="imageName" disabled value="'+element.imageName+'"</td></tr>'
+'<tr><td>User Name:</td><td><input type="text" name="userName"disabled value="'+element.userName+'"</td></tr>'
+'<tr><td>Mobile Number:</td><td><input type="text" name="mobileNumber" disabled value="'+element.mobileNumber+'"</td></tr>'
+'<tr><td>Profession:</td><td><input type="text" name="profession" disabled value="'+element.profession+'"</td></tr>'
+'<table></form></body></html>');}
//else{res.send('<html><body><h2>Sorry no such registered mail Id Exist</h2></body></html>');}
});
})});

app.post('/profile/deleteUserAjax/',(req,res)=>{
const email=req.body.email; 
fs.readFile('./users.json', 'utf-8', function(err, data) {
if (err) throw err
var arrayOfObjects = JSON.parse(data);
arrayOfObjects.users.forEach(function(element) {
if(element.emailId === email){

var   userDelete="<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n";
      userDelete+= "<script>function doDelete(){\n";
      userDelete+= "alert('Hello');\n"
      userDelete+="$.ajax({\n";
      userDelete+="method: 'DELETE',\n";
      userDelete+= "url: \"http://127.0.0.1:3000/profile/deleteUserAjax/"+element.id+"\""+",\n";
      userDelete+= "});}</script>";



res.send('<html><body><h3>Are You Sure To Delete The User !!!</h3>'
+userDelete
+'<table>'
+'<tr><td>Email Id:</td><td><input type=\"text\" name=\"emailId\" disabled value=\"'+element.emailId+'\"</td></tr>\n'
+'<tr><td>Image Name:</td><td><input type="text" name="imageName" disabled value=\"'+element.imageName+'\"</td></tr>\n'
+'<tr><td>User Name:</td><td><input type="text" name="userName"disabled value=\"'+element.userName+'\"</td></tr>\n'
+'<tr><td>Mobile Number:</td><td><input type="text" name="mobileNumber" disabled value=\"'+element.mobileNumber+'\"</td></tr>\n'
+'<tr><td>Profession:</td><td><input type="text" name="profession" disabled value=\"'+element.profession+'\"</td></tr>\n'
+'<tr><td><button type="submit" value="UPDATE" onclick=\"doDelete()\">Submit</button></tr></td>'
+'<table>'
/*'<script>function del(){$.ajax({method:\'DELETE\','
+ 'url:/profile/deleteUser/'+element.id
+'success : function(data) { console.log(\'success\');},'
+'error : function() {console.log(\'error\');}})}'
+'function h(){alert(\'Hello\');document.getElementById("demo").innerHTML = "Hello World";console.log(\'I am Test\');}</script>'*/
+'</body></html>');}
});

})});

 app.delete('/profile/deleteUserAjax/:id', function (req, res) {
   console.log('I am in Delete '+req.params.id);
   var j;
 fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err
 var arrayOfObjects = JSON.parse(data)
 for(var i=0;i<arrayOfObjects.users.length;i++)
 {
//Dout === and == 
	if(arrayOfObjects.users[i]!=null && arrayOfObjects.users[i].id == req.params.id ){
		j=i;
		console.log(JSON.stringify(arrayOfObjects.users[i])+"We r in"+j);
		delete arrayOfObjects.users[i];
    } 
}
fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
if (err) throw err
   console.log('JSON File updated!')});
 })  
})


app.put('/profile/updateUserAjex/:id', function (req, res) {
   console.log('I am in Delete '+req.params.id);
   var j;
 fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err
 var arrayOfObjects = JSON.parse(data)
 for(var i=0;i<arrayOfObjects.users.length;i++)
 {
//Dout === and == 
	if(arrayOfObjects.users[i]!=null && arrayOfObjects.users[i].id == req.params.id ){
		j=i;
		console.log(JSON.stringify(arrayOfObjects.users[i])+"We r in"+j);
		delete arrayOfObjects.users[i];
    } 
}
fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
if (err) throw err
   console.log('JSON File updated!')});
 })  
})

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log('Listening on Port '+ port+'...........'));