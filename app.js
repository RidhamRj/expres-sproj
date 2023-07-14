const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
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
    auth: "ridham:d69af8e26777cf9573f059335dabfd09-us21",
  };
  const request = https.request(url, option, (response) => {
    if(response.statusCode===200){
        res.sendFile(__dirname+'/success.html')
    }else{
        res.sendFile(__dirname+'/failure.html')
    }
    response.on("data", (data) => {
      // console.log();
      console.log(JSON.parse(data))
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000 || process.env.PORT, () => {
  console.log("server started");
});
// d69af8e26777cf9573f059335dabfd09-us21
// fb9331498b
