const express = require("express");
const http = require("http");
const https = require("https");
const fetch = require("node-fetch");

const app = express();
const server = http.createServer(app);

const port = 5000;

app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));

app.post('/oauth',  async (req, res) => {
    const response = await fetch(`https://oauth.vk.com/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&redirect_uri=${process.env.CLIENT_HOST}/auth&code=${req.body.code}`);
    const json = await response.json();
    const access_token = json.access_token;

    //const response1 = await fetch(`https://api.vk.com/method/friends.search?access_token=${access_token}&v=5.124`);
    const response1 = await fetch(`https://api.vk.com/method/friends.get?count=5&order=random&fields=photo_100,last_seen&access_token=${access_token}&v=5.124`);
    const json2 = await response1.json();
    console.log(json2.response.items);

    res.json(json2.response.items);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
