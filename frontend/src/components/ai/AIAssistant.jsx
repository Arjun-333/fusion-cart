import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../../services/aiService';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm FusionBot. How can I help you shop today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Map to expected history format for API (if needed, adjust to your backend expectations)
      const history = messages.map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content
      }));
      
      const response = await aiService.chat(userMessage.content, history);
      setMessages(prev => [...prev, { role: 'bot', content: response.reply }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-widget">
      {isOpen && (
        <div className="ai-chat-window animate-scaleIn">
          <div className="ai-header">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h4 className="font-bold">FusionBot</h4>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="ai-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role === 'user' ? 'chat-user' : 'chat-bot'}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble chat-bot flex gap-1 items-center h-10 w-16 justify-center">
                <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse delay-100"></span>
                <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse delay-200"></span>
                <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse delay-300"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="ai-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              className="ai-input" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="ai-send" disabled={isLoading || !input.trim()}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}
      
      <button 
        className={`ai-toggle ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`} 
        onClick={toggleChat}
        aria-label="Open AI Assistant"
      >
        ✨
      </button>
    </div>
  );
};

export default AIAssistant;
