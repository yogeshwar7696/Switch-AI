
import { Groq } from 'groq-sdk';
// import dotenv from 'dotenv';
// dotenv.config();

// For Vite
// const apiKey = import.meta.env.VITE_GROQ_API_KEY;
// const apiKey=process.env.VITE_GROQ_API_KEY;
const apiKey = import.meta.env.VITE_GROQ_API_KEY;


// console.log(apiKey);
const groq = new Groq({ apiKey: apiKey,dangerouslyAllowBrowser: true  }); // Replace with your actual API key

export async function qwen(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],

  "model": "qwen-qwq-32b",
  "temperature": 0.6,
  "max_completion_tokens": 4096,
  "top_p": 0.95,
  "stream": true,
  "stop": null
});
 let result = '';
  for await (const chunk of chatCompletion) {
    result += chunk.choices[0]?.delta?.content || '';
  }
  // console.log(result);
  return result.replace(/<think>[\s\S]*?<\/think>/g,'').trim();
}

export default qwen;