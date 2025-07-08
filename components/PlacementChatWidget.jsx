"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  ArrowLeft,
  Image,
  Paperclip,
  MessageCircle,
  X,
  Minimize2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const PlacementChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hi, I'm your placement assistant. Ask me anything about placements, resume building, or coding challenges.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Predefined quick questions
  const quickQuestions = [
    "What are the placement trends for 2024?",
    "How can I improve my resume?",
    "What are the most common coding challenges?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // API call to Gemini
  const callGeminiAPI = async (userMessage) => {
    try {
      const response = await fetch("/api/placementAssistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context:
            "You are a placement assistant helping students with job placements, resume building, coding challenges, interview preparation, and career guidance. Provide helpful, practical advice.",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini API");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  };

  const handleSendMessage = async (messageText = null) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get response from API
      const botResponse = await callGeminiAPI(message);

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // If chat is closed, increase unread count
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f3f4f6;
        }
      `}</style>

      <div className="fixed bottom-4 right-4 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div
            className={`mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
              isMinimized ? "h-16" : "h-96 sm:h-[500px]"
            } w-80 sm:w-96 flex flex-col`}
          >
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex-shrink-0 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      Placement Assistant
                    </h3>
                    <p className="text-xs text-blue-100">
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={minimizeChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-500 opacity-30"></div>
            </div>

            {/* Scrollable Messages Container */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-sm ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                         <div className="text-sm whitespace-pre-wrap">
                        <ReactMarkdown
                         
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]} // Enables raw HTML in markdown
                        >
                          {message.content}
                        </ReactMarkdown>
                        </div>
                        <p
                          className={`text-xs mt-1 ${
                            message.type === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Quick Questions - Show only initially */}
                  {messages.length === 1 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-xs text-gray-500 text-center mb-3">
                        Quick questions to get started:
                      </p>
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(question)}
                          className="w-full text-left p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-blue-300 hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 group-hover:text-blue-700">
                              {question}
                            </span>
                            <div className="w-5 h-5 rounded-full bg-gray-200 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
                              <span className="text-xs text-gray-400 group-hover:text-white">
                                →
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="px-3 py-2 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Fixed Input Area */}
                <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
                  <div className="flex items-end space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors mb-1">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="w-full px-3 py-2 pr-10 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white resize-none transition-all duration-200 text-sm"
                        rows="1"
                        style={{ minHeight: "36px", maxHeight: "100px" }}
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim() || isLoading}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 ${
                          inputValue.trim() && !isLoading
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={toggleChat}
          className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}

          {/* Unread Badge */}
          {!isOpen && unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}

          {/* Pulse animation when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
          )}
        </button>
      </div>
    </>
  );
};

export default PlacementChatWidget;
