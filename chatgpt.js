// const OpenAI = require('openai');
// const openai = new OpenAI({
//     apiKey: process.env.OPEN_API_KEY // replace with your key
// });

// async function getChatGPTResponse(prompt) {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: prompt }],
//         model: 'gpt-3.5-turbo',
//     });
//     return completion.choices[0].message.content;
// }

// module.exports = { getChatGPTResponse };



const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY // replace with your key
});

// Keep message history in memory
const messageHistory = [
    { role: 'system', content: 'You are an AI interview assistant. Only answer when the user asks a clear technical question. Keep answers short and helpful like a confident candidate. If the message is just a discussion or explanation, respond with an empty string or nothing.' }
];

async function getChatGPTResponse(prompt) {
    // Add user message to history
    messageHistory.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messageHistory,
    });

    const reply = completion.choices[0].message.content;

    // Add assistant reply to history
    messageHistory.push({ role: 'assistant', content: reply });

    return reply;
}

module.exports = { getChatGPTResponse };
