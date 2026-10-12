import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeechRecognition({ onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'pt-BR';

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);

          if (event.results[current].isFinal) {
            if (onResult) {
              const parsed = parseVoiceText(text);
              onResult(parsed);
            }
          }
        };

        recognition.onerror = (event) => {
          setError(event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [onResult]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
      } catch {
        // Ignorar se já iniciado
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }
  }, [isListening]);

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening
  };
}

// Parser inteligente de comandos em Português
export function parseVoiceText(rawText) {
  if (!rawText) return { name: '', quantity: 1, unit: 'un', originalText: '' };

  let text = rawText.trim().toLowerCase();
  
  // Limpar prefixos comuns de comandos de voz
  const prefixes = [
    'adicionar ', 'coloque ', 'compre ', 'comprar ', 'incluir ', 'coloca ', 'bota ', 'adiciona '
  ];
  for (const p of prefixes) {
    if (text.startsWith(p)) {
      text = text.substring(p.length).trim();
      break;
    }
  }

  // Mapear números por extenso comuns
  const numberWords = {
    'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
    'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
    'dez': 10, 'meio': 0.5, 'meia': 0.5, 'dúzia': 12, 'duzia': 12, 'meia dúzia': 6
  };

  let quantity = 1;
  let unit = 'un';
  let productName = text;

  // Detectar padrões como: "2 quilos de alcatra", "3 caixas de leite", "500 gramas de queijo"
  const regexPatterns = [
    // Padrão: número + unidade + [de] + nome
    /^(\d+(?:[.,]\d+)?|\b(?:um|uma|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|meio|meia)\b)\s*(quilos?|kg|gramas?|g|litros?|l|mililitros?|ml|pacotes?|pct|caixas?|cx|dúzias?|duzias?|latas?|garrafas?|unidades?|un)\s+(?:de\s+)?(.+)$/i,
    // Padrão: número + [de] + nome (sem unidade explícita)
    /^(\d+(?:[.,]\d+)?|\b(?:um|uma|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez)\b)\s+(?:de\s+)?(.+)$/i,
  ];

  const matchWithUnit = text.match(regexPatterns[0]);
  if (matchWithUnit) {
    const rawQty = matchWithUnit[1];
    const rawUnit = matchWithUnit[2].toLowerCase();
    productName = matchWithUnit[3].trim();

    // Resolver quantidade
    if (numberWords[rawQty]) {
      quantity = numberWords[rawQty];
    } else {
      quantity = parseFloat(rawQty.replace(',', '.')) || 1;
    }

    // Normalizar unidade
    if (rawUnit.startsWith('kg') || rawUnit.startsWith('quilo')) unit = 'kg';
    else if (rawUnit.startsWith('g') || rawUnit.startsWith('grama')) unit = 'g';
    else if (rawUnit.startsWith('l') && !rawUnit.startsWith('lata')) unit = 'L';
    else if (rawUnit.startsWith('ml')) unit = 'ml';
    else if (rawUnit.startsWith('pct') || rawUnit.startsWith('pacote')) unit = 'pct';
    else if (rawUnit.startsWith('cx') || rawUnit.startsWith('caixa')) unit = 'cx';
    else if (rawUnit.startsWith('duzia') || rawUnit.startsWith('dúzia') || rawUnit.startsWith('dz')) unit = 'dz';
    else if (rawUnit.startsWith('lata')) unit = 'lata';
    else if (rawUnit.startsWith('garrafa')) unit = 'garrafa';
    else unit = 'un';
  } else {
    const matchSimple = text.match(regexPatterns[1]);
    if (matchSimple) {
      const rawQty = matchSimple[1];
      productName = matchSimple[2].trim();
      if (numberWords[rawQty]) {
        quantity = numberWords[rawQty];
      } else {
        quantity = parseFloat(rawQty.replace(',', '.')) || 1;
      }
    }
  }

  // Capitalizar primeira letra do nome
  if (productName.length > 0) {
    productName = productName.charAt(0).toUpperCase() + productName.slice(1);
  }

  return {
    name: productName,
    quantity,
    unit,
    originalText: rawText
  };
}
