'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { format } from 'date-fns';

export default function NotificationCenter() {
  const { notifications, unreadCount, markAsRead } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <>
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start p-3 cursor-pointer"
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(new Date(notification.createdAt), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full ml-2" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            {notifications.length > 5 && (
              <DropdownMenuItem className="text-center text-sm text-primary">
                View all notifications
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

