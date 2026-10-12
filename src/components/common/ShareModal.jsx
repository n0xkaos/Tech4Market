import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, Share2, MessageCircle, Printer } from 'lucide-react';

export function ShareModal({ isOpen, onClose }) {
  const { activeList, activeListMetrics, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !activeList) return null;

  // Gerar texto formatado com emojis para WhatsApp
  const generateWhatsAppMessage = () => {
    let msg = `🛒 *${activeList.name}* (SmartCart)\n\n`;

    activeList.items.forEach(it => {
      const checkMark = it.checked ? '✅' : '⬜';
      msg += `${checkMark} ${it.quantity} ${it.unit} - ${it.name} (R$ ${(it.price * it.quantity).toFixed(2).replace('.', ',')})\n`;
    });

    msg += `\n📊 *Total Estimado:* R$ ${activeListMetrics.total.toFixed(2).replace('.', ',')}`;
    msg += `\n🛍️ *Itens:* ${activeListMetrics.checkedCount}/${activeListMetrics.itemCount} comprados`;
    msg += `\n\n_Enviado via SmartCart - Comparador Inteligente de Compras_`;

    return msg;
  };

  const formattedText = generateWhatsAppMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    showToast('Lista copiada para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(formattedText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>📲</span>
            <h3 style={{ fontSize: '17px', fontWeight: '700' }}>Compartilhar Lista</h3>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Prévia do Texto Formatado */}
        <div style={{
          background: 'var(--bg-glass-input)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          maxHeight: '180px',
          overflowY: 'auto',
          marginBottom: '16px',
          color: 'var(--text-secondary)'
        }}>
          {formattedText}
        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '12px', background: '#25D366', color: 'white' }}
            onClick={handleOpenWhatsApp}
          >
            <MessageCircle size={18} />
            <span>Enviar no WhatsApp</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} color="var(--emerald-400)" /> : <Copy size={16} />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={handlePrint}
            >
              <Printer size={16} />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
