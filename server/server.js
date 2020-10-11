const express = require("express");
const http = require("http");
const fetch = require("node-fetch");

const app = express();
const server = http.createServer(app);

const port = 5000;

app.use(express.json());

function formUrl(resource, path, params) {
    let url = 'https://';
    url += resource;
    url += '/' + path;
    url += '?' + new URLSearchParams(params).toString();

    return url;
}

async function getFriendsInfo(accessToken) {
    const params = {
        count: 5,
        order: 'random',
        fields: 'photo_100,last_seen',
        access_token: accessToken,
        v: '5.124'
    }
    const url = formUrl('api.vk.com', 'method/friends.get', params);

    const response = await fetch(url);
    const json = await response.json();
    const info = json.response.items;

    return info;
}

async function getCurrentUserInfo(accessToken) {
    const params = {
        fields: 'photo_50',
        access_token: accessToken,
        v: '5.124'
    }
    const url = formUrl('api.vk.com', 'method/users.get', params);

    const response = await fetch(url);
    const json = await response.json();
    const currentUserInfo = json.response[0];

    return currentUserInfo;
}

app.post('/oauth',  async (req, res) => {
    const params = {
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        redirect_uri: process.env.CLIENT_HOST + '/auth',
        code: req.body.code
    }
    const url = formUrl('oauth.vk.com', 'access_token', params);

    const response = await fetch(url);
    const json = await response.json();
    const accessToken = json.access_token;

    res.json(accessToken);
});

app.post('/friends', async (req, res) => {
    const accessToken = req.body.token;

    const userInfo = await getCurrentUserInfo(accessToken);
    const friendsInfo = await getFriendsInfo(accessToken);

    const data = {
        userInfo,
        friendsInfo
    };

    res.json(data);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
