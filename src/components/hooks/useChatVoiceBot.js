import { useState, useEffect, useRef } from "react";
import { message } from "antd";

const useChatVoiceBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋, I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // --- Initialize Speech Recognition ---
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      message.error("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      message.error("Voice recognition error: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, []);

  // --- Text-to-Speech Output ---
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // --- Bot Response Logic ---
  const getBotResponse = (query) => {
    query = query.toLowerCase();
    if (query.includes("hello") || query.includes("hi"))
      return "Hi there! 😊 How are you doing today?";
    if (query.includes("time")) return `It's ${new Date().toLocaleTimeString()}`;
    if (query.includes("date"))
      return `Today's date is ${new Date().toLocaleDateString()}`;
    if (query.includes("name")) return "I'm your friendly AI chatbot built by Ashish!";
    return "I'm not sure about that 🤔, but I'm learning every day!";
  };

  // --- Send Message (User -> Bot) ---
  const sendMessage = (textInput) => {
    const trimmed = textInput.trim();
    if (!trimmed) return;
    const newMessages = [...messages, { sender: "user", text: trimmed }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botReply = getBotResponse(trimmed);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      speak(botReply);
    }, 800);
  };

  // --- Voice Input Handler ---
  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return {
    messages,
    input,
    isListening,
    setInput,
    sendMessage,
    handleVoiceInput,
    recognitionRef,
    messagesEndRef,
  };
};

export default useChatVoiceBot;
