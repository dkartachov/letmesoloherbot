import 'dotenv/config'
import { TwitterApi } from "twitter-api-v2";

export const streamClient = new TwitterApi(process.env.BEARER_TOKEN);

export const replyClient = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET
});
