import { useState, useEffect } from "react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "Hi 👋 I'm ShopEase Assistant! How can I help you today?" }
  ]);

  const suggestions = [
    { text: "Track My Order" },
    { text: "Today's Offers" },
    { text: "Size Guide Help" },
    { text: "Return & Exchange" },
  ];

  // Simulated bot replies
  const autoReplies = {
    "track my order": "To track your order, please enter your Order ID. I'll fetch the status for you 📦",
    "today's offers": "🔥 Today's Deals: Flat 30% OFF on new arrivals! Use code: SAVE30 at checkout.",
    "size guide help": "📏 Sure! Please tell me the product or category, and I'll suggest the best size fit for you.",
    "return & exchange": "♻️ You can return or exchange within 7 days of delivery. Want me to guide you through the process?",
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const lower = text.toLowerCase();
      const reply =
        autoReplies[lower] || "I’m here to help! Ask me about offers, delivery, or size recommendations 😊";
      setMessages((prev) => [...prev, { id: Date.now(), role: "assistant", text: reply }]);
    }, 600);
  };

  const handleSuggestionClick = (text) => handleSend(text);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm bg-white border shadow-2xl rounded-lg overflow-hidden">
          <header className="flex items-center justify-between p-3 border-b">
            <p className="font-semibold">ShopEase Assistant</p>
            <span className="text-xs text-gray-500">Online</span>
          </header>

          <div className="max-h-[50vh] overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    msg.role === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 p-3 border-t">
            {suggestions.map((s, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(s.text)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
              >
                {s.text}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-center gap-2 p-3 border-t">
            <input
              type="text"
              placeholder="Ask about offers, delivery, returns..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector("input");
                handleSend(input.value);
                input.value = "";
              }}
              className="px-3 py-2 bg-black text-white rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
