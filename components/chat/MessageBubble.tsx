import { Message } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex',
        isOwn ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[70%] rounded-lg px-4 py-2',
          isOwn
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100 text-gray-900'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={cn(
            'text-xs mt-1',
            isOwn ? 'text-primary-foreground/70' : 'text-gray-500'
          )}
        >
          {format(new Date(message.createdAt), 'hh:mm a')}
        </p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs underline"
              >
                Attachment {index + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

