import { createContext, useState } from "react";
import gemini from "../Config/Gemini";
import deepSeek from "../Config/DeepSeek_R1";
import meta_AI from "../Config/Meta_AI";
import qwen from "../Config/Qwen_QwQ";

import Main from "../Components/Main/Main";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [selectedOption, setSelectedOption] = useState(1);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        console.log("Selected Option:", option);
    };

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prevData) => prevData + nextWord);
        }, 55 * index);
    };

    const newPage = () => {
        setLoading(false);
        setShowResult(false);
        setInput("");
    };

    const onSent = async (prompt) => {
        setResultData("");
        setShowResult(true);
        setInput("");
        setLoading(true);
        // setSelectedOption(); // <-- REMOVE THIS LINE

        let response = "";

        if (prompt !== undefined) {
            response = await gemini(prompt);
            setRecentPrompt(prompt);
            if (selectedOption === 1) {
                response = await gemini(input);
            } else if (selectedOption === 2) {
                response = await deepSeek(input);
            } else if (selectedOption === 3) {
                response = await meta_AI(input);
            } else if (selectedOption === 4) {
                response = await qwen(input);
            } else {
                response = "Invalid";
            }
        } else {
            setPrevPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            if (selectedOption === 1) {
                response = await gemini(input);
            } else if (selectedOption === 2) {
                response = await deepSeek(input);
            } else if (selectedOption === 3) {
                response = await meta_AI(input);
            } else if (selectedOption === 4) {
                response = await qwen(input);
            } else {
                response = "Invalid!!!";
            }
        }

        console.log(response);
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 1) {
                newResponse += `<b>${responseArray[i]}</b>`;
            } else {
                newResponse += responseArray[i];
            }
        }

        let newResponse2 = newResponse.replace(/\n/g, "<br>");
        newResponse2 = newResponse2.replace(/\*/g, "<b> • </b>");
        let finalResponse = newResponse2.split(" ");
        // setResultData(newResponse2);
        for (let i = 0; i < finalResponse.length; i++) {
            const nextWord = finalResponse[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
    };

    const ContextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newPage,
        selectedOption,
        setSelectedOption: handleOptionSelect,
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;

