import React, { useContext, useRef, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const main = () => {
    const { setSelectedOption, selectedOption,onSent, recentPrompt, showResult, resultData, loading, setInput, input } = useContext(Context);

    // Ref for file input and state for image preview
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setSelectedOption(Number(e.target.value));
    };

    // Handle file selection and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
                // Optionally, setInput(file.name); if you want to show filename in input
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <img
                src={assets.logo_icon}
                alt="logo"
                 style={{ width:35, height: 35 ,cursor:"pointer"}}
                />

                <select
    className="optionSelect"
    id="optionSelect"
    value={selectedOption} // <-- Add this line
    onChange={handleChange}
>   
    <option value={1}>Gemini  (   2.0 Flash )</option>
    <option value={2}>DeepSeek  ( R1 )</option>
    <option value={3}>Meta AI ( llama-4 )</option>
    <option value={4}>Qwen  ( QwQ )</option>
    <option value={5}>Grok</option>
</select>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                {
                    (!showResult) ? (
                        <div className="greet">
                            <p className="hello"><span>Hello Buddy...</span></p>
                            <p>How can I help you today</p>
                            {/* <p>Welcome to Gemini (2.0 Flash)</p>  */}
                        </div>
                    ) :
                        (
                            <div className="result">
                                <div className="result-title">
                                    <img src={assets.user_icon} alt="" />
                                    <p>{recentPrompt}</p>
                                </div>
                                <div className="result-data">
                                    <img src={assets.logo_icon} alt="" />
                                    {loading ? (
                                        <div className="loader">
                                            <p className="loader-text">Just a second...</p>
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                    ) :
                                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                    }
                                </div>
                            </div>
                        )
                }

                <div className="main-bottom">
                    <div className="search-box">

                        {/* Image preview (optional) */}
                        <img 
                        src={assets.logo_icon}
                        alt="logo"
                        style={{ width:30, height: 30 ,cursor:"pointer"}}
                        
                        
                    />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: 40, height: 40, objectFit: "cover", marginRight: 8, borderRadius: 4 }}
                            />
                        )}
                        <input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input.trim() !== "") {
                                    onSent();
                                }
                            }}
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter the Prompt"
                            name=""
                            id=""
                        />
                        <div>
                            {/* Hidden file input */}
                            {/* <img src={assets.logo3_icon} alt="aaa" /> */}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <img
                                src={assets.gallery_icon}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={() => fileInputRef.current.click()}
                            />
                            <img src={assets.mic_icon} alt="" />
                            {input ? (
                                <img
                                    className="sent_icon"
                                    onClick={() => { if (input.trim() !== "") { onSent() } }}
                                    src={assets.send_icon}
                                    alt="a1"
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    export default main;