import { streamClient } from './Client.js'

console.log('Deleting rules...\n');

let rules = await streamClient.v2.streamRules();

// delete any existing rules
if (rules.data?.length) {
    await streamClient.v2.updateStreamRules({
        delete: { ids: rules.data.map(rule => rule.id) },
    });
}

if (rules.data) {
    console.log('Deleted rules:\n', rules.data);
} else {
    console.log('No existing rules to delete.');
}

// add rules
await streamClient.v2.updateStreamRules({
    add: [
        { value: 'elden ring malenia -is:retweet -is:reply' },
        { value: '(#eldenring OR eldenring) (malenia OR #malenia) -is:retweet -is:reply' }
    ],
});

rules = await streamClient.v2.streamRules();

console.log('Added rules:\n', rules.data);
