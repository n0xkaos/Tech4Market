import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Monitor, Moon, Sun, Volume2, VolumeX, Sparkles, Wifi, Battery } from 'lucide-react';

export function MobileFrame({ children }) {
  const { theme, setTheme, soundEnabled, setSoundEnabled, viewMode, setViewMode, toasts } = useApp();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const getFrameClass = () => {
    if (viewMode === 'frame-android') return 'mobile-device-frame android';
    if (viewMode === 'fullscreen') return 'mobile-device-frame fullscreen';
    return 'mobile-device-frame'; // default iPhone
  };

  return (
    <div className="desktop-wrapper">
      {/* Desktop Top Toolbar */}
      <header className="desktop-top-toolbar">
        <div className="brand-badge">
          <div className="brand-logo-icon">🛒</div>
          <span>SmartCart Pro</span>
        </div>

        {/* View Mode Controls */}
        <div className="view-mode-selector">
          <button
            className={`view-mode-btn ${viewMode === 'frame-iphone' ? 'active' : ''}`}
            onClick={() => setViewMode('frame-iphone')}
            title="Modo iPhone"
          >
            <Smartphone size={14} /> iPhone
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'frame-android' ? 'active' : ''}`}
            onClick={() => setViewMode('frame-android')}
            title="Modo Android"
          >
            <Smartphone size={14} /> Android
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'fullscreen' ? 'active' : ''}`}
            onClick={() => setViewMode('fullscreen')}
            title="Tela Expandida"
          >
            <Monitor size={14} /> Expandido
          </button>
        </div>

        {/* Quick Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className="icon-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Desativar Sons' : 'Ativar Sons'}
            style={{ width: '30px', height: '30px' }}
          >
            {soundEnabled ? <Volume2 size={14} color="var(--emerald-400)" /> : <VolumeX size={14} />}
          </button>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            style={{ width: '30px', height: '30px' }}
          >
            {theme === 'dark' ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
          </button>
        </div>
      </header>

      {/* Mobile Device Mockup Frame */}
      <main className={getFrameClass()}>
        {/* Dynamic Island (iPhone only) */}
        {viewMode === 'frame-iphone' && (
          <div className="dynamic-island">
            <div className="island-camera"></div>
            <div className="island-sensor"></div>
          </div>
        )}

        {/* Status Bar */}
        <div className="mobile-status-bar">
          <span className="status-time">{time || '09:41'}</span>
          <div className="status-icons">
            <Wifi size={13} />
            <span style={{ fontSize: '11px', fontWeight: '700' }}>5G</span>
            <Battery size={15} />
          </div>
        </div>

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

        {/* Mobile Viewport Screen Content */}
        <div className="mobile-screen-content">
          {children}
        </div>
      </main>
    </div>
  );
}
