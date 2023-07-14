const express =require('express')
const bodyParser=require('body-parser')
const request=require('request')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})
app.post('/',(req,res)=>{
    const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "unsubscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/fb9331498b";
  const option = {
    method: "POST",
    auth: "ridham:9b270d25d5b7e42721be6796d7dc7db4-us21",
  };
})

app.listen(3000,()=>{
    console.log('server started')
})