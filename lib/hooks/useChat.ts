'use client';

import { useState, useEffect } from 'react';
import { Message } from '../types';
import { getWebSocketClient } from '../websocket';
import { messagesApi } from '../api/messages';

export function useChat(campaignId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial messages
    const loadMessages = async () => {
      try {
        const response = await messagesApi.getMessages(campaignId);
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Connect to WebSocket for real-time updates (only if explicitly enabled)
    // Skip WebSocket in frontend-only mode by default
    const disableWS = process.env.NEXT_PUBLIC_DISABLE_WS === 'true' || 
                     (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_WS !== 'true');
    
    if (!disableWS && typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const ws = getWebSocketClient();
          ws.connect(token);

          ws.on('message', (data: Message) => {
            if (data.campaignId === campaignId) {
              setMessages((prev) => [...prev, data]);
            }
          });

          return () => {
            ws.off('message', () => {});
          };
        } catch (error) {
          // Silently fail in frontend-only mode
        }
      }
    }
  }, [campaignId]);

  const sendMessage = async (content: string, receiverId: string) => {
    try {
      const message = await messagesApi.sendMessage({
        campaignId,
        receiverId,
        content,
      });
      setMessages((prev) => [...prev, message]);

      // Also send via WebSocket
      const ws = getWebSocketClient();
      ws.send('message', { campaignId, receiverId, content });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return { messages, loading, sendMessage };
}

