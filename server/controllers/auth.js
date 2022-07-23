const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
const { ifError } = require('assert');
const { request } = require('http');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const userId = crypto.randomBytes(16).toString('hex');
const serverClient = connect(api_key, api_secret, app_id);
const hashedPassword = bcrypt.hash('strongPassword', 10);
const token = serverClient.createUserToken(userId);

const login = async(req, res) => {
    try{
        //getting populated as we passed in data from the front end through the form
        //when we submit
        const { username, password } = req.body;
        //connect to the client
        const serverClient = connect(api_key, api_secret, app_id);
        //new instance of a stream chat
        const client = StreamChat.getInstance(api_key, api_secret);

        //to query all the user from the database that match the specific username
        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: "User not found"});

        //if our user exists
        //we are returning the hash version of its password for security
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        //create a new user token
        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            request.status(200).json( {token, username, userID: users[0].id});
        } else {
            res.status(500).json({message: "Incorrect password"});
        }
    }catch (error) {
        //if something goes wrong
        console.log(error);
        //the server encountered an unexpected condition that prevented it from fulfilling the request
        res.status(500).json( {message: error} );
    }
}    
//exporting the functionality once we go a specific route
module.exports = { login }
