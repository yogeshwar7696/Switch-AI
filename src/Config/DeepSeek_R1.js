import { Groq } from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;


const groq = new Groq({ apiKey: apiKey,dangerouslyAllowBrowser: true  }); // Replace with your actual API key

export async function deepSeek(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.6,
    max_completion_tokens: 4096,
    top_p: 0.95,
    stream: true,
    stop: null
  });

  let result = '';
  for await (const chunk of chatCompletion) {
    result += chunk.choices[0]?.delta?.content || '';
  }
  return result.replace(/<think>[\s\S]*?<\/think>/g,'').trim();
}
export default deepSeek;