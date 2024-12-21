import React, { useState } from 'react';

const Messages = () => {
  const [selectedSection, setSelectedSection] = useState('Inbox');

  const sections = ['Inbox', 'Sent', 'All', 'Trash', 'Spam', 'Unread'];
  const messages = [
    { id: 1, from: 'John Doe', subject: 'Meeting Tomorrow', date: '2024-12-20' },
    { id: 2, from: 'Jane Smith', subject: 'Project Update', date: '2024-12-19' },
    { id: 3, from: 'Marketing Team', subject: 'New Offers', date: '2024-12-18' },
  ]; // Sample data for messages

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="w-full mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Message Sections</h3>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`cursor-pointer p-2 rounded-md hover:bg-green-500 hover:text-white transition ${
                  selectedSection === section ? 'bg-green-500 text-white' : 'text-gray-700'
                }`}
              >
                {section}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">{selectedSection} Messages</h2>

          {/* Message List */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border-b py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{message.subject}</p>
                    <p className="text-sm text-gray-600">From: {message.from}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{message.date}</p>
                    <button className="text-sm text-red-500 hover:text-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State for No Messages */}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-6">
              <p>No messages in this section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
