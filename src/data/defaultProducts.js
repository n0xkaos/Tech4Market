// Catálogo pré-cadastrado com mais de 70 produtos comuns de supermercado
export const CATEGORIES = [
  { id: 'hortifruti', name: 'Hortifrúti', icon: '🍎', color: '#10b981' },
  { id: 'carnes', name: 'Carnes & Peixes', icon: '🥩', color: '#ef4444' },
  { id: 'laticinios', name: 'Laticínios & Ovos', icon: '🧀', color: '#f59e0b' },
  { id: 'mercearia', name: 'Mercearia & Grãos', icon: '🍚', color: '#8b5cf6' },
  { id: 'padaria', name: 'Padaria & Matinais', icon: '🥖', color: '#d97706' },
  { id: 'bebidas', name: 'Bebidas & Sucos', icon: '🧃', color: '#06b6d4' },
  { id: 'limpeza', name: 'Limpeza do Lar', icon: '🧼', color: '#3b82f6' },
  { id: 'higiene', name: 'Higiene & Beleza', icon: '🧴', color: '#ec4899' },
  { id: 'congelados', name: 'Congelados', icon: '🧊', color: '#6366f1' },
  { id: 'snacks', name: 'Snacks & Doces', icon: '🍫', color: '#f43f5e' },
  { id: 'outros', name: 'Outros', icon: '📦', color: '#64748b' },
];

export const UNITS = [
  { id: 'un', label: 'un (Unidade)' },
  { id: 'kg', label: 'kg (Quilo)' },
  { id: 'g', label: 'g (Gramas)' },
  { id: 'L', label: 'L (Litro)' },
  { id: 'ml', label: 'ml (Mililitros)' },
  { id: 'pct', label: 'pct (Pacote)' },
  { id: 'cx', label: 'cx (Caixa)' },
  { id: 'dz', label: 'dz (Dúzia)' },
  { id: 'bdj', label: 'bdj (Bandeja)' },
  { id: 'garrafa', label: 'garrafa' },
  { id: 'lata', label: 'lata' },
];

export const DEFAULT_PRODUCTS = [
  // Mercearia
  { id: 'p1', name: 'Arroz Branco Tipo 1 5kg', category: 'mercearia', unit: 'pct', avgPrice: 28.90, shelfLifeDays: 365, barcode: '7891000100101', prices: { m1: 26.90, m2: 27.50, m3: 31.90, m4: 33.50 } },
  { id: 'p2', name: 'Feijão Carioca 1kg', category: 'mercearia', unit: 'pct', avgPrice: 7.80, shelfLifeDays: 180, barcode: '7891000100102', prices: { m1: 6.99, m2: 7.20, m3: 8.50, m4: 8.90 } },
  { id: 'p3', name: 'Óleo de Soja 900ml', category: 'mercearia', unit: 'un', avgPrice: 6.50, shelfLifeDays: 300, barcode: '7891000100103', prices: { m1: 5.89, m2: 6.10, m3: 6.90, m4: 7.20 } },
  { id: 'p4', name: 'Açúcar Refinado 1kg', category: 'mercearia', unit: 'pct', avgPrice: 4.60, shelfLifeDays: 730, barcode: '7891000100104', prices: { m1: 4.19, m2: 4.30, m3: 4.90, m4: 5.10 } },
  { id: 'p5', name: 'Café Torrado e Moído 500g', category: 'mercearia', unit: 'pct', avgPrice: 19.90, shelfLifeDays: 180, barcode: '7891000100105', prices: { m1: 17.90, m2: 18.50, m3: 21.90, m4: 23.00 } },
  { id: 'p6', name: 'Macarrão Espaguete 500g', category: 'mercearia', unit: 'pct', avgPrice: 3.90, shelfLifeDays: 365, barcode: '7891000100106', prices: { m1: 3.49, m2: 3.60, m3: 4.30, m4: 4.50 } },
  { id: 'p7', name: 'Molho de Tomate Sachê 300g', category: 'mercearia', unit: 'un', avgPrice: 2.50, shelfLifeDays: 365, barcode: '7891000100107', prices: { m1: 2.19, m2: 2.30, m3: 2.80, m4: 2.99 } },
  { id: 'p8', name: 'Sal Refinado 1kg', category: 'mercearia', unit: 'pct', avgPrice: 2.20, shelfLifeDays: 1000, barcode: '7891000100108', prices: { m1: 1.99, m2: 2.05, m3: 2.40, m4: 2.50 } },
  { id: 'p9', name: 'Farinha de Trigo 1kg', category: 'mercearia', unit: 'pct', avgPrice: 5.20, shelfLifeDays: 180, barcode: '7891000100109', prices: { m1: 4.69, m2: 4.80, m3: 5.60, m4: 5.90 } },
  { id: 'p10', name: 'Azeite de Oliva Extra Virgem 500ml', category: 'mercearia', unit: 'un', avgPrice: 39.90, shelfLifeDays: 540, barcode: '7891000100110', prices: { m1: 36.90, m2: 37.50, m3: 42.00, m4: 44.90 } },

  // Carnes & Peixes
  { id: 'p11', name: 'Picanha Bovina Resfriada', category: 'carnes', unit: 'kg', avgPrice: 69.90, shelfLifeDays: 15, barcode: '7891000200101', prices: { m1: 64.90, m2: 66.00, m3: 75.90, m4: 79.90 } },
  { id: 'p12', name: 'Alcatra Bovina', category: 'carnes', unit: 'kg', avgPrice: 42.90, shelfLifeDays: 10, barcode: '7891000200102', prices: { m1: 39.90, m2: 41.00, m3: 46.50, m4: 48.90 } },
  { id: 'p13', name: 'Filé de Peito de Frango 1kg', category: 'carnes', unit: 'kg', avgPrice: 19.90, shelfLifeDays: 12, barcode: '7891000200103', prices: { m1: 17.50, m2: 18.20, m3: 21.90, m4: 23.50 } },
  { id: 'p14', name: 'Linguiça Toscana Sadia / Perdigão', category: 'carnes', unit: 'kg', avgPrice: 22.50, shelfLifeDays: 20, barcode: '7891000200104', prices: { m1: 19.90, m2: 20.90, m3: 24.50, m4: 26.00 } },
  { id: 'p15', name: 'Carne Moída Patinho', category: 'carnes', unit: 'kg', avgPrice: 38.90, shelfLifeDays: 5, barcode: '7891000200105', prices: { m1: 35.90, m2: 36.90, m3: 42.00, m4: 44.90 } },
  { id: 'p16', name: 'Filé de Tilápia Congelado 800g', category: 'carnes', unit: 'pct', avgPrice: 36.00, shelfLifeDays: 90, barcode: '7891000200106', prices: { m1: 32.90, m2: 34.00, m3: 39.00, m4: 41.50 } },
  { id: 'p17', name: 'Costelinha Suína Resfriada', category: 'carnes', unit: 'kg', avgPrice: 26.90, shelfLifeDays: 10, barcode: '7891000200107', prices: { m1: 23.90, m2: 24.90, m3: 29.00, m4: 31.00 } },

  // Laticínios & Ovos
  { id: 'p18', name: 'Leite Integral UHT 1L', category: 'laticinios', unit: 'L', avgPrice: 5.10, shelfLifeDays: 90, barcode: '7891000300101', prices: { m1: 4.59, m2: 4.79, m3: 5.49, m4: 5.79 } },
  { id: 'p19', name: 'Ovos Brancos Grandes 30 unidades', category: 'laticinios', unit: 'bdj', avgPrice: 18.90, shelfLifeDays: 30, barcode: '7891000300102', prices: { m1: 16.50, m2: 17.20, m3: 20.50, m4: 22.00 } },
  { id: 'p20', name: 'Queijo Mussarela Fatiado 200g', category: 'laticinios', unit: 'bdj', avgPrice: 9.80, shelfLifeDays: 25, barcode: '7891000300103', prices: { m1: 8.79, m2: 9.10, m3: 10.90, m4: 11.50 } },
  { id: 'p21', name: 'Presunto Cozido Fatiado 200g', category: 'laticinios', unit: 'bdj', avgPrice: 7.90, shelfLifeDays: 20, barcode: '7891000300104', prices: { m1: 6.99, m2: 7.40, m3: 8.80, m4: 9.20 } },
  { id: 'p22', name: 'Manteiga com Sal 200g', category: 'laticinios', unit: 'un', avgPrice: 11.50, shelfLifeDays: 60, barcode: '7891000300105', prices: { m1: 10.20, m2: 10.80, m3: 12.50, m4: 13.20 } },
  { id: 'p23', name: 'Iogurte Natural Integral 170g', category: 'laticinios', unit: 'un', avgPrice: 3.20, shelfLifeDays: 20, barcode: '7891000300106', prices: { m1: 2.79, m2: 2.95, m3: 3.60, m4: 3.90 } },
  { id: 'p24', name: 'Requeijão Cremoso 200g', category: 'laticinios', unit: 'un', avgPrice: 8.50, shelfLifeDays: 45, barcode: '7891000300107', prices: { m1: 7.49, m2: 7.90, m3: 9.30, m4: 9.80 } },

  // Hortifrúti
  { id: 'p25', name: 'Banana Prata', category: 'hortifruti', unit: 'kg', avgPrice: 6.90, shelfLifeDays: 7, barcode: '7891000400101', prices: { m1: 5.99, m2: 6.20, m3: 7.80, m4: 8.50 } },
  { id: 'p26', name: 'Tomate Italiano', category: 'hortifruti', unit: 'kg', avgPrice: 8.90, shelfLifeDays: 6, barcode: '7891000400102', prices: { m1: 7.50, m2: 7.99, m3: 9.90, m4: 10.90 } },
  { id: 'p27', name: 'Cebola Nacional', category: 'hortifruti', unit: 'kg', avgPrice: 5.80, shelfLifeDays: 21, barcode: '7891000400103', prices: { m1: 4.80, m2: 5.20, m3: 6.50, m4: 6.90 } },
  { id: 'p28', name: 'Batata Inglesa', category: 'hortifruti', unit: 'kg', avgPrice: 6.20, shelfLifeDays: 15, barcode: '7891000400104', prices: { m1: 5.10, m2: 5.50, m3: 6.90, m4: 7.50 } },
  { id: 'p29', name: 'Alho Roxo 200g', category: 'hortifruti', unit: 'bdj', avgPrice: 6.50, shelfLifeDays: 40, barcode: '7891000400105', prices: { m1: 5.50, m2: 5.90, m3: 7.20, m4: 7.80 } },
  { id: 'p30', name: 'Maçã Fuji', category: 'hortifruti', unit: 'kg', avgPrice: 10.50, shelfLifeDays: 14, barcode: '7891000400106', prices: { m1: 8.90, m2: 9.50, m3: 11.90, m4: 12.90 } },
  { id: 'p31', name: 'Alface Crespa', category: 'hortifruti', unit: 'un', avgPrice: 3.50, shelfLifeDays: 4, barcode: '7891000400107', prices: { m1: 2.99, m2: 3.20, m3: 3.99, m4: 4.50 } },
  { id: 'p32', name: 'Cenoura', category: 'hortifruti', unit: 'kg', avgPrice: 5.90, shelfLifeDays: 12, barcode: '7891000400108', prices: { m1: 4.90, m2: 5.30, m3: 6.50, m4: 7.00 } },
  { id: 'p33', name: 'Limão Taiti', category: 'hortifruti', unit: 'kg', avgPrice: 4.90, shelfLifeDays: 14, barcode: '7891000400109', prices: { m1: 3.99, m2: 4.30, m3: 5.50, m4: 5.90 } },

  // Bebidas
  { id: 'p34', name: 'Refrigerante Coca-Cola 2L', category: 'bebidas', unit: 'garrafa', avgPrice: 9.90, shelfLifeDays: 180, barcode: '7891000500101', prices: { m1: 8.89, m2: 9.20, m3: 10.50, m4: 10.99 } },
  { id: 'p35', name: 'Cerveja Heineken Lata 350ml', category: 'bebidas', unit: 'lata', avgPrice: 5.20, shelfLifeDays: 180, barcode: '7891000500102', prices: { m1: 4.49, m2: 4.69, m3: 5.79, m4: 6.10 } },
  { id: 'p36', name: 'Suco de Laranja Integral 1L', category: 'bebidas', unit: 'garrafa', avgPrice: 12.90, shelfLifeDays: 30, barcode: '7891000500103', prices: { m1: 11.20, m2: 11.90, m3: 13.90, m4: 14.50 } },
  { id: 'p37', name: 'Água Mineral sem Gás 1,5L', category: 'bebidas', unit: 'garrafa', avgPrice: 2.80, shelfLifeDays: 365, barcode: '7891000500104', prices: { m1: 2.19, m2: 2.39, m3: 3.20, m4: 3.50 } },

  // Limpeza
  { id: 'p38', name: 'Sabão em Pó OMO Lavagem Perfeita 1,6kg', category: 'limpeza', unit: 'cx', avgPrice: 22.90, shelfLifeDays: 730, barcode: '7891000600101', prices: { m1: 19.90, m2: 20.90, m3: 24.90, m4: 26.50 } },
  { id: 'p39', name: 'Amaciante Concentrado Downy 1L', category: 'limpeza', unit: 'un', avgPrice: 18.50, shelfLifeDays: 730, barcode: '7891000600102', prices: { m1: 15.90, m2: 16.90, m3: 19.90, m4: 21.50 } },
  { id: 'p40', name: 'Detergente Líquido Ypê 500ml', category: 'limpeza', unit: 'un', avgPrice: 2.40, shelfLifeDays: 730, barcode: '7891000600103', prices: { m1: 1.99, m2: 2.15, m3: 2.65, m4: 2.89 } },
  { id: 'p41', name: 'Desinfetante Pinho Sol 1L', category: 'limpeza', unit: 'un', avgPrice: 11.90, shelfLifeDays: 730, barcode: '7891000600104', prices: { m1: 9.90, m2: 10.50, m3: 12.90, m4: 13.80 } },
  { id: 'p42', name: 'Água Sanitária 2L', category: 'limpeza', unit: 'un', avgPrice: 6.90, shelfLifeDays: 180, barcode: '7891000600105', prices: { m1: 5.49, m2: 5.99, m3: 7.50, m4: 8.20 } },
  { id: 'p43', name: 'Papel Higiênico Folha Dupla 12 Rolos', category: 'higiene', unit: 'pct', avgPrice: 19.90, shelfLifeDays: 1000, barcode: '7891000600106', prices: { m1: 16.90, m2: 17.50, m3: 21.90, m4: 23.90 } },

  // Higiene
  { id: 'p44', name: 'Creme Dental Colgate Total 12 90g', category: 'higiene', unit: 'un', avgPrice: 7.90, shelfLifeDays: 730, barcode: '7891000700101', prices: { m1: 6.49, m2: 6.90, m3: 8.50, m4: 9.20 } },
  { id: 'p45', name: 'Shampoo Seda 325ml', category: 'higiene', unit: 'un', avgPrice: 12.50, shelfLifeDays: 730, barcode: '7891000700102', prices: { m1: 10.50, m2: 11.20, m3: 13.90, m4: 14.80 } },
  { id: 'p46', name: 'Sabonete em Barra Dove 90g', category: 'higiene', unit: 'un', avgPrice: 4.80, shelfLifeDays: 730, barcode: '7891000700103', prices: { m1: 3.99, m2: 4.20, m3: 5.20, m4: 5.60 } },

  // Padaria & Snacks
  { id: 'p47', name: 'Pão Francês Fresco', category: 'padaria', unit: 'kg', avgPrice: 16.90, shelfLifeDays: 2, barcode: '7891000800101', prices: { m1: 14.50, m2: 15.00, m3: 18.00, m4: 20.90 } },
  { id: 'p48', name: 'Pão de Forma Tradicional 500g', category: 'padaria', unit: 'pct', avgPrice: 7.50, shelfLifeDays: 14, barcode: '7891000800102', prices: { m1: 6.49, m2: 6.90, m3: 8.20, m4: 8.90 } },
  { id: 'p49', name: 'Biscoito Recheado Passatempo 130g', category: 'snacks', unit: 'pct', avgPrice: 3.60, shelfLifeDays: 240, barcode: '7891000800103', prices: { m1: 2.99, m2: 3.20, m3: 3.99, m4: 4.30 } },
  { id: 'p50', name: 'Chocolate Barra Lacta / Nestlé 80g', category: 'snacks', unit: 'un', avgPrice: 6.90, shelfLifeDays: 300, barcode: '7891000800104', prices: { m1: 5.79, m2: 6.10, m3: 7.50, m4: 7.99 } },
];
