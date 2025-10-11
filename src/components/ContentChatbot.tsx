import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_CONFIG } from "../Api-Config";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  quickActions?: string[];
}

let messageId = 0;

export default function ContentChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: messageId++,
      text: "Hello! I'm your FoodOrder assistant. How can I help you today?",
      sender: "bot",
      quickActions: ["Track my order", "Menu suggestions", "Delivery time"],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: messageId++, text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      let botReply = "";

      // ✅ Use offers API if message is about offers/menu
      if (text.toLowerCase().includes("menu") || text.toLowerCase().includes("offer")) {
        const res = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.OFFERS}`);
        const offers = res.data.offers || [];
        if (offers.length === 0) {
          botReply = "Sorry, no offers available right now.";
        } else {
          botReply =
            "Here are some current offers:\n" +
            offers
              .map((o: any) => `• ${o.title}${o.discount_label ? ` - ${o.discount_label}` : ""}`)
              .join("\n");
        }
      } else {
        // 🔹 Default: send to auto-reply API
        const res = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BOT}`,
          { message: text }
        );
        botReply = res.data.bot_reply || "🤖 Sorry, I don’t understand.";
      }

      const botMessage: Message = { id: messageId++, text: botReply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: messageId++,
        text: "⚠️ Something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    sendMessage(text);
  };

  return (
    <main className="main-content">
      <div className="container">
        <section className="page-header">
          <h1>FoodOrder Assistant</h1>
          <p>Get instant help with your orders, track deliveries, and find answers to common questions</p>
        </section>

        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2><i className="fas fa-robot" /> FoodOrder Assistant</h2>
            <div className="chatbot-status">Online • Usually replies instantly</div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="avatar">
                  <i className={msg.sender === "bot" ? "fas fa-robot" : "fas fa-user"} />
                </div>
                <div className="message-content">
                  <p>{msg.text}</p>
                  {msg.quickActions && (
                    <div className="quick-actions">
                      {msg.quickActions.map((action, idx) => (
                        <button key={idx} className="quick-action" onClick={() => handleQuickAction(action)}>
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="avatar"><i className="fas fa-robot" /></div>
                <div className="message-content"><p>Typing...</p></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

            <div className="suggestions">
            <h3>Quick questions:</h3>
            <div className="suggestion-buttons">
                {[
                `What's today's special?`,
                'Are there any ongoing offers?',
                'How do I apply a promo code?',
                'What are your delivery areas?',
                ].map((text, idx) => (
                <button key={idx} className="suggestion-btn" onClick={() => handleQuickAction(text)}>
                    {text}
                </button>
                ))}
            </div>
            </div>


          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message here..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button className="send-button" onClick={() => sendMessage(input)}>
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
