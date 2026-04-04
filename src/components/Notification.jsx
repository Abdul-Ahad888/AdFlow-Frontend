  import React, { useState, useEffect } from "react";
  import { Bell, X } from "lucide-react";

  const API_BASE = import.meta.env.VITE_API_URL || "https://ad-flow-backend.vercel.app";

  // Socket.IO does not work on Vercel: requests hop between instances, so session IDs 400. Alerts use REST + polling only.

  export default function NotificationCenter() {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const unreadCount = notifications.length;

    useEffect(() => {
      let isMounted = true;

      const fetchAlerts = async () => {
        try {
          const response = await fetch(`${API_BASE}/api/alerts`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (isMounted && Array.isArray(data)) setNotifications(data);
        } catch (err) {
          console.error("Failed to fetch alerts:", err);
        }
      };

      fetchAlerts();
      const pollId = setInterval(fetchAlerts, 30_000);

      return () => {
        isMounted = false;
        clearInterval(pollId);
      };
    }, []);

    const deleteNotification = async (e, id) => {
      e.stopPropagation();

      try {
        await fetch(`${API_BASE}/api/alerts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setNotifications(prev => prev.filter(n => n.id !== id));
      } catch (err) {
        console.error("Failed to delete alert from DB:", err);
      }
    };

    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">
              {unreadCount}
            </span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white">Campaign Alerts</h3>
              <button onClick={() => setShowDropdown(false)} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">No active alerts</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="group relative p-4 border-b dark:border-gray-700 bg-blue-50/30 dark:bg-blue-900/10 transition-colors"
                  >
                    <button
                      onClick={(e) => deleteNotification(e, n.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove alert"
                    >
                      <X size={14} />
                    </button>

                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-tight pr-4">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-2 block italic">
                      {new Date(n.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }