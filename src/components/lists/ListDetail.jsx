import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/defaultProducts';
import {
  Check,
  Plus,
  Trash2,
  Search,
  ShoppingCart,
  ArrowRight,
  PackageCheck,
  SlidersHorizontal,
  DollarSign,
  TrendingDown,
  Sparkles,
  Zap
} from 'lucide-react';

export function ListDetail({ onOpenAddModal, onOpenPriceHistory }) {
  const {
    activeList,
    toggleItemChecked,
    deleteItem,
    updateItem,
    clearCheckedItems,
    moveCheckedToPantry,
    setActiveTab,
    marketComparison,
    splitBasketOptimization
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingItemId, setEditingItemId] = useState(null);

  // Filtragem dos itens por texto e categoria
  const filteredItems = useMemo(() => {
    if (!activeList || !activeList.items) return [];

    return activeList.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeList, searchQuery, selectedCategory]);

  // Agrupamento por Categoria quando 'all' estiver selecionado
  const groupedCategories = useMemo(() => {
    const groups = {};
    filteredItems.forEach(item => {
      const cat = item.category || 'outros';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [filteredItems]);

  const cheapestMarket = marketComparison[0];

  if (!activeList) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
        <p>Nenhuma lista selecionada.</p>
      </div>
    );
  }

  return (
    <div className="scrollable-content">
      {/* Mini Banner de Economia Detectada */}
      {cheapestMarket && activeList.items.length > 0 && (
        <div
          onClick={() => setActiveTab('compare')}
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
            border: '1px solid var(--emerald-500)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>💡</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--emerald-400)' }}>
                Melhor Preço no {cheapestMarket.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Total: R$ {cheapestMarket.total.toFixed(2).replace('.', ',')} (Comparar outros mercados)
              </div>
            </div>
          </div>
          <ArrowRight size={16} color="var(--emerald-400)" />
        </div>
      )}

      {/* Busca & Filtros de Categoria */}
      <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Buscar item na lista..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '36px', height: '40px' }}
          />
        </div>

        {/* Chips de Categoria Horizontal */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            className={`category-badge ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
            style={{
              background: selectedCategory === 'all' ? 'var(--emerald-500)' : 'var(--bg-surface-elevated)',
              color: selectedCategory === 'all' ? 'white' : 'var(--text-secondary)',
              border: selectedCategory === 'all' ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            <span>✨</span>
            <span>Todos ({activeList.items.length})</span>
          </button>

          {CATEGORIES.map(cat => {
            const count = activeList.items.filter(it => it.category === cat.id).length;
            if (count === 0 && selectedCategory !== cat.id) return null;

            return (
              <button
                key={cat.id}
                className="category-badge"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? 'var(--emerald-500)' : 'var(--bg-surface-elevated)',
                  color: selectedCategory === cat.id ? 'white' : 'var(--text-secondary)',
                  border: selectedCategory === cat.id ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Itens da Lista */}
      {filteredItems.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-medium)',
          marginTop: '10px'
        }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>🛒</span>
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Lista Vazia</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Adicione itens digitando, usando voz ou importando de receitas.
          </p>
          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <Plus size={16} />
            <span>Adicionar Primeiro Item</span>
          </button>
        </div>
      ) : (
        <div>
          {Object.entries(groupedCategories).map(([catId, items]) => {
            const catInfo = CATEGORIES.find(c => c.id === catId) || { name: 'Outros', icon: '📦' };

            return (
              <div key={catId} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  <span>{catInfo.icon}</span>
                  <span>{catInfo.name.toUpperCase()}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({items.length})</span>
                </div>

                {items.map(item => {
                  const itemTotal = item.price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className={`shopping-item-row ${item.checked ? 'checked' : ''}`}
                    >
                      {/* Checkbox de Compra */}
                      <div
                        className={`checkbox-custom ${item.checked ? 'checked' : ''}`}
                        onClick={() => toggleItemChecked(item.id)}
                      >
                        {item.checked && <Check size={15} strokeWidth={3} />}
                      </div>

                      {/* Info do Item */}
                      <div className="item-info">
                        <div className="item-header">
                          <span
                            className="item-name"
                            onClick={() => toggleItemChecked(item.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {item.name}
                          </span>
                          <span className="item-price-tag">
                            R$ {itemTotal.toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        <div className="item-meta">
                          {/* Ajuste de Quantidade Rápido */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '4px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)',
                                display: 'grid',
                                placeItems: 'center',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateItem(item.id, { quantity: Math.max(0.1, Math.round((item.quantity - 1) * 10) / 10) });
                                } else {
                                  deleteItem(item.id);
                                }
                              }}
                            >
                              -
                            </button>
                            <span className="item-qty-tag">
                              {item.quantity} {item.unit}
                            </span>
                            <button
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '4px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)',
                                display: 'grid',
                                placeItems: 'center',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}
                              onClick={() => {
                                updateItem(item.id, { quantity: Math.round((item.quantity + 1) * 10) / 10 });
                              }}
                            >
                              +
                            </button>
                          </div>

                          <span>•</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            R$ {item.price.toFixed(2).replace('.', ',')}/{item.unit}
                          </span>
                        </div>
                      </div>

                      {/* Excluir Item */}
                      <button
                        className="icon-btn"
                        style={{ width: '28px', height: '28px', color: 'var(--text-muted)' }}
                        onClick={() => deleteItem(item.id)}
                        title="Excluir"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* Ações de Final de Lista */}
      {activeList.items.length > 0 && (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activeList.items.some(i => i.checked) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '12px', padding: '10px' }}
                onClick={() => moveCheckedToPantry(activeList.id)}
              >
                <PackageCheck size={15} color="var(--emerald-400)" />
                <span>Mover p/ Despensa</span>
              </button>

              <button
                className="btn btn-secondary"
                style={{ fontSize: '12px', padding: '10px', color: 'var(--text-muted)' }}
                onClick={() => clearCheckedItems(activeList.id)}
              >
                <Trash2 size={14} />
                <span>Limpar Marcados</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button (FAB) para Adicionar Item */}
      <button
        className="fab-add"
        onClick={onOpenAddModal}
        title="Adicionar Item"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>
    </div>
  );
}
