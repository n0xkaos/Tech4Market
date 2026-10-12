export const INITIAL_LISTS = [
  {
    id: 'list-1',
    name: 'Compras do Mês 🛒',
    emoji: '🛒',
    color: '#10b981',
    budget: 650.00,
    marketId: 'm1', // Atacadão
    createdAt: new Date().toISOString(),
    isArchived: false,
    items: [
      { id: 'item-1', productId: 'p1', name: 'Arroz Branco Tipo 1 5kg', category: 'mercearia', quantity: 2, unit: 'pct', price: 26.90, checked: true, marketPrices: { m1: 26.90, m2: 27.50, m3: 31.90, m4: 33.50 } },
      { id: 'item-2', productId: 'p2', name: 'Feijão Carioca 1kg', category: 'mercearia', quantity: 3, unit: 'pct', price: 6.99, checked: true, marketPrices: { m1: 6.99, m2: 7.20, m3: 8.50, m4: 8.90 } },
      { id: 'item-3', productId: 'p3', name: 'Óleo de Soja 900ml', category: 'mercearia', quantity: 4, unit: 'un', price: 5.89, checked: false, marketPrices: { m1: 5.89, m2: 6.10, m3: 6.90, m4: 7.20 } },
      { id: 'item-4', productId: 'p5', name: 'Café Torrado e Moído 500g', category: 'mercearia', quantity: 2, unit: 'pct', price: 17.90, checked: false, marketPrices: { m1: 17.90, m2: 18.50, m3: 21.90, m4: 23.00 } },
      { id: 'item-5', productId: 'p13', name: 'Filé de Peito de Frango 1kg', category: 'carnes', quantity: 3, unit: 'kg', price: 17.50, checked: false, marketPrices: { m1: 17.50, m2: 18.20, m3: 21.90, m4: 23.50 } },
      { id: 'item-6', productId: 'p15', name: 'Carne Moída Patinho', category: 'carnes', quantity: 2, unit: 'kg', price: 35.90, checked: false, marketPrices: { m1: 35.90, m2: 36.90, m3: 42.00, m4: 44.90 } },
      { id: 'item-7', productId: 'p18', name: 'Leite Integral UHT 1L', category: 'laticinios', quantity: 12, unit: 'L', price: 4.59, checked: false, marketPrices: { m1: 4.59, m2: 4.79, m3: 5.49, m4: 5.79 } },
      { id: 'item-8', productId: 'p19', name: 'Ovos Brancos Grandes 30 unidades', category: 'laticinios', quantity: 1, unit: 'bdj', price: 16.50, checked: false, marketPrices: { m1: 16.50, m2: 17.20, m3: 20.50, m4: 22.00 } },
      { id: 'item-9', productId: 'p38', name: 'Sabão em Pó OMO Lavagem Perfeita 1,6kg', category: 'limpeza', quantity: 2, unit: 'cx', price: 19.90, checked: false, marketPrices: { m1: 19.90, m2: 20.90, m3: 24.90, m4: 26.50 } },
      { id: 'item-10', productId: 'p40', name: 'Detergente Líquido Ypê 500ml', category: 'limpeza', quantity: 6, unit: 'un', price: 1.99, checked: false, marketPrices: { m1: 1.99, m2: 2.15, m3: 2.65, m4: 2.89 } },
      { id: 'item-11', productId: 'p43', name: 'Papel Higiênico Folha Dupla 12 Rolos', category: 'higiene', quantity: 2, unit: 'pct', price: 16.90, checked: false, marketPrices: { m1: 16.90, m2: 17.50, m3: 21.90, m4: 23.90 } },
    ]
  },
  {
    id: 'list-2',
    name: 'Feira & Hortifrúti 🍎',
    emoji: '🥦',
    color: '#059669',
    budget: 120.00,
    marketId: 'm4', // Pão de Açúcar
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isArchived: false,
    items: [
      { id: 'item-201', productId: 'p25', name: 'Banana Prata', category: 'hortifruti', quantity: 2, unit: 'kg', price: 5.99, checked: true, marketPrices: { m1: 5.99, m2: 6.20, m3: 7.80, m4: 8.50 } },
      { id: 'item-202', productId: 'p26', name: 'Tomate Italiano', category: 'hortifruti', quantity: 1.5, unit: 'kg', price: 7.50, checked: true, marketPrices: { m1: 7.50, m2: 7.99, m3: 9.90, m4: 10.90 } },
      { id: 'item-203', productId: 'p27', name: 'Cebola Nacional', category: 'hortifruti', quantity: 1, unit: 'kg', price: 4.80, checked: false, marketPrices: { m1: 4.80, m2: 5.20, m3: 6.50, m4: 6.90 } },
      { id: 'item-204', productId: 'p28', name: 'Batata Inglesa', category: 'hortifruti', quantity: 2, unit: 'kg', price: 5.10, checked: false, marketPrices: { m1: 5.10, m2: 5.50, m3: 6.90, m4: 7.50 } },
      { id: 'item-205', productId: 'p30', name: 'Maçã Fuji', category: 'hortifruti', quantity: 1.5, unit: 'kg', price: 8.90, checked: false, marketPrices: { m1: 8.90, m2: 9.50, m3: 11.90, m4: 12.90 } },
      { id: 'item-206', productId: 'p31', name: 'Alface Crespa', category: 'hortifruti', quantity: 2, unit: 'un', price: 2.99, checked: false, marketPrices: { m1: 2.99, m2: 3.20, m3: 3.99, m4: 4.50 } },
    ]
  },
  {
    id: 'list-3',
    name: 'Churrasco com a Família 🥩',
    emoji: '🔥',
    color: '#dc2626',
    budget: 350.00,
    marketId: 'm2', // Assaí
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isArchived: false,
    items: [
      { id: 'item-301', productId: 'p11', name: 'Picanha Bovina Resfriada', category: 'carnes', quantity: 2, unit: 'kg', price: 66.00, checked: false, marketPrices: { m1: 64.90, m2: 66.00, m3: 75.90, m4: 79.90 } },
      { id: 'item-302', productId: 'p14', name: 'Linguiça Toscana Sadia / Perdigão', category: 'carnes', quantity: 2, unit: 'kg', price: 20.90, checked: false, marketPrices: { m1: 19.90, m2: 20.90, m3: 24.50, m4: 26.00 } },
      { id: 'item-303', productId: 'p35', name: 'Cerveja Heineken Lata 350ml', category: 'bebidas', quantity: 16, unit: 'lata', price: 4.69, checked: false, marketPrices: { m1: 4.49, m2: 4.69, m3: 5.79, m4: 6.10 } },
      { id: 'item-304', productId: 'p34', name: 'Refrigerante Coca-Cola 2L', category: 'bebidas', quantity: 2, unit: 'garrafa', price: 9.20, checked: false, marketPrices: { m1: 8.89, m2: 9.20, m3: 10.50, m4: 10.99 } },
      { id: 'item-305', productId: 'p47', name: 'Pão Francês Fresco', category: 'padaria', quantity: 1, unit: 'kg', price: 15.00, checked: false, marketPrices: { m1: 14.50, m2: 15.00, m3: 18.00, m4: 20.90 } },
    ]
  }
];

export const INITIAL_PANTRY = [
  {
    id: 'pan-1',
    productId: 'p1',
    name: 'Arroz Branco 5kg',
    category: 'mercearia',
    quantity: 1,
    unit: 'pct',
    minQuantity: 1,
    expirationDate: new Date(Date.now() + 86400000 * 180).toISOString().split('T')[0],
    location: 'Armário Principal',
    addedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: 'pan-2',
    productId: 'p18',
    name: 'Leite Integral UHT 1L',
    category: 'laticinios',
    quantity: 2,
    unit: 'L',
    minQuantity: 4, // Abaixo do mínimo!
    expirationDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], // Vencendo em 4 dias
    location: 'Geladeira',
    addedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'pan-3',
    productId: 'p23',
    name: 'Iogurte Natural Integral',
    category: 'laticinios',
    quantity: 3,
    unit: 'un',
    minQuantity: 2,
    expirationDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // Vence em 2 dias! Alerta
    location: 'Geladeira',
    addedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'pan-4',
    productId: 'p10',
    name: 'Azeite de Oliva 500ml',
    category: 'mercearia',
    quantity: 1,
    unit: 'un',
    minQuantity: 1,
    expirationDate: new Date(Date.now() + 86400000 * 240).toISOString().split('T')[0],
    location: 'Despensa',
    addedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: 'pan-5',
    productId: 'p40',
    name: 'Detergente Líquido 500ml',
    category: 'limpeza',
    quantity: 1,
    unit: 'un',
    minQuantity: 2,
    expirationDate: new Date(Date.now() + 86400000 * 500).toISOString().split('T')[0],
    location: 'Lavanderia',
    addedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  }
];

export const INITIAL_SAVINGS_HISTORY = [
  { id: 'sav-1', date: '2026-08-15', listName: 'Feira Mensal de Agosto', marketChosen: 'Atacadão', marketCompared: 'Carrefour', amountSaved: 68.40 },
  { id: 'sav-2', date: '2026-08-28', listName: 'Churrasco Dia dos Pais', marketChosen: 'Assaí', marketCompared: 'Pão de Açúcar', amountSaved: 94.20 },
  { id: 'sav-3', date: '2026-09-05', listName: 'Reposição Quinzenal', marketChosen: 'Atacadão', marketCompared: 'Carrefour', amountSaved: 42.10 },
];
