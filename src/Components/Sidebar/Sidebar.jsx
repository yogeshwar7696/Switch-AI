import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {newPage,onSent,  prevPrompt, setRecentPrompt } = useContext(Context);
  const loadPrompt=async (prompt)=>{
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  
  return (
    <div onMouseEnter={()=>setExtended(true)} onMouseLeave={()=>setExtended(false)} className="Sidebar">
      <div className="top">
        <img 
          
          className="menu" 
          src={assets.menu_icon} 
          alt="menu"
        />

        <div onClick={()=>newPage()} className="new-chat">
          <img src={assets.plus_icon} alt="new chat" />
          {extended && <p>New chat</p>}
        </div>

        {extended && (
          <div  className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="message" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="flex items-center justify-center h-screen"></div>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;