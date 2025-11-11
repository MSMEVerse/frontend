'use client';

import { useState, useEffect } from 'react';
import { Notification } from '../types';
import { getWebSocketClient } from '../websocket';
import { notificationsApi } from '../api/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial notifications
    const loadNotifications = async () => {
      try {
        const response = await notificationsApi.getAll();
        setNotifications(response.data);
        setUnreadCount(response.data.filter((n) => !n.read).length);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();

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

          ws.on('notification', (data: Notification) => {
            setNotifications((prev) => [data, ...prev]);
            setUnreadCount((prev) => prev + 1);
          });

          return () => {
            ws.off('notification', () => {});
          };
        } catch (error) {
          // Silently fail in frontend-only mode
        }
      }
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead };
}

