const express = require('express');
const cors = require('cors');
const { application } = require('express');

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 4449;

//allows us to call the environment variable inside the application
require('dotenv').config();

//cross origin request
app.use(cors());
//allow us to pass json payloads from the front end to the back end
app.use(express.json());
app.use(express.urlencoded());

//first route
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

application.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));