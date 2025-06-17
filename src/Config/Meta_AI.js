import { Groq } from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;


const groq = new Groq({ apiKey: apiKey,dangerouslyAllowBrowser: true  }); // Replace with your actual API key

export async function meta_AI(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
  "model": "meta-llama/llama-4-scout-17b-16e-instruct",
  "temperature": 1,
  "max_completion_tokens": 1024,
  "top_p": 1,
  "stream": true,
  "stop": null
});
 let result = '';
  for await (const chunk of chatCompletion) {
    result += chunk.choices[0]?.delta?.content || '';
  }
  return result;
}
export default meta_AI;