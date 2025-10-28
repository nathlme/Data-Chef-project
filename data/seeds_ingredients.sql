-- ============================================================================
--                    SEED DATA : INGREDIENTS
--                    (100+ ingrédients catégorisés)
-- ============================================================================

--  RÉSUMÉ
/*
TOTAL : 150 ingrédients

RÉPARTITION PAR CATÉGORIE :
- Légumes : 30
- Fruits : 15
- Viandes & Poissons : 15
- Produits laitiers : 12
- Féculents & Céréales : 12
- Légumineuses : 8
- Huiles & Condiments : 15
- Épices & Aromates : 20
- Produits sucrés : 10
- Fruits secs & Noix : 8
- Divers : 5

RAYONS PRINCIPAUX :
- fruits_legumes
- boucherie
- poissonnerie
- charcuterie
- frais
- epicerie_salee
- epicerie_sucree
- conserves
- surgelés
- boulangerie
- autre
*/


-- ============================================================================
--                    LÉGUMES (30 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
-- Légumes racines
('carotte', 'carottes', 'vegetable', 'root_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg', 'pièce']::TEXT[]),
('pomme de terre', 'pommes de terre', 'vegetable', 'root_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg', 'pièce']::TEXT[]),
('patate douce', 'patates douces', 'vegetable', 'root_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg', 'pièce']::TEXT[]),
('betterave', 'betteraves', 'vegetable', 'root_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('navet', 'navets', 'vegetable', 'root_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('radis', 'radis', 'vegetable', 'root_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'botte']::TEXT[]),

-- Légumes bulbes
('oignon', 'oignons', 'vegetable', 'bulb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('oignon rouge', 'oignons rouges', 'vegetable', 'bulb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('échalote', 'échalotes', 'vegetable', 'bulb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('ail', 'gousses d''ail', 'vegetable', 'bulb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['gousse', 'g']::TEXT[]),
('poireau', 'poireaux', 'vegetable', 'bulb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),

-- Légumes fruits
('tomate', 'tomates', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg', 'pièce']::TEXT[]),
('tomate cerise', 'tomates cerises', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'barquette']::TEXT[]),
('courgette', 'courgettes', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('aubergine', 'aubergines', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('poivron rouge', 'poivrons rouges', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('poivron vert', 'poivrons verts', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('concombre', 'concombres', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),

-- Légumes feuilles
('salade verte', 'salades vertes', 'vegetable', 'leafy_green', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'sachet']::TEXT[]),
('épinard', 'épinards', 'vegetable', 'leafy_green', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'botte']::TEXT[]),
('chou', 'choux', 'vegetable', 'cruciferous', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('chou-fleur', 'choux-fleurs', 'vegetable', 'cruciferous', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('brocoli', 'brocolis', 'vegetable', 'cruciferous', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),

-- Légumes divers
('champignon de Paris', 'champignons de Paris', 'vegetable', 'mushroom', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'barquette']::TEXT[]),
('champignon shiitake', 'champignons shiitake', 'vegetable', 'mushroom', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g']::TEXT[]),
('haricot vert', 'haricots verts', 'vegetable', 'legume', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('petit pois', 'petits pois', 'vegetable', 'legume', 'surgelés', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('maïs', 'maïs', 'vegetable', 'grain_vegetable', 'conserves', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'boîte']::TEXT[]),
('avocat', 'avocats', 'vegetable', 'fruit_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'g']::TEXT[]),
('artichaut', 'artichauts', 'vegetable', 'flower_vegetable', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce']::TEXT[]);

-- ============================================================================
--                    FRUITS (15 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
('pomme', 'pommes', 'fruit', 'pome', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'kg']::TEXT[]),
('poire', 'poires', 'fruit', 'pome', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'kg']::TEXT[]),
('banane', 'bananes', 'fruit', 'tropical', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'kg']::TEXT[]),
('orange', 'oranges', 'fruit', 'citrus', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'kg']::TEXT[]),
('citron', 'citrons', 'fruit', 'citrus', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'jus']::TEXT[]),
('citron vert', 'citrons verts', 'fruit', 'citrus', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'jus']::TEXT[]),
('fraise', 'fraises', 'fruit', 'berry', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'barquette']::TEXT[]),
('framboise', 'framboises', 'fruit', 'berry', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'barquette']::TEXT[]),
('myrtille', 'myrtilles', 'fruit', 'berry', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'barquette']::TEXT[]),
('mangue', 'mangues', 'fruit', 'tropical', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'g']::TEXT[]),
('ananas', 'ananas', 'fruit', 'tropical', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'g']::TEXT[]),
('raisin', 'raisins', 'fruit', 'berry', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'grappe']::TEXT[]),
('pêche', 'pêches', 'fruit', 'stone_fruit', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'kg']::TEXT[]),
('abricot', 'abricots', 'fruit', 'stone_fruit', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce', 'kg']::TEXT[]),
('kiwi', 'kiwis', 'fruit', 'berry', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pièce']::TEXT[]);

-- ============================================================================
--                    VIANDES & POISSONS (15 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
-- Viandes rouges
('boeuf haché', 'boeuf haché', 'meat', 'red_meat', 'boucherie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('steak de boeuf', 'steaks de boeuf', 'meat', 'red_meat', 'boucherie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['pièce', 'g']::TEXT[]),
('viande hachée (porc/boeuf)', 'viande hachée', 'meat', 'red_meat', 'boucherie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'kg']::TEXT[]),

-- Viandes blanches
('poulet (blanc)', 'blancs de poulet', 'meat', 'poultry', 'boucherie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('cuisse de poulet', 'cuisses de poulet', 'meat', 'poultry', 'boucherie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('dinde (escalope)', 'escalopes de dinde', 'meat', 'poultry', 'boucherie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'pièce']::TEXT[]),

-- Charcuterie
('lardons', 'lardons', 'meat', 'processed', 'charcuterie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'barquette']::TEXT[]),
('jambon blanc', 'jambon blanc', 'meat', 'processed', 'charcuterie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'tranche']::TEXT[]),
('chorizo', 'chorizo', 'meat', 'processed', 'charcuterie', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'pièce']::TEXT[]),

-- Poissons
('saumon (filet)', 'filets de saumon', 'fish', 'fatty_fish', 'poissonnerie', ARRAY['fish']::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('cabillaud (filet)', 'filets de cabillaud', 'fish', 'white_fish', 'poissonnerie', ARRAY['fish']::TEXT[], ARRAY[]::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('thon (conserve)', 'thon en boîte', 'fish', 'canned', 'conserves', ARRAY['fish']::TEXT[], ARRAY['gluten_free', 'dairy_free']::TEXT[], ARRAY['boîte', 'g']::TEXT[]),

-- Fruits de mer
('crevette', 'crevettes', 'seafood', 'shellfish', 'poissonnerie', ARRAY['shellfish']::TEXT[], ARRAY['gluten_free', 'dairy_free']::TEXT[], ARRAY['g']::TEXT[]),
('moule', 'moules', 'seafood', 'shellfish', 'poissonnerie', ARRAY['shellfish']::TEXT[], ARRAY['gluten_free', 'dairy_free']::TEXT[], ARRAY['kg']::TEXT[]),
('calamar', 'calamars', 'seafood', 'cephalopod', 'poissonnerie', ARRAY['shellfish']::TEXT[], ARRAY['gluten_free', 'dairy_free']::TEXT[], ARRAY['g']::TEXT[]);

-- ============================================================================
--                    PRODUITS LAITIERS (12 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
-- Laits
('lait entier', 'lait entier', 'dairy', 'milk', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['ml', 'L']::TEXT[]),
('lait demi-écrémé', 'lait demi-écrémé', 'dairy', 'milk', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['ml', 'L']::TEXT[]),
('crème fraîche', 'crème fraîche', 'dairy', 'cream', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['ml', 'g', 'càs']::TEXT[]),
('crème liquide', 'crème liquide', 'dairy', 'cream', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['ml', 'cl']::TEXT[]),

-- Fromages
('parmesan', 'parmesan', 'dairy', 'cheese', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g']::TEXT[]),
('mozzarella', 'mozzarella', 'dairy', 'cheese', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'boule']::TEXT[]),
('gruyère', 'gruyère', 'dairy', 'cheese', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g']::TEXT[]),
('chèvre frais', 'chèvre frais', 'dairy', 'cheese', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'bûche']::TEXT[]),
('fromage blanc', 'fromage blanc', 'dairy', 'fresh_cheese', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'pot']::TEXT[]),

-- Autres
('beurre', 'beurre', 'dairy', 'butter', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'càs']::TEXT[]),
('yaourt nature', 'yaourts nature', 'dairy', 'yogurt', 'frais', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['pot', 'g']::TEXT[]),
('oeuf', 'oeufs', 'protein', 'egg', 'frais', ARRAY['eggs']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['pièce']::TEXT[]);

-- ============================================================================
--                    FÉCULENTS & CÉRÉALES (12 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
-- Pâtes
('pâtes', 'pâtes', 'grain', 'pasta', 'epicerie_salee', ARRAY['gluten']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('pâtes complètes', 'pâtes complètes', 'grain', 'pasta', 'epicerie_salee', ARRAY['gluten']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('spaghetti', 'spaghetti', 'grain', 'pasta', 'epicerie_salee', ARRAY['gluten']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'kg']::TEXT[]),

-- Riz
('riz blanc', 'riz blanc', 'grain', 'rice', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('riz basmati', 'riz basmati', 'grain', 'rice', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('riz complet', 'riz complet', 'grain', 'rice', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),

-- Autres féculents
('quinoa', 'quinoa', 'grain', 'pseudocereal', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('couscous', 'couscous', 'grain', 'semolina', 'epicerie_salee', ARRAY['gluten']::TEXT[], ARRAY['vegan', 'vegetarian']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('boulgour', 'boulgour', 'grain', 'bulgur', 'epicerie_salee', ARRAY['gluten']::TEXT[], ARRAY['vegan', 'vegetarian']::TEXT[], ARRAY['g']::TEXT[]),
('pain', 'pains', 'grain', 'bread', 'boulangerie', ARRAY['gluten']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['pièce', 'tranche']::TEXT[]),
('farine de blé', 'farine de blé', 'grain', 'flour', 'epicerie_salee', ARRAY['gluten']::TEXT[], ARRAY['vegan', 'vegetarian']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('polenta', 'polenta', 'grain', 'corn', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g']::TEXT[]);

-- ============================================================================
--                    LÉGUMINEUSES (8 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
('lentille verte', 'lentilles vertes', 'legume', 'lentil', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('lentille corail', 'lentilles corail', 'legume', 'lentil', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'kg']::TEXT[]),
('pois chiche', 'pois chiches', 'legume', 'chickpea', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'boîte']::TEXT[]),
('haricot rouge', 'haricots rouges', 'legume', 'bean', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'boîte']::TEXT[]),
('haricot blanc', 'haricots blancs', 'legume', 'bean', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'boîte']::TEXT[]),
('haricot noir', 'haricots noirs', 'legume', 'bean', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'boîte']::TEXT[]),
('flageolet', 'flageolets', 'legume', 'bean', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'boîte']::TEXT[]),
('tofu', 'tofu', 'legume', 'soy_product', 'frais', ARRAY['soy']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'bloc']::TEXT[]);

-- ============================================================================
--                    HUILES & CONDIMENTS (15 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
-- Huiles
('huile d''olive', 'huile d''olive', 'condiment', 'oil', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'cl', 'càs']::TEXT[]),
('huile de tournesol', 'huile de tournesol', 'condiment', 'oil', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'cl', 'càs']::TEXT[]),
('huile de colza', 'huile de colza', 'condiment', 'oil', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'càs']::TEXT[]),
('huile de sésame', 'huile de sésame', 'condiment', 'oil', 'epicerie_salee', ARRAY['sesame']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'càs']::TEXT[]),

-- Vinaigres & sauces
('vinaigre balsamique', 'vinaigre balsamique', 'condiment', 'vinegar', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'càs']::TEXT[]),
('vinaigre de vin', 'vinaigre de vin', 'condiment', 'vinegar', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'càs']::TEXT[]),
('sauce soja', 'sauce soja', 'condiment', 'sauce', 'epicerie_salee', ARRAY['soy', 'gluten']::TEXT[], ARRAY['vegan', 'vegetarian']::TEXT[], ARRAY['ml', 'càs']::TEXT[]),
('moutarde', 'moutarde', 'condiment', 'sauce', 'epicerie_salee', ARRAY['mustard']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càs', 'g']::TEXT[]),
('ketchup', 'ketchup', 'condiment', 'sauce', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càs', 'ml']::TEXT[]),
('mayonnaise', 'mayonnaise', 'condiment', 'sauce', 'epicerie_salee', ARRAY['eggs']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['càs', 'g']::TEXT[]),

-- Bouillons & bases
('bouillon de légumes (cube)', 'bouillon de légumes', 'condiment', 'stock', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian']::TEXT[], ARRAY['cube', 'ml']::TEXT[]),
('bouillon de volaille (cube)', 'bouillon de volaille', 'condiment', 'stock', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY[]::TEXT[], ARRAY['cube', 'ml']::TEXT[]),
('concentré de tomate', 'concentré de tomate', 'condiment', 'paste', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs', 'tube']::TEXT[]),
('tomate concassée (conserve)', 'tomates concassées', 'condiment', 'canned', 'conserves', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['boîte', 'g']::TEXT[]),
('lait de coco', 'lait de coco', 'condiment', 'alternative_milk', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'boîte']::TEXT[]);

-- ============================================================================
--                    ÉPICES & AROMATES (20 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
-- Sel & poivre
('sel', 'sel', 'spice', 'salt', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'g', 'càc']::TEXT[]),
('poivre noir', 'poivre noir', 'spice', 'pepper', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'g', 'tour de moulin']::TEXT[]),
('fleur de sel', 'fleur de sel', 'spice', 'salt', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'g']::TEXT[]),

-- Herbes séchées
('thym', 'thym', 'spice', 'herb', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'càc', 'branche']::TEXT[]),
('romarin', 'romarin', 'spice', 'herb', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'branche']::TEXT[]),
('origan', 'origan', 'spice', 'herb', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'càc']::TEXT[]),
('basilic', 'basilic', 'spice', 'herb', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['feuille', 'pincée', 'botte']::TEXT[]),
('persil', 'persil', 'spice', 'herb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['botte', 'g', 'càs']::TEXT[]),
('coriandre', 'coriandre', 'spice', 'herb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['botte', 'g', 'càs']::TEXT[]),
('menthe', 'menthe', 'spice', 'herb', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['feuille', 'botte']::TEXT[]),

-- Épices du monde
('curry', 'curry', 'spice', 'blend', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càc', 'g']::TEXT[]),
('cumin', 'cumin', 'spice', 'seed', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càc', 'g']::TEXT[]),
('paprika', 'paprika', 'spice', 'powder', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càc', 'g']::TEXT[]),
('curcuma', 'curcuma', 'spice', 'powder', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càc', 'g']::TEXT[]),
('gingembre', 'gingembre', 'spice', 'root', 'fruits_legumes', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'morceau', 'càc']::TEXT[]),
('cannelle', 'cannelle', 'spice', 'bark', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['bâton', 'càc', 'pincée']::TEXT[]),
('muscade', 'muscade', 'spice', 'seed', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'râpée']::TEXT[]),
('piment', 'piments', 'spice', 'pepper', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['pincée', 'pièce']::TEXT[]),
('herbes de Provence', 'herbes de Provence', 'spice', 'blend', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['càc', 'pincée']::TEXT[]),
('laurier', 'laurier', 'spice', 'leaf', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['feuille']::TEXT[]);

-- ============================================================================
--                    PRODUITS SUCRÉS (10 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
('sucre blanc', 'sucre blanc', 'sweetener', 'sugar', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs', 'càc']::TEXT[]),
('sucre roux', 'sucre roux', 'sweetener', 'sugar', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs']::TEXT[]),
('miel', 'miel', 'sweetener', 'honey', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs', 'pot']::TEXT[]),
('sirop d''érable', 'sirop d''érable', 'sweetener', 'syrup', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'càs']::TEXT[]),
('chocolat noir', 'chocolat noir', 'sweet', 'chocolate', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'tablette', 'carré']::TEXT[]),
('chocolat au lait', 'chocolat au lait', 'sweet', 'chocolate', 'epicerie_sucree', ARRAY['lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'tablette']::TEXT[]),
('cacao en poudre', 'cacao en poudre', 'sweet', 'cocoa', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs']::TEXT[]),
('vanille (extrait)', 'vanille', 'sweet', 'extract', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['gousse', 'càc', 'ml']::TEXT[]),
('confiture', 'confitures', 'sweet', 'preserve', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs', 'pot']::TEXT[]),
('pâte à tartiner', 'pâte à tartiner', 'sweet', 'spread', 'epicerie_sucree', ARRAY['nuts', 'lactose']::TEXT[], ARRAY['vegetarian']::TEXT[], ARRAY['g', 'càs']::TEXT[]);

-- ============================================================================
--                    FRUITS SECS & NOIX (8 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
('amande', 'amandes', 'nut', 'tree_nut', 'epicerie_salee', ARRAY['nuts']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('noix', 'noix', 'nut', 'tree_nut', 'epicerie_salee', ARRAY['nuts']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('noisette', 'noisettes', 'nut', 'tree_nut', 'epicerie_salee', ARRAY['nuts']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('cacahuète', 'cacahuètes', 'nut', 'peanut', 'epicerie_salee', ARRAY['peanuts']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g']::TEXT[]),
('pignon de pin', 'pignons de pin', 'nut', 'tree_nut', 'epicerie_salee', ARRAY['nuts']::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'càs']::TEXT[]),
('raisin sec', 'raisins secs', 'dried_fruit', 'grape', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'poignée']::TEXT[]),
('abricot sec', 'abricots secs', 'dried_fruit', 'stone_fruit', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]),
('datte', 'dattes', 'dried_fruit', 'date', 'epicerie_sucree', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'pièce']::TEXT[]);

-- ============================================================================
--                    DIVERS (5 items)
-- ============================================================================

INSERT INTO ingredients (name, name_plural, category, subcategory, aisle, allergens, diet_tags, common_units) VALUES
('eau', 'eau', 'beverage', 'water', 'autre', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'L', 'cl']::TEXT[]),
('vin blanc', 'vin blanc', 'beverage', 'alcohol', 'autre', ARRAY[]::TEXT[], ARRAY['vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'cl', 'verre']::TEXT[]),
('vin rouge', 'vin rouge', 'beverage', 'alcohol', 'autre', ARRAY[]::TEXT[], ARRAY['vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['ml', 'cl', 'verre']::TEXT[]),
('levure chimique', 'levure chimique', 'baking', 'leavening', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['sachet', 'càc']::TEXT[]),
('levure boulangère', 'levure boulangère', 'baking', 'yeast', 'epicerie_salee', ARRAY[]::TEXT[], ARRAY['vegan', 'vegetarian', 'gluten_free', 'dairy_free']::TEXT[], ARRAY['g', 'cube', 'sachet']::TEXT[]);
