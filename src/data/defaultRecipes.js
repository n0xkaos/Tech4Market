export const DEFAULT_RECIPES = [
  {
    id: 'r1',
    name: 'Strogonoff de Frango Cremoso',
    category: 'Almoço & Jantar',
    servings: 4,
    time: '35 min',
    image: '🥘',
    description: 'Um clássico brasileiro saboroso, rápido e perfeito para o dia a dia.',
    ingredients: [
      { productId: 'p13', name: 'Filé de Peito de Frango 1kg', quantity: 1, unit: 'kg', category: 'carnes' },
      { productId: 'p27', name: 'Cebola Nacional', quantity: 0.3, unit: 'kg', category: 'hortifruti' },
      { productId: 'p29', name: 'Alho Roxo 200g', quantity: 1, unit: 'bdj', category: 'hortifruti' },
      { productId: 'p7', name: 'Molho de Tomate Sachê 300g', quantity: 1, unit: 'un', category: 'mercearia' },
      { productId: 'p1', name: 'Arroz Branco Tipo 1 5kg', quantity: 0.5, unit: 'kg', category: 'mercearia' },
      { productId: 'p3', name: 'Óleo de Soja 900ml', quantity: 1, unit: 'un', category: 'mercearia' },
    ]
  },
  {
    id: 'r2',
    name: 'Churrasco Completo de Fim de Semana',
    category: 'Eventos & Amigos',
    servings: 6,
    time: '2h',
    image: '🥩',
    description: 'Picanha suculenta, linguiça toscana e acompanhamentos indispensáveis.',
    ingredients: [
      { productId: 'p11', name: 'Picanha Bovina Resfriada', quantity: 2, unit: 'kg', category: 'carnes' },
      { productId: 'p14', name: 'Linguiça Toscana Sadia / Perdigão', quantity: 1.5, unit: 'kg', category: 'carnes' },
      { productId: 'p47', name: 'Pão Francês Fresco', quantity: 1, unit: 'kg', category: 'padaria' },
      { productId: 'p35', name: 'Cerveja Heineken Lata 350ml', quantity: 12, unit: 'lata', category: 'bebidas' },
      { productId: 'p34', name: 'Refrigerante Coca-Cola 2L', quantity: 2, unit: 'garrafa', category: 'bebidas' },
      { productId: 'p33', name: 'Limão Taiti', quantity: 1, unit: 'kg', category: 'hortifruti' },
      { productId: 'p8', name: 'Sal Refinado 1kg', quantity: 1, unit: 'pct', category: 'mercearia' },
    ]
  },
  {
    id: 'r3',
    name: 'Macarronada de Domingo com Molho e Queijo',
    category: 'Massas',
    servings: 4,
    time: '30 min',
    image: '🍝',
    description: 'Espaguete com carne moída selecionada e farta cobertura de mussarela.',
    ingredients: [
      { productId: 'p6', name: 'Macarrão Espaguete 500g', quantity: 1, unit: 'pct', category: 'mercearia' },
      { productId: 'p15', name: 'Carne Moída Patinho', quantity: 0.8, unit: 'kg', category: 'carnes' },
      { productId: 'p7', name: 'Molho de Tomate Sachê 300g', quantity: 2, unit: 'un', category: 'mercearia' },
      { productId: 'p20', name: 'Queijo Mussarela Fatiado 200g', quantity: 2, unit: 'bdj', category: 'laticinios' },
      { productId: 'p10', name: 'Azeite de Oliva Extra Virgem 500ml', quantity: 1, unit: 'un', category: 'mercearia' },
      { productId: 'p27', name: 'Cebola Nacional', quantity: 0.4, unit: 'kg', category: 'hortifruti' },
    ]
  },
  {
    id: 'r4',
    name: 'Café da Manhã Completo & Saudável',
    category: 'Café & Matinais',
    servings: 2,
    time: '15 min',
    image: '🥞',
    description: 'Ovos mexidos, café fresco, pão quentinho e frutas frescas.',
    ingredients: [
      { productId: 'p19', name: 'Ovos Brancos Grandes 30 unidades', quantity: 0.5, unit: 'bdj', category: 'laticinios' },
      { productId: 'p48', name: 'Pão de Forma Tradicional 500g', quantity: 1, unit: 'pct', category: 'padaria' },
      { productId: 'p22', name: 'Manteiga com Sal 200g', quantity: 1, unit: 'un', category: 'laticinios' },
      { productId: 'p5', name: 'Café Torrado e Moído 500g', quantity: 1, unit: 'pct', category: 'mercearia' },
      { productId: 'p18', name: 'Leite Integral UHT 1L', quantity: 2, unit: 'L', category: 'laticinios' },
      { productId: 'p25', name: 'Banana Prata', quantity: 1, unit: 'kg', category: 'hortifruti' },
      { productId: 'p36', name: 'Suco de Laranja Integral 1L', quantity: 1, unit: 'garrafa', category: 'bebidas' },
    ]
  }
];
