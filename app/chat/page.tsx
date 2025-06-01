"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Understanding AI ethics',
      date: new Date(2023, 10, 15),
      messages: [
        {
          id: '1-1',
          content: 'Hello! How can I help you with AI ethics today?',
          role: 'assistant',
          timestamp: new Date(2023, 10, 15, 10, 15),
        },
        {
          id: '1-2',
          content: 'What are the key ethical concerns in AI development?',
          role: 'user',
          timestamp: new Date(2023, 10, 15, 10, 16),
        },
        {
          id: '1-3',
          content: 'The main concerns include bias in algorithms, privacy issues, accountability, transparency, and potential job displacement. Each requires careful consideration during development.',
          role: 'assistant',
          timestamp: new Date(2023, 10, 15, 10, 17),
        }
      ]
    },
    {
      id: '2',
      title: 'Next.js optimization tips',
      date: new Date(2023, 10, 10),
      messages: [
        {
          id: '2-1',
          content: 'Hi! What do you need help with regarding Next.js optimization?',
          role: 'assistant',
          timestamp: new Date(2023, 10, 10, 14, 30),
        },
        {
          id: '2-2',
          content: 'How can I improve my Next.js app performance?',
          role: 'user',
          timestamp: new Date(2023, 10, 10, 14, 31),
        }
      ]
    },
    {
      id: '3',
      title: 'Travel recommendations',
      date: new Date(2023, 10, 5),
      messages: [
        {
          id: '3-1',
          content: 'Where would you like to travel? I can provide recommendations!',
          role: 'assistant',
          timestamp: new Date(2023, 10, 5, 9, 45),
        }
      ]
    },
    {
      id: '4',
      title: 'React state management',
      date: new Date(2023, 9, 28),
      messages: [
        {
          id: '4-1',
          content: 'What state management solutions would you like to discuss?',
          role: 'assistant',
          timestamp: new Date(2023, 9, 28, 16, 20),
        },
        {
          id: '4-2',
          content: 'Should I use Context API or Redux Toolkit?',
          role: 'user',
          timestamp: new Date(2023, 9, 28, 16, 21),
        },
        {
          id: '4-3',
          content: 'For most apps, Context API is sufficient. But for complex state management with middleware needs, Redux Toolkit is better.',
          role: 'assistant',
          timestamp: new Date(2023, 9, 28, 16, 22),
        }
      ]
    },
    {
      id: '5',
      title: 'Healthy meal prep ideas',
      date: new Date(2023, 9, 20),
      messages: [
        {
          id: '5-1',
          content: 'What dietary preferences do you have? I can suggest meal prep ideas!',
          role: 'assistant',
          timestamp: new Date(2023, 9, 20, 12, 15),
        }
      ]
    }
  ]);
  
  const [currentConversationId, setCurrentConversationId] = useState<string>('1');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentConversation = conversations.find(c => c.id === currentConversationId) || conversations[0];
  
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: `${currentConversationId}-${Date.now()}`,
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Update conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === currentConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, userMessage]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Simulate API call with typing effect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add assistant response
      const assistantMessage: Message = {
        id: `${currentConversationId}-${Date.now() + 1}`,
        content: `I understand you're asking about "${inputValue}". This is a simulated response showing how I would help with your query. In a real implementation, this would be connected to an AI model API.`,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      const finalConversations = updatedConversations.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, assistantMessage]
          };
        }
        return conv;
      });
      
      setConversations(finalConversations);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewConversation = () => {
    const newId = (conversations.length + 1).toString();
    const newConversation: Conversation = {
      id: newId,
      title: 'New conversation',
      date: new Date(),
      messages: [{
        id: `${newId}-1`,
        content: 'Hello! How can I help you today?',
        role: 'assistant',
        timestamp: new Date(),
      }]
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newId);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputValue]);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 opacity-0 invisible'}`}>
        <div className="p-4 border-b border-gray-700">
          <button 
            onClick={startNewConversation}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New chat
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 text-xs text-gray-400 uppercase tracking-wider pl-4 pt-3">
            Recent conversations
          </div>
          
          {conversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`p-3 pl-4 pr-2 hover:bg-gray-700 cursor-pointer flex justify-between items-center ${conversation.id === currentConversationId ? 'bg-gray-700 border-l-4 border-blue-500' : ''}`}
              onClick={() => setCurrentConversationId(conversation.id)}
            >
              <div className="flex items-center gap-3 truncate">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{conversation.title}</span>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {formatDate(conversation.date)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="font-semibold">U</span>
            </div>
            <div>
              <div className="font-medium">User Account</div>
              <div className="text-xs text-gray-400">Free Plan</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-400 hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="font-semibold text-lg">{currentConversation.title}</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-3xl mx-auto p-4 pb-20">
            {currentConversation.messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-1">
                    <span className="font-bold text-sm">AI</span>
                  </div>
                )}
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-3 mt-1">
                    <span className="font-bold text-sm">U</span>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-1">
                  <span className="font-bold text-sm">AI</span>
                </div>
                <div className="bg-gray-700 text-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-800 border-t border-gray-700">
          <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-end rounded-lg border border-gray-600 bg-gray-700 shadow-sm">
              <button className="m-2 p-2 text-gray-400 hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message ChatGPT..."
                className="flex-1 py-3 px-0 max-h-32 resize-none focus:outline-none bg-transparent text-gray-100 placeholder-gray-500"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className={`m-2 p-2 rounded-md ${
                  isLoading || !inputValue.trim()
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              ChatGPT can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}