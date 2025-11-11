'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Message as MessageType } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import MessageBubble from './MessageBubble';

interface ChatPanelProps {
  campaignId: string;
  recipientId?: string;
  recipientName?: string;
}

export default function ChatPanel({
  campaignId,
  recipientId,
  recipientName,
}: ChatPanelProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Load messages from API
    // For now, use mock messages
    const mockMessages: MessageType[] = [
      {
        id: '1',
        campaignId,
        senderId: recipientId || '1',
        receiverId: user?.id || '2',
        content: 'Hello! When can we schedule the content delivery?',
        read: false,
        createdAt: new Date().toISOString(),
      },
    ];
    setMessages(mockMessages);
  }, [campaignId, recipientId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const message: MessageType = {
      id: Date.now().toString(),
      campaignId,
      senderId: user.id,
      receiverId: recipientId || '',
      content: newMessage,
      read: false,
      createdAt: new Date().toISOString(),
      sender: user,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // TODO: Send message via WebSocket or API
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload
    console.log('File upload');
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">
          Chat with {recipientName || 'Creator'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>No messages yet. Start a conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === user?.id}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFileUpload}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

