const express = require("express");
const http = require("http");
const https = require("https");

const app = express();
const server = http.createServer(app);

const port = 5000;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.post('/oauth',  (req, res) => {
    console.log(`https://oauth.vk.com/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&redirect_uri=${process.env.CLIENT_HOST}/auth&code=${req.body.code}`);
    https.get(`https://oauth.vk.com/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&redirect_uri=${process.env.CLIENT_HOST}/auth&code=${req.body.code}`,(res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
});

/*if (userToken) {
    const url = 'https://api.vk.com/method/friends.search?access_token=' + userToken + '&v=5.124';
    fetch(url, {mode: 'no-cors'})
        .then(response => console.log(response))
        .catch(err => console.log(err));
}*/

server.listen(port, () => console.log(`Listening on port ${port}`));
