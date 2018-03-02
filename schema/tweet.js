const mongoose = require('mongoose');
const schema = mongoose.Schema;

//  create a Tweet Schema and return a Tweet model
const TweetSchema = new schema({
    tweetUser: String,
    tweetContent: String,
    postedDate: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('tweets', TweetSchema);

module.exports = Tweet;