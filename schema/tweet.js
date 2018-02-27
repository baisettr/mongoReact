const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TweetSchema = new schema({
    tweetId: String,
    tweetUser: String,
    tweetContent: String,
    postedDate: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('review', TweetSchema);

module.exports = Tweet;