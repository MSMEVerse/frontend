'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';
import { Message, Conversation, User, MSMEProfile } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import MessageBubble from '@/components/chat/MessageBubble';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BrandChatPanelProps {
  brand: User & { profile: MSMEProfile };
  conversation?: Conversation;
  onSendMessage: (content: string) => Promise<void>;
  messages?: Message[];
  loading?: boolean;
}

export default function BrandChatPanel({
  brand,
  conversation,
  onSendMessage,
  messages = [],
  loading = false,
}: BrandChatPanelProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if creator can send messages
  const canSendMessage = conversation?.canCreatorReply ?? false;
  const hasSentInitialMessage = conversation !== undefined && !canSendMessage;
  const hasNoConversation = conversation === undefined;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || isSending) return;

    // Check restrictions
    if (hasNoConversation) {
      // Allow first message
    } else if (hasSentInitialMessage && !canSendMessage) {
      // Creator has sent initial message but brand hasn't replied yet
      return;
    }

    setIsSending(true);
    try {
      await onSendMessage(newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const getInitials = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={brand.profile.logo || brand.avatar} />
            <AvatarFallback>
              {brand.profile.companyName?.[0]?.toUpperCase() || getInitials(brand)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{brand.profile.companyName}</CardTitle>
            {conversation && (
              <p className="text-xs text-muted-foreground">
                {conversation.canCreatorReply ? 'Active conversation' : 'Waiting for reply'}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p>No messages yet. Start a conversation!</p>
                {hasNoConversation && (
                  <p className="text-sm mt-2 text-muted-foreground">
                    You can send one initial message. Once the brand replies, you can continue chatting.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.senderId === user?.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Alert for message restrictions */}
        {hasSentInitialMessage && !canSendMessage && (
          <div className="px-4 pb-2">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Your message has been sent. You can continue chatting once the brand replies.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                hasSentInitialMessage && !canSendMessage
                  ? "Waiting for brand to reply..."
                  : "Type a message..."
              }
              className="flex-1"
              disabled={hasSentInitialMessage && !canSendMessage}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending || (hasSentInitialMessage && !canSendMessage)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {hasNoConversation && (
            <p className="text-xs text-muted-foreground mt-2">
              You can send one initial message. Unlimited messaging will be available after the brand replies.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

