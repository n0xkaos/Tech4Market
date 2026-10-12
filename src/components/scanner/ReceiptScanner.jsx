import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ScanLine,
  Camera,
  Upload,
  Receipt,
  Barcode,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  RefreshCw,
  Zap
} from 'lucide-react';

const SAMPLE_RECEIPTS = [
  {
    id: 'rec-1',
    marketName: 'Atacadão S/A',
    cnpj: '75.315.333/0001-09',
    date: '13/09/2026 14:22',
    total: 148.80,
    items: [
      { name: 'Arroz Branco 5kg', quantity: 1, unit: 'pct', price: 26.90, category: 'mercearia' },
      { name: 'Feijão Carioca 1kg', quantity: 2, unit: 'pct', price: 6.99, category: 'mercearia' },
      { name: 'Leite Integral 1L', quantity: 6, unit: 'L', price: 4.59, category: 'laticinios' },
      { name: 'Filé de Frango 1kg', quantity: 2, unit: 'kg', price: 17.50, category: 'carnes' },
      { name: 'Sabão em Pó OMO 1,6kg', quantity: 1, unit: 'cx', price: 19.90, category: 'limpeza' },
      { name: 'Café Moído 500g', quantity: 1, unit: 'pct', price: 17.90, category: 'mercearia' }
    ]
  },
  {
    id: 'rec-2',
    marketName: 'Carrefour Hiper',
    cnpj: '45.543.915/0001-81',
    date: '12/09/2026 18:40',
    total: 92.40,
    items: [
      { name: 'Picanha Resfriada', quantity: 1, unit: 'kg', price: 75.90, category: 'carnes' },
      { name: 'Refrigerante Coca-Cola 2L', quantity: 1, unit: 'garrafa', price: 10.50, category: 'bebidas' },
      { name: 'Pão Francês', quantity: 0.5, unit: 'kg', price: 6.00, category: 'padaria' }
    ]
  }
];

export function ReceiptScanner() {
  const { addItemToList, sounds, showToast, triggerConfetti, products } = useApp();

  const [mode, setMode] = useState('receipt'); // 'receipt' ou 'barcode'
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(SAMPLE_RECEIPTS[0]);

  // Simular escaneamento de cupom
  const startScanSimulation = (receiptData) => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(receiptData);
      sounds.playScanBeep();
      showToast(`Cupom do ${receiptData.marketName} lido com sucesso!`, 'success', '📄');
    }, 1800);
  };

  // Simular escaneamento de código de barras avulso
  const simulateBarcodeScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const randomProd = products[Math.floor(Math.random() * products.length)];
      sounds.playScanBeep();
      addItemToList({
        name: randomProd.name,
        category: randomProd.category,
        quantity: 1,
        unit: randomProd.unit,
        price: randomProd.avgPrice
      });
      triggerConfetti();
      showToast(`Código ${randomProd.barcode || '78910001001'} detectado: "${randomProd.name}" adicionado!`, 'success', '📦');
    }, 1200);
  };

  const importAllItems = () => {
    if (!scannedResult) return;

    scannedResult.items.forEach(item => {
      addItemToList({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price
      });
    });

    triggerConfetti();
    sounds.playSuccess();
    showToast(`${scannedResult.items.length} itens do cupom importados para sua lista!`, 'success', '🎉');
    setScannedResult(null);
  };

  return (
    <div className="scrollable-content">
      {/* Seletor de Modo Scanner */}
      <div style={{
        display: 'flex',
        background: 'var(--bg-surface-elevated)',
        borderRadius: 'var(--radius-full)',
        padding: '4px',
        marginBottom: '16px',
        gap: '4px'
      }}>
        <button
          onClick={() => { setMode('receipt'); setScannedResult(null); }}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            background: mode === 'receipt' ? 'var(--emerald-500)' : 'transparent',
            color: mode === 'receipt' ? 'white' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Receipt size={14} />
          <span>Leitor de Cupom (OCR)</span>
        </button>

        <button
          onClick={() => { setMode('barcode'); setScannedResult(null); }}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            background: mode === 'barcode' ? 'var(--emerald-500)' : 'transparent',
            color: mode === 'barcode' ? 'white' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Barcode size={14} />
          <span>Código de Barras</span>
        </button>
      </div>

      {/* Câmera / Visor de Escaneamento Simulado */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: '#000',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border-medium)',
        marginBottom: '16px',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
      }}>
        {/* Grid Viewfinder Lines */}
        <div style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          border: '2px solid rgba(16, 185, 129, 0.6)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Laser Scanner Animado */}
          {isScanning && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'var(--emerald-400)',
              boxShadow: '0 0 15px var(--emerald-400)',
              animation: 'slideUp 1.2s infinite alternate ease-in-out'
            }} />
          )}

          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px', padding: '10px' }}>
            {isScanning ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-400)', fontWeight: '700' }}>
                <RefreshCw size={16} className="spin-animation" />
                <span>Processando OCR & Preços...</span>
              </div>
            ) : mode === 'receipt' ? (
              <span>Posicione o Cupom Fiscal ou QR Code da Nota</span>
            ) : (
              <span>Aponte para o código de barras do produto</span>
            )}
          </div>
        </div>

        {/* Botão de Disparo / Foto */}
        <button
          onClick={() => mode === 'receipt' ? startScanSimulation(selectedReceipt) : simulateBarcodeScan()}
          disabled={isScanning}
          style={{
            position: 'absolute',
            bottom: '12px',
            padding: '8px 18px',
            background: 'var(--grad-primary)',
            color: 'white',
            borderRadius: 'var(--radius-full)',
            fontWeight: '700',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 15px var(--emerald-glow)'
          }}
        >
          <Camera size={15} />
          <span>{isScanning ? 'Lendo...' : 'Fotografar & Processar'}</span>
        </button>
      </div>

      {/* RESULTADO DO CUPOM OCR */}
      {scannedResult && (
        <div className="card" style={{ border: '1px solid var(--emerald-500)', background: 'rgba(16, 185, 129, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '10px', background: 'var(--emerald-500)', color: 'white', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: '700' }}>
                OCR EXTRAÍDO COM SUCESSO
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>{scannedResult.marketName}</h4>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{scannedResult.date}</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Nota:</span>
              <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--emerald-400)' }}>
                R$ {scannedResult.total.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            {scannedResult.items.map((it, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  padding: '6px 8px',
                  background: 'var(--bg-glass-input)',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <span>{it.quantity} {it.unit} • {it.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--emerald-400)' }}>
                  R$ {(it.price * it.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
            onClick={importAllItems}
          >
            <Plus size={16} />
            <span>Adicionar {scannedResult.items.length} Itens à Lista Ativa</span>
          </button>
        </div>
      )}

      {/* Cupons de Exemplo para Teste Rápido */}
      {mode === 'receipt' && !scannedResult && (
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            SELECIONE UM CUPOM DE TESTE
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SAMPLE_RECEIPTS.map(rec => (
              <div
                key={rec.id}
                onClick={() => {
                  setSelectedReceipt(rec);
                  startScanSimulation(rec);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{rec.marketName}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {rec.items.length} itens • {rec.date}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--emerald-400)', fontSize: '13px' }}>
                    R$ {rec.total.toFixed(2).replace('.', ',')}
                  </span>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
