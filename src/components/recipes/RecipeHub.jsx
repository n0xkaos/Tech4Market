import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChefHat, Users, Clock, Plus, Check, ShoppingCart, Sparkles } from 'lucide-react';

export function RecipeHub() {
  const { recipes, addRecipeToList } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);
  const [servings, setServings] = useState(selectedRecipe?.servings || 4);

  const handleSelectRecipe = (rec) => {
    setSelectedRecipe(rec);
    setServings(rec.servings);
  };

  const scaleFactor = selectedRecipe ? (servings / selectedRecipe.servings) : 1;

  return (
    <div className="scrollable-content">
      {/* Carrossel de Receitas no Topo */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '14px' }}>
        {recipes.map(rec => {
          const isSelected = selectedRecipe?.id === rec.id;

          return (
            <div
              key={rec.id}
              onClick={() => handleSelectRecipe(rec)}
              style={{
                minWidth: '140px',
                padding: '12px',
                borderRadius: 'var(--radius-lg)',
                background: isSelected ? 'var(--grad-primary)' : 'var(--bg-surface-elevated)',
                color: isSelected ? 'white' : 'var(--text-primary)',
                border: isSelected ? 'none' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'var(--trans-spring)'
              }}
            >
              <span style={{ fontSize: '28px' }}>{rec.image}</span>
              <strong style={{ fontSize: '13px', lineHeight: 1.2, marginTop: '4px' }}>
                {rec.name}
              </strong>
              <span style={{ fontSize: '11px', opacity: 0.8 }}>
                {rec.time} • {rec.servings} porções
              </span>
            </div>
          );
        })}
      </div>

      {/* Detalhe da Receita Selecionada */}
      {selectedRecipe && (
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--emerald-400)', textTransform: 'uppercase' }}>
                {selectedRecipe.category}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginTop: '2px' }}>
                {selectedRecipe.name}
              </h3>
            </div>
            <span style={{ fontSize: '36px' }}>{selectedRecipe.image}</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            {selectedRecipe.description}
          </p>

          {/* Calculadora de Porções Inteligente */}
          <div style={{
            background: 'var(--bg-glass-input)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
              <Users size={16} color="var(--emerald-400)" />
              <span>Ajustar Porções:</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: '700'
                }}
                onClick={() => setServings(Math.max(1, servings - 1))}
              >
                -
              </button>
              <span style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'var(--font-mono)', minWidth: '24px', textAlign: 'center' }}>
                {servings}
              </span>
              <button
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: '700'
                }}
                onClick={() => setServings(servings + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Ingredientes Calculados */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              INGREDIENTES PROPORCIONAIS ({selectedRecipe.ingredients.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedRecipe.ingredients.map((ing, i) => {
                const scaledQty = Math.round(ing.quantity * scaleFactor * 10) / 10;

                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      padding: '8px 10px',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <span>{ing.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--emerald-400)' }}>
                      {scaledQty} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botão de Adicionar Ingredientes à Lista */}
          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px' }}
            onClick={() => addRecipeToList(selectedRecipe, scaleFactor)}
          >
            <ShoppingCart size={16} />
            <span>Adicionar Ingredientes à Lista de Compras</span>
          </button>
        </div>
      )}
    </div>
  );
}
