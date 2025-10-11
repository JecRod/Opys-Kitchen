


export default function ContentChatbot() {
    return (
        <>
            <main className="main-content">
            <div className="container">
                {/* Page Header */}
                <section className="page-header">
                <h1>FoodOrder Assistant</h1>
                <p>Get instant help with your orders, track deliveries, and find answers to common questions</p>
                </section>
                {/* Chatbot Container */}
                <div className="chatbot-container">
                <div className="chatbot-header">
                    <h2><i className="fas fa-robot" /> FoodOrder Assistant</h2>
                    <div className="chatbot-status">Online • Usually replies instantly</div>
                    <button className="close-chatbot">
                    <i className="fas fa-times" />
                    </button>
                </div>
                <div className="chatbot-messages" id="chatMessages">
                    {/* Messages will be inserted here by JavaScript */}
                    <div className="message bot">
                    <div className="avatar">
                        <i className="fas fa-robot" />
                    </div>
                    <div className="message-content">
                        <p>Hello! I'm your FoodOrder assistant. How can I help you today?</p>
                        <div className="quick-actions">
                        <button className="quick-action" data-message="Track my order">Track my order</button>
                        <button className="quick-action" data-message="Menu suggestions">Menu suggestions</button>
                        <button className="quick-action" data-message="Delivery time">Delivery time</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="suggestions">
                    <h3>Quick questions:</h3>
                    <div className="suggestion-buttons">
                    <button className="suggestion-btn" data-message="What's today's special?">Today's special</button>
                    <button className="suggestion-btn" data-message="Are there any ongoing offers?">Current offers</button>
                    <button className="suggestion-btn" data-message="How do I apply a promo code?">Apply promo code</button>
                    <button className="suggestion-btn" data-message="What are your delivery areas?">Delivery areas</button>
                    </div>
                </div>
                <div className="chatbot-input">
                    <input type="text" id="messageInput" placeholder="Type your message here..." />
                    <button className="send-button" id="sendButton">
                    <i className="fas fa-paper-plane" />
                    </button>
                </div>
                </div>
            </div>
            </main>


        </>
    );
}