"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, Dumbbell, MessageSquare, User, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { api } from "@/api"
import { toast, Toaster } from "sonner"

// Message type definition
type Message = {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
}

// Sample responses for demonstration
const suggestedQuestionsStatic = [
    "How can I improve my squat form?",
    "What's the best way to increase my bench press?",
    "How much protein should I eat daily?",
    "Can you suggest a good recovery routine?",
    "How do I break through a weight loss plateau?",
    "What's a good workout split for muscle gain?"
];

export default function AICoach() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            content: "Hi! I'm your AI fitness coach. How can I help you with your fitness journey today?",
            role: "assistant",
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    )
    const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Handle online/offline status
    useEffect(() => {
        const handleOnlineStatus = () => {
            setIsOnline(navigator.onLine)
            if (!navigator.onLine) {
                toast.error("You're offline. AI Coach is not available without an internet connection.")
            } else {
                toast.success("You're back online!")
            }
        }

        window.addEventListener('online', handleOnlineStatus)
        window.addEventListener('offline', handleOnlineStatus)

        return () => {
            window.removeEventListener('online', handleOnlineStatus)
            window.removeEventListener('offline', handleOnlineStatus)
        }
    }, [])

    // Handle window resize for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize() // Set initial size

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Focus input on page load
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSendMessage = async () => {
        if (!input.trim()) return
        if (!isOnline) {
            toast.error("You're offline. Please check your internet connection.")
            return
        }

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)
        try {
            const client = await api()
            const reponse = await client.post("/ai/chat", {
                text: input,
            })
            setSuggestedQuestions(reponse.data.related_questions)
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: reponse.data.answer,
                role: "assistant",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while fetching the response. Try Again Later.")
        } finally {
            setInput("")
            setIsLoading(false)
        }
    }

    const handleSuggestedQuestion = (question: string) => {
        setInput(question)
        inputRef.current?.focus()
    }

    // Calculate number of suggestions to show based on screen width
    const getVisibleSuggestionsCount = () => {
        if (windowWidth < 640) return 2 // Mobile: show 2
        if (windowWidth < 768) return 3 // Small tablets: show 3
        return 4 // Larger screens: show 4
    }

    // Render offline state
    if (!isOnline) {
        return (
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
                {/* Background elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-10 right-10 md:top-20 md:right-20 w-40 md:w-72 h-40 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
                    <div className="absolute bottom-20 md:bottom-40 left-5 md:left-10 w-40 md:w-80 h-40 md:h-80 bg-blue-500/10 rounded-full blur-3xl" style={{ animationDuration: '20s' }}></div>
                </div>
                
                <div className="flex flex-col items-center justify-center flex-grow p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 md:p-8 max-w-md w-full text-center shadow-xl"
                    >
                        <div className="relative mx-auto w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
                            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                            <div className="relative bg-gradient-to-br from-red-600/30 to-red-800/30 rounded-full w-full h-full flex items-center justify-center border border-red-500/30">
                                <WifiOff className="h-8 w-8 md:h-10 md:w-10 text-red-400" />
                            </div>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">You're Offline</h2>
                        <p className="text-gray-300 mb-4 md:mb-6">AI Coach requires an internet connection to function. Please check your connection and try again.</p>
                        
                        <Button 
                            onClick={() => window.location.reload()}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            Retry Connection
                        </Button>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col  bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
            {/* Background elements - Enhanced with more dynamic elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 right-10 md:top-20 md:right-20 w-40 md:w-72 h-40 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
                <div className="absolute bottom-20 md:bottom-40 left-5 md:left-10 w-40 md:w-80 h-40 md:h-80 bg-blue-500/10 rounded-full blur-3xl" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-1/3 left-1/4 w-32 md:w-60 h-32 md:h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/3 w-24 md:w-40 h-24 md:h-40 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '25s' }}></div>
            </div>
            <Toaster />
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-2 md:p-4 overflow-y-auto" ref={scrollAreaRef}>
                <div className="max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto space-y-2 md:space-y-4 pb-16 md:pb-20">
                    {messages.length === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-2 md:mb-8 p-3 xs:p-4 md:p-6 rounded-lg md:rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 text-center backdrop-blur-sm shadow-xl"
                        >
                            <div className="flex justify-center mb-3 md:mb-4">
                                <div className="relative">
                                    <div className="absolute -inset-3 md:-inset-4 rounded-full bg-purple-500/20 animate-pulse"></div>
                                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 md:p-3 rounded-full relative">
                                        <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-lg xs:text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white">Your Personal AI Fitness Coach</h2>
                            <p className="text-xs xs:text-sm md:text-base text-gray-400 mb-4 md:mb-6 max-w-md mx-auto">
                                Ask me anything about workouts, nutrition, recovery, or fitness goals. I'm here to help you achieve your best results.
                            </p>


                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 md:gap-2 max-w-lg mx-auto">
                                {suggestedQuestionsStatic.slice(0, getVisibleSuggestionsCount()).map((question, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        onClick={() => handleSuggestedQuestion(question)}
                                        className="text-left p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 hover:border-purple-500/30 transition-all text-xs md:text-sm text-gray-300 hover:text-white flex items-start gap-1.5 md:gap-2 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                        <span>{question}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {/* Message bubbles */}
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex items-start gap-1.5 xs:gap-2 md:gap-3",
                                    message.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                {message.role === "assistant" && (
                                    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-1 xs:p-1.5 md:p-2 rounded-full flex-shrink-0 mt-1">
                                        <Bot className="h-3 w-3 xs:h-4 xs:w-4 md:h-5 md:w-5 text-purple-400" />
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "max-w-[85%] sm:max-w-[75%] p-2 xs:p-3 md:p-4 rounded-lg md:rounded-2xl",
                                        message.role === "user"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                                            : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 text-gray-200"
                                    )}
                                >
                                    <p className="text-xs xs:text-sm md:text-base">{message.content}</p>
                                    <div className="mt-1 text-[8px] xs:text-[10px] md:text-xs opacity-70 text-right">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                {message.role === "user" && (
                                    <div className="bg-blue-500 p-1 xs:p-1.5 md:p-2 rounded-full flex-shrink-0 mt-1">
                                        <User className="h-3 w-3 xs:h-4 xs:w-4 md:h-5 md:w-5 text-white" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start mb-2 md:mb-4 w-full"
                            >
                                <div className="flex gap-2 md:gap-3 max-w-[85%] sm:max-w-[75%] bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-r-lg rounded-bl-lg md:rounded-r-xl md:rounded-bl-xl p-2 xs:p-3 md:p-4 shadow-lg backdrop-blur-sm">
                                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-purple-500/50 to-blue-500/50 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                                            <div className="dot-typing"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-xs md:text-sm text-gray-400">Thinking...</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input Area - Enhanced with better visual feedback */}
            <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 p-2 xs:p-3 md:p-4">
                <div className="max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto">
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ask your AI coach anything..."
                            className="bg-gray-800/70 border-gray-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white pr-10 xs:pr-12 text-xs xs:text-sm md:text-base rounded-lg md:rounded-xl py-4 xs:py-5 md:py-6 shadow-lg transition-all duration-200 placeholder:text-gray-500"
                            aria-label="Message input"
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                            className={`absolute right-1 xs:right-1.5 top-1/2 transform -translate-y-1/2 rounded-lg h-7 w-7 xs:h-8 xs:w-8 md:h-9 md:w-9 p-0 transition-all duration-300 ${input.trim()
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:scale-105 active:scale-95 shadow-md shadow-purple-500/20'
                                : 'bg-gray-700'
                                }`}
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <div className="h-3 w-3 xs:h-3.5 xs:w-3.5 md:h-4 md:w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Send className="h-3 w-3 xs:h-3.5 xs:w-3.5 md:h-4 md:w-4" />
                            )}
                        </Button>
                    </div>

                    {/* Suggested questions - Enhanced with better scrolling and responsive sizing */}
                    {messages.length > 1 && (
                        <div className="mt-2 md:mt-3 -mx-1">
                            <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent snap-x">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestedQuestion(question)}
                                        className="flex-shrink-0 px-2 xs:px-2.5 md:px-3 py-1 xs:py-1.5 rounded-full bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 hover:border-purple-500/30 transition-all text-[10px] xs:text-xs text-gray-300 hover:text-white whitespace-nowrap snap-start hover:scale-105 active:scale-95"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Added accessibility note */}
                    <p className="text-[8px] xs:text-[10px] md:text-xs text-gray-500 text-center mt-1 md:mt-2">Press Enter to send your message</p>
                </div>
            </div>

            {/* Add CSS for typing animation */}
            <style>{`
        /* Add a custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:p-4 { padding: 1rem; }
          .xs\\:p-3 { padding: 0.75rem; }
          .xs\\:p-2 { padding: 0.5rem; }
          .xs\\:p-1\\.5 { padding: 0.375rem; }
          .xs\\:mb-1 { margin-bottom: 0.25rem; }
          .xs\\:gap-2 { gap: 0.5rem; }
          .xs\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .xs\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .xs\\:text-\\[10px\\] { font-size: 10px; }
          .xs\\:h-4 { height: 1rem; }
          .xs\\:w-4 { width: 1rem; }
          .xs\\:h-8 { height: 2rem; }
          .xs\\:w-8 { width: 2rem; }
          .xs\\:h-3\\.5 { height: 0.875rem; }
          .xs\\:w-3\\.5 { width: 0.875rem; }
          .xs\\:right-1\\.5 { right: 0.375rem; }
          .xs\\:pr-12 { padding-right: 3rem; }
          .xs\\:py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
          .xs\\:px-2\\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
          .xs\\:py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
          .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .dot-typing {
          position: relative;
          left: -9999px;
          width: 5px;
          height: 5px;
          border-radius: 5px;
          background-color: white;
          color: white;
          box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
          animation: dot-typing 1.5s infinite linear;
        }

        @keyframes dot-typing {
          0% {
            box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
          }
          16.667% {
            box-shadow: 9984px -5px 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
          }
          33.333% {
            box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
          }
          50% {
            box-shadow: 9984px 0 0 0 white, 9999px -5px 0 0 white, 10014px 0 0 0 white;
          }
          66.667% {
            box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
          }
          83.333% {
            box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px -5px 0 0 white;
          }
          100% {
            box-shadow: 9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white;
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        
        /* Track */
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        
        /* Handle */
        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background: rgba(55, 65, 81, 0.5);
          border-radius: 10px;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(55, 65, 81, 0.5) transparent;
        }
      `}</style>
        </div>
    )
}