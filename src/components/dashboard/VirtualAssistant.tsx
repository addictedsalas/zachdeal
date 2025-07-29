'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface VirtualAssistantProps {
  userProfile?: {
    full_name: string
    selected_workout_plan: string
  }
}

export default function VirtualAssistant({ userProfile }: VirtualAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hey ${userProfile?.full_name?.split(' ')[0] || 'there'}! 👋 I'm your AI fitness coach. I can help you with workout tips, nutrition advice, form corrections, and answer any questions about your ${userProfile?.selected_workout_plan || 'fitness'} plan. What would you like to know?`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const responses = [
        "Great question! Based on your current plan, I'd recommend focusing on proper form over heavy weights. Quality reps will give you better results and reduce injury risk.",
        "For nutrition, make sure you're getting enough protein - aim for about 1g per pound of body weight. Your meal plan is designed to support your fitness goals.",
        "Remember to stay hydrated! Aim for at least 8 glasses of water daily, especially on workout days.",
        "Rest and recovery are just as important as your workouts. Make sure you're getting 7-9 hours of quality sleep.",
        "I noticed you're working on strength building. Progressive overload is key - gradually increase weight, reps, or sets each week.",
        "Your form is crucial for preventing injuries. If you're unsure about any exercise, don't hesitate to ask me for tips!",
        "Consistency beats perfection. Even if you can only do 80% of your planned workout, that's still progress!",
        "Pre and post-workout nutrition can make a big difference. A small snack 30 minutes before and protein within 30 minutes after works well."
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-orange hover:bg-orange/80 text-charcoal p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50"
          aria-label="Open virtual assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {/* Notification dot for new messages */}
          <div className="absolute -top-1 -right-1 bg-gold w-3 h-3 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-96 bg-[#1A1B18] border-l border-[#EE7F0E]/20 z-50 shadow-2xl">
            {/* Header */}
            <CardHeader className="border-b border-[#EE7F0E]/20 bg-gradient-to-r from-[#1A1B18] to-[#000000]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#EFEAE0] font-['Bebas_Neue'] text-xl">AI FITNESS COACH</CardTitle>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-[#EFEAE0] hover:text-[#EE7F0E] hover:bg-[#EE7F0E]/10"
                >
                  ✕
                </Button>
              </div>
              <p className="text-[#EFEAE0]/60 text-sm">
                Your personal AI trainer is here to help
              </p>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-200px)] bg-[#1A1B18]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-[#EE7F0E] text-[#000000]'
                        : 'bg-[#000000]/50 text-[#EFEAE0] border border-[#EE7F0E]/20'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-[#000000]/70' : 'text-[#EFEAE0]/50'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#000000]/50 text-[#EFEAE0] border border-[#EE7F0E]/20 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#EE7F0E] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#EE7F0E] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-[#EE7F0E] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="border-t border-[#EE7F0E]/20 p-4 bg-[#1A1B18]">
              <div className="flex space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fitness, nutrition, or your workout plan..."
                  className="flex-1 bg-[#000000]/50 border border-[#EE7F0E]/20 rounded-lg p-3 text-[#EFEAE0] placeholder-[#EFEAE0]/50 resize-none focus:outline-none focus:border-[#EE7F0E]"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/80 text-[#000000] px-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
              <p className="text-xs text-[#EFEAE0]/40 mt-2">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
