-- ============================================================================
--                    ARCHITECTURE MVP FINALE
--                   (10 tables - avec référentiels)
-- ============================================================================

-- ============================================================================
--                    TABLE 1 : USERS
-- ============================================================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    avatar_url VARCHAR(500),
    
    -- Métadonnées
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_dietary ON users USING GIN(dietary_preferences);


-- ============================================================================
--                    1. CRÉATION DE LA TABLE USER_PREFERENCES
-- ============================================================================

CREATE TABLE user_preferences (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Régime alimentaire
    diet_type VARCHAR(20) CHECK (diet_type IN ('omnivore', 'vegetarian', 'vegan', 'pescatarian', 'flexitarian')),
    
    -- Allergies et intolérances
    allergens TEXT[] DEFAULT ARRAY[]::TEXT[],
    -- Valeurs possibles : 'gluten', 'lactose', 'nuts', 'peanuts', 'shellfish', 'fish', 'eggs', 'soy', 'sesame'
    
    -- Restrictions
    avoid_gluten BOOLEAN DEFAULT FALSE,
    avoid_lactose BOOLEAN DEFAULT FALSE,
    avoid_pork BOOLEAN DEFAULT FALSE,
    avoid_alcohol BOOLEAN DEFAULT FALSE,
    
    -- Préférences culinaires
    preferred_cuisine_types TEXT[] DEFAULT ARRAY[]::TEXT[],
    -- Ex: ['french', 'italian', 'asian', 'mediterranean', 'indian', 'mexican']
    preferred_cooking_methods TEXT[] DEFAULT ARRAY[]::TEXT[],
    -- Ex: ['oven', 'stovetop', 'steamed', 'grilled', 'raw', 'slow_cooker']
    disliked_ingredients BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    -- Array d'IDs d'ingrédients (relation souple avec table ingredients)
    favorite_ingredients BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    -- Array d'IDs d'ingrédients préférés
    
    -- Contraintes de temps
    max_prep_time_minutes INTEGER CHECK (max_prep_time_minutes > 0 AND max_prep_time_minutes <= 300),
    -- Temps de préparation maximum accepté
    max_cook_time_minutes INTEGER CHECK (max_cook_time_minutes > 0 AND max_cook_time_minutes <= 480),
    -- Temps de cuisson maximum accepté
    
    -- Batch cooking
    batch_cooking_enabled BOOLEAN DEFAULT TRUE,
    preferred_batch_days TEXT[] DEFAULT ARRAY['sunday']::TEXT[],
    -- Ex: ['sunday', 'wednesday'] - jours de préparation
    batch_portions_target INTEGER DEFAULT 4 CHECK (batch_portions_target BETWEEN 1 AND 12),
    -- Nombre de portions à préparer par session
    
    -- Budget et courses
    weekly_budget_euros DECIMAL(6,2) CHECK (weekly_budget_euros >= 0),
    prefer_seasonal BOOLEAN DEFAULT TRUE,
    prefer_local BOOLEAN DEFAULT FALSE,
    prefer_organic BOOLEAN DEFAULT FALSE,
    
    -- Niveau de compétence
    cooking_skill_level VARCHAR(20) DEFAULT 'intermediate' 
        CHECK (cooking_skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherches fréquentes
CREATE INDEX idx_user_pref_diet ON user_preferences(diet_type);
CREATE INDEX idx_user_pref_skill ON user_preferences(cooking_skill_level);
CREATE INDEX idx_user_pref_batch ON user_preferences(batch_cooking_enabled);


-- ============================================================================
--                    TABLE 2 : INGREDIENTS (Référentiel)
-- ============================================================================

CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE,
    name_plural VARCHAR(200),
    
    -- Catégorisation
    category VARCHAR(50) NOT NULL,
    -- Ex: 'vegetable', 'meat', 'dairy', 'grain', 'spice', 'condiment', etc.
    
    subcategory VARCHAR(50),
    -- Ex: 'leafy_green', 'root_vegetable', 'red_meat', 'poultry', etc.
    
    -- Organisation courses
    aisle VARCHAR(50) DEFAULT 'autre',
    -- Ex: 'fruits_legumes', 'boucherie', 'epicerie_salee', 'frais', etc.
    
    -- Allergènes
    allergens TEXT[] DEFAULT ARRAY[]::TEXT[],
    -- Ex: ['gluten', 'lactose', 'nuts', 'shellfish', 'eggs']
    
    -- Régimes compatibles
    diet_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    -- Ex: ['vegan', 'vegetarian', 'gluten_free', 'dairy_free']
    
    -- Unités courantes
    common_units TEXT[] DEFAULT ARRAY['g', 'kg', 'ml', 'L', 'pièce']::TEXT[],
    
    -- Substitutions possibles
    substitutes BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    -- Ex: [id_tofu, id_tempeh] pour remplacer viande
    
    -- Métadonnées
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ingredients_name ON ingredients USING GIN(to_tsvector('french', name));
CREATE INDEX idx_ingredients_category ON ingredients(category);
CREATE INDEX idx_ingredients_aisle ON ingredients(aisle);
CREATE INDEX idx_ingredients_allergens ON ingredients USING GIN(allergens);
CREATE INDEX idx_ingredients_diet_tags ON ingredients USING GIN(diet_tags);


-- ============================================================================
--          TABLE 2bis : INGREDIENT_NUTRITION (Relation 1:1)
-- ============================================================================

CREATE TABLE ingredient_nutrition (
    ingredient_id BIGINT PRIMARY KEY REFERENCES ingredients(id) ON DELETE CASCADE,
    -- ↑ Clé primaire = FK vers ingredients (relation 1:1)
    
    -- Valeurs nutritionnelles pour 100g/100ml
    energy_kcal NUMERIC(6,2), -- Énergie en kilocalories
    fat_content NUMERIC(5,2), -- Matières grasses totales (g)
    total_carbohydrates NUMERIC(6,2), -- Glucides totaux (g) 
    dietary_fiber NUMERIC(5,2), -- Fibres alimentaires (g) 
    protein NUMERIC(5,2),-- Protéines (g)
    salt NUMERIC(5,2),-- Sel (g)

    -- Métadonnées
    source VARCHAR(100),
    -- Ex: 'CIQUAL', 'OpenFoodFacts', 'manual'
    
    source_url VARCHAR(500),
    
    last_verified_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contraintes de validation
    CONSTRAINT check_positive_values CHECK (energy_kcal IS NULL OR energy_kcal >= 0),
    CONSTRAINT check_fat_content CHECK (fat_content IS NULL OR (fat_content >= 0 AND fat_content <= 100)),
    CONSTRAINT check_carbs CHECK (total_carbohydrates IS NULL OR (total_carbohydrates >= 0 AND total_carbohydrates <= 100)),
    CONSTRAINT check_protein CHECK (protein IS NULL OR (protein >= 0 AND protein <= 100)),
    CONSTRAINT check_fiber CHECK (dietary_fiber IS NULL OR (dietary_fiber >= 0 AND dietary_fiber <= 100)),
    CONSTRAINT check_salt CHECK (salt IS NULL OR (salt >= 0 AND salt <= 100))
);

CREATE INDEX idx_nutrition_energy ON ingredient_nutrition(energy_kcal);
CREATE INDEX idx_nutrition_protein ON ingredient_nutrition(protein);
CREATE INDEX idx_nutrition_carbs ON ingredient_nutrition(total_carbohydrates);
CREATE INDEX idx_nutrition_fat ON ingredient_nutrition(fat_content);
CREATE INDEX idx_nutrition_source ON ingredient_nutrition(source);

-- ============================================================================
--                    TABLE 3 : UTENSILS (Référentiel)
-- ============================================================================

CREATE TABLE utensils (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE,
    
    -- Catégorisation
    category VARCHAR(50) NOT NULL,
    -- Ex: 'cookware', 'cutlery', 'appliance', 'bakeware', 'tool'
    
    -- Description
    description TEXT,
    
    -- Niveau de nécessité par défaut
    necessity_level VARCHAR(20) DEFAULT 'optional' CHECK (necessity_level IN ('essential', 'recommended', 'optional')),
    -- ↑ Peut être surchargé dans recipe_utensils
    
    -- Alternatives possibles
    alternatives BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    -- Ex: [id_mixeur_plongeant] peut remplacer [id_blender]
    
    -- Image (optionnel)
    image_url VARCHAR(500),
    
    -- Métadonnées
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_utensils_name ON utensils USING GIN(to_tsvector('french', name));
CREATE INDEX idx_utensils_category ON utensils(category);
CREATE INDEX idx_utensils_necessity ON utensils(necessity_level);

-- ============================================================================
--                    TABLE 4 : RECIPES
-- ============================================================================

CREATE TABLE recipes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    
    -- Temps (en minutes)
    prep_time_minutes SMALLINT NOT NULL,
    cook_time_minutes SMALLINT DEFAULT 0,
    rest_time_minutes SMALLINT DEFAULT 0,
    total_time_minutes SMALLINT GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes + rest_time_minutes) STORED,
    
    -- Métadonnées culinaires
    servings SMALLINT DEFAULT 4 CHECK (servings > 0),
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    
    -- Instructions (JSONB pour flexibilité MVP)
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- Format: [{"step": 1, "text": "...", "duration_minutes": 5, "utensil_ids": [1,3]}]
    
    -- Métadonnées
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_public BOOLEAN DEFAULT TRUE,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_recipes_name ON recipes USING GIN(to_tsvector('french', name));
CREATE INDEX idx_recipes_tags ON recipes USING GIN(tags);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX idx_recipes_time ON recipes(total_time_minutes);
CREATE INDEX idx_recipes_servings ON recipes(servings);

-- ============================================================================
--             TABLE 5 : RECIPE_INGREDIENTS (Table de jonction)
-- ============================================================================

CREATE TABLE recipe_ingredients (
    id BIGSERIAL PRIMARY KEY,
    recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id BIGINT NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    
    -- Quantité
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL,
    -- Ex: 'g', 'kg', 'ml', 'L', 'pièce', 'càs', 'càc'
    
    -- Contexte dans la recette
    preparation_note VARCHAR(200),
    -- Ex: "coupés en dés", "émincés", "râpés"
    
    is_optional BOOLEAN DEFAULT FALSE,
    
    -- Ordre d'affichage
    display_order SMALLINT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contrainte : un ingrédient ne peut pas être en double pour une recette
    CONSTRAINT unique_recipe_ingredient UNIQUE (recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);

-- ============================================================================
--             TABLE 6 : RECIPE_UTENSILS (Table de jonction)
-- ============================================================================

CREATE TABLE recipe_utensils (
    id BIGSERIAL PRIMARY KEY,
    recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    utensil_id BIGINT NOT NULL REFERENCES utensils(id) ON DELETE RESTRICT,
    
    -- Niveau de nécessité pour cette recette spécifique
    necessity_level VARCHAR(20) NOT NULL DEFAULT 'recommended' 
        CHECK (necessity_level IN ('essential', 'recommended', 'optional')),
    
    -- Note contextuelle
    usage_note VARCHAR(200),
    -- Ex: "Pour mixer la soupe", "Si pas de robot, hacher à la main"
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contrainte : un ustensile ne peut pas être en double pour une recette
    CONSTRAINT unique_recipe_utensil UNIQUE (recipe_id, utensil_id)
);

CREATE INDEX idx_recipe_utensils_recipe ON recipe_utensils(recipe_id);
CREATE INDEX idx_recipe_utensils_utensil ON recipe_utensils(utensil_id);
CREATE INDEX idx_recipe_utensils_necessity ON recipe_utensils(necessity_level);

-- ============================================================================
--                    TABLE 7 : USER_CUSTOM_RECIPES
-- ============================================================================

CREATE TABLE user_custom_recipes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    base_recipe_id BIGINT REFERENCES recipes(id) ON DELETE SET NULL,
    
    -- Flag modification
    is_modified BOOLEAN DEFAULT FALSE,
    
    -- Identité
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    
    -- Temps
    prep_time_minutes SMALLINT NOT NULL,
    cook_time_minutes SMALLINT DEFAULT 0,
    rest_time_minutes SMALLINT DEFAULT 0,
    total_time_minutes SMALLINT GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes + rest_time_minutes) STORED,
    
    -- Métadonnées
    servings SMALLINT DEFAULT 4 CHECK (servings > 0),
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    
    -- Instructions (JSONB)
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- Tags
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Notes personnelles
    notes TEXT,
    modifications_summary TEXT,
    folder VARCHAR(100) DEFAULT 'Mes recettes',
    
    -- Visibilité
    is_private BOOLEAN DEFAULT TRUE,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_user_recipe_name UNIQUE (user_id, name),
    CONSTRAINT check_modifications CHECK (
        (is_modified = FALSE AND modifications_summary IS NULL) OR
        (is_modified = TRUE)
    )
);

CREATE INDEX idx_custom_recipes_user ON user_custom_recipes(user_id);
CREATE INDEX idx_custom_recipes_base ON user_custom_recipes(base_recipe_id) WHERE base_recipe_id IS NOT NULL;
CREATE INDEX idx_custom_recipes_modified ON user_custom_recipes(is_modified);
CREATE INDEX idx_custom_recipes_folder ON user_custom_recipes(user_id, folder);

-- ============================================================================
--     TABLE 7bis : USER_CUSTOM_RECIPE_INGREDIENTS (optionnel mais recommandé)
-- ============================================================================

CREATE TABLE user_custom_recipe_ingredients (
    id BIGSERIAL PRIMARY KEY,
    custom_recipe_id BIGINT NOT NULL REFERENCES user_custom_recipes(id) ON DELETE CASCADE,
    ingredient_id BIGINT NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(20) NOT NULL,
    preparation_note VARCHAR(200),
    is_optional BOOLEAN DEFAULT FALSE,
    display_order SMALLINT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_custom_recipe_ingredient UNIQUE (custom_recipe_id, ingredient_id)
);

CREATE INDEX idx_custom_recipe_ingredients_recipe ON user_custom_recipe_ingredients(custom_recipe_id);
CREATE INDEX idx_custom_recipe_ingredients_ingredient ON user_custom_recipe_ingredients(ingredient_id);

-- ============================================================================
--     TABLE 7ter : USER_CUSTOM_RECIPE_UTENSILS (optionnel mais recommandé)
-- ============================================================================

CREATE TABLE user_custom_recipe_utensils (
    id BIGSERIAL PRIMARY KEY,
    custom_recipe_id BIGINT NOT NULL REFERENCES user_custom_recipes(id) ON DELETE CASCADE,
    utensil_id BIGINT NOT NULL REFERENCES utensils(id) ON DELETE RESTRICT,
    
    necessity_level VARCHAR(20) NOT NULL DEFAULT 'recommended' 
        CHECK (necessity_level IN ('essential', 'recommended', 'optional')),
    usage_note VARCHAR(200),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_custom_recipe_utensil UNIQUE (custom_recipe_id, utensil_id)
);

CREATE INDEX idx_custom_recipe_utensils_recipe ON user_custom_recipe_utensils(custom_recipe_id);
CREATE INDEX idx_custom_recipe_utensils_utensil ON user_custom_recipe_utensils(utensil_id);

-- ============================================================================
--                    TABLE 8 : PLANNED_MEALS
-- ============================================================================

CREATE TABLE planned_meals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id BIGINT REFERENCES recipes(id) ON DELETE RESTRICT,
    custom_recipe_id BIGINT REFERENCES user_custom_recipes(id) ON DELETE RESTRICT,
    
    meal_date DATE NOT NULL,
    meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    servings SMALLINT DEFAULT 4 CHECK (servings > 0),
    status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'skipped')),
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT check_one_recipe CHECK (
        (recipe_id IS NOT NULL AND custom_recipe_id IS NULL) OR
        (recipe_id IS NULL AND custom_recipe_id IS NOT NULL)
    )
);

CREATE INDEX idx_planned_meals_user_date ON planned_meals(user_id, meal_date);
CREATE INDEX idx_planned_meals_recipe ON planned_meals(recipe_id);
CREATE INDEX idx_planned_meals_custom_recipe ON planned_meals(custom_recipe_id);

-- ============================================================================
--                    TABLE 9 : SHOPPING_LISTS
-- ============================================================================

CREATE TABLE shopping_lists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- Items agrégés par ingrédient
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- Format: [
    --   {
    --     "ingredient_id": 42,
    --     "ingredient_name": "tomate",
    --     "quantity": 1500,
    --     "unit": "g",
    --     "aisle": "fruits_legumes",
    --     "checked": false,
    --     "recipes": ["Lasagnes", "Sauce tomate"]
    --   }
    -- ]
    
    total_estimated_cost DECIMAL(8,2),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_user_shopping_period UNIQUE (user_id, start_date, end_date)
);

CREATE INDEX idx_shopping_lists_user_dates ON shopping_lists(user_id, start_date, end_date);
CREATE INDEX idx_shopping_lists_items ON shopping_lists USING GIN(items);

-- ============================================================================
--                    TABLE 10 : USER_RATINGS
-- ============================================================================

CREATE TABLE user_ratings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_user_recipe_rating UNIQUE (user_id, recipe_id)
);

CREATE INDEX idx_ratings_recipe ON user_ratings(recipe_id);
CREATE INDEX idx_ratings_user ON user_ratings(user_id);

-- ============================================================================
--                    TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ingredients_updated_at BEFORE UPDATE ON ingredients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_utensils_updated_at BEFORE UPDATE ON utensils 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_recipes_updated_at BEFORE UPDATE ON user_custom_recipes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_lists_updated_at BEFORE UPDATE ON shopping_lists 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
--         FONCTION : Générer liste de courses (version référentiel)
-- ============================================================================

CREATE OR REPLACE FUNCTION generate_shopping_list(
    p_user_id BIGINT,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS BIGINT AS $$
DECLARE
    v_shopping_list_id BIGINT;
    v_aggregated_items JSONB;
BEGIN
    -- Agréger ingrédients depuis recettes publiques
    WITH public_ingredients AS (
        SELECT 
            i.id AS ingredient_id,
            i.name AS ingredient_name,
            i.aisle,
            ri.unit,
            SUM(ri.quantity * (pm.servings::numeric / r.servings::numeric)) AS total_quantity,
            jsonb_agg(DISTINCT r.name) AS recipes
        FROM planned_meals pm
        JOIN recipes r ON pm.recipe_id = r.id
        JOIN recipe_ingredients ri ON ri.recipe_id = r.id
        JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE pm.user_id = p_user_id
          AND pm.meal_date BETWEEN p_start_date AND p_end_date
          AND pm.status = 'planned'
          AND pm.recipe_id IS NOT NULL
        GROUP BY i.id, i.name, i.aisle, ri.unit
    ),
    -- Agréger ingrédients depuis recettes custom
    custom_ingredients AS (
        SELECT 
            i.id AS ingredient_id,
            i.name AS ingredient_name,
            i.aisle,
            ucri.unit,
            SUM(ucri.quantity * (pm.servings::numeric / ucr.servings::numeric)) AS total_quantity,
            jsonb_agg(DISTINCT ucr.name) AS recipes
        FROM planned_meals pm
        JOIN user_custom_recipes ucr ON pm.custom_recipe_id = ucr.id
        JOIN user_custom_recipe_ingredients ucri ON ucri.custom_recipe_id = ucr.id
        JOIN ingredients i ON ucri.ingredient_id = i.id
        WHERE pm.user_id = p_user_id
          AND pm.meal_date BETWEEN p_start_date AND p_end_date
          AND pm.status = 'planned'
          AND pm.custom_recipe_id IS NOT NULL
        GROUP BY i.id, i.name, i.aisle, ucri.unit
    ),
    -- Combiner les deux sources
    all_ingredients AS (
        SELECT * FROM public_ingredients
        UNION ALL
        SELECT * FROM custom_ingredients
    )
    SELECT jsonb_agg(
        jsonb_build_object(
            'ingredient_id', ingredient_id,
            'ingredient_name', ingredient_name,
            'quantity', total_quantity,
            'unit', unit,
            'aisle', aisle,
            'checked', false,
            'recipes', recipes
        ) ORDER BY aisle, ingredient_name
    )
    INTO v_aggregated_items
    FROM all_ingredients;

    -- Créer ou mettre à jour la liste
    INSERT INTO shopping_lists (user_id, start_date, end_date, items)
    VALUES (p_user_id, p_start_date, p_end_date, COALESCE(v_aggregated_items, '[]'::jsonb))
    ON CONFLICT (user_id, start_date, end_date) 
    DO UPDATE SET items = EXCLUDED.items, updated_at = NOW()
    RETURNING id INTO v_shopping_list_id;

    RETURN v_shopping_list_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
--                    VUES UTILES
-- ============================================================================

-- Vue : Recette complète avec ingrédients et ustensiles
CREATE OR REPLACE VIEW v_recipes_complete AS
SELECT 
    r.*,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'ingredient_id', ri.ingredient_id,
                'ingredient_name', i.name,
                'quantity', ri.quantity,
                'unit', ri.unit,
                'preparation_note', ri.preparation_note,
                'is_optional', ri.is_optional,
                'category', i.category,
                'allergens', i.allergens
            ) ORDER BY ri.display_order
        )
        FROM recipe_ingredients ri
        JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE ri.recipe_id = r.id
    ) AS ingredients,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'utensil_id', ru.utensil_id,
                'utensil_name', u.name,
                'necessity_level', ru.necessity_level,
                'usage_note', ru.usage_note,
                'category', u.category
            )
        )
        FROM recipe_utensils ru
        JOIN utensils u ON ru.utensil_id = u.id
        WHERE ru.recipe_id = r.id
    ) AS utensils
FROM recipes r;

-- Vue : Custom recipe complète
CREATE OR REPLACE VIEW v_user_custom_recipes_complete AS
SELECT 
    ucr.*,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'ingredient_id', ucri.ingredient_id,
                'ingredient_name', i.name,
                'quantity', ucri.quantity,
                'unit', ucri.unit,
                'preparation_note', ucri.preparation_note,
                'is_optional', ucri.is_optional
            ) ORDER BY ucri.display_order
        )
        FROM user_custom_recipe_ingredients ucri
        JOIN ingredients i ON ucri.ingredient_id = i.id
        WHERE ucri.custom_recipe_id = ucr.id
    ) AS ingredients,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'utensil_id', ucru.utensil_id,
                'utensil_name', u.name,
                'necessity_level', ucru.necessity_level,
                'usage_note', ucru.usage_note
            )
        )
        FROM user_custom_recipe_utensils ucru
        JOIN utensils u ON ucru.utensil_id = u.id
        WHERE ucru.custom_recipe_id = ucr.id
    ) AS utensils
FROM user_custom_recipes ucr;