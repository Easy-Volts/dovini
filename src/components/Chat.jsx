import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useToast } from '../context/ToastContext';
import {
  MessageCircle,
  X,
  Send,
  User,
  Minimize2,
  Maximize2,
  MoreVertical,
  Plus
} from 'lucide-react';

const Chat = () => {
  const { user } = useAuth();
  const {
    activeConversation,
    setActiveConversation,
    startConversation,
    getConversations,
    getConversation,
    sendMessage,
    markAsRead,
    getTotalUnreadCount
  } = useChat();
  const { showError } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [showConversationList, setShowConversationList] = useState(true);
  const messagesEndRef = useRef(null);

  const conversations = getConversations();
  const currentConversation = activeConversation ? getConversation(activeConversation) : null;
  const unreadCount = getTotalUnreadCount();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  useEffect(() => {
    if (activeConversation && currentConversation) {
      markAsRead(activeConversation);
    }
  }, [activeConversation, currentConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    sendMessage(activeConversation, messageInput.trim());
    setMessageInput('');
  };

  const handleStartChat = (conversationId) => {
    setActiveConversation(conversationId);
    setShowConversationList(false);
  };

  const handleBackToList = () => {
    setActiveConversation(null);
    setShowConversationList(true);
  };

  const handleStartNewChat = () => {
    // Start a conversation with support team
    const supportUserId = 'support_team';
    const supportUserName = 'Support Team';
    startConversation(supportUserId, supportUserName);
    setShowConversationList(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  if (!user) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold animate-pulse">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? '60px' : window.innerWidth < 640 ? '80vh' : '500px',
              width: window.innerWidth < 640 ? 'calc(100vw - 3rem)' : '320px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-w-sm sm:max-w-none"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {currentConversation && !showConversationList && (
                  <button
                    onClick={handleBackToList}
                    className="text-white hover:text-red-200 transition-colors"
                  >
                    ←
                  </button>
                )}
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">
                  {currentConversation && !showConversationList
                    ? currentConversation.participants.find(p => p.id !== user.id)?.name
                    : 'Messages'
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {showConversationList && conversations.length > 0 && (
                  <button
                    onClick={handleStartNewChat}
                    className="text-white hover:text-red-200 transition-colors"
                    title="Start new chat"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="flex flex-col h-80">
                {/* Conversations List */}
                {showConversationList && (
                  <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="mb-2">No conversations yet</p>
                        <p className="text-sm mb-4">Start chatting with our support team!</p>
                        <button
                          onClick={handleStartNewChat}
                          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Start New Chat
                        </button>
                      </div>
                    ) : (
                      conversations.map((conversation) => {
                        const otherParticipant = conversation.participants.find(p => p.id !== user.id);
                        return (
                          <button
                            key={conversation.id}
                            onClick={() => handleStartChat(conversation.id)}
                            className="w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={otherParticipant.avatar}
                                alt={otherParticipant.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-gray-900 truncate">
                                    {otherParticipant.name}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {formatTime(conversation.lastMessageTime)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                  {conversation.lastMessage || 'No messages yet'}
                                </p>
                              </div>
                              {conversation.unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Chat Messages */}
                {currentConversation && !showConversationList && (
                  <>
                    <div className="flex-1 min-h-[350px] overflow-y-auto p-4 space-y-3">
                      {currentConversation.messages.map((message) => {
                        const isOwnMessage = message.senderId === user.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs px-4 py-2 rounded-2xl ${
                                isOwnMessage
                                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${isOwnMessage ? 'text-red-200' : 'text-gray-500'}`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={!messageInput.trim()}
                          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;