'use client'

import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
}

export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI fitness coach. I'm here to help you with personalized training advice, nutrition guidance, and answer any questions about your fitness journey. How can I assist you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your question! I'm analyzing your fitness data and goals to provide you with personalized advice. Based on your recent activity, I recommend focusing on progressive overload in your strength training and maintaining consistent hydration levels.",
        sender: 'agent',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-black/20 rounded-2xl border border-bbd-ivory/10 h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-bbd-ivory/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bbd-orange rounded-xl flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-bbd-ivory font-semibold">AI Fitness Coach</h3>
            <p className="text-bbd-ivory/60 text-sm">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'agent' && (
              <div className="w-8 h-8 bg-bbd-orange rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="text-white" size={16} />
              </div>
            )}
            
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-bbd-orange text-white'
                  : 'bg-bbd-ivory/10 text-bbd-ivory'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-60 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-bbd-ivory/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="text-bbd-ivory" size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-bbd-orange rounded-lg flex items-center justify-center">
              <Bot className="text-white" size={16} />
            </div>
            <div className="bg-bbd-ivory/10 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-bbd-ivory/60 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-bbd-ivory/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-bbd-ivory/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-bbd-ivory/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about fitness..."
            className="flex-1 bg-bbd-ivory/10 text-bbd-ivory placeholder-bbd-ivory/50 px-4 py-2 rounded-lg border border-bbd-ivory/20 focus:outline-none focus:border-bbd-orange"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-bbd-orange text-white p-2 rounded-lg hover:bg-bbd-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
