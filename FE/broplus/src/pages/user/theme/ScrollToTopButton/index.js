import React, { useState, useEffect } from "react";
import { FaArrowUp, FaComment } from "react-icons/fa";
import "./style.scss";
import Chat from "../Chat";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="scroll-to-top">
        <button onClick={toggleChat} className="chat-button" aria-label="Open chat">
          <FaComment />
        </button>
        {isVisible && (
          <button onClick={scrollToTop} className="scroll-button" aria-label="Scroll to top">
            <FaArrowUp />
          </button>
        )}
      </div>
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ScrollToTopButton;