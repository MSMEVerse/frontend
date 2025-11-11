// WebSocket client for real-time communication
// This will be used for chat and notifications

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  connect(token: string) {
    // Skip WebSocket connection in frontend-only mode (no backend)
    // In development mode, disable WebSocket by default unless explicitly enabled
    // This prevents console errors when backend is not running
    const disableWS = process.env.NEXT_PUBLIC_DISABLE_WS === 'true' || 
                     (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_WS !== 'true');
    
    if (disableWS) {
      // Silently skip WebSocket connection in frontend-only mode
      return;
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = new WebSocket(`${this.url}?token=${token}`);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = () => {
        // Silently handle errors - don't spam console in frontend-only mode
        // Errors are expected when backend is not available
      };

      this.ws.onclose = () => {
        // Only attempt reconnection if WebSocket is enabled
        const disableWS = process.env.NEXT_PUBLIC_DISABLE_WS === 'true' || 
                         (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_WS !== 'true');
        if (!disableWS) {
          this.reconnect(token);
        }
      };
    } catch (error) {
      // Silently handle connection errors in frontend-only mode
    }
  }

  private reconnect(token: string) {
    // Skip reconnection in frontend-only mode
    const disableWS = process.env.NEXT_PUBLIC_DISABLE_WS === 'true' || 
                     (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_WS !== 'true');
    
    if (disableWS) {
      return;
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.connect(token);
      }, 1000 * this.reconnectAttempts);
    }
  }

  private handleMessage(data: any) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach((listener) => listener(payload));
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  off(event: string, callback: (data: any) => void) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  send(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }
}

// Singleton instance
let wsClient: WebSocketClient | null = null;

export const getWebSocketClient = (): WebSocketClient => {
  if (!wsClient) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';
    wsClient = new WebSocketClient(wsUrl);
  }
  return wsClient;
};

