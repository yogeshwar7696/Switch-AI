import { Groq } from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;


const groq = new Groq({ apiKey: apiKey,dangerouslyAllowBrowser: true  }); // Replace with your actual API key

/**
 * Sends a prompt and an image to the Groq API.
 * @param {string} prompt - The text prompt.
 * @param {string|Buffer} image - The image data (base64 string or Buffer).
 * @returns {Promise<string>} The result from the API.
 */
export async function img(prompt, image) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
        // Add image as a separate field if supported by the API
        image: image // Make sure the API supports this field
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
export default img;