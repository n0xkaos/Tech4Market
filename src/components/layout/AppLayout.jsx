import React from 'react';
import { useApp } from '../../context/AppContext';

export function AppLayout({ children }) {
  const { toasts } = useApp();

  return (
    <div className="app-root-container">
      <main className="app-viewport">
        {/* Toast Notification Container */}
        {toasts.length > 0 && (
          <div className="toast-container">
            {toasts.map(toast => (
              <div key={toast.id} className={`toast ${toast.type}`}>
                <span>{toast.icon || '🔔'}</span>
                <span>{toast.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {children}
      </main>
    </div>
  );
}
