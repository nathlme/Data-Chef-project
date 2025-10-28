-- ============================================================================
--                    SEED DATA : UTENSILS
--                    (60+ ustensiles catégorisés)
-- ============================================================================

-- Résumé 
/*
✅ TOTAL : 60 ustensiles

📊 RÉPARTITION PAR CATÉGORIE :
- cookware (cuisson) : 15
- cutlery (découpe) : 10
- tools (manuels) : 20
- baking (pâtisserie) : 8
- appliances (électrique) : 7
*/

-- ============================================================================
--                    COOKWARE - Ustensiles de cuisson (15 items)
-- ============================================================================

INSERT INTO utensils (name, category, description, necessity_level, substitutes) VALUES
-- Casseroles & Faitouts
('petite casserole', 'cookware', 'Casserole 1-2L pour sauces et petites quantités', 'essential', ARRAY[]::BIGINT[]),
('casserole moyenne', 'cookware', 'Casserole 3-4L usage quotidien', 'essential', ARRAY[]::BIGINT[]),
('grande casserole', 'cookware', 'Casserole 5-6L pour pâtes, soupes', 'recommended', ARRAY[2]::BIGINT[]),
('faitout', 'cookware', 'Grand faitout 8-10L pour grandes quantités', 'optional', ARRAY[3]::BIGINT[]),
('cocotte en fonte', 'cookware', 'Cocotte fonte émaillée pour mijotés', 'recommended', ARRAY[3, 4]::BIGINT[]),

-- Poêles
('petite poêle', 'cookware', 'Poêle 20cm pour 1-2 portions', 'recommended', ARRAY[]::BIGINT[]),
('poêle antiadhésive', 'cookware', 'Poêle 26-28cm antiadhésive usage quotidien', 'essential', ARRAY[]::BIGINT[]),
('grande poêle', 'cookware', 'Poêle 30-32cm pour 4-6 portions', 'recommended', ARRAY[7]::BIGINT[]),
('poêle en fonte', 'cookware', 'Poêle fonte pour haute température', 'optional', ARRAY[7, 8]::BIGINT[]),
('wok', 'cookware', 'Wok pour sautés asiatiques', 'optional', ARRAY[8]::BIGINT[]),

-- Cuisson au four
('plat à gratin', 'cookware', 'Plat rectangulaire pour gratins', 'recommended', ARRAY[]::BIGINT[]),
('plat à tarte', 'cookware', 'Moule à tarte 28-30cm', 'recommended', ARRAY[]::BIGINT[]),
('plaque de cuisson', 'cookware', 'Plaque four avec rebords', 'essential', ARRAY[]::BIGINT[]),
('moule à cake', 'cookware', 'Moule rectangulaire pour cakes', 'optional', ARRAY[]::BIGINT[]),
('moule à muffins', 'cookware', 'Moule 6-12 empreintes', 'optional', ARRAY[]::BIGINT[]);

-- ============================================================================
--                    CUTLERY - Couteaux & découpe (10 items)
-- ============================================================================

INSERT INTO utensils (name, category, description, necessity_level, substitutes) VALUES
('couteau de chef', 'cutlery', 'Couteau polyvalent 20cm indispensable', 'essential', ARRAY[]::BIGINT[]),
('couteau d''office', 'cutlery', 'Petit couteau 8-10cm pour épluchage', 'essential', ARRAY[]::BIGINT[]),
('couteau à pain', 'cutlery', 'Couteau denté pour pain et tomates', 'recommended', ARRAY[16]::BIGINT[]),
('couteau à désosser', 'cutlery', 'Couteau fin pour viandes', 'optional', ARRAY[16, 17]::BIGINT[]),
('économe', 'cutlery', 'Éplucheur de légumes', 'essential', ARRAY[17]::BIGINT[]),
('ciseaux de cuisine', 'cutlery', 'Ciseaux multi-usages', 'recommended', ARRAY[]::BIGINT[]),
('planche à découper bois', 'cutlery', 'Planche en bois pour légumes', 'essential', ARRAY[]::BIGINT[]),
('planche à découper plastique', 'cutlery', 'Planche plastique pour viandes', 'recommended', ARRAY[22]::BIGINT[]),
('mandoline', 'cutlery', 'Pour tranches fines régulières', 'optional', ARRAY[16]::BIGINT[]),
('hachoir', 'cutlery', 'Hachoir manuel pour herbes', 'optional', ARRAY[16]::BIGINT[]);

-- ============================================================================
--                    TOOLS - Ustensiles manuels (20 items)
-- ============================================================================

INSERT INTO utensils (name, category, description, necessity_level, substitutes) VALUES
-- Mélange & préparation
('fouet', 'tool', 'Fouet manuel pour sauces et œufs', 'essential', ARRAY[]::BIGINT[]),
('spatule bois', 'tool', 'Spatule en bois pour mélanger', 'essential', ARRAY[]::BIGINT[]),
('spatule silicone', 'tool', 'Spatule flexible pour racler', 'recommended', ARRAY[27]::BIGINT[]),
('cuillère en bois', 'tool', 'Cuillère pour remuer', 'essential', ARRAY[27]::BIGINT[]),
('louche', 'tool', 'Louche pour servir soupes', 'recommended', ARRAY[29]::BIGINT[]),
('écumoire', 'tool', 'Écumoire pour égoutter', 'recommended', ARRAY[]::BIGINT[]),
('pince de cuisine', 'tool', 'Pince pour retourner aliments', 'recommended', ARRAY[28]::BIGINT[]),

-- Passoires & égouttage
('passoire', 'tool', 'Passoire pour égoutter pâtes/légumes', 'essential', ARRAY[]::BIGINT[]),
('chinois', 'tool', 'Passoire fine pour sauces', 'optional', ARRAY[33]::BIGINT[]),
('essoreuse à salade', 'tool', 'Pour sécher salade', 'optional', ARRAY[]::BIGINT[]),

-- Râpes & zesteurs
('râpe multifonctions', 'tool', 'Râpe 4 faces pour fromage/légumes', 'recommended', ARRAY[]::BIGINT[]),
('microplane', 'tool', 'Râpe fine pour zestes et parmesan', 'optional', ARRAY[37]::BIGINT[]),
('zesteur', 'tool', 'Pour zestes d''agrumes', 'optional', ARRAY[38]::BIGINT[]),

-- Bols & contenants
('saladier', 'tool', 'Grand bol de préparation 3-4L', 'essential', ARRAY[]::BIGINT[]),
('bol moyen', 'tool', 'Bol 1-2L pour préparations', 'recommended', ARRAY[40]::BIGINT[]),
('ramequins', 'tool', 'Petits bols individuels', 'optional', ARRAY[41]::BIGINT[]),

-- Mesure & précision
('verre doseur', 'tool', 'Pour mesurer liquides', 'essential', ARRAY[]::BIGINT[]),
('balance de cuisine', 'tool', 'Balance électronique précise', 'recommended', ARRAY[]::BIGINT[]),
('cuillères doseuses', 'tool', 'Set de mesure poudres/liquides', 'recommended', ARRAY[43]::BIGINT[]),
('thermomètre de cuisine', 'tool', 'Thermomètre pour cuisson viandes', 'optional', ARRAY[]::BIGINT[]);

-- ============================================================================
--                    BAKING - Pâtisserie (8 items)
-- ============================================================================

INSERT INTO utensils (name, category, description, necessity_level, substitutes) VALUES
('rouleau à pâtisserie', 'baking', 'Pour étaler pâtes', 'recommended', ARRAY[]::BIGINT[]),
('pinceau de cuisine', 'baking', 'Pour dorer et badigeonner', 'optional', ARRAY[]::BIGINT[]),
('maryse', 'baking', 'Spatule souple pâtisserie', 'recommended', ARRAY[28]::BIGINT[]),
('fouet électrique', 'baking', 'Batteur à main', 'optional', ARRAY[26]::BIGINT[]),
('poche à douille', 'baking', 'Pour décorer et dresser', 'optional', ARRAY[]::BIGINT[]),
('tamis', 'baking', 'Pour tamiser farine', 'optional', ARRAY[]::BIGINT[]),
('corne de pâtissier', 'baking', 'Raclette flexible', 'optional', ARRAY[28, 50]::BIGINT[]),
('papier sulfurisé', 'baking', 'Papier cuisson anti-adhésif', 'essential', ARRAY[]::BIGINT[]);

-- ============================================================================
--                    APPLIANCES - Électroménager (7 items)
-- ============================================================================

INSERT INTO utensils (name, category, description, necessity_level, substitutes) VALUES
('mixeur plongeant', 'appliance', 'Mixeur à main pour soupes', 'recommended', ARRAY[]::BIGINT[]),
('blender', 'appliance', 'Blender sur socle pour smoothies', 'optional', ARRAY[56]::BIGINT[]),
('robot multifonctions', 'appliance', 'Robot avec lames pour hacher/râper', 'optional', ARRAY[56, 16, 37]::BIGINT[]),
('batteur sur socle', 'appliance', 'Robot pâtissier type KitchenAid', 'optional', ARRAY[51, 26]::BIGINT[]),
('centrifugeuse', 'appliance', 'Pour jus de fruits/légumes', 'optional', ARRAY[57]::BIGINT[]),
('cuiseur vapeur', 'appliance', 'Panier vapeur ou électrique', 'optional', ARRAY[]::BIGINT[]),
('autocuiseur', 'appliance', 'Cocotte-minute pour cuisson rapide', 'optional', ARRAY[2, 3]::BIGINT[]);

-- ============================================================================
--                    VALIDATION & STATISTIQUES
-- ============================================================================

/*
🔍 RÉPARTITION PAR NIVEAU DE NÉCESSITÉ :
SELECT 
    necessity_level,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM utensils), 1) as percentage
FROM utensils
GROUP BY necessity_level
ORDER BY 
    CASE necessity_level
        WHEN 'essential' THEN 1
        WHEN 'recommended' THEN 2
        WHEN 'optional' THEN 3
    END;

📋 USTENSILES ESSENTIELS (KIT DE DÉMARRAGE) :
SELECT name, category, description
FROM utensils
WHERE necessity_level = 'essential'
ORDER BY category, name;

🔄 RÉSEAU DE SUBSTITUTIONS :
SELECT 
    u1.name as ustensile,
    u1.necessity_level,
    array_agg(u2.name) as peut_remplacer
FROM utensils u1
LEFT JOIN utensils u2 ON u2.id = ANY(u1.substitutes)
GROUP BY u1.id, u1.name, u1.necessity_level
HAVING array_length(u1.substitutes, 1) > 0
ORDER BY u1.name;
*/

-- ============================================================================
--                    REQUÊTES UTILES
-- ============================================================================

-- Vue : Kit de démarrage (essentiels uniquement)
CREATE OR REPLACE VIEW v_essential_utensils AS
SELECT 
    id,
    name,
    category,
    description,
    necessity_level
FROM utensils
WHERE necessity_level = 'essential'
ORDER BY 
    CASE category
        WHEN 'cookware' THEN 1
        WHEN 'cutlery' THEN 2
        WHEN 'tool' THEN 3
        WHEN 'baking' THEN 4
        WHEN 'appliance' THEN 5
    END,
    name;

-- Vue : Ustensiles par catégorie avec stats
CREATE OR REPLACE VIEW v_utensils_by_category AS
SELECT 
    category,
    COUNT(*) as total_items,
    SUM(CASE WHEN necessity_level = 'essential' THEN 1 ELSE 0 END) as essential_count,
    SUM(CASE WHEN necessity_level = 'recommended' THEN 1 ELSE 0 END) as recommended_count,
    SUM(CASE WHEN necessity_level = 'optional' THEN 1 ELSE 0 END) as optional_count,
    array_agg(name ORDER BY necessity_level, name) as items
FROM utensils
GROUP BY category
ORDER BY category;

-- Fonction : Obtenir alternatives pour un ustensile manquant
CREATE OR REPLACE FUNCTION get_utensil_alternatives(utensil_id BIGINT)
RETURNS TABLE (
    alternative_id BIGINT,
    alternative_name VARCHAR(200),
    alternative_level VARCHAR(20),
    alternative_category VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.name,
        u.necessity_level,
        u.category
    FROM utensils u
    WHERE u.id = ANY(
        SELECT unnest(substitutes)
        FROM utensils
        WHERE id = utensil_id
    )
    ORDER BY 
        CASE u.necessity_level
            WHEN 'essential' THEN 1
            WHEN 'recommended' THEN 2
            WHEN 'optional' THEN 3
        END;
END;
$$ LANGUAGE plpgsql;

-- Exemple d'utilisation :
-- SELECT * FROM get_utensil_alternatives(10); -- Alternatives au wok
