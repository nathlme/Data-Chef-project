import saladeCesarImg from "../assets/salade cesar.jpg";
import pizzaImg from "../assets/pizza.jpg";
import pouletRotiImg from "../assets/poulet roti.jpg";
import tarteAuxPommesImg from "../assets/tarte aux pommes.jpg";
import lasagnesImg from "../assets/lasagnes.jpg";
import banoffeImg from "../assets/banoffe.jpg";

export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  categoryId: number;
  time: string;
  difficulty: string;
  servings: string;
  rating: number;
  filters: {
    culinary: string[];
    practical: string[];
    ingredients: string[];
  };
  ingredients: {
    name: string;
    quantity: string;
    image?: string;
  }[];
  ustensils: {
    name: string;
    image?: string;
  }[];
  steps: string[];
}

// Fonction helper pour obtenir l'icône d'un ingrédient
export const getIngredientIcon = (ingredientName: string): string => {
  const name = ingredientName.toLowerCase();
  
  // Légumes
  if (name.includes('laitue') || name.includes('salade') || name.includes('brocoli') || 
      name.includes('tomate') || name.includes('oignon') || name.includes('carotte') ||
      name.includes('courgette') || name.includes('légume')) {
    return '🥬';
  }
  // Viandes
  if (name.includes('poulet') || name.includes('viande') || name.includes('lardon') || 
      name.includes('bacon') || name.includes('bœuf')) {
    return '🍗';
  }
  // Fromages
  if (name.includes('fromage') || name.includes('parmesan') || name.includes('mozzarella') ||
      name.includes('ricotta') || name.includes('mascarpone')) {
    return '🧀';
  }
  // Pâtes et riz
  if (name.includes('pâte') || name.includes('spaghetti') || name.includes('lasagne') ||
      name.includes('riz') || name.includes('nouille')) {
    return '🍝';
  }
  // Œufs
  if (name.includes('œuf') || name.includes('oeuf')) {
    return '🥚';
  }
  // Fruits
  if (name.includes('pomme') || name.includes('citron') || name.includes('fraise') ||
      name.includes('banane') || name.includes('fruit')) {
    return '🍎';
  }
  // Pain et croûtons
  if (name.includes('pain') || name.includes('croûton') || name.includes('farine')) {
    return '🍞';
  }
  // Herbes et épices
  if (name.includes('basilic') || name.includes('persil') || name.includes('herbe') ||
      name.includes('épice') || name.includes('poivre') || name.includes('sel')) {
    return '🌿';
  }
  // Liquides
  if (name.includes('sauce') || name.includes('huile') || name.includes('lait') ||
      name.includes('crème') || name.includes('bouillon')) {
    return '🧴';
  }
  // Sucre et desserts
  if (name.includes('sucre') || name.includes('chocolat') || name.includes('caramel') ||
      name.includes('confiture')) {
    return '🍬';
  }
  // Beurre
  if (name.includes('beurre')) {
    return '🧈';
  }
  
  return '🥘'; // Icône par défaut
};

// Fonction helper pour obtenir l'icône d'un ustensile
export const getUstensilIcon = (ustensilName: string): string => {
  const name = ustensilName.toLowerCase();
  
  if (name.includes('couteau')) return '🔪';
  if (name.includes('planche')) return '🪵';
  if (name.includes('casserole') || name.includes('poêle') || name.includes('marmite')) return '🍳';
  if (name.includes('four')) return '🔥';
  if (name.includes('mixeur') || name.includes('blender')) return '🔌';
  if (name.includes('fouet')) return '🥄';
  if (name.includes('râpe')) return '⚙️';
  if (name.includes('saladier') || name.includes('bol')) return '🥣';
  if (name.includes('passoire')) return '🧺';
  if (name.includes('spatule') || name.includes('cuillère') || name.includes('cuiller')) return '🥄';
  if (name.includes('rouleau')) return '📏';
  if (name.includes('moule')) return '🧁';
  
  return '🔧'; // Icône par défaut
};

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Salade César",
    description: "Une salade croquante aux saveurs méditerranéennes avec sa sauce crémeuse et ses croûtons dorés.",
    image: saladeCesarImg,
    categoryId: 4,
    time: "15 min",
    difficulty: "Très facile",
    servings: "4",
    rating: 5,
    filters: {
      culinary: ['Végétarien', 'Healthy & équilibré', 'Française', 'Léger & frais'],
      practical: ['Moins de 10 min', 'Très facile', 'Recettes famille'],
      ingredients: ['Poulet', 'Fromage', 'Légumes']
    },
    ingredients: [
      { name: "Laitue romaine", quantity: "1 tête" },
      { name: "Poulet grillé", quantity: "300g" },
      { name: "Parmesan", quantity: "50g" },
      { name: "Croûtons", quantity: "100g" },
      { name: "Sauce César", quantity: "100ml" },
      { name: "Citron", quantity: "1" },
    ],
    ustensils: [
      { name: "Saladier" },
      { name: "Couteau" },
      { name: "Planche à découper" },
      { name: "Râpe à fromage" },
    ],
    steps: [
      "Lavez et essorez la laitue romaine, puis coupez-la en morceaux.",
      "Coupez le poulet grillé en dés.",
      "Dans un grand saladier, mélangez la laitue, le poulet et les croûtons.",
      "Ajoutez la sauce César et mélangez bien.",
      "Râpez le parmesan par-dessus et pressez le jus de citron.",
      "Servez immédiatement et dégustez.",
    ],
  },
  {
    id: 2,
    name: "Pâtes Carbonara",
    description: "Le classique italien par excellence : des pâtes onctueuses nappées d'une sauce au parmesan et aux œufs.",
    image: lasagnesImg,
    categoryId: 1,
    time: "20 min",
    difficulty: "Facile",
    servings: "4",
    rating: 5,
    filters: {
      culinary: ['Italienne', 'Comfort food'],
      practical: ['Moins de 20 min', 'Facile', 'Budget mini'],
      ingredients: ['Œufs', 'Fromage', 'Pâtes & riz']
    },
    ingredients: [
      { name: "Spaghetti", quantity: "400g" },
      { name: "Lardons", quantity: "200g" },
      { name: "Œufs", quantity: "4" },
      { name: "Parmesan", quantity: "100g" },
      { name: "Poivre noir", quantity: "Au goût" },
      { name: "Sel", quantity: "Au goût" },
    ],
    ustensils: [
      { name: "Grande casserole" },
      { name: "Poêle" },
      { name: "Fouet" },
      { name: "Râpe à fromage" },
      { name: "Passoire" },
    ],
    steps: [
      "Faites cuire les spaghetti dans une grande casserole d'eau salée.",
      "Pendant ce temps, faites revenir les lardons dans une poêle sans matière grasse.",
      "Dans un bol, battez les œufs avec le parmesan râpé et du poivre.",
      "Égouttez les pâtes en conservant un peu d'eau de cuisson.",
      "Mélangez rapidement les pâtes chaudes avec les œufs battus (hors du feu).",
      "Ajoutez les lardons et un peu d'eau de cuisson si nécessaire.",
      "Servez immédiatement avec du parmesan supplémentaire.",
    ],
  },
  {
    id: 3,
    name: "Poulet rôti",
    description: "Un poulet doré et croustillant, parfumé aux herbes, idéal pour un repas convivial en famille.",
    image: pouletRotiImg,
    categoryId: 1,
    time: "1h 30min",
    difficulty: "Intermédiaire",
    servings: "6",
    rating: 5,
    filters: {
      culinary: ['Française', 'À partager'],
      practical: ['Longue cuisson', 'Intermédiaire', 'Recettes famille'],
      ingredients: ['Poulet']
    },
    ingredients: [
      { name: "Poulet entier", quantity: "1.5kg" },
      { name: "Beurre", quantity: "50g" },
      { name: "Thym", quantity: "4 branches" },
      { name: "Citron", quantity: "1" },
      { name: "Ail", quantity: "1 tête" },
      { name: "Sel et poivre", quantity: "Au goût" },
    ],
    ustensils: [
      { name: "Plat à four" },
      { name: "Ficelle de cuisine" },
      { name: "Pinceau" },
      { name: "Thermomètre à viande" },
    ],
    steps: [
      "Préchauffez le four à 200°C.",
      "Farcissez le poulet avec le citron coupé, l'ail et le thym.",
      "Bridez le poulet avec de la ficelle.",
      "Badigeonnez-le de beurre fondu et assaisonnez généreusement.",
      "Enfournez pour 1h15 à 1h30, en arrosant régulièrement.",
      "Vérifiez la cuisson avec un thermomètre (75°C à cœur).",
      "Laissez reposer 10 minutes avant de découper.",
    ],
  },
  {
    id: 4,
    name: "Tarte aux pommes",
    description: "Une pâtisserie traditionnelle aux pommes fondantes sur une pâte feuilletée croustillante.",
    image: tarteAuxPommesImg,
    categoryId: 5,
    time: "45 min",
    difficulty: "Facile",
    servings: "8",
    rating: 5,
    filters: {
      culinary: ['Française', 'Comfort food'],
      practical: ['30 min max', 'Facile'],
      ingredients: ['Œufs']
    },
    ingredients: [
      { name: "Pâte feuilletée", quantity: "1" },
      { name: "Pommes", quantity: "5" },
      { name: "Sucre", quantity: "80g" },
      { name: "Beurre", quantity: "30g" },
      { name: "Cannelle", quantity: "1 c. à café" },
      { name: "Confiture d'abricot", quantity: "3 c. à soupe" },
    ],
    ustensils: [
      { name: "Moule à tarte" },
      { name: "Couteau" },
      { name: "Éplucheur" },
      { name: "Pinceau" },
    ],
    steps: [
      "Préchauffez le four à 180°C.",
      "Étalez la pâte feuilletée dans un moule à tarte.",
      "Épluchez et coupez les pommes en fines tranches.",
      "Disposez les pommes en rosace sur la pâte.",
      "Saupoudrez de sucre et de cannelle, parsemez de noisettes de beurre.",
      "Enfournez pour 30-35 minutes jusqu'à ce que la pâte soit dorée.",
      "Nappez de confiture d'abricot chaude avant de servir.",
    ],
  },
  {
    id: 5,
    name: "Pizza Margherita",
    description: "La pizza napolitaine authentique avec sa sauce tomate, sa mozzarella fondante et son basilic frais.",
    image: pizzaImg,
    categoryId: 2,
    time: "25 min",
    difficulty: "Très facile",
    servings: "4",
    rating: 5,
    filters: {
      culinary: ['Végétarien', 'Italienne', 'À partager'],
      practical: ['Moins de 20 min', 'Très facile', 'Recettes famille'],
      ingredients: ['Fromage', 'Légumes']
    },
    ingredients: [
      { name: "Pâte à pizza", quantity: "1" },
      { name: "Sauce tomate", quantity: "200ml" },
      { name: "Mozzarella", quantity: "250g" },
      { name: "Basilic frais", quantity: "10 feuilles" },
      { name: "Huile d'olive", quantity: "2 c. à soupe" },
      { name: "Sel", quantity: "Au goût" },
    ],
    ustensils: [
      { name: "Plaque de four" },
      { name: "Rouleau à pâtisserie" },
      { name: "Cuillère" },
    ],
    steps: [
      "Préchauffez le four à 240°C (chaleur tournante).",
      "Étalez la pâte à pizza sur une plaque de cuisson.",
      "Étalez la sauce tomate uniformément sur la pâte.",
      "Répartissez la mozzarella coupée en morceaux.",
      "Enfournez pour 12-15 minutes jusqu'à ce que la pâte soit dorée.",
      "Ajoutez le basilic frais et un filet d'huile d'olive.",
      "Servez immédiatement.",
    ],
  },
  {
    id: 6,
    name: "Soupe à l'oignon",
    description: "Une soupe réconfortante aux oignons caramélisés, gratinée au fromage, parfaite pour l'hiver.",
    image: saladeCesarImg,
    categoryId: 1,
    time: "50 min",
    difficulty: "Facile",
    servings: "4",
    rating: 4,
    filters: {
      culinary: ['Française', 'Comfort food'],
      practical: ['30 min max', 'Facile', 'Budget mini'],
      ingredients: ['Légumes', 'À faire avec ce qu\'on a chez soi']
    },
    ingredients: [
      { name: "Oignons", quantity: "6" },
      { name: "Beurre", quantity: "40g" },
      { name: "Bouillon de bœuf", quantity: "1.5L" },
      { name: "Pain", quantity: "4 tranches" },
      { name: "Gruyère râpé", quantity: "150g" },
      { name: "Vin blanc", quantity: "100ml" },
    ],
    ustensils: [
      { name: "Cocotte" },
      { name: "Bols à soupe allant au four" },
      { name: "Couteau" },
      { name: "Cuillère en bois" },
    ],
    steps: [
      "Émincez finement les oignons.",
      "Faites-les revenir dans le beurre jusqu'à caramélisation (20 min).",
      "Déglacez au vin blanc et laissez réduire.",
      "Ajoutez le bouillon et laissez mijoter 20 minutes.",
      "Versez la soupe dans des bols à soupe.",
      "Déposez une tranche de pain et couvrez de gruyère.",
      "Passez sous le grill 5 minutes jusqu'à ce que le fromage soit doré.",
    ],
  },
  {
    id: 7,
    name: "Tiramisu",
    description: "Le dessert italien emblématique au mascarpone, biscuits imbibés de café et cacao amer.",
    image: banoffeImg,
    categoryId: 5,
    time: "30 min",
    difficulty: "Facile",
    servings: "6",
    rating: 5,
    filters: {
      culinary: ['Italienne'],
      practical: ['Moins de 20 min', 'Facile'],
      ingredients: ['Œufs']
    },
    ingredients: [
      { name: "Mascarpone", quantity: "500g" },
      { name: "Œufs", quantity: "4" },
      { name: "Sucre", quantity: "100g" },
      { name: "Biscuits à la cuillère", quantity: "300g" },
      { name: "Café fort", quantity: "300ml" },
      { name: "Cacao amer", quantity: "3 c. à soupe" },
    ],
    ustensils: [
      { name: "Plat rectangulaire" },
      { name: "Fouet" },
      { name: "Saladiers" },
      { name: "Tamis" },
    ],
    steps: [
      "Séparez les blancs des jaunes d'œufs.",
      "Battez les jaunes avec le sucre jusqu'à blanchiment.",
      "Ajoutez le mascarpone et mélangez délicatement.",
      "Montez les blancs en neige ferme et incorporez-les.",
      "Trempez rapidement les biscuits dans le café et disposez-les dans le plat.",
      "Alternez couches de biscuits et de crème.",
      "Saupoudrez de cacao et réservez au frais 4h minimum.",
    ],
  },
  {
    id: 8,
    name: "Ratatouille",
    description: "Un mélange coloré de légumes du soleil mijotés avec des herbes de Provence.",
    image: pouletRotiImg,
    categoryId: 3,
    time: "1h 15min",
    difficulty: "Facile",
    servings: "6",
    rating: 4,
    filters: {
      culinary: ['Vegan', 'Sans lactose', 'Healthy & équilibré', 'Française'],
      practical: ['30 min max', 'Facile', 'Batch cooking'],
      ingredients: ['Légumes', 'À faire avec ce qu\'on a chez soi']
    },
    ingredients: [
      { name: "Aubergines", quantity: "2" },
      { name: "Courgettes", quantity: "3" },
      { name: "Poivrons", quantity: "2" },
      { name: "Tomates", quantity: "4" },
      { name: "Oignons", quantity: "1" },
      { name: "Ail", quantity: "3 gousses" },
      { name: "Huile d'olive", quantity: "50ml" },
    ],
    ustensils: [
      { name: "Grande poêle" },
      { name: "Couteau de chef" },
      { name: "Planche à découper" },
      { name: "Cuillère en bois" },
      { name: "Plat allant au four" },
    ],
    steps: [
      "Préchauffez le four à 180°C.",
      "Lavez et coupez tous les légumes en rondelles d'environ 0.5 cm d'épaisseur.",
      "Dans une grande poêle, faites revenir l'oignon et l'ail hachés dans l'huile d'olive.",
      "Disposez les rondelles de légumes en alternance dans un plat allant au four.",
      "Arrosez d'huile d'olive, salez, poivrez et ajoutez les herbes de Provence.",
      "Enfournez pour 45 minutes jusqu'à ce que les légumes soient tendres.",
      "Servez chaud ou tiède avec du pain frais.",
    ],
  },
  {
    id: 9,
    name: "Crêpes Suzette",
    description: "Des crêpes fines flambées à l'orange et au Grand Marnier, un dessert spectaculaire.",
    image: tarteAuxPommesImg,
    categoryId: 5,
    time: "35 min",
    difficulty: "Facile",
    servings: "4",
    rating: 4,
    filters: {
      culinary: ['Française'],
      practical: ['Moins de 20 min', 'Facile'],
      ingredients: ['Œufs']
    },
    ingredients: [
      { name: "Farine", quantity: "250g" },
      { name: "Œufs", quantity: "3" },
      { name: "Lait", quantity: "500ml" },
      { name: "Beurre", quantity: "60g" },
      { name: "Oranges", quantity: "3" },
      { name: "Sucre", quantity: "100g" },
      { name: "Grand Marnier", quantity: "60ml" },
    ],
    ustensils: [
      { name: "Crêpière" },
      { name: "Fouet" },
      { name: "Saladier" },
      { name: "Râpe à zeste" },
      { name: "Poêle" },
    ],
    steps: [
      "Préparez la pâte à crêpes : mélangez farine, œufs et lait.",
      "Laissez reposer 1h puis faites cuire les crêpes.",
      "Préparez le beurre d'orange : mélangez beurre, sucre et zeste d'orange.",
      "Dans une poêle, faites fondre le beurre d'orange.",
      "Pliez les crêpes en quatre et réchauffez-les dans la sauce.",
      "Ajoutez le jus d'orange et le Grand Marnier.",
      "Flambez et servez immédiatement.",
    ],
  },
  {
    id: 10,
    name: "Quiche Lorraine",
    description: "La tarte salée classique avec sa garniture crémeuse aux lardons et fromage.",
    image: pizzaImg,
    categoryId: 2,
    time: "50 min",
    difficulty: "Facile",
    servings: "6",
    rating: 5,
    filters: {
      culinary: ['Française', 'À partager'],
      practical: ['30 min max', 'Facile', 'Repas transportables / tupperware'],
      ingredients: ['Œufs', 'Fromage']
    },
    ingredients: [
      { name: "Pâte brisée", quantity: "1" },
      { name: "Lardons", quantity: "200g" },
      { name: "Œufs", quantity: "3" },
      { name: "Crème fraîche", quantity: "200ml" },
      { name: "Lait", quantity: "100ml" },
      { name: "Gruyère", quantity: "100g" },
    ],
    ustensils: [
      { name: "Moule à tarte" },
      { name: "Fouet" },
      { name: "Poêle" },
      { name: "Saladier" },
    ],
    steps: [
      "Préchauffez le four à 180°C.",
      "Étalez la pâte dans un moule à tarte et piquez le fond.",
      "Faites revenir les lardons sans matière grasse.",
      "Battez les œufs avec la crème et le lait, salez et poivrez.",
      "Répartissez les lardons sur la pâte.",
      "Versez l'appareil et parsemez de gruyère.",
      "Enfournez 35-40 minutes jusqu'à ce que la quiche soit dorée.",
    ],
  },
  {
    id: 11,
    name: "Bœuf Bourguignon",
    description: "Un plat mijoté généreux avec une viande fondante dans une sauce au vin rouge.",
    image: pouletRotiImg,
    categoryId: 1,
    time: "3h",
    difficulty: "Intermédiaire",
    servings: "6",
    rating: 5,
    filters: {
      culinary: ['Française', 'Comfort food'],
      practical: ['Longue cuisson', 'Intermédiaire', 'Batch cooking'],
      ingredients: ['Bœuf']
    },
    ingredients: [
      { name: "Bœuf à braiser", quantity: "1kg" },
      { name: "Vin rouge", quantity: "750ml" },
      { name: "Lardons", quantity: "150g" },
      { name: "Carottes", quantity: "3" },
      { name: "Oignons", quantity: "2" },
      { name: "Champignons", quantity: "250g" },
      { name: "Bouquet garni", quantity: "1" },
    ],
    ustensils: [
      { name: "Cocotte" },
      { name: "Couteau" },
      { name: "Planche à découper" },
      { name: "Cuillère en bois" },
    ],
    steps: [
      "Coupez le bœuf en cubes de 4 cm.",
      "Faites revenir la viande avec les lardons dans la cocotte.",
      "Ajoutez les oignons et carottes coupés en morceaux.",
      "Versez le vin rouge et ajoutez le bouquet garni.",
      "Couvrez et laissez mijoter 2h30 à feu doux.",
      "30 minutes avant la fin, ajoutez les champignons.",
      "Servez avec des pommes de terre vapeur ou des pâtes fraîches.",
    ],
  },
  {
    id: 12,
    name: "Crème Brûlée",
    description: "Une crème vanillée onctueuse surmontée d'une fine couche de sucre caramélisé.",
    image: banoffeImg,
    categoryId: 5,
    time: "1h",
    difficulty: "Intermédiaire",
    servings: "6",
    rating: 5,
    filters: {
      culinary: ['Française'],
      practical: ['30 min max', 'Intermédiaire'],
      ingredients: ['Œufs']
    },
    ingredients: [
      { name: "Crème liquide", quantity: "500ml" },
      { name: "Jaunes d'œufs", quantity: "6" },
      { name: "Sucre", quantity: "100g" },
      { name: "Gousse de vanille", quantity: "1" },
      { name: "Cassonade", quantity: "6 c. à soupe" },
    ],
    ustensils: [
      { name: "Ramequins" },
      { name: "Casserole" },
      { name: "Fouet" },
      { name: "Chalumeau" },
      { name: "Plat à gratin" },
    ],
    steps: [
      "Préchauffez le four à 150°C.",
      "Faites chauffer la crème avec la vanille fendue.",
      "Battez les jaunes d'œufs avec le sucre.",
      "Versez la crème chaude sur les œufs en fouettant.",
      "Répartissez dans les ramequins et faites cuire au bain-marie 40 min.",
      "Laissez refroidir puis réfrigérez 4h minimum.",
      "Saupoudrez de cassonade et caramélisez au chalumeau.",
    ],
  },
  {
    id: 13,
    name: "Buddha Bowl",
    description: "Un bol complet et équilibré avec céréales, légumes croquants et sauce savoureuse.",
    image: saladeCesarImg,
    categoryId: 3,
    time: "25 min",
    difficulty: "Très facile",
    servings: "2",
    rating: 5,
    filters: {
      culinary: ['Vegan', 'Sans lactose', 'Healthy & équilibré'],
      practical: ['Moins de 20 min', 'Très facile', 'Repas transportables / tupperware'],
      ingredients: ['Légumes', 'Pâtes & riz']
    },
    ingredients: [
      { name: "Quinoa", quantity: "150g" },
      { name: "Avocat", quantity: "1" },
      { name: "Pois chiches", quantity: "200g" },
      { name: "Tomates cerises", quantity: "150g" },
      { name: "Concombre", quantity: "1" },
      { name: "Graines de sésame", quantity: "2 c. à soupe" },
      { name: "Sauce tahini", quantity: "100ml" },
    ],
    ustensils: [
      { name: "Casserole" },
      { name: "Couteau" },
      { name: "Bols" },
      { name: "Cuillère" },
    ],
    steps: [
      "Faites cuire le quinoa selon les instructions du paquet.",
      "Coupez l'avocat, les tomates et le concombre.",
      "Rincez et égouttez les pois chiches.",
      "Répartissez le quinoa dans des bols.",
      "Disposez harmonieusement les légumes et pois chiches.",
      "Arrosez de sauce tahini et parsemez de graines de sésame.",
      "Servez immédiatement ou conservez au frais.",
    ],
  },
  {
    id: 14,
    name: "Smoothie Bowl",
    description: "Un petit-déjeuner vitaminé à base de fruits mixés et garnitures croquantes.",
    image: saladeCesarImg,
    categoryId: 3,
    time: "10 min",
    difficulty: "Très facile",
    servings: "2",
    rating: 4,
    filters: {
      culinary: ['Vegan', 'Sans lactose', 'Healthy & équilibré', 'Léger & frais'],
      practical: ['Moins de 10 min', 'Très facile'],
      ingredients: ['Légumes']
    },
    ingredients: [
      { name: "Bananes congelées", quantity: "2" },
      { name: "Fruits rouges", quantity: "150g" },
      { name: "Lait d'amande", quantity: "100ml" },
      { name: "Granola", quantity: "50g" },
      { name: "Graines de chia", quantity: "1 c. à soupe" },
      { name: "Fruits frais", quantity: "Au choix" },
    ],
    ustensils: [
      { name: "Blender" },
      { name: "Bols" },
      { name: "Cuillère" },
    ],
    steps: [
      "Mixez les bananes congelées, fruits rouges et lait d'amande.",
      "Versez dans des bols.",
      "Disposez le granola sur la moitié du bol.",
      "Ajoutez les fruits frais coupés.",
      "Saupoudrez de graines de chia.",
      "Servez immédiatement bien frais.",
    ],
  },
  {
    id: 15,
    name: "Tacos Végétariens",
    description: "Des tortillas garnies de légumes épicés, guacamole et fromage fondu.",
    image: pizzaImg,
    categoryId: 4,
    time: "30 min",
    difficulty: "Facile",
    servings: "4",
    rating: 4,
    filters: {
      culinary: ['Végétarien', 'Mexicaine', 'Épicé'],
      practical: ['Moins de 20 min', 'Facile', 'Recettes famille'],
      ingredients: ['Légumes', 'Fromage']
    },
    ingredients: [
      { name: "Tortillas", quantity: "8" },
      { name: "Haricots rouges", quantity: "400g" },
      { name: "Poivrons", quantity: "2" },
      { name: "Oignons", quantity: "1" },
      { name: "Avocat", quantity: "2" },
      { name: "Cheddar", quantity: "150g" },
      { name: "Épices mexicaines", quantity: "2 c. à soupe" },
    ],
    ustensils: [
      { name: "Poêle" },
      { name: "Couteau" },
      { name: "Fourchette" },
      { name: "Planche à découper" },
    ],
    steps: [
      "Émincez les poivrons et oignons.",
      "Faites-les revenir avec les épices et les haricots égouttés.",
      "Écrasez les avocats pour faire un guacamole simple.",
      "Réchauffez les tortillas.",
      "Garnissez chaque tortilla de légumes, guacamole et cheddar.",
      "Pliez et servez avec de la crème fraîche.",
    ],
  },
  {
    id: 16,
    name: "Burger Maison",
    description: "Un burger gourmand avec steak juteux, cheddar fondant et légumes croquants.",
    image: pouletRotiImg,
    categoryId: 2,
    time: "30 min",
    difficulty: "Facile",
    servings: "4",
    rating: 5,
    filters: {
      culinary: ['Comfort food', 'À partager'],
      practical: ['Moins de 20 min', 'Facile', 'Recettes famille'],
      ingredients: ['Bœuf']
    },
    ingredients: [
      { name: "Steaks hachés", quantity: "4" },
      { name: "Pains à burger", quantity: "4" },
      { name: "Cheddar", quantity: "4 tranches" },
      { name: "Tomates", quantity: "2" },
      { name: "Salade", quantity: "4 feuilles" },
      { name: "Oignons", quantity: "1" },
      { name: "Sauce burger", quantity: "Au goût" },
    ],
    ustensils: [
      { name: "Poêle" },
      { name: "Spatule" },
      { name: "Couteau" },
      { name: "Planche à découper" },
    ],
    steps: [
      "Assaisonnez les steaks hachés avec sel et poivre.",
      "Faites-les cuire dans une poêle chaude 3-4 min par côté.",
      "Ajoutez le cheddar 1 minute avant la fin pour le faire fondre.",
      "Faites griller les pains coupés.",
      "Montez les burgers : pain, sauce, salade, tomate, steak, oignons.",
      "Servez avec des frites maison.",
    ],
  },
];

export const getRecipeById = (id: number): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (categoryId: number): Recipe[] => {
  return recipes.filter(recipe => recipe.categoryId === categoryId);
};
