import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/defaultProducts';
import {
  Archive,
  AlertTriangle,
  Clock,
  Plus,
  Trash2,
  ShoppingCart,
  Check,
  Search,
  Refrigerator
} from 'lucide-react';

export function PantryManager() {
  const { pantry, updatePantryItem, deletePantryItem, restockToShoppingList } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'expiring', 'low-stock'

  // Calcular dias restantes até o vencimento
  const getDaysUntilExpiration = (expDateStr) => {
    if (!expDateStr) return 999;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(expDateStr);
    exp.setHours(0, 0, 0, 0);
    return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  };

  const filteredPantry = pantry.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const days = getDaysUntilExpiration(item.expirationDate);
    const isExpiring = days <= 5;
    const isLowStock = item.quantity <= (item.minQuantity || 1);

    if (filter === 'expiring') return matchesSearch && isExpiring;
    if (filter === 'low-stock') return matchesSearch && isLowStock;
    return matchesSearch;
  });

  const expiringCount = pantry.filter(it => getDaysUntilExpiration(it.expirationDate) <= 5).length;
  const lowStockCount = pantry.filter(it => it.quantity <= (it.minQuantity || 1)).length;

  return (
    <div className="scrollable-content">
      {/* Resumo Rápido da Despensa */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <div
          onClick={() => setFilter(filter === 'expiring' ? 'all' : 'expiring')}
          style={{
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            background: filter === 'expiring' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-surface-elevated)',
            border: filter === 'expiring' ? '1px solid var(--amber-500)' : '1px solid var(--border-subtle)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-500)', fontSize: '12px', fontWeight: '700' }}>
            <Clock size={14} />
            <span>Vencendo Logo</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {expiringCount} {expiringCount === 1 ? 'item' : 'itens'}
          </div>
        </div>

        <div
          onClick={() => setFilter(filter === 'low-stock' ? 'all' : 'low-stock')}
          style={{
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            background: filter === 'low-stock' ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-surface-elevated)',
            border: filter === 'low-stock' ? '1px solid var(--rose-500)' : '1px solid var(--border-subtle)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose-500)', fontSize: '12px', fontWeight: '700' }}>
            <AlertTriangle size={14} />
            <span>Estoque Baixo</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            {lowStockCount} {lowStockCount === 1 ? 'item' : 'itens'}
          </div>
        </div>
      </div>

      {/* Barra de Busca */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="input-field"
          placeholder="Buscar produto na despensa..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '36px', height: '40px' }}
        />
      </div>

      {/* Lista de Itens da Despensa */}
      {filteredPantry.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-lg)' }}>
          <Archive size={36} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
          <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Nenhum item encontrado</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Mova itens comprados da sua lista para cá com 1 clique!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredPantry.map(item => {
            const daysLeft = getDaysUntilExpiration(item.expirationDate);
            let badgeColor = 'var(--emerald-500)';
            let badgeText = `${daysLeft} dias`;

            if (daysLeft <= 2) {
              badgeColor = 'var(--rose-500)';
              badgeText = daysLeft <= 0 ? 'VENCEU!' : `Vence em ${daysLeft}d!`;
            } else if (daysLeft <= 5) {
              badgeColor = 'var(--amber-500)';
              badgeText = `Vence em ${daysLeft}d`;
            }

            const catInfo = CATEGORIES.find(c => c.id === item.category) || { icon: '📦' };

            return (
              <div key={item.id} className="card" style={{ padding: '12px 14px', marginBottom: '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{catInfo.icon}</span>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{item.name}</strong>
                  </div>

                  {item.expirationDate && (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: badgeColor,
                      color: 'white'
                    }}>
                      {badgeText}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span>Local: <strong>{item.location || 'Despensa'}</strong></span>

                  {/* Controle de Quantidade */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '4px',
                        background: 'var(--bg-glass-input)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                      onClick={() => {
                        if (item.quantity > 1) {
                          updatePantryItem(item.id, { quantity: item.quantity - 1 });
                        } else {
                          deletePantryItem(item.id);
                        }
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '4px',
                        background: 'var(--bg-glass-input)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                      onClick={() => updatePantryItem(item.id, { quantity: item.quantity + 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botão de Reposição */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Estoque mínimo: {item.minQuantity || 1} {item.unit}
                  </span>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}
                      onClick={() => restockToShoppingList(item)}
                    >
                      <ShoppingCart size={12} color="var(--emerald-400)" />
                      <span>Repor na Lista</span>
                    </button>
                    <button
                      className="icon-btn"
                      style={{ width: '26px', height: '26px', color: 'var(--text-muted)' }}
                      onClick={() => deletePantryItem(item.id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
