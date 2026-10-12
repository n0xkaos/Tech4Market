import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  TrendingDown,
  Sparkles,
  Store,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Split,
  Layers,
  Award
} from 'lucide-react';

export function PriceComparator() {
  const {
    activeList,
    markets,
    marketComparison,
    splitBasketOptimization,
    recordSavings,
    showToast,
    triggerConfetti
  } = useApp();

  const [activeView, setActiveView] = useState('overall'); // 'overall', 'split', 'items'

  if (!activeList || activeList.items.length === 0) {
    return (
      <div className="scrollable-content" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>⚖️</span>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Nenhum Item para Comparar</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Adicione produtos na sua lista de compras para visualizar o comparativo de preços entre os supermercados em tempo real.
        </p>
      </div>
    );
  }

  const cheapestMarket = marketComparison[0];
  const highestMarket = marketComparison[marketComparison.length - 1];
  const maxSavings = highestMarket ? highestMarket.total - cheapestMarket.total : 0;

  const handleApplySavings = (chosenMarket) => {
    if (highestMarket && chosenMarket.id !== highestMarket.id) {
      const saved = highestMarket.total - chosenMarket.total;
      recordSavings(activeList.name, chosenMarket.name, highestMarket.name, saved);
      triggerConfetti();
      showToast(`Economia de R$ ${saved.toFixed(2).replace('.', ',')} registrada no seu relatório!`, 'success', '💰');
    }
  };

  return (
    <div className="scrollable-content">
      {/* Sub-tabs do comparador */}
      <div style={{
        display: 'flex',
        background: 'var(--bg-surface-elevated)',
        borderRadius: 'var(--radius-full)',
        padding: '4px',
        marginBottom: '16px',
        gap: '4px'
      }}>
        <button
          onClick={() => setActiveView('overall')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            background: activeView === 'overall' ? 'var(--emerald-500)' : 'transparent',
            color: activeView === 'overall' ? 'white' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '700',
            transition: 'var(--trans-fast)'
          }}
        >
          🏆 Ranking Mercados
        </button>

        <button
          onClick={() => setActiveView('split')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            background: activeView === 'split' ? 'var(--emerald-500)' : 'transparent',
            color: activeView === 'split' ? 'white' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '700',
            transition: 'var(--trans-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={13} />
          <span>Dividir Carrinho</span>
        </button>

        <button
          onClick={() => setActiveView('items')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            background: activeView === 'items' ? 'var(--emerald-500)' : 'transparent',
            color: activeView === 'items' ? 'white' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '700',
            transition: 'var(--trans-fast)'
          }}
        >
          🔍 Item a Item
        </button>
      </div>

      {/* VIEW 1: RANKING GERAL DE MERCADOS */}
      {activeView === 'overall' && (
        <div>
          {/* Card Destaque Economia Máxima */}
          {maxSavings > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
              border: '1px solid var(--emerald-500)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              marginBottom: '16px',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--emerald-400)' }}>
                  POTENCIAL DE ECONOMIA NA CESTA
                </span>
                <span style={{ fontSize: '18px' }}>⚡</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  R$ {maxSavings.toFixed(2).replace('.', ',')}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--emerald-400)', fontWeight: '600' }}>
                  ({Math.round((maxSavings / highestMarket.total) * 100)}% mais barato)
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Comprando no <strong>{cheapestMarket.name}</strong> em vez do {highestMarket.name} para esta lista de {activeList.items.length} itens.
              </p>
            </div>
          )}

          {/* Cards dos Mercados */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {marketComparison.map((market, index) => {
              const isCheapest = index === 0;
              const diffFromCheapest = market.total - cheapestMarket.total;

              return (
                <div
                  key={market.id}
                  className="card"
                  style={{
                    border: isCheapest ? '2px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                    background: isCheapest ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {isCheapest && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'var(--emerald-500)',
                      color: 'white',
                      padding: '3px 12px',
                      fontSize: '10px',
                      fontWeight: '800',
                      borderBottomLeftRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Award size={12} /> CAMPEÃO DE PREÇO
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{market.icon}</span>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{market.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <MapPin size={11} /> {market.distance}
                          </span>
                          <span>•</span>
                          <span>{market.type}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: isCheapest ? 'var(--emerald-400)' : 'var(--text-primary)' }}>
                        R$ {market.total.toFixed(2).replace('.', ',')}
                      </div>
                      {!isCheapest && (
                        <div style={{ fontSize: '11px', color: 'var(--rose-500)', fontWeight: '600' }}>
                          + R$ {diffFromCheapest.toFixed(2).replace('.', ',')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {market.badge}
                    </span>
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '11px', padding: '5px 10px', borderRadius: 'var(--radius-full)' }}
                      onClick={() => handleApplySavings(market)}
                    >
                      {isCheapest ? 'Comprar Aqui & Salvar' : 'Escolher Mercado'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: OTIMIZADOR DE DIVISÃO DE CARRINHO (SPLIT) */}
      {activeView === 'split' && splitBasketOptimization && (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
            border: '1px solid var(--indigo-500)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>🧠</span>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--indigo-400)' }}>
                Algoritmo de Divisão Inteligente
              </h4>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Nosso sistema calcula a combinação exata de mercados para você pagar o menor valor possível em cada produto individualmente.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Otimizado:</span>
                <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--emerald-400)' }}>
                  R$ {splitBasketOptimization.optimalTotal.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Economia Extra:</span>
                <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--indigo-400)' }}>
                  + R$ {splitBasketOptimization.savingsVsCheapest.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>
          </div>

          <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: 'var(--text-secondary)' }}>
            RECOMENDAÇÃO DE COMPRA POR MERCADO
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {splitBasketOptimization.activeMarketGroups.map(group => (
              <div key={group.market.id} className="card" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{group.market.icon}</span>
                    <strong style={{ fontSize: '15px' }}>{group.market.name}</strong>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--emerald-400)' }}>
                    Subtotal: R$ {group.subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {group.items.map(assignment => (
                    <div
                      key={assignment.item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        padding: '6px 8px',
                        background: 'var(--bg-glass-input)',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      <span style={{ color: 'var(--text-primary)' }}>
                        {assignment.item.quantity} {assignment.item.unit} • {assignment.item.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--text-secondary)' }}>
                        R$ {assignment.subtotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: MATRIZ DE PREÇO ITEM A ITEM */}
      {activeView === 'items' && (
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Preço individual de cada item em todos os supermercados cadastrados:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeList.items.map(item => {
              // Encontrar o menor preço para este item
              let lowestPrice = Infinity;
              markets.forEach(m => {
                const p = item.marketPrices?.[m.id] || (item.price * m.discountMultiplier);
                if (p < lowestPrice) lowestPrice = p;
              });

              return (
                <div key={item.id} className="card" style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                      {item.name} ({item.quantity} {item.unit})
                    </strong>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {markets.map(m => {
                      const itemPrice = item.marketPrices?.[m.id] || (item.price * m.discountMultiplier);
                      const isBest = Math.abs(itemPrice - lowestPrice) < 0.01;

                      return (
                        <div
                          key={m.id}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            background: isBest ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-glass-input)',
                            border: isBest ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '11px'
                          }}
                        >
                          <span style={{ color: isBest ? 'var(--emerald-400)' : 'var(--text-secondary)', fontWeight: '600' }}>
                            {m.name}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: isBest ? 'var(--emerald-400)' : 'var(--text-primary)' }}>
                            R$ {itemPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
