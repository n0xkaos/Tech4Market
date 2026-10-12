import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Scale, ScanLine, Archive, ChefHat, BarChart3 } from 'lucide-react';

export function BottomNav() {
  const { activeTab, setActiveTab, activeListMetrics, pantry } = useApp();

  // Contagem de itens da despensa com validade próxima (< 5 dias)
  const expiringPantryCount = pantry.filter(item => {
    if (!item.expirationDate) return false;
    const diff = Math.ceil((new Date(item.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff <= 5;
  }).length;

  return (
    <nav className="bottom-nav-bar">
      {/* Tab 1: Listas de Compras */}
      <button
        className={`nav-item ${activeTab === 'list' ? 'active' : ''}`}
        onClick={() => setActiveTab('list')}
      >
        <div className="nav-icon-wrap">
          <ShoppingBag size={19} />
          {activeListMetrics.itemCount > 0 && (
            <span className="nav-badge-pill">{activeListMetrics.itemCount}</span>
          )}
        </div>
        <span>Lista</span>
      </button>

      {/* Tab 2: Comparador de Mercados */}
      <button
        className={`nav-item ${activeTab === 'compare' ? 'active' : ''}`}
        onClick={() => setActiveTab('compare')}
      >
        <div className="nav-icon-wrap">
          <Scale size={19} />
        </div>
        <span>Comparar</span>
      </button>

      {/* Tab 3: Scanner / Cupom OCR */}
      <button
        className={`nav-item ${activeTab === 'scanner' ? 'active' : ''}`}
        onClick={() => setActiveTab('scanner')}
      >
        <div className="nav-icon-wrap">
          <ScanLine size={19} />
        </div>
        <span>Scanner</span>
      </button>

      {/* Tab 4: Despensa */}
      <button
        className={`nav-item ${activeTab === 'pantry' ? 'active' : ''}`}
        onClick={() => setActiveTab('pantry')}
      >
        <div className="nav-icon-wrap">
          <Archive size={19} />
          {expiringPantryCount > 0 && (
            <span className="nav-badge-pill" style={{ background: 'var(--amber-500)' }}>
              {expiringPantryCount}
            </span>
          )}
        </div>
        <span>Despensa</span>
      </button>

      {/* Tab 5: Receitas */}
      <button
        className={`nav-item ${activeTab === 'recipes' ? 'active' : ''}`}
        onClick={() => setActiveTab('recipes')}
      >
        <div className="nav-icon-wrap">
          <ChefHat size={19} />
        </div>
        <span>Receitas</span>
      </button>

      {/* Tab 6: Analytics */}
      <button
        className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
        onClick={() => setActiveTab('analytics')}
      >
        <div className="nav-icon-wrap">
          <BarChart3 size={19} />
        </div>
        <span>Gráficos</span>
      </button>
    </nav>
  );
}
