import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, UNITS, DEFAULT_PRODUCTS } from '../../data/defaultProducts';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { X, Mic, MicOff, Check, Sparkles, Search, Plus, Tag } from 'lucide-react';

export function AddItemModal({ isOpen, onClose }) {
  const { addItemToList, autoCategorize, getProductPrices } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('mercearia');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('un');
  const [price, setPrice] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isAutoCategorized, setIsAutoCategorized] = useState(false);

  const inputRef = useRef(null);

  // Hook de Voz
  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition({
    onResult: (parsed) => {
      if (parsed.name) {
        setName(parsed.name);
        setQuantity(String(parsed.quantity));
        setUnit(parsed.unit);
        const autoCat = autoCategorize(parsed.name);
        setCategory(autoCat);
        setIsAutoCategorized(true);

        // Preço sugerido
        const found = DEFAULT_PRODUCTS.find(p => p.name.toLowerCase().includes(parsed.name.toLowerCase()));
        if (found) setPrice(String(found.avgPrice));
      }
    }
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setName('');
      setCategory('mercearia');
      setQuantity('1');
      setUnit('un');
      setPrice('');
      setSuggestions([]);
    }
  }, [isOpen]);

  // Autocomplete e auto-categorização conforme digita
  const handleNameChange = (val) => {
    setName(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = DEFAULT_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 4);

    setSuggestions(matches);

    // Tentar autocategorizar
    const autoCat = autoCategorize(val);
    setCategory(autoCat);
    setIsAutoCategorized(true);
  };

  const selectSuggestion = (product) => {
    setName(product.name);
    setCategory(product.category);
    setUnit(product.unit || 'un');
    setPrice(String(product.avgPrice));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addItemToList({
      name: name.trim(),
      category,
      quantity: parseFloat(quantity) || 1,
      unit,
      price: price ? parseFloat(price) : undefined,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        {/* Header do Modal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>✨</span>
            <h3 style={{ fontSize: '17px', fontWeight: '700' }}>Adicionar Item Inteligente</h3>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Voice Input Highlight */}
        {isSupported && (
          <div style={{
            background: isListening ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-glass-input)',
            border: isListening ? '1px solid var(--rose-500)' : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ fontSize: '16px' }}>🎙️</span>
              <span style={{ color: isListening ? 'var(--rose-500)' : 'var(--text-secondary)' }}>
                {isListening ? (transcript || 'Ouvindo... Ex: "2 quilos de alcatra"') : 'Ditar por voz (ex: "3 leites")'}
              </span>
            </div>
            <button
              type="button"
              className={`icon-btn ${isListening ? 'active' : ''}`}
              style={{
                width: '34px',
                height: '34px',
                background: isListening ? 'var(--rose-500)' : 'var(--emerald-500)',
                color: 'white',
                border: 'none'
              }}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Nome do Produto com Autocomplete */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Nome do Produto / Item
            </label>
            <input
              ref={inputRef}
              type="text"
              className="input-field"
              placeholder="Ex: Arroz Tipo 1, Picanha, Sabão OMO..."
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />

            {/* Lista de Sugestões Rápidas */}
            {suggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                marginTop: '4px',
                zIndex: 10,
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
              }}>
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSuggestion(s)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-subtle)',
                      textAlign: 'left',
                      color: 'var(--text-primary)',
                      fontSize: '13px'
                    }}
                  >
                    <span>{s.name}</span>
                    <span style={{ color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700' }}>
                      R$ {s.avgPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quantidade e Unidade */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Quantidade
              </label>
              <input
                type="number"
                step="any"
                min="0.01"
                className="input-field"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Unidade
              </label>
              <select
                className="input-field"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {UNITS.map(u => (
                  <option key={u.id} value={u.id} style={{ background: '#1e293b' }}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preço Unitário Opcional */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              <span>Preço Estimado / Unidade (R$)</span>
              <span style={{ color: 'var(--text-muted)' }}>Opcional</span>
            </label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              placeholder="0,00 (Preenchemos com média se vazio)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Categoria do Produto */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Categoria {isAutoCategorized && <span style={{ color: 'var(--emerald-400)', fontSize: '11px' }}>✨ Auto-detectado</span>}
            </label>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: category === cat.id ? 'var(--emerald-500)' : 'var(--bg-glass-input)',
                    border: category === cat.id ? '1px solid var(--emerald-400)' : '1px solid var(--border-subtle)',
                    color: category === cat.id ? 'white' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Botão de Adicionar */}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', padding: '14px' }}>
            <Plus size={18} />
            <span>Adicionar à Lista</span>
          </button>
        </form>
      </div>
    </div>
  );
}
