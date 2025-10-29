import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m Infee. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Hi, I’m Infee! I’m under development right now, so I can’t reply to that yet.",
        },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <div
      style={{
        height: "100%", // 👈 Important: take full height of parent (200px)
        width: "100%",
        borderRadius: "12px",
        border: "2px solid #681b76",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fef9ff",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          backgroundColor: "#681b76",
          color: "white",
          padding: "8px",
          fontWeight: "bold",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        Infee Chatbot 💬
      </div>

      {/* Messages area with scrollbar */}
      <div
        style={{
          flex: 1,
          padding: "8px",
          overflowY: "auto", // 👈 scroll if messages overflow
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          minHeight: 0, // 👈 critical for flex scroll to work inside fixed-height parent
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#e6d7ee" : "#681b76",
              color: msg.sender === "user" ? "#000" : "#fff",
              padding: "8px 12px",
              borderRadius: "16px",
              maxWidth: "70%",
              wordWrap: "break-word",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div
        style={{
          display: "flex",
          padding: "6px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "20px",
            border: "1px solid #681b76",
            outline: "none",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "8px",
            backgroundColor: "#681b76",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
