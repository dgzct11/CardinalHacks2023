'use client';

import {UseChatHelpers, useChat} from 'ai/react';

export default function Chat() {
  const {messages, input, handleInputChange, handleSubmit} = useChat();
  


  return (
    <div className='chatContainer'>
      <div className='messagesContainer'>
        {messages.map(m => (
          <div key={m.id} className={m.role === 'assistant' ? 'systemMessage' : 'userMessage'}>
            <div className='messageContainer'>{m.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="inputForm">
        <input value={input} onChange={handleInputChange} placeholder="How can I help you with your prescription..." className="inputField" />

      </form>
    </div>
  );
}
