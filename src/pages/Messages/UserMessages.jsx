import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import chatService from '../../services/messages/messageService';
import { useAuth } from '../../context/AuthContext';
import {jwtDecode} from 'jwt-decode';
import config from '../../services/config';

const UserMessages = ({ vendorId }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  const { accessToken } = useAuth();
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.UserInfo ? decodedToken.UserInfo.id : null;

  const BASE_URL = config.API_BASE_URL

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = io(BASE_URL); 
    setSocket(newSocket);

    newSocket.emit('join', { userId });

    newSocket.on('newMessage', (message) => {
      if (message.sender === selectedUser || message.receiver === selectedUser) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedUser, userId, BASE_URL]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await chatService.getChatHistory(userId, accessToken);
        if (response.data.success) {
          setChatHistory(response.data.chatHistory);
        } else {
          console.error('Failed to fetch chat history:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error.message);
      }
    };

    if (accessToken) {
      fetchChatHistory();
    }
  }, [userId, accessToken]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          const response = await chatService.getChatMessage(userId, selectedUser, accessToken);
          if (response.data.success) {
            setMessages(response.data.messages);
          } else {
            console.error('Failed to fetch messages:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching messages:', error.message);
        }
      }
    };

    if (selectedUser && accessToken) {
      fetchMessages();
    }
  }, [selectedUser, userId, accessToken]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await chatService.sendMessage(userId, selectedUser, newMessage, accessToken);
        if (response.data.success) {
          const message = response.data.message;
          socket.emit('sendMessage', message);
          setMessages((prevMessages) => [...prevMessages, message]);
          setNewMessage('');
        } else {
          console.error('Error sending message:', response.data.message);
        }
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    } else {
      console.error('Message is empty and cannot be sent.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-white border-r p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
          {chatHistory.length === 0 ? (
            <p>No chats available</p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.userId}
                className={`p-3 rounded-lg hover:bg-blue-100 cursor-pointer ${
                  selectedUser === chat.userId ? 'bg-blue-100' : ''
                }`}
                onClick={() => setSelectedUser(chat.userId)}
              >
                <p className="font-medium text-gray-700">{chat.chatUserName}</p>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
            ))
          )}
        </div>

        <div className="flex-1 bg-gray-100 p-6">
          {selectedUser ? (
            <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isMyMessage = message.sender === userId;
                  return (
                    <div
                      key={message._id}
                      className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          isMyMessage
                            ? 'bg-blue-600 text-white text-right'
                            : 'bg-gray-300 text-gray-700 text-left'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs text-gray-500 block mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center p-4 bg-gray-200">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              <p>Select a customer to start the chat.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
