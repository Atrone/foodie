//import google from 'googleapis';
const {google} = require('googleapis');
const queryString = require('query-string');

// * as queryString from 'query-string';

// facebook stuff

// facebook stuff end


// google stuff
const googleConfig = {
  clientId: '227322859567-8dkusesn4oqmbm121olsd6jqrukuucfi.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: 'GAkQeTXzv4Kc77t4eIvZZX7t', // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: 'http://localhost:8080' // this must match your google api settings
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

/*************/
/** HELPERS **/
/*************/

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}



// google stuff end

// db stuff //
var mongoose   = require('mongoose');
mongoose.connect('mongodb://foodieUser:Drt83711!@ds261817.mlab.com:61817/foodie'); // connect to our database


var Restaurant = require('./models/restaurant.js');
var Item = require('./models/item.js');

var newRestaurant = new Restaurant();      // create a new instance of the item model
var newItem = new Item();


//newRestaurant.restaurantID = 3;
//newRestaurant.name = "Osmows";
//newRestaurant.description = "Middle eastern featuring shawarma";
//newRestaurant.address = "3341 Bansbridge";
//newRestaurant.genre = "Middle eastern";
//newRestaurant.discount = true;
//newRestaurant.picture = "2";
//newRestaurant.genres = "2";
//newRestaurant.save();
 
// db stuff end//


// google distance stuff//

var distance = require('google-distance-matrix');
distance.key('AIzaSyD-EQhEcjF9sunfaL8qTQnT7UukPlia10U');

var origins = ['6970-6956 Lisgar Dr, Mississauga, ON L5N 7E3'];
var destinations = ['7-Eleven, 6980 Lisgar Dr, Mississauga, ON L5N 8C8', 'Spencer Engineering, London, ON N6A 5B9, Canada'];
 
distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        console.log(distances.rows[0].elements);
})

// google distance stuff end//
const express = require('express')
const app = express()
app.use(express.static('src/dist/AngularClient'));
const bodyParser = require('body-parser')
const cors = require('cors')
const requests = require('request')

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



app.listen(8080), () => {
  console.log('Server started!')
}
app.route('/api/distance', cors(corsOptions)).post((req, res) => {
	console.log(req.body.orgin);
	console.log(req.body.destination);
	var origins = [req.body.orgin];
	var destinations = req.body.destination;
 
	distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        console.log(distances);
	    console.log(distances.rows[0].elements);
		res.send(distances.rows[0].elements);
})
}) 
app.route('/api/google', cors(corsOptions)).get((req, res) => {
  res.send(
    urlGoogle()
  )
})
var variable1;
var variable2;
app.route('/api/google2', cors(corsOptions)).post((req, res) => {
	console.log((req.body));
    var postDataUrl = 'https://www.googleapis.com/oauth2/v4/token?' +
        'code=' + req.body.title +  //auth code received from the previous call
        '&client_id=' + '227322859567-8dkusesn4oqmbm121olsd6jqrukuucfi.apps.googleusercontent.com' +
        '&client_secret=' + 'GAkQeTXzv4Kc77t4eIvZZX7t' +
        '&redirect_uri=' + 'http://localhost:8080' +
        '&grant_type=' + "authorization_code"

    var options = {
        uri: postDataUrl,
        method: 'POST'
    };
    requests(options, function (err, res, body) {
        console.log(body); //returns an object with an access token!!!
		//id = JSON.parse(body).id_token;
		console.log(JSON.parse(body).id_token); //returns an object with an access token!!!
		//console.log(getGoogleAccountFromToken(JSON.parse(body).id_token));
		var options2 = {
        uri: 'https://oauth2.googleapis.com/tokeninfo?id_token='+JSON.parse(body).id_token,
        method: 'GET'
		};
	
	    requests(options2, function (err, res, body) {
        console.log(res.body); //returns an object with an access token!!!
		console.log(JSON.parse(res.body).email);
		variable1 = JSON.parse(res.body).email;
		variable2 = JSON.parse(res.body).email_verified;
		getEmail();
	});

	});
	//console.log({ email: id });


	function getEmail(){
		res.send({title:variable1, title2:variable2});
	}

	//console.log(getAccessToken(req.body));
})
app.route('/api/getRestaurants', cors(corsOptions)).get((req,res) => {
        Restaurant.find(function(err, restaurants) {
            if (err)
                res.send(err);
            console.log(restaurants)
            res.json(restaurants);
        });

})
app.route('/api/getItems', cors(corsOptions)).post((req,res) => {
        Item.find({ restaurant: req.body.title}, function(err, restaurants) {
            if (err)
                res.send(err);
            console.log(restaurants)
            res.json(restaurants);
        });

})
app.route('/api/facebook').get((req, res) => {
  res.send(
    "hello"
  )
})
app.route('/sitemap.xml').get((req, res) => {
  res.send(
    '<urlset xmlns="http://www.google.com/schemas/sitemap/0.84" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'+
'<url>'+
'<loc>http://www.mobileats.ca/</loc>'+
'<changefreq>weekly</changefreq>'+
'</url>'+
'</urlset>'
  )
})
app.route('/api/cats/:name').get((req, res) => {
  const requestedCatName = req.params['name']
  res.send({ name: requestedCatName })
})

app.route('/api/cats/:name').put((req, res) => {
  res.send(200, req.body)
})
app.route('/api/cats/:name').delete((req, res) => {
  res.sendStatus(204)
})
