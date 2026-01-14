'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { sendCommandToAgent } from '../../services/api-client';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent' | 'loading';
}

interface ResponsiveAgentChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResponsiveAgentChat = ({ isOpen, onClose }: ResponsiveAgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          text: 'Welcome! I can help you with your tasks. Try telling me what to do.',
          sender: 'agent',
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };
    const loadingMessage: Message = {
      id: messages.length + 2,
      text: '...',
      sender: 'loading',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);


// ... inside handleSendMessage
    try {
      const assistant_reply = await sendCommandToAgent(input);
      const agentMessage: Message = {
        id: messages.length + 2,
        text: assistant_reply || 'Sorry, I could not process that.',
        sender: 'agent',
      };

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id ? agentMessage : msg
        )
      );
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'agent',
      };
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id ? errorMessage : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col sm:w-96">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h3 className="text-lg font-bold">Agent Chat</h3>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xs break-words ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.sender === 'agent'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Type your command..."
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveAgentChat;
