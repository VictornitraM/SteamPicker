const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const app = express();
const key = process.env.API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Test it out'
    });
});

app.get('/test/:id', (req, res) => {
    request(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${req.params.id}&include_appinfo=true&format=json`, function(error, response, body) {
        console.log('error from games:', error); // Print the error if one occurred and handle it
        console.log('statusCode test:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
    });

})

app.get('/testuser/:username', (req, res) => {
    request(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${key}&vanityurl=${req.params.username}`, function(error, response, body) {
        console.error("error from the user", error);
        console.log('statusCode from username:', response && response.statusCode);
        res.send(body);
    })
})

app.get('/testfriends/:id', (req, res) => {
    request(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${key}&steamid=${req.params.id}&relationship=friend`, function(error, response, body) {
        console.log('error from friends:', error); // Print the error if one occurred and handle it
        console.log('statusCode friends:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
    });
    console.log("testfriends " + req.params.id)
})

app.get('/testacc/:id', (req, res) => {
    request(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${req.params.id}`,
        function(error, response, body) {
            console.log('error from user:', error); // Print the error if one occurred and handle it
            console.log('statusCode acc:', response && response.statusCode); // Print the response status code if a response was received
            res.send(body)
        });
    console.log("testacc" + req.params.id)
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`
                    listening on ${ port }
                    `);
});