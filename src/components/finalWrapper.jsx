import React, { useState, useEffect, useRef } from "react";
import theme from "./theme";
import "./styles/ChatVoiceBot.css";

const ChatVoiceBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const sendMessage = (messageText) => {
    const trimmed = messageText.trim();
    if (!trimmed) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: trimmed },
      { sender: "bot", text: getBotResponse(trimmed) },
    ];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getBotResponse = (userInput) => {
    const lower = userInput.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hi there! How can I assist you today?";
    } else if (lower.includes("your name")) {
      return "I'm your voice assistant!";
    } else if (lower.includes("time")) {
      return `It's currently ${new Date().toLocaleTimeString()}.`;
    } else if (lower.includes("date")) {
      return `Today's date is ${new Date().toLocaleDateString()}.`;
    }
    return "I'm still learning! Can you please rephrase that?";
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blurred chat content */}
      <div
        className={`chat-wrapper ${isListening ? "blurred" : ""}`}
        style={{
          backgroundColor: theme.colors.light,
          boxShadow: theme.layout.boxShadow,
          borderRadius: theme.layout.borderRadius,
          width: "100%",
          maxWidth: "1200px",
          flex: "1 1 600px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "filter 0.4s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            padding: "10px 15px",
            borderRadius: `${theme.layout.borderRadius} ${theme.layout.borderRadius} 0 0`,
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          <span style={{ fontSize: "22px", marginRight: "8px" }}>🤖</span>
          Your Company’s Voice Assistant
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: theme.colors.light,
            border: `1px solid ${theme.colors.primaryLight}`,
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                wordWrap: "break-word",
                backgroundColor:
                  msg.sender === "user"
                    ? theme.colors.primaryLight
                    : theme.colors.accent,
                color:
                  msg.sender === "user"
                    ? theme.colors.white
                    : theme.colors.dark,
                padding: "8px 12px",
                borderRadius:
                  msg.sender === "user"
                    ? "12px 12px 0 12px"
                    : "12px 12px 12px 0",
                boxShadow: theme.layout.boxShadow,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{msg.sender === "user" ? "🧑" : "🤖"}</span>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <textarea
            rows={1}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            style={{
              flexGrow: 1,
              borderRadius: theme.layout.borderRadius,
              resize: "none",
              padding: "10px 12px",
              border: `1px solid ${theme.colors.primaryLight}`,
              outline: "none",
              fontFamily: "inherit",
              fontSize: "15px",
              boxShadow: theme.layout.boxShadow,
            }}
          />
          <button
            onClick={handleVoiceInput}
            style={{
              backgroundColor: isListening
                ? theme.colors.secondary
                : theme.colors.accent,
              color: theme.colors.white,
              marginLeft: theme.spacing(1),
              padding: "10px 14px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              boxShadow: theme.layout.boxShadow,
              transition: "all 0.3s ease",
            }}
          >
            🎤
          </button>
          <button
            onClick={() => sendMessage(input)}
            style={{
              marginLeft: theme.spacing(1),
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
              border: "none",
              borderRadius: "8px",
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: "18px",
              boxShadow: theme.layout.boxShadow,
            }}
          >
            {`>`}
          </button>
        </div>
      </div>

      {/* Listening Animation Overlay */}
      {isListening && (
        <div
          className="listening-overlay"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 10,
            transition: "opacity 0.4s ease",
          }}
        >
          <img
            src="/voice-listening.gif"
            alt="Listening..."
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px #fff)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatVoiceBot;
