'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { apiClient } from '../../services/api-client';

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
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: '...',
      sender: 'loading',
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use apiClient singleton
      const assistantReply = await apiClient.sendAgentCommand(input);

      const agentMessage: Message = {
        id: loadingMessage.id,
        text: assistantReply || 'Sorry, I could not process that.',
        sender: 'agent',
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? agentMessage : msg))
      );
    } catch (error) {
      console.error('Agent command error:', error);
      const errorMessage: Message = {
        id: loadingMessage.id,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'agent',
      };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? errorMessage : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md h-[70vh] sm:h-[500px] flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-xl">
          <h3 className="text-lg font-bold">Agent Chat</h3>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-3 py-2 max-w-[70%] break-words ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.sender === 'agent'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-gray-100 text-gray-500 italic'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your command..."
            disabled={isLoading}
            className="flex-1 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveAgentChat;
// Add this at the bottom of your current file
export const sendCommandToAgent = (command: string, context: any = {}) =>
  apiClient.sendAgentCommand(command, context);
