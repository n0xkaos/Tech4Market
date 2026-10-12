import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/defaultProducts';
import { BarChart3, TrendingUp, PiggyBank, DollarSign, Calendar, Sparkles, Award } from 'lucide-react';

export function ExpenseAnalytics() {
  const { lists, activeList, savingsHistory } = useApp();

  // Total de economia acumulada
  const totalSaved = useMemo(() => {
    return savingsHistory.reduce((acc, curr) => acc + curr.amountSaved, 0);
  }, [savingsHistory]);

  // Distribuição de gastos por categoria na lista atual
  const categorySpending = useMemo(() => {
    const map = {};
    let grandTotal = 0;

    if (activeList && activeList.items) {
      activeList.items.forEach(it => {
        const cat = it.category || 'outros';
        const cost = it.price * it.quantity;
        map[cat] = (map[cat] || 0) + cost;
        grandTotal += cost;
      });
    }

    return Object.entries(map).map(([catId, amount]) => {
      const catInfo = CATEGORIES.find(c => c.id === catId) || { name: 'Outros', icon: '📦', color: '#64748b' };
      const percent = grandTotal > 0 ? (amount / grandTotal) * 100 : 0;
      return {
        catId,
        name: catInfo.name,
        icon: catInfo.icon,
        color: catInfo.color,
        amount,
        percent: Math.round(percent)
      };
    }).sort((a, b) => b.amount - a.amount);
  }, [activeList]);

  return (
    <div className="scrollable-content">
      {/* Card Economia Total Acumulada */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)',
        border: '1px solid var(--emerald-500)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        marginBottom: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--emerald-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ECONOMIA TOTAL ACUMULADA
          </span>
          <PiggyBank size={20} color="var(--emerald-400)" />
        </div>

        <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          R$ {totalSaved.toFixed(2).replace('.', ',')}
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Valor poupado ao comparar os preços entre as redes Atacadão, Assaí e Carrefour.
        </p>
      </div>

      {/* Gráfico de Gastos por Categoria */}
      <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <BarChart3 size={16} color="var(--emerald-400)" />
          <span>Distribuição de Gastos ({activeList?.name})</span>
        </h4>

        {categorySpending.length === 0 ? (
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '12px' }}>
            Nenhum produto cadastrado na lista ativa.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categorySpending.map(cat => (
              <div key={cat.catId}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{cat.icon}</span>
                    <span style={{ fontWeight: '600' }}>{cat.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                      R$ {cat.amount.toFixed(2).replace('.', ',')}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({cat.percent}%)</span>
                  </div>
                </div>

                <div className="progress-track" style={{ height: '6px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${cat.percent}%`,
                      background: cat.color,
                      borderRadius: 'var(--radius-full)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Histórico de Compras Inteligentes */}
      <div className="card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={16} color="var(--amber-500)" />
          <span>Histórico de Economias Salvas</span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {savingsHistory.map(sav => (
            <div
              key={sav.id}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-glass-input)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{sav.listName}</strong>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {sav.date} • Escolheu {sav.marketChosen} vs {sav.marketCompared}
                </div>
              </div>

              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: 'var(--emerald-400)', fontSize: '13px' }}>
                + R$ {sav.amountSaved.toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
