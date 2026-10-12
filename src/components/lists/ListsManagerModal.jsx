import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Copy, Trash2, Check, ShoppingBag, DollarSign, Calendar } from 'lucide-react';

export function ListsManagerModal({ isOpen, onClose }) {
  const { lists, activeListId, setActiveListId, createList, duplicateList, deleteList, markets } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListEmoji, setNewListEmoji] = useState('🛒');
  const [newListBudget, setNewListBudget] = useState('');
  const [newListMarket, setNewListMarket] = useState('m1');

  const emojis = ['🛒', '🥦', '🥩', '🥖', '🍾', '🎉', '💊', '📦', '🍔', '🍕'];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    createList({
      name: newListName.trim(),
      emoji: newListEmoji,
      budget: parseFloat(newListBudget) || 0,
      marketId: newListMarket
    });

    setNewListName('');
    setNewListBudget('');
    setIsCreating(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>📑</span>
            <h3 style={{ fontSize: '17px', fontWeight: '700' }}>Minhas Listas de Compras</h3>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {!isCreating ? (
          <div>
            {/* Lista de Listas Existentes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {lists.map(list => {
                const isActive = list.id === activeListId;
                const totalItems = list.items.length;
                const checkedItems = list.items.filter(i => i.checked).length;
                const totalCost = list.items.reduce((acc, it) => acc + (it.price * it.quantity), 0);

                return (
                  <div
                    key={list.id}
                    onClick={() => {
                      setActiveListId(list.id);
                      onClose();
                    }}
                    style={{
                      padding: '12px 14px',
                      background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface-elevated)',
                      border: isActive ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'var(--trans-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '24px' }}>{list.emoji || '🛒'}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '700', fontSize: '15px', color: isActive ? 'var(--emerald-400)' : 'var(--text-primary)' }}>
                            {list.name}
                          </span>
                          {isActive && (
                            <span style={{ fontSize: '10px', background: 'var(--emerald-500)', color: 'white', padding: '2px 6px', borderRadius: 'var(--radius-full)', fontWeight: '700' }}>
                              ATIVA
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          <span>{checkedItems}/{totalItems} itens</span>
                          <span>•</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                            R$ {totalCost.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={e => e.stopPropagation()}>
                      <button
                        className="icon-btn"
                        style={{ width: '30px', height: '30px' }}
                        title="Clonar Lista"
                        onClick={() => duplicateList(list.id)}
                      >
                        <Copy size={13} />
                      </button>
                      {lists.length > 1 && (
                        <button
                          className="icon-btn"
                          style={{ width: '30px', height: '30px', color: 'var(--rose-500)' }}
                          title="Excluir Lista"
                          onClick={() => deleteList(list.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão de Nova Lista */}
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
              onClick={() => setIsCreating(true)}
            >
              <Plus size={16} />
              <span>Criar Nova Lista</span>
            </button>
          </div>
        ) : (
          /* Formulário de Criação de Nova Lista */
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Ícone / Emoji
              </label>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {emojis.map(em => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setNewListEmoji(em)}
                    style={{
                      fontSize: '20px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: newListEmoji === em ? 'var(--emerald-glow)' : 'var(--bg-glass-input)',
                      border: newListEmoji === em ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)'
                    }}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Nome da Lista
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: Compras da Semana, Churrasco..."
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Meta de Orçamento (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="Ex: 500,00"
                  value={newListBudget}
                  onChange={e => setNewListBudget(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Mercado Principal
                </label>
                <select
                  className="input-field"
                  value={newListMarket}
                  onChange={e => setNewListMarket(e.target.value)}
                >
                  {markets.map(m => (
                    <option key={m.id} value={m.id} style={{ background: '#1e293b' }}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Salvar Lista
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
