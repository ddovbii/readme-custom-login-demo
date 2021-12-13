var sign = require('jsonwebtoken').sign;
var { URL } = require('url');

// POST request to the login form
// This should do all of the work to login and verify the user is valid
module.exports = (req, res) => {
  var { email, password, account } = req.body;
  console.log('Use these credentials to log the user in somewhere:', { email, password, account });

  var url = `https://app.qtorque.io/api/accounts/${account}/login`;

  var XMLHttpRequest = require('xhr2');
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  console.log("start");

  xhr.onreadystatechange = function () {
    console.log("onready");
    if (xhr.readyState === 4) {

      console.log(xhr.status);
      var token = xhr.response['access_token'];

      var user = {
        name: email,
        email: email,
        apiKey: `Bearer ${token}`
      };     
      var jwt = sign(user, process.env.JWT_SECRET);
      var url = new URL(process.env.HUB_URL);

      url.searchParams.set('auth_token', jwt);
      console.log('Redirecting to: ', url.toString());

      return res.redirect(url);
  }};

  var data = `{
    email: 'dmytro.d@quali.com',
    password: 'NKeGVAHwwxTJZ8b'
  }`;
  
  xhr.send(data);
}
