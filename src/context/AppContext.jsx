import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { DEFAULT_PRODUCTS, CATEGORIES } from '../data/defaultProducts';
import { DEFAULT_MARKETS } from '../data/defaultMarkets';
import { DEFAULT_RECIPES } from '../data/defaultRecipes';
import { INITIAL_LISTS, INITIAL_PANTRY, INITIAL_SAVINGS_HISTORY } from '../data/initialData';
import { useSoundEffects } from '../hooks/useSoundEffects';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Configurações & Preferências
  const [theme, setTheme] = useState(() => localStorage.getItem('smartcart_theme') || 'dark');
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('smartcart_sound') !== 'false');
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('smartcart_viewmode') || 'frame-iphone'); // 'frame-iphone', 'frame-android', 'fullscreen'
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'compare', 'scanner', 'pantry', 'recipes', 'analytics'

  // Dados Principais com LocalStorage Fallback
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem('smartcart_lists');
    return saved ? JSON.parse(saved) : INITIAL_LISTS;
  });

  const [activeListId, setActiveListId] = useState(() => {
    const saved = localStorage.getItem('smartcart_activelist');
    return saved || 'list-1';
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('smartcart_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [markets, setMarkets] = useState(() => {
    const saved = localStorage.getItem('smartcart_markets');
    return saved ? JSON.parse(saved) : DEFAULT_MARKETS;
  });

  const [pantry, setPantry] = useState(() => {
    const saved = localStorage.getItem('smartcart_pantry');
    return saved ? JSON.parse(saved) : INITIAL_PANTRY;
  });

  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('smartcart_recipes');
    return saved ? JSON.parse(saved) : DEFAULT_RECIPES;
  });

  const [savingsHistory, setSavingsHistory] = useState(() => {
    const saved = localStorage.getItem('smartcart_savings');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS_HISTORY;
  });

  // Notificações Toast
  const [toasts, setToasts] = useState([]);

  // Sons
  const sounds = useSoundEffects(soundEnabled);

  // Efeito para persistência
  useEffect(() => {
    localStorage.setItem('smartcart_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('smartcart_sound', soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('smartcart_viewmode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('smartcart_lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('smartcart_activelist', activeListId);
  }, [activeListId]);

  useEffect(() => {
    localStorage.setItem('smartcart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('smartcart_markets', JSON.stringify(markets));
  }, [markets]);

  useEffect(() => {
    localStorage.setItem('smartcart_pantry', JSON.stringify(pantry));
  }, [pantry]);

  useEffect(() => {
    localStorage.setItem('smartcart_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('smartcart_savings', JSON.stringify(savingsHistory));
  }, [savingsHistory]);

  // Disparar Notificação Toast
  const showToast = useCallback((message, type = 'info', icon = null) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-3), { id, message, type, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // Disparar Efeito Confete
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  }, []);

  // Lista Ativa Selecionada
  const activeList = useMemo(() => {
    return lists.find(l => l.id === activeListId) || lists[0] || null;
  }, [lists, activeListId]);

  // Helper de autocategorização de produto
  const autoCategorize = useCallback((productName) => {
    const lower = productName.toLowerCase();
    const foundProd = products.find(p => p.name.toLowerCase().includes(lower) || lower.includes(p.name.toLowerCase()));
    if (foundProd) return foundProd.category;

    if (/picanha|alcatra|frango|carne|linguiça|peixe|tilapia|costela|salmao|bife|porco/i.test(lower)) return 'carnes';
    if (/banana|maçã|tomate|cebola|batata|alho|alface|cenoura|limão|laranja|morango|abacaxi/i.test(lower)) return 'hortifruti';
    if (/leite|queijo|iogurte|manteiga|requeijão|presunto|ovo|mussarela|parmesao/i.test(lower)) return 'laticinios';
    if (/arroz|feijao|feijão|macarrao|macarrão|oleo|óleo|açucar|açúcar|sal|farinha|azeite|molho|cafe|café/i.test(lower)) return 'mercearia';
    if (/pão|pao|bolo|biscoito|torrada|croissant/i.test(lower)) return 'padaria';
    if (/coca|refrigerante|cerveja|suco|agua|água|vinho|energetico/i.test(lower)) return 'bebidas';
    if (/sabao|sabão|detergente|amaciante|desinfetante|cloro|agua sanitaria|esponja/i.test(lower)) return 'limpeza';
    if (/shampoo|sabonete|pasta|dental|creme|desodorante|papel higienico|condicionador/i.test(lower)) return 'higiene';
    return 'outros';
  }, [products]);

  // Helper para estimar preços de um produto em múltiplos mercados
  const getProductPrices = useCallback((productName, basePrice = null) => {
    const lower = productName.toLowerCase();
    const existing = products.find(p => p.name.toLowerCase() === lower || lower.includes(p.name.toLowerCase()));
    
    if (existing && existing.prices) {
      return { ...existing.prices };
    }

    const price = basePrice || (existing ? existing.avgPrice : 10.0);
    const result = {};
    markets.forEach(m => {
      // Pequena variação simulada realista baseada no multiplicador do mercado
      const variance = (Math.random() * 0.06 - 0.03);
      const calculated = price * (m.discountMultiplier + variance);
      result[m.id] = Math.max(0.5, Math.round(calculated * 100) / 100);
    });
    return result;
  }, [products, markets]);

  // Operações de Listas
  const createList = useCallback(({ name, emoji = '🛒', color = '#10b981', budget = 0, marketId = 'm1' }) => {
    const newList = {
      id: `list-${Date.now()}`,
      name: name || 'Nova Lista',
      emoji,
      color,
      budget: parseFloat(budget) || 0,
      marketId,
      createdAt: new Date().toISOString(),
      isArchived: false,
      items: []
    };
    setLists(prev => [newList, ...prev]);
    setActiveListId(newList.id);
    sounds.playAdd();
    showToast(`Lista "${newList.name}" criada com sucesso!`, 'success', '✨');
    return newList.id;
  }, [sounds, showToast]);

  const updateList = useCallback((listId, updates) => {
    setLists(prev => prev.map(l => l.id === listId ? { ...l, ...updates } : l));
    showToast('Lista atualizada!', 'info');
  }, [showToast]);

  const deleteList = useCallback((listId) => {
    setLists(prev => {
      const filtered = prev.filter(l => l.id !== listId);
      if (filtered.length > 0 && activeListId === listId) {
        setActiveListId(filtered[0].id);
      }
      return filtered;
    });
    sounds.playWarning();
    showToast('Lista removida', 'warning', '🗑️');
  }, [activeListId, sounds, showToast]);

  const duplicateList = useCallback((listId) => {
    const source = lists.find(l => l.id === listId);
    if (!source) return;
    const cloned = {
      ...source,
      id: `list-${Date.now()}`,
      name: `${source.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      items: source.items.map(it => ({ ...it, id: `item-${Date.now()}-${Math.random()}`, checked: false }))
    };
    setLists(prev => [cloned, ...prev]);
    setActiveListId(cloned.id);
    sounds.playAdd();
    showToast(`Lista clonada com ${cloned.items.length} itens!`, 'success');
  }, [lists, sounds, showToast]);

  // Operações de Itens da Lista Ativa
  const addItemToList = useCallback((itemData, listId = activeListId) => {
    const category = itemData.category || autoCategorize(itemData.name);
    const existingPrices = getProductPrices(itemData.name, itemData.price);
    const marketPrices = itemData.marketPrices || existingPrices;
    
    // Preço padrão para o mercado selecionado da lista
    const currentList = lists.find(l => l.id === listId);
    const defaultMarketId = currentList?.marketId || 'm1';
    const finalPrice = itemData.price !== undefined ? parseFloat(itemData.price) : (marketPrices[defaultMarketId] || 5.0);

    const newItem = {
      id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId: itemData.productId || null,
      name: itemData.name.trim(),
      category,
      quantity: parseFloat(itemData.quantity) || 1,
      unit: itemData.unit || 'un',
      price: finalPrice,
      checked: false,
      note: itemData.note || '',
      marketPrices
    };

    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        // Se já existir item exatamente igual não marcado, soma quantidade
        const existingIndex = l.items.findIndex(it => !it.checked && it.name.toLowerCase() === newItem.name.toLowerCase() && it.unit === newItem.unit);
        if (existingIndex >= 0) {
          const updated = [...l.items];
          updated[existingIndex].quantity += newItem.quantity;
          if (newItem.price) updated[existingIndex].price = newItem.price;
          return { ...l, items: updated };
        }
        return { ...l, items: [newItem, ...l.items] };
      }
      return l;
    }));

    sounds.playAdd();
    showToast(`"${newItem.name}" adicionado à lista`, 'success', '➕');
  }, [activeListId, autoCategorize, getProductPrices, lists, sounds, showToast]);

  const updateItem = useCallback((itemId, updates, listId = activeListId) => {
    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        return {
          ...l,
          items: l.items.map(it => it.id === itemId ? { ...it, ...updates } : it)
        };
      }
      return l;
    }));
  }, [activeListId]);

  const toggleItemChecked = useCallback((itemId, listId = activeListId) => {
    let willBeChecked = false;
    let checkedCount = 0;
    let totalCount = 0;

    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        totalCount = l.items.length;
        const updated = l.items.map(it => {
          if (it.id === itemId) {
            willBeChecked = !it.checked;
            return { ...it, checked: willBeChecked };
          }
          return it;
        });
        checkedCount = updated.filter(i => i.checked).length;
        return { ...l, items: updated };
      }
      return l;
    }));

    if (willBeChecked) {
      sounds.playCheck();
      if (checkedCount === totalCount && totalCount > 0) {
        triggerConfetti();
        sounds.playSuccess();
        showToast('🎉 Parabéns! Todos os itens foram comprados!', 'success');
      }
    } else {
      sounds.playUncheck();
    }
  }, [activeListId, sounds, triggerConfetti, showToast]);

  const deleteItem = useCallback((itemId, listId = activeListId) => {
    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.filter(it => it.id !== itemId) };
      }
      return l;
    }));
    sounds.playUncheck();
  }, [activeListId, sounds]);

  const clearCheckedItems = useCallback((listId = activeListId) => {
    setLists(prev => prev.map(l => {
      if (l.id === listId) {
        const remaining = l.items.filter(it => !it.checked);
        return { ...l, items: remaining };
      }
      return l;
    }));
    showToast('Itens marcados foram limpos', 'info');
  }, [activeListId, showToast]);

  // Mover itens comprados diretamente para a Despensa
  const moveCheckedToPantry = useCallback((listId = activeListId) => {
    const currentList = lists.find(l => l.id === listId);
    if (!currentList) return;

    const checkedItems = currentList.items.filter(it => it.checked);
    if (checkedItems.length === 0) {
      showToast('Nenhum item marcado para mover!', 'warning');
      return;
    }

    const newPantryEntries = checkedItems.map(it => {
      const prodRef = products.find(p => p.name.toLowerCase() === it.name.toLowerCase());
      const shelfDays = prodRef?.shelfLifeDays || 30;
      const expDate = new Date(Date.now() + 86400000 * shelfDays).toISOString().split('T')[0];

      return {
        id: `pan-${Date.now()}-${Math.random()}`,
        productId: it.productId || prodRef?.id || null,
        name: it.name,
        category: it.category,
        quantity: it.quantity,
        unit: it.unit,
        minQuantity: 1,
        expirationDate: expDate,
        location: it.category === 'laticinios' || it.category === 'carnes' ? 'Geladeira' : 'Despensa',
        addedAt: new Date().toISOString()
      };
    });

    setPantry(prev => [...newPantryEntries, ...prev]);
    // Remover itens comprados da lista
    clearCheckedItems(listId);
    sounds.playSuccess();
    showToast(`${checkedItems.length} itens movidos para sua Despensa!`, 'success', '📦');
  }, [lists, activeListId, products, clearCheckedItems, sounds, showToast]);

  // Operações de Despensa
  const updatePantryItem = useCallback((pantryId, updates) => {
    setPantry(prev => prev.map(p => p.id === pantryId ? { ...p, ...updates } : p));
  }, []);

  const deletePantryItem = useCallback((pantryId) => {
    setPantry(prev => prev.filter(p => p.id !== pantryId));
    sounds.playUncheck();
    showToast('Item removido da despensa', 'info');
  }, [sounds, showToast]);

  const restockToShoppingList = useCallback((pantryItem, listId = activeListId) => {
    addItemToList({
      name: pantryItem.name,
      category: pantryItem.category,
      quantity: pantryItem.minQuantity || 1,
      unit: pantryItem.unit,
      productId: pantryItem.productId
    }, listId);
    showToast(`"${pantryItem.name}" adicionado para reposição na lista!`, 'success', '🛒');
  }, [activeListId, addItemToList, showToast]);

  // Operações de Receitas
  const addRecipeToList = useCallback((recipe, scaleFactor = 1, listId = activeListId) => {
    if (!recipe || !recipe.ingredients) return;

    recipe.ingredients.forEach(ing => {
      const scaledQty = Math.round(ing.quantity * scaleFactor * 10) / 10;
      addItemToList({
        name: ing.name,
        category: ing.category,
        quantity: scaledQty,
        unit: ing.unit,
        productId: ing.productId
      }, listId);
    });

    sounds.playSuccess();
    triggerConfetti();
    showToast(`Ingredientes de "${recipe.name}" adicionados à lista!`, 'success', '👨‍🍳');
  }, [activeListId, addItemToList, sounds, triggerConfetti, showToast]);

  // Adicionar dados de economia ao histórico
  const recordSavings = useCallback((listName, marketChosen, marketCompared, amountSaved) => {
    const newEntry = {
      id: `sav-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      listName,
      marketChosen,
      marketCompared,
      amountSaved: parseFloat(amountSaved) || 0
    };
    setSavingsHistory(prev => [newEntry, ...prev]);
  }, []);

  // Totais e Métricas da Lista Ativa
  const activeListMetrics = useMemo(() => {
    if (!activeList || !activeList.items) {
      return { total: 0, checkedTotal: 0, uncheckedTotal: 0, itemCount: 0, checkedCount: 0, progress: 0, budgetDifference: 0 };
    }

    const items = activeList.items;
    const total = items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    const checkedTotal = items.filter(it => it.checked).reduce((acc, it) => acc + (it.price * it.quantity), 0);
    const uncheckedTotal = total - checkedTotal;
    const itemCount = items.length;
    const checkedCount = items.filter(it => it.checked).length;
    const progress = itemCount > 0 ? (checkedCount / itemCount) * 100 : 0;
    const budgetDifference = activeList.budget > 0 ? activeList.budget - total : 0;

    return {
      total,
      checkedTotal,
      uncheckedTotal,
      itemCount,
      checkedCount,
      progress,
      budgetDifference
    };
  }, [activeList]);

  // Comparativo de Mercados para a Lista Ativa
  const marketComparison = useMemo(() => {
    if (!activeList || activeList.items.length === 0) return [];

    const items = activeList.items;
    return markets.map(market => {
      let marketTotal = 0;
      let missingPrices = 0;

      items.forEach(it => {
        const itemPriceInMarket = it.marketPrices?.[market.id] || (it.price * market.discountMultiplier);
        marketTotal += itemPriceInMarket * it.quantity;
      });

      return {
        ...market,
        total: marketTotal,
        itemCount: items.length,
        missingPrices
      };
    }).sort((a, b) => a.total - b.total);
  }, [activeList, markets]);

  // Otimizador de Divisão de Carrinho ("Dividir Compras Inteligente")
  const splitBasketOptimization = useMemo(() => {
    if (!activeList || activeList.items.length === 0) return null;

    const items = activeList.items;
    let optimalTotal = 0;
    const itemAssignments = [];
    const marketGroups = {};

    markets.forEach(m => {
      marketGroups[m.id] = { market: m, items: [], subtotal: 0 };
    });

    items.forEach(item => {
      let bestMarket = markets[0];
      let lowestPrice = Infinity;

      markets.forEach(m => {
        const price = item.marketPrices?.[m.id] || (item.price * m.discountMultiplier);
        if (price < lowestPrice) {
          lowestPrice = price;
          bestMarket = m;
        }
      });

      const itemTotal = lowestPrice * item.quantity;
      optimalTotal += itemTotal;

      const assignment = {
        item,
        bestMarket,
        bestPrice: lowestPrice,
        subtotal: itemTotal
      };

      itemAssignments.push(assignment);
      marketGroups[bestMarket.id].items.push(assignment);
      marketGroups[bestMarket.id].subtotal += itemTotal;
    });

    const cheapestSingleMarket = marketComparison[0];
    const mostExpensiveSingleMarket = marketComparison[marketComparison.length - 1];
    const savingsVsCheapest = cheapestSingleMarket ? cheapestSingleMarket.total - optimalTotal : 0;
    const savingsVsHighest = mostExpensiveSingleMarket ? mostExpensiveSingleMarket.total - optimalTotal : 0;

    // Apenas mercados que receberam itens
    const activeMarketGroups = Object.values(marketGroups).filter(g => g.items.length > 0);

    return {
      optimalTotal,
      savingsVsCheapest,
      savingsVsHighest,
      activeMarketGroups,
      itemAssignments,
      isSplitAdvantageous: savingsVsCheapest > 5.0 // Vale a pena se economizar mais de R$ 5
    };
  }, [activeList, markets, marketComparison]);

  const value = {
    // Configurações
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    sounds,
    showToast,
    triggerConfetti,
    toasts,

    // Dados
    lists,
    activeListId,
    setActiveListId,
    activeList,
    products,
    setProducts,
    markets,
    setMarkets,
    pantry,
    recipes,
    savingsHistory,

    // Métricas
    activeListMetrics,
    marketComparison,
    splitBasketOptimization,

    // Ações
    createList,
    updateList,
    deleteList,
    duplicateList,
    addItemToList,
    updateItem,
    toggleItemChecked,
    deleteItem,
    clearCheckedItems,
    moveCheckedToPantry,
    updatePantryItem,
    deletePantryItem,
    restockToShoppingList,
    addRecipeToList,
    recordSavings,
    autoCategorize,
    getProductPrices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser utilizado dentro de um AppProvider');
  }
  return context;
}
