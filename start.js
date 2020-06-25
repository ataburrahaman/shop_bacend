let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./routes/index");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
let uri = "mongodb://127.0.0.1:27017/groceryshop"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
//Hare are the conflite
//we add some more conflict

// Connect to Mongoose and set connection variable
try {
  mongoose.connect(uri, options);
  //  mongoose.connect('', { useNewUrlParser: true});
} catch (error) {
  handleError(error);
}
var db = mongoose.connection;

// Added check for DB connection
if (!db)
  console.log("Error connecting db")
else
  console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
//app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/shop/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running groceryshop on port " + port);
});