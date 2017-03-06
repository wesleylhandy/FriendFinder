const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3121;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/app/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

app.listen(port);