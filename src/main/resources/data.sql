-- =====================================================
-- Script de données de test pour DataChef
-- Compatible avec le modèle actuel
-- =====================================================

-- 1. Insertion des utilisateurs de test
INSERT INTO users (id, username, email, password_hash, image_key, is_active, role, created_at, updated_at)
VALUES
    (gen_random_uuid(), 'chef_marie', 'marie@datachef.com', '$2a$10$dummyhash1', 'users/default-default-user.jpg', true, 'USER', NOW(), NOW()),
    (gen_random_uuid(), 'chef_pierre', 'pierre@datachef.com', '$2a$10$dummyhash2', 'users/default-default-user.jpg', true, 'USER', NOW(), NOW()),
    (gen_random_uuid(), 'admin', 'admin@datachef.com', '$2a$10$dummyhash3', 'users/default-default-user.jpg', true, 'ADMIN', NOW(), NOW());

-- 2. Insertion des ingrédients
INSERT INTO ingredient (id, name, name_plural, category, aisle, allergens, common_units, is_active, image_key, created_at, updated_at)
VALUES
    -- Légumes
    (gen_random_uuid(), 'Tomate', 'Tomates', 'VEGETABLE', 'FRUITS_LEGUMES', ARRAY[]::text[], ARRAY['PIECE', 'G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Oignon', 'Oignons', 'VEGETABLE', 'FRUITS_LEGUMES', ARRAY[]::text[], ARRAY['PIECE', 'G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Ail', 'Gousses d''ail', 'VEGETABLE', 'FRUITS_LEGUMES', ARRAY[]::text[], ARRAY['GOUSSE', 'G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Carotte', 'Carottes', 'VEGETABLE', 'FRUITS_LEGUMES', ARRAY[]::text[], ARRAY['PIECE', 'G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),

    -- Viandes
    (gen_random_uuid(), 'Poulet', 'Poulets', 'MEAT', 'BOUCHERIE', ARRAY[]::text[], ARRAY['G', 'KG']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Bœuf haché', 'Bœuf haché', 'MEAT', 'BOUCHERIE', ARRAY[]::text[], ARRAY['G', 'KG']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),

    -- Produits laitiers
    (gen_random_uuid(), 'Crème fraîche', 'Crème fraîche', 'DAIRY', 'FRAIS', ARRAY['lactose']::text[], ARRAY['ML', 'CAS']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Parmesan', 'Parmesan', 'DAIRY', 'FRAIS', ARRAY['lactose']::text[], ARRAY['G']::text[], true, 'ingredient/default--ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Beurre', 'Beurre', 'DAIRY', 'FRAIS', ARRAY['lactose']::text[], ARRAY['G', 'CAS']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),

    -- Féculents
    (gen_random_uuid(), 'Pâtes', 'Pâtes', 'GRAIN', 'EPICERIE_SALEE', ARRAY['gluten']::text[], ARRAY['G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Riz', 'Riz', 'GRAIN', 'EPICERIE_SALEE', ARRAY[]::text[], ARRAY['G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),

    -- Épices et condiments
    (gen_random_uuid(), 'Sel', 'Sel', 'SPICE', 'EPICERIE_SALEE', ARRAY[]::text[], ARRAY['PINCEE', 'CAC', 'G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Poivre', 'Poivre', 'SPICE', 'EPICERIE_SALEE', ARRAY[]::text[], ARRAY['PINCEE', 'CAC']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Huile d''olive', 'Huile d''olive', 'OIL', 'EPICERIE_SALEE', ARRAY[]::text[], ARRAY['ML', 'CAS']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW()),
    (gen_random_uuid(), 'Basilic', 'Basilic', 'HERB', 'FRUITS_LEGUMES', ARRAY[]::text[], ARRAY['G']::text[], true, 'ingredient/default-ingredient.jpg', NOW(), NOW());

-- 3. Insertion des ustensiles
INSERT INTO utensils (id, name, description, category, necessity_level, is_active, image_key)
VALUES
    (gen_random_uuid(), 'Casserole', 'Casserole moyenne', 'COOKWARE', 'ESSENTIAL', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Poêle', 'Poêle antiadhésive', 'COOKWARE', 'ESSENTIAL', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Couteau de chef', 'Couteau de cuisine', 'CUTLERY', 'ESSENTIAL', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Planche à découper', 'Planche en bois ou plastique', 'PREPARATION', 'ESSENTIAL', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Saladier', 'Grand bol pour mélanger', 'PREPARATION', 'RECOMMENDED', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Cuillère en bois', 'Pour mélanger', 'PREPARATION', 'RECOMMENDED', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Four', 'Four électrique ou gaz', 'COOKWARE', 'ESSENTIAL', true, 'utensil/default-utensil.jpg'),
    (gen_random_uuid(), 'Râpe', 'Pour fromage', 'PREPARATION', 'OPTIONAL', true, 'utensil/default-utensil.jpg');

-- 4. Insertion des recettes
WITH user_marie AS (
    SELECT id FROM users WHERE username = 'chef_marie' LIMIT 1
    )
INSERT INTO recipe (id, name, description, prep_time_minutes, cook_time_minutes, rest_time_minutes, difficulty, servings, instructions, tags, is_public, created_by, nutriscore, image_key,image_hash, created_at, updated_at)
SELECT
    gen_random_uuid(),
    'Pâtes Carbonara',
    CAST('Un grand classique italien, crémeux et savoureux. La vraie carbonara sans crème fraîche !' AS TEXT),
    15,
    15,
    0,
    'EASY',
    4,
    '[
        {"step": 1, "title": "Préparation", "description": "Faire bouillir une grande casserole d''eau salée."},
        {"step": 2, "title": "Cuisson des pâtes", "description": "Cuire les pâtes selon les instructions du paquet."},
        {"step": 3, "title": "Préparation de la sauce", "description": "Dans un bol, mélanger les jaunes d''œufs avec le parmesan râpé."},
        {"step": 4, "title": "Assemblage", "description": "Égoutter les pâtes en gardant un peu d''eau de cuisson. Mélanger rapidement avec la sauce aux œufs."},
        {"step": 5, "title": "Finition", "description": "Ajouter du poivre noir fraîchement moulu et servir immédiatement."}
    ]'::jsonb,
    ARRAY['italien', 'rapide', 'pâtes']::text[],
    true,
    (SELECT id FROM user_marie),
    2,
    'recipe/default-recipe.jpg',
    'C5D3A6E02BEC389B1A8A593B4CC25445',
    NOW(),
    NOW();

WITH user_pierre AS (
    SELECT id FROM users WHERE username = 'chef_pierre' LIMIT 1
    )
INSERT INTO recipe (id, name, description, prep_time_minutes, cook_time_minutes, rest_time_minutes, difficulty, servings, instructions, tags, is_public, created_by, nutriscore, image_key,image_hash, created_at, updated_at)
SELECT
    gen_random_uuid(),
    'Poulet rôti aux légumes',
    CAST('Un poulet juteux accompagné de légumes rôtis au four. Parfait pour un repas en famille.' AS TEXT),
    20,
    60,
    10,
    'MEDIUM',
    6,
    '[
        {"step": 1, "title": "Préparation du poulet", "description": "Préchauffer le four à 200°C. Laver et sécher le poulet."},
        {"step": 2, "title": "Assaisonnement", "description": "Frotter le poulet avec de l''huile d''olive, sel, poivre et herbes."},
        {"step": 3, "title": "Préparation des légumes", "description": "Couper les carottes et oignons en morceaux. Les disposer autour du poulet."},
        {"step": 4, "title": "Cuisson", "description": "Enfourner pour 60 minutes en arrosant régulièrement."},
        {"step": 5, "title": "Repos", "description": "Laisser reposer 10 minutes avant de découper."}
    ]'::jsonb,
    ARRAY['rôti', 'four', 'familial']::text[],
    true,
    (SELECT id FROM user_pierre),
    1,
    'recipe/default-recipe.jpg',
    'C5D3A6E02BEC389B1A8A593B4CC25445',
    NOW(),
    NOW();

-- 5. Liaison Recipe-Ingredients
WITH
    carbonara AS (SELECT id FROM recipe WHERE name = 'Pâtes Carbonara' LIMIT 1),
    pates AS (SELECT id FROM ingredient WHERE name = 'Pâtes' LIMIT 1),
    parmesan AS (SELECT id FROM ingredient WHERE name = 'Parmesan' LIMIT 1),
    sel AS (SELECT id FROM ingredient WHERE name = 'Sel' LIMIT 1),
    poivre AS (SELECT id FROM ingredient WHERE name = 'Poivre' LIMIT 1)
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit, preparation_note, is_optional, display_order, created_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM carbonara),
    (SELECT id FROM pates),
    400,
    'G',
    'Spaghetti ou linguine',
    false,
    1,
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM carbonara),
    (SELECT id FROM parmesan),
    100,
    'G',
    'Fraîchement râpé',
    false,
    2,
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM carbonara),
    (SELECT id FROM sel),
    1,
    'PINCEE',
    null,
    false,
    3,
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM carbonara),
    (SELECT id FROM poivre),
    1,
    'CAC',
    'Fraîchement moulu',
    false,
    4,
    NOW();

WITH
    poulet_roti AS (SELECT id FROM recipe WHERE name = 'Poulet rôti aux légumes' LIMIT 1),
    poulet AS (SELECT id FROM ingredient WHERE name = 'Poulet' LIMIT 1),
    carotte AS (SELECT id FROM ingredient WHERE name = 'Carotte' LIMIT 1),
    oignon AS (SELECT id FROM ingredient WHERE name = 'Oignon' LIMIT 1),
    huile AS (SELECT id FROM ingredient WHERE name = 'Huile d''olive' LIMIT 1)
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit, preparation_note, is_optional, display_order, created_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM poulet),
    1.5,
    'KG',
    'Entier',
    false,
    1,
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM carotte),
    500,
    'G',
    'Coupées en rondelles',
    false,
    2,
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM oignon),
    2,
    'PIECE',
    'Coupés en quartiers',
    false,
    3,
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM huile),
    3,
    'CAS',
    null,
    false,
    4,
    NOW();

-- 6. Liaison Recipe-Utensils
WITH
    carbonara AS (SELECT id FROM recipe WHERE name = 'Pâtes Carbonara' LIMIT 1),
    casserole AS (SELECT id FROM utensils WHERE name = 'Casserole' LIMIT 1),
    saladier AS (SELECT id FROM utensils WHERE name = 'Saladier' LIMIT 1)
INSERT INTO recipe_utensils (id, recipe_id, utensil_id, usage_note, necessity_level, created_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM carbonara),
    (SELECT id FROM casserole),
    'Pour cuire les pâtes',
    'ESSENTIAL',
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM carbonara),
    (SELECT id FROM saladier),
    'Pour mélanger la sauce',
    'RECOMMENDED',
    NOW();

WITH
    poulet_roti AS (SELECT id FROM recipe WHERE name = 'Poulet rôti aux légumes' LIMIT 1),
    four AS (SELECT id FROM utensils WHERE name = 'Four' LIMIT 1),
    couteau AS (SELECT id FROM utensils WHERE name = 'Couteau de chef' LIMIT 1),
    planche AS (SELECT id FROM utensils WHERE name = 'Planche à découper' LIMIT 1)
INSERT INTO recipe_utensils (id, recipe_id, utensil_id, usage_note, necessity_level, created_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM four),
    'Préchauffé à 200°C',
    'ESSENTIAL',
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM couteau),
    'Pour découper les légumes',
    'ESSENTIAL',
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM poulet_roti),
    (SELECT id FROM planche),
    null,
    'RECOMMENDED',
    NOW();

-- 7. Insertion de quelques notes (ratings)
WITH
    marie AS (SELECT id FROM users WHERE username = 'chef_marie' LIMIT 1),
    pierre AS (SELECT id FROM users WHERE username = 'chef_pierre' LIMIT 1),
    carbonara AS (SELECT id FROM recipe WHERE name = 'Pâtes Carbonara' LIMIT 1),
    poulet AS (SELECT id FROM recipe WHERE name = 'Poulet rôti aux légumes' LIMIT 1)
INSERT INTO user_rating (id, user_id, recipe_id, rating, comment, created_at)
SELECT
    gen_random_uuid(),
    (SELECT id FROM pierre),
    (SELECT id FROM carbonara),
    5,
    'Délicieuse recette ! Exactement comme en Italie.',
    NOW()
UNION ALL
SELECT
    gen_random_uuid(),
    (SELECT id FROM marie),
    (SELECT id FROM poulet),
    4,
    'Très bon, le poulet était bien juteux. J''ai ajouté du thym.',
    NOW();