-- meal_planner_postgre.sql

-- Table USER
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surnom VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    image TEXT
);

-- Table NUTRITIONAL
CREATE TABLE IF NOT EXISTS nutritional (
    id SERIAL PRIMARY KEY,
    fat_content NUMERIC(5,2),
    total_carbohydrates NUMERIC(6,2),
    dietary_fiber NUMERIC(5,2),
    protein NUMERIC(5,2),
    salt NUMERIC(5,2)
);

-- Table INGREDIENT
CREATE TABLE IF NOT EXISTS ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    score_nutrition NUMERIC(5,2),
    type VARCHAR(100),
    average_unit_weight INTEGER,
    id_nutritional INT REFERENCES nutritional(id) ON DELETE SET NULL,
    vegan BOOLEAN DEFAULT FALSE,
    vegetarian BOOLEAN DEFAULT FALSE,
    image TEXT
);

-- Table UTENSIL
CREATE TABLE IF NOT EXISTS utensil (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image TEXT
);

-- Table RECIPES
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    total_score_nutrition NUMERIC(5,2),
    id_user INT REFERENCES "user"(id) ON DELETE CASCADE,
    prepa_time INTERVAL,
    cook_time INTERVAL,
    rest_time INTERVAL,
    price NUMERIC(6,2),
    vegan BOOLEAN DEFAULT FALSE,
    vegetarian BOOLEAN DEFAULT FALSE,
    image TEXT,
    favorites BOOLEAN DEFAULT FALSE,
    difficulty VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table RECIPE_UTENSIL
CREATE TABLE IF NOT EXISTS recipe_utensil (
    id_recipe INT REFERENCES recipes(id) ON DELETE CASCADE,
    id_utensil INT REFERENCES utensil(id) ON DELETE CASCADE,
    PRIMARY KEY (id_recipe, id_utensil)
);

-- Table QUANTITE
CREATE TABLE IF NOT EXISTS quantite (
    id_ingredient INT REFERENCES ingredient(id) ON DELETE CASCADE,
    id_recipe INT REFERENCES recipes(id) ON DELETE CASCADE,
    quantite NUMERIC(8,2),
    unit VARCHAR(50),
    PRIMARY KEY (id_ingredient, id_recipe)
);
