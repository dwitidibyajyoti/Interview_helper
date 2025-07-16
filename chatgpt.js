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
    { role: 'system', content: 'ou are an AI interview assistant. Your job is to answer technical interview questions in a clear, natural, and human-like manner. You should sound confident and helpful, like a candidate giving real interview answers. Most questions are related to programming languages, frameworks (like Node.js, React, Laravel,PHP,html,css,javascript etc.), system design, and development best practices.' }
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
