var Twit = require('twit')

var twit = new Twit({
    consumer_key: 'TnAj8jVlxYlP3ENEC9ANIiO1W',
    consumer_secret: '2RGt6JUTG4pfEuxEunxligy6w9DxZIzxOcl8Od5hU0xTE1i62f',
    access_token: '1236723368591753216-PuHpn8JUnC2jKTJ0fMipkPRBRQAToh',
    access_token_secret: 'k11chC46clJITCGgW88NOYoIFHq7HIU5XUPADI5yJax5U',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

let count = 0;

function retweet() {
    let params = {
        q: '#masistassalvajes', // Hashtags to search tweets within
        result_type: 'recent',
        lang: 'en'
    }
    twit.get('search/tweets', params, function(err, data) {
        if (!err) {
            let retweetId = data.statuses[count].id_str;
            if (retweetId !== "1236723368591753216") {
                twit.post('statuses/retweet/:id', {
                    id: retweetId
                }, function(err, response) {
                    if (response) {
                        console.log("retweeted \n");
                    }
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                console.log("already taken");
            }
        } else {
            console.log('Error during tweet search call');
        }
    });
};


setInterval(() => {
    retweet();
    count++;
}, 1000);