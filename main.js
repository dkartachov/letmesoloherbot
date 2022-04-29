import { ETwitterStreamEvent } from "twitter-api-v2";
import { replies } from './Constants.js';
import { streamClient, replyClient } from './Client.js'

const generateAnswer = () => {
    return replies[Math.floor(Math.random() * replies.length)];
}

console.log('letmesoloherbot listening...\n');

const stream = await streamClient.v2.searchStream({
    'tweet.fields': ['referenced_tweets', 'author_id'],
    expansions: ['referenced_tweets.id'],
});

stream.on(ETwitterStreamEvent.Data, async tweet => {
    //ignore retweets and self sent tweets
    const isARt = tweet.data.referenced_tweets?.some(tweet => (tweet.type === 'retweeted' || tweet.type === 'replied_to')) ?? false;
    if (isARt) {
        console.log('ignored retweet or reply');
        return;
    }

    // reply
    let answer = generateAnswer();

    await replyClient.v2.reply(answer, tweet.data.id);

    console.log(`${new Date().toLocaleTimeString()}: sent reply '${answer}' to:\n`, tweet.data);
});