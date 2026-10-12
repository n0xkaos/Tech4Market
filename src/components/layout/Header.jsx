import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, Share2, Moon, Sun, Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';

export function Header({ onOpenListsModal, onOpenShareModal }) {
  const { activeList, activeListMetrics, activeTab, theme, setTheme, soundEnabled, setSoundEnabled } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'compare':
        return 'Comparador de Mercados';
      case 'scanner':
        return 'Scanner de Cupom / OCR';
      case 'pantry':
        return 'Minha Despensa';
      case 'recipes':
        return 'Receitas & Ingredientes';
      case 'analytics':
        return 'Analytics & Economia';
      default:
        return activeList?.name || 'Lista de Compras';
    }
  };

  return (
    <div className="app-header">
      <div className="header-top-row">
        {/* List Switcher / Title */}
        {activeTab === 'list' ? (
          <button className="list-selector-trigger" onClick={onOpenListsModal}>
            <span style={{ fontSize: '18px' }}>{activeList?.emoji || '🛒'}</span>
            <span style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activeList?.name || 'Minhas Listas'}
            </span>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {getTabTitle()}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="header-actions">
          {/* Quick Sound Toggle */}
          <button
            className="icon-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Silenciar Sons' : 'Ativar Sons'}
            style={{ width: '32px', height: '32px' }}
          >
            {soundEnabled ? <Volume2 size={15} color="var(--emerald-400)" /> : <VolumeX size={15} />}
          </button>

          {/* Quick Theme Toggle */}
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Alternar Tema"
            style={{ width: '32px', height: '32px' }}
          >
            {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#6366f1" />}
          </button>

          {activeTab === 'list' && (
            <button
              className="icon-btn"
              onClick={onOpenShareModal}
              title="Compartilhar no WhatsApp"
              style={{ width: '32px', height: '32px' }}
            >
              <Share2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Mini Budget Bar (Only in List tab) */}
      {activeTab === 'list' && activeList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Carrinho:</span>
              <span style={{ fontWeight: '700', color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)' }}>
                {activeListMetrics.checkedCount}/{activeListMetrics.itemCount} itens
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total:</span>
              <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                R$ {activeListMetrics.total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-track" style={{ height: '6px' }}>
            <div
              className={`progress-fill ${activeList.budget > 0 && activeListMetrics.total > activeList.budget ? 'over-budget' : ''}`}
              style={{ width: `${Math.min(100, activeListMetrics.progress)}%` }}
            />
          </div>

          {activeList.budget > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Orçamento: R$ {activeList.budget.toFixed(2).replace('.', ',')}</span>
              <span style={{
                color: activeListMetrics.budgetDifference >= 0 ? 'var(--emerald-400)' : 'var(--rose-500)',
                fontWeight: '600'
              }}>
                {activeListMetrics.budgetDifference >= 0 ? `Sobra R$ ${activeListMetrics.budgetDifference.toFixed(2).replace('.', ',')}` : `Excedeu R$ ${Math.abs(activeListMetrics.budgetDifference).toFixed(2).replace('.', ',')}`}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
