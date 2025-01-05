import React, { useState } from 'react';

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Customer', text: 'Hi, I need help with my order.', timestamp: '10:00 AM' },
    { id: 2, sender: 'Support', text: 'Sure! How can I assist you?', timestamp: '10:05 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'Support', text: newMessage, timestamp: new Date().toLocaleTimeString() },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">Customer Support</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
          <div
            className={`p-3 rounded-lg hover:bg-blue-100 cursor-pointer ${!selectedUser ? 'bg-blue-100' : ''}`}
            onClick={() => setSelectedUser('Customer 1')}
          >
            <p className="font-medium text-gray-700">Customer 1</p>
            <p className="text-sm text-gray-500">Hi, I need help with my order.</p>
          </div>
          <div
            className={`p-3 rounded-lg hover:bg-blue-100 cursor-pointer ${selectedUser === 'Customer 1' ? 'bg-blue-100' : ''}`}
            onClick={() => setSelectedUser('Customer 2')}
          >
            <p className="font-medium text-gray-700">Customer 2</p>
            <p className="text-sm text-gray-500">Can I change my order details?</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-gray-100 p-6">
          {selectedUser ? (
            <>
              <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'Support' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg text-white ${
                          message.sender === 'Support' ? 'bg-blue-600' : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input Area */}
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
            </>
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

export default Messages;
