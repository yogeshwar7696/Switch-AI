

/*
1.Gemini 2.0 Flash
3.Gemini 2.5 Pro Preview
2.Gemini 2.5 Flash Preview
4.Perplexity API
5.Ollama (local models)
6.Groq API (Mixtral, Llama 3)
*/

//---------------------------------gemini-2.0-flash---------------------------------------------------

import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// TODO(developer) Replace the following with your app's Firebase configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

/*
Open firebase console at https://console.firebase.google.com/
and create a new project.
Then, add a web app to the project.
click on firebase ai logic get started and copy and paste it below.
*/
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const auth =import.meta.env.VITE_GEMINI_API_AUTH;

const database =import.meta.env.VITE_GEMINI_API_DATABASE;




const firebaseConfig = {

apiKey: apiKey,
  authDomain: auth,
  databaseURL: database,
  projectId: "gen-lang-client-0979980919",
  storageBucket: "gen-lang-client-0979980919.firebasestorage.app",
  messagingSenderId: "438521579997",
  appId: "1:438521579997:web:2290df3fec7536d4aa4e34",
  measurementId: "G-309JMPXP9H"

};

// Initialize FirebaseApp
const firebaseApp = initializeApp(firebaseConfig);

// Initialize the Gemini Developer API backend service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
const model = getGenerativeModel(ai, { model: "gemini-2.0-flash" });


// Wrap in an async function so you can use await
async function gemini(prompt) {
  // Provide a prompt that contains text
//   const prompt = "full form of ncc related to defence?";

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;

  // console.log(text);
  return response.text();  
}

// run();
export default gemini;
