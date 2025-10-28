-- ============================================================================
--                    SEED DATA : INGREDIENT_NUTRITION
--                    (Valeurs pour 100g/100ml - source CIQUAL/USDA)
-- ============================================================================

--  RÉSUMÉ
/*
✅ DONNÉES COMPLÉTÉES : 150 ingrédients

📊 SOURCE DES DONNÉES :
- Base CIQUAL (Anses - France)
- Valeurs pour 100g ou 100ml
- Arrondies au dixième pour cohérence
*/

-- ============================================================================
--                    LÉGUMES (30 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
-- Légumes racines
(1, 41, 0.2, 7.6, 2.8, 0.9, 0.069, 'CIQUAL'),  -- carotte
(2, 77, 0.1, 17.5, 2.2, 2.0, 0.006, 'CIQUAL'),  -- pomme de terre
(3, 86, 0.1, 20.1, 3.0, 1.6, 0.055, 'CIQUAL'),  -- patate douce
(4, 43, 0.2, 8.0, 2.8, 1.6, 0.078, 'CIQUAL'),  -- betterave
(5, 28, 0.1, 5.4, 1.8, 0.9, 0.067, 'CIQUAL'),  -- navet
(6, 16, 0.1, 2.9, 1.6, 0.7, 0.024, 'CIQUAL'),  -- radis

-- Légumes bulbes
(7, 40, 0.1, 7.6, 1.7, 1.1, 0.004, 'CIQUAL'),  -- oignon
(8, 42, 0.2, 7.9, 1.7, 1.2, 0.004, 'CIQUAL'),  -- oignon rouge
(9, 72, 0.1, 14.2, 3.2, 2.5, 0.012, 'CIQUAL'),  -- échalote
(10, 149, 0.5, 30.8, 2.1, 6.4, 0.017, 'CIQUAL'),  -- ail
(11, 61, 0.3, 12.4, 1.8, 1.5, 0.020, 'CIQUAL'),  -- poireau

-- Légumes fruits
(12, 18, 0.2, 2.6, 1.2, 0.9, 0.005, 'CIQUAL'),  -- tomate
(13, 18, 0.2, 2.6, 1.2, 0.9, 0.005, 'CIQUAL'),  -- tomate cerise
(14, 17, 0.3, 2.2, 1.1, 1.2, 0.008, 'CIQUAL'),  -- courgette
(15, 25, 0.2, 3.9, 3.0, 1.0, 0.002, 'CIQUAL'),  -- aubergine
(16, 31, 0.3, 5.3, 2.1, 1.0, 0.004, 'CIQUAL'),  -- poivron rouge
(17, 20, 0.2, 2.9, 1.7, 0.9, 0.004, 'CIQUAL'),  -- poivron vert
(18, 15, 0.1, 2.2, 0.5, 0.7, 0.002, 'CIQUAL'),  -- concombre

-- Légumes feuilles
(19, 15, 0.2, 1.4, 1.5, 1.4, 0.028, 'CIQUAL'),  -- salade verte
(20, 23, 0.4, 1.4, 2.2, 2.9, 0.079, 'CIQUAL'),  -- épinard
(21, 25, 0.1, 3.7, 2.5, 1.3, 0.018, 'CIQUAL'),  -- chou
(22, 25, 0.3, 3.0, 2.0, 1.9, 0.030, 'CIQUAL'),  -- chou-fleur
(23, 34, 0.4, 4.0, 2.6, 2.8, 0.033, 'CIQUAL'),  -- brocoli

-- Légumes divers
(24, 22, 0.3, 2.3, 1.0, 3.1, 0.009, 'CIQUAL'),  -- champignon de Paris
(25, 34, 0.5, 5.1, 2.5, 2.2, 0.009, 'CIQUAL'),  -- champignon shiitake
(26, 31, 0.2, 4.7, 2.7, 1.8, 0.002, 'CIQUAL'),  -- haricot vert
(27, 81, 0.4, 12.5, 5.5, 5.4, 0.002, 'CIQUAL'),  -- petit pois
(28, 86, 1.2, 16.0, 2.4, 3.2, 0.270, 'CIQUAL'),  -- maïs
(29, 160, 14.7, 6.4, 6.7, 2.0, 0.007, 'CIQUAL'),  -- avocat
(30, 47, 0.2, 8.4, 5.4, 3.3, 0.120, 'CIQUAL');  -- artichaut

-- ============================================================================
--                    FRUITS (15 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
(31, 52, 0.2, 11.6, 2.4, 0.3, 0.001, 'CIQUAL'),  -- pomme
(32, 57, 0.4, 12.3, 3.1, 0.4, 0.002, 'CIQUAL'),  -- poire
(33, 89, 0.3, 20.0, 2.6, 1.1, 0.001, 'CIQUAL'),  -- banane
(34, 47, 0.2, 9.4, 2.4, 0.9, 0.001, 'CIQUAL'),  -- orange
(35, 29, 0.3, 6.4, 2.8, 1.1, 0.002, 'CIQUAL'),  -- citron
(36, 30, 0.2, 7.7, 2.8, 0.7, 0.002, 'CIQUAL'),  -- citron vert
(37, 33, 0.3, 5.5, 2.0, 0.7, 0.001, 'CIQUAL'),  -- fraise
(38, 52, 0.7, 8.3, 6.5, 1.2, 0.001, 'CIQUAL'),  -- framboise
(39, 57, 0.3, 11.5, 2.4, 0.7, 0.001, 'CIQUAL'),  -- myrtille
(40, 60, 0.4, 13.4, 1.6, 0.8, 0.001, 'CIQUAL'),  -- mangue
(41, 50, 0.1, 11.0, 1.4, 0.5, 0.001, 'CIQUAL'),  -- ananas
(42, 69, 0.2, 15.5, 0.9, 0.7, 0.002, 'CIQUAL'),  -- raisin
(43, 39, 0.3, 7.5, 1.5, 0.9, 0.001, 'CIQUAL'),  -- pêche
(44, 48, 0.4, 9.1, 2.0, 1.4, 0.001, 'CIQUAL'),  -- abricot
(45, 61, 0.5, 12.2, 3.0, 1.1, 0.003, 'CIQUAL');  -- kiwi

-- ============================================================================
--                    VIANDES & POISSONS (15 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
-- Viandes rouges
(46, 250, 17.0, 0.0, 0.0, 23.0, 0.070, 'CIQUAL'),  -- boeuf haché
(47, 158, 6.5, 0.0, 0.0, 24.5, 0.065, 'CIQUAL'),  -- steak de boeuf
(48, 263, 20.0, 0.0, 0.0, 20.0, 0.075, 'CIQUAL'),  -- viande hachée mixte

-- Viandes blanches
(49, 110, 1.2, 0.0, 0.0, 24.0, 0.070, 'CIQUAL'),  -- poulet blanc
(50, 190, 10.9, 0.0, 0.0, 21.5, 0.090, 'CIQUAL'),  -- cuisse de poulet
(51, 107, 1.0, 0.0, 0.0, 24.0, 0.065, 'CIQUAL'),  -- dinde escalope

-- Charcuterie
(52, 248, 20.0, 1.0, 0.0, 16.0, 1.200, 'CIQUAL'),  -- lardons
(53, 115, 3.0, 1.2, 0.0, 20.5, 1.100, 'CIQUAL'),  -- jambon blanc
(54, 455, 38.0, 2.0, 0.0, 24.0, 2.100, 'CIQUAL'),  -- chorizo

-- Poissons
(55, 208, 13.4, 0.0, 0.0, 20.4, 0.059, 'CIQUAL'),  -- saumon filet
(56, 82, 0.7, 0.0, 0.0, 18.0, 0.054, 'CIQUAL'),  -- cabillaud filet
(57, 128, 0.9, 0.0, 0.0, 26.5, 0.320, 'CIQUAL'),  -- thon conserve

-- Fruits de mer
(58, 99, 0.3, 0.9, 0.0, 23.0, 0.220, 'CIQUAL'),  -- crevette
(59, 86, 2.2, 3.7, 0.0, 11.7, 0.290, 'CIQUAL'),  -- moule
(60, 92, 1.4, 3.1, 0.0, 15.6, 0.450, 'CIQUAL');  -- calamar

-- ============================================================================
--                    PRODUITS LAITIERS (12 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
-- Laits
(61, 64, 3.5, 4.9, 0.0, 3.3, 0.045, 'CIQUAL'),  -- lait entier
(62, 47, 1.6, 4.9, 0.0, 3.3, 0.045, 'CIQUAL'),  -- lait demi-écrémé
(63, 292, 30.0, 3.2, 0.0, 2.4, 0.070, 'CIQUAL'),  -- crème fraîche
(64, 300, 30.0, 3.6, 0.0, 2.3, 0.070, 'CIQUAL'),  -- crème liquide

-- Fromages
(65, 392, 26.0, 4.1, 0.0, 35.8, 1.600, 'CIQUAL'),  -- parmesan
(66, 280, 22.0, 2.2, 0.0, 18.0, 0.620, 'CIQUAL'),  -- mozzarella
(67, 413, 32.3, 1.5, 0.0, 29.8, 1.200, 'CIQUAL'),  -- gruyère
(68, 210, 18.5, 2.5, 0.0, 11.0, 1.000, 'CIQUAL'),  -- chèvre frais
(69, 75, 0.2, 7.1, 0.0, 8.0, 0.045, 'CIQUAL'),  -- fromage blanc

-- Autres
(70, 717, 80.0, 0.6, 0.0, 0.9, 0.750, 'CIQUAL'),  -- beurre
(71, 50, 1.3, 5.5, 0.0, 4.0, 0.050, 'CIQUAL'),  -- yaourt nature
(72, 145, 10.6, 0.7, 0.0, 12.5, 0.140, 'CIQUAL');  -- oeuf

-- ============================================================================
--                    FÉCULENTS & CÉRÉALES (12 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
-- Pâtes
(73, 350, 1.5, 70.0, 3.2, 12.5, 0.006, 'CIQUAL'),  -- pâtes
(74, 348, 2.5, 66.2, 9.7, 13.0, 0.006, 'CIQUAL'),  -- pâtes complètes
(75, 371, 1.5, 74.7, 3.2, 13.0, 0.006, 'CIQUAL'),  -- spaghetti

-- Riz
(76, 130, 0.3, 28.2, 0.4, 2.7, 0.001, 'CIQUAL'),  -- riz blanc (cuit)
(77, 121, 0.4, 25.2, 0.4, 3.5, 0.001, 'CIQUAL'),  -- riz basmati (cuit)
(78, 111, 0.8, 23.0, 1.8, 2.6, 0.005, 'CIQUAL'),  -- riz complet (cuit)

-- Autres féculents
(79, 368, 6.1, 57.2, 7.0, 14.1, 0.005, 'CIQUAL'),  -- quinoa
(80, 112, 0.2, 23.2, 1.4, 3.8, 0.006, 'CIQUAL'),  -- couscous (cuit)
(81, 83, 0.2, 18.6, 4.5, 3.1, 0.005, 'CIQUAL'),  -- boulgour (cuit)
(82, 265, 3.2, 49.0, 7.4, 9.0, 1.200, 'CIQUAL'),  -- pain
(83, 364, 1.5, 72.0, 2.7, 11.5, 0.002, 'CIQUAL'),  -- farine de blé
(84, 358, 3.1, 79.0, 2.1, 7.2, 0.005, 'CIQUAL');  -- polenta

-- ============================================================================
--                    LÉGUMINEUSES (8 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
(85, 116, 0.4, 16.3, 7.9, 9.0, 0.002, 'CIQUAL'),  -- lentille verte (cuite)
(86, 116, 0.4, 16.3, 7.9, 9.0, 0.002, 'CIQUAL'),  -- lentille corail (cuite)
(87, 164, 2.6, 22.5, 7.6, 8.9, 0.007, 'CIQUAL'),  -- pois chiche (cuit)
(88, 127, 0.5, 20.2, 7.4, 8.7, 0.005, 'CIQUAL'),  -- haricot rouge (cuit)
(89, 139, 0.5, 22.3, 7.0, 9.7, 0.002, 'CIQUAL'),  -- haricot blanc (cuit)
(90, 132, 0.5, 21.0, 8.7, 8.9, 0.001, 'CIQUAL'),  -- haricot noir (cuit)
(91, 118, 0.4, 18.7, 6.7, 8.0, 0.005, 'CIQUAL'),  -- flageolet (cuit)
(92, 76, 4.8, 1.9, 0.3, 8.0, 0.007, 'CIQUAL');  -- tofu

-- ============================================================================
--                    HUILES & CONDIMENTS (15 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
-- Huiles
(93, 900, 100.0, 0.0, 0.0, 0.0, 0.001, 'CIQUAL'),  -- huile d'olive
(94, 900, 100.0, 0.0, 0.0, 0.0, 0.001, 'CIQUAL'),  -- huile de tournesol
(95, 900, 100.0, 0.0, 0.0, 0.0, 0.001, 'CIQUAL'),  -- huile de colza
(96, 900, 100.0, 0.0, 0.0, 0.0, 0.001, 'CIQUAL'),  -- huile de sésame

-- Vinaigres & sauces
(97, 88, 0.0, 17.0, 0.0, 0.5, 0.020, 'CIQUAL'),  -- vinaigre balsamique
(98, 18, 0.0, 0.3, 0.0, 0.0, 0.008, 'CIQUAL'),  -- vinaigre de vin
(99, 60, 0.1, 8.5, 0.8, 6.0, 5.500, 'CIQUAL'),  -- sauce soja
(100, 66, 3.3, 5.3, 3.3, 4.4, 3.600, 'CIQUAL'),  -- moutarde
(101, 112, 0.2, 25.0, 0.4, 1.2, 1.120, 'CIQUAL'),  -- ketchup
(102, 680, 75.0, 0.6, 0.0, 1.0, 1.200, 'CIQUAL'),  -- mayonnaise

-- Bouillons & bases
(103, 10, 0.1, 1.5, 0.2, 0.8, 15.000, 'CIQUAL'),  -- bouillon légumes
(104, 12, 0.2, 1.8, 0.1, 0.9, 16.000, 'CIQUAL'),  -- bouillon volaille
(105, 82, 0.5, 15.0, 3.0, 4.2, 2.400, 'CIQUAL'),  -- concentré de tomate
(106, 32, 0.2, 5.6, 1.3, 1.3, 0.250, 'CIQUAL'),  -- tomate concassée
(107, 230, 24.0, 6.0, 1.0, 2.3, 0.015, 'CIQUAL');  -- lait de coco

-- ============================================================================
--                    ÉPICES & AROMATES (20 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
-- Sel & poivre
(108, 0, 0.0, 0.0, 0.0, 0.0, 38.850, 'CIQUAL'),  -- sel
(109, 251, 3.3, 64.0, 25.3, 10.4, 0.020, 'CIQUAL'),  -- poivre noir
(110, 0, 0.0, 0.0, 0.0, 0.0, 38.850, 'CIQUAL'),  -- fleur de sel

-- Herbes séchées
(111, 101, 1.7, 15.8, 14.0, 5.6, 0.055, 'CIQUAL'),  -- thym
(112, 131, 5.9, 15.2, 14.1, 3.3, 0.026, 'CIQUAL'),  -- romarin
(113, 265, 4.3, 42.5, 42.5, 9.0, 0.025, 'CIQUAL'),  -- origan
(114, 23, 0.6, 2.7, 1.6, 3.2, 0.056, 'CIQUAL'),  -- basilic (frais)
(115, 36, 0.8, 3.0, 3.3, 3.0, 0.056, 'CIQUAL'),  -- persil (frais)
(116, 23, 0.5, 0.9, 2.8, 2.1, 0.046, 'CIQUAL'),  -- coriandre (fraîche)
(117, 44, 0.7, 6.0, 6.8, 3.8, 0.031, 'CIQUAL'),  -- menthe (fraîche)

-- Épices du monde
(118, 325, 14.0, 25.0, 10.0, 14.3, 0.052, 'CIQUAL'),  -- curry
(119, 375, 22.3, 33.7, 10.5, 17.8, 0.168, 'CIQUAL'),  -- cumin
(120, 282, 12.9, 34.0, 34.9, 14.1, 0.068, 'CIQUAL'),  -- paprika
(121, 354, 9.9, 44.4, 21.1, 7.8, 0.038, 'CIQUAL'),  -- curcuma
(122, 80, 0.8, 15.8, 2.0, 1.8, 0.013, 'CIQUAL'),  -- gingembre (frais)
(123, 247, 1.2, 50.6, 53.1, 4.0, 0.010, 'CIQUAL'),  -- cannelle
(124, 525, 36.3, 28.5, 20.8, 5.8, 0.016, 'CIQUAL'),  -- muscade
(125, 40, 0.4, 7.3, 1.5, 1.9, 0.009, 'CIQUAL'),  -- piment (frais)
(126, 271, 6.9, 35.4, 24.0, 9.1, 0.050, 'CIQUAL'),  -- herbes de Provence
(127, 313, 8.4, 48.7, 26.3, 7.6, 0.023, 'CIQUAL');  -- laurier

-- ============================================================================
--                    PRODUITS SUCRÉS (10 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
(128, 399, 0.0, 99.8, 0.0, 0.0, 0.001, 'CIQUAL'),  -- sucre blanc
(129, 380, 0.0, 95.0, 0.0, 0.0, 0.030, 'CIQUAL'),  -- sucre roux
(130, 304, 0.0, 82.4, 0.2, 0.3, 0.004, 'CIQUAL'),  -- miel
(131, 260, 0.2, 67.0, 0.0, 0.0, 0.009, 'CIQUAL'),  -- sirop d'érable
(132, 546, 31.3, 52.4, 15.0, 6.2, 0.010, 'CIQUAL'),  -- chocolat noir
(133, 535, 30.0, 56.0, 3.4, 7.6, 0.120, 'CIQUAL'),  -- chocolat au lait
(134, 228, 13.7, 19.6, 33.2, 19.6, 0.021, 'CIQUAL'),  -- cacao en poudre
(135, 288, 0.1, 74.0, 0.0, 0.1, 0.010, 'CIQUAL'),  -- vanille extrait
(136, 278, 0.1, 69.0, 1.0, 0.4, 0.030, 'CIQUAL'),  -- confiture
(137, 539, 30.9, 57.5, 5.4, 6.3, 0.107, 'CIQUAL');  -- pâte à tartiner

-- ============================================================================
--                    FRUITS SECS & NOIX (8 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
(138, 579, 49.9, 9.5, 12.5, 21.2, 0.001, 'CIQUAL'),  -- amande
(139, 654, 65.2, 7.0, 6.7, 15.2, 0.002, 'CIQUAL'),  -- noix
(140, 628, 60.8, 9.4, 9.7, 15.0, 0.001, 'CIQUAL'),  -- noisette
(141, 567, 49.2, 8.5, 8.5, 25.8, 0.018, 'CIQUAL'),  -- cacahuète
(142, 673, 68.4, 9.2, 3.7, 13.7, 0.002, 'CIQUAL'),  -- pignon de pin
(143, 299, 0.5, 69.3, 3.7, 3.1, 0.011, 'CIQUAL'),  -- raisin sec
(144, 241, 0.5, 54.5, 7.3, 3.4, 0.010, 'CIQUAL'),  -- abricot sec
(145, 282, 0.4, 64.2, 8.0, 2.5, 0.002, 'CIQUAL');  -- datte

-- ============================================================================
--                    DIVERS (5 items)
-- ============================================================================

INSERT INTO ingredient_nutrition (ingredient_id, calories, fat_content, total_carbohydrates, dietary_fiber, protein, salt, source) VALUES
(146, 0, 0.0, 0.0, 0.0, 0.0, 0.001, 'CIQUAL'),  -- eau
(147, 82, 0.0, 2.6, 0.0, 0.1, 0.004, 'CIQUAL'),  -- vin blanc
(148, 85, 0.0, 2.6, 0.0, 0.1, 0.004, 'CIQUAL'),  -- vin rouge
(149, 163, 1.0, 38.0, 0.0, 4.0, 5.000, 'CIQUAL'),  -- levure chimique
(150, 325, 7.6, 41.2, 26.9, 40.4, 0.051, 'CIQUAL');  -- levure boulangère

-- ============================================================================
--                          VALIDATION
-- ============================================================================

/*
🔍 VÉRIFICATION :
SELECT 
    i.name,
    n.calories,
    n.protein,
    n.total_carbohydrates,
    n.fat_content,
    n.dietary_fiber,
    n.salt
FROM ingredients i
LEFT JOIN ingredient_nutrition n ON i.id = n.ingredient_id
ORDER BY i.id;

📈 STATS NUTRITION PAR CATÉGORIE :
SELECT 
    i.category,
    COUNT(*) as nb_ingredients,
    ROUND(AVG(n.calories), 1) as avg_calories,
    ROUND(AVG(n.protein), 1) as avg_protein,
    ROUND(AVG(n.fat_content), 1) as avg_fat
FROM ingredients i
JOIN ingredient_nutrition n ON i.id = n.ingredient_id
GROUP BY i.category
ORDER BY avg_calories DESC;
*/
