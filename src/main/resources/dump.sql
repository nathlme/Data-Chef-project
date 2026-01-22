-- we don't know how to generate root <with-no-name> (class Root) :(

comment on database postgres is 'default administrative connection database';

create table allergen
(
    id    uuid         not null
        primary key,
    code  varchar(255) not null
        constraint uko4x9rr5t2d91a63fu30v3tsbh
            unique,
    label varchar(255) not null
        constraint ukl551xnsbnicwy5w4konqanmfn
            unique,
    constraint uko4x9rr5t2d91a63fu30v3tsbh
        unique (),
    constraint ukl551xnsbnicwy5w4konqanmfn
        unique ()
);

alter table allergen
    owner to dev;

create table cooking_method
(
    id    uuid         not null
        primary key,
    code  varchar(255) not null
        constraint uk8v90fn6jc7wfw8xt7lckj851n
            unique,
    label varchar(255) not null
        constraint ukjmuoqem5clnm5pcekyt9itgi6
            unique,
    constraint ukjmuoqem5clnm5pcekyt9itgi6
        unique ()
);

alter table cooking_method
    owner to dev;

create table cuisine_type
(
    id    uuid         not null
        primary key,
    code  varchar(255) not null
        constraint uk6fa3isr4u34k965iiaheq2f8n
            unique,
    label varchar(255) not null,
    constraint ukm8pakb2r11yqygqla5u8hed65
        unique ()
);

alter table cuisine_type
    owner to dev;

create table diet_type
(
    id    uuid         not null
        primary key,
    code  varchar(255) not null,
    label varchar(255) not null
);

alter table diet_type
    owner to dev;

create unique index uk3iaxujjn1c1bjisdbj1xx2snh
    on diet_type ();

create unique index ukhwd3myxosg4vi9r8f78cqmgc5
    on diet_type ();

alter table diet_type
    add constraint uk3iaxujjn1c1bjisdbj1xx2snh
        unique (cook_time_minutes);

alter table diet_type
    add constraint ukhwd3myxosg4vi9r8f78cqmgc5
        unique (created_at);

create table ingredient
(
    id           uuid                        not null
        primary key,
    aisle        varchar(50)
        constraint ingredient_aisle_check
            check ((aisle)::text = ANY
                   ((ARRAY ['FRUITS_LEGUMES'::character varying, 'BOUCHERIE'::character varying, 'POISSONNERIE'::character varying, 'EPICERIE_SALEE'::character varying, 'EPICERIE_SUCREE'::character varying, 'FRAIS'::character varying, 'SURGELES'::character varying, 'CONDIMENTS'::character varying, 'AUTRE'::character varying])::text[])),
    allergens    varchar(255)[],
    category     varchar(50)                 not null
        constraint ingredient_category_check
            check ((category)::text = ANY
                   ((ARRAY ['VEGETABLE'::character varying, 'FRUIT'::character varying, 'MEAT'::character varying, 'FISH'::character varying, 'SEAFOOD'::character varying, 'DAIRY'::character varying, 'GRAIN'::character varying, 'SPICE'::character varying, 'CONDIMENT'::character varying, 'HERB'::character varying, 'OIL'::character varying, 'SWEETENER'::character varying, 'NUT'::character varying, 'LEGUME'::character varying])::text[])),
    common_units varchar(255)[],
    created_at   timestamp(6) with time zone not null,
    image_url    varchar(500),
    is_active    boolean                     not null,
    name         varchar(200)                not null
        constraint ukbcuaj97y3iu3t2vj26jg6hijj
            unique,
    name_plural  varchar(200),
    substitutes  bigint[],
    updated_at   timestamp(6) with time zone not null
);

alter table ingredient
    owner to dev;

create table ingredient_diet_type
(
    ingredient_id uuid not null
        constraint fk4hh5ehjf1jgbg6ht7odc2g60e
            references ingredient,
    diet_type_id  uuid not null
        constraint fklgc65p16507u9hgtfc597nkcl
            references diet_type
);

alter table ingredient_diet_type
    owner to dev;

create table users
(
    id            uuid                        not null
        primary key,
    avatar_url    varchar(255),
    created_at    timestamp(6) with time zone not null,
    email         varchar(255)                not null
        constraint uk6dotkott2kjsp8vw4d0m25fb7
            unique,
    is_active     boolean,
    password_hash varchar(255)                not null,
    role          varchar(255),
    updated_at    timestamp(6) with time zone not null,
    username      varchar(255)                not null
        constraint ukr43af9ap4edm43mmtq01oddj6
            unique
);

alter table users
    owner to dev;

create table recipe
(
    id                 uuid                        not null
        primary key,
    cook_time_minutes  smallint                    not null,
    created_at         timestamp(6) with time zone not null,
    description        oid,
    difficulty         varchar(255)
        constraint recipe_difficulty_check
            check ((difficulty)::text = ANY
                   ((ARRAY ['EASY'::character varying, 'MEDIUM'::character varying, 'HARD'::character varying])::text[])),
    image_url          varchar(255),
    instructions       jsonb                       not null,
    is_public          boolean                     not null,
    name               varchar(255)                not null,
    prep_time_minutes  smallint                    not null,
    rest_time_minutes  smallint                    not null,
    servings           smallint,
    tags               text[],
    total_time_minutes smallint generated always as (((prep_time_minutes + cook_time_minutes) + rest_time_minutes)) stored,
    updated_at         timestamp(6) with time zone not null,
    created_by         uuid
        constraint fkkonglu0ouqbkb6y5dhu0cmk33
            references users,
    constraint ukrm1mlratj8yf3e1yxwk156x4p
        unique ()
);

alter table recipe
    owner to dev;

create index idx_recipes_difficulty
    on recipe (cook_time_minutes);

create index idx_recipes_servings
    on recipe (created_at);

create index idx_recipes_difficulty
    on recipe ();

create index idx_recipes_time
    on recipe ();

create index idx_recipes_servings
    on recipe ();

create table recipe_ingredients
(
    id               uuid                        not null
        primary key,
    created_at       timestamp(6) with time zone not null,
    display_order    smallint                    not null,
    is_optional      boolean                     not null,
    preparation_note varchar(200),
    quantity         numeric(10, 2)              not null,
    unit             varchar(20)                 not null
        constraint recipe_ingredients_unit_check
            check ((unit)::text = ANY
                   ((ARRAY ['G'::character varying, 'KG'::character varying, 'ML'::character varying, 'CL'::character varying, 'L'::character varying, 'CAS'::character varying, 'CAC'::character varying, 'PIECE'::character varying, 'PINCEE'::character varying, 'TRANCHE'::character varying, 'GOUSSE'::character varying, 'BOTTE'::character varying, 'SACHET'::character varying])::text[])),
    ingredient_id    uuid                        not null
        constraint fk115hxprua4ai0chlhicwmuhna
            references ingredient
            on delete cascade,
    recipe_id        uuid                        not null
        constraint fkhnsmvxdlwxqq6x2wbgnoef5gr
            references recipe
            on delete cascade,
    constraint unique_recipe_ingredient
        unique (recipe_id, ingredient_id)
);

alter table recipe_ingredients
    owner to dev;

create index idx_recipe_ingredients_ingredient
    on recipe_ingredients (???, is_optional);

create unique index unique_recipe_ingredient
    on recipe_ingredients (???);

create index idx_recipe_ingredients_recipe
    on recipe_ingredients ();

create index idx_recipe_ingredients_ingredient
    on recipe_ingredients (ingredient_id);

create table refresh_tokens
(
    id          uuid                        not null
        primary key,
    expiry_date timestamp(6) with time zone not null,
    revoked     boolean                     not null,
    token       varchar(255)                not null
        constraint ukghpmfn23vmxfu3spu3lfg4r2d
            unique,
    user_id     uuid
        constraint uk7tdcd6ab5wsgoudnvj7xf1b7l
            unique
        constraint fk1lih5y2npsf8u5o3vhdb9y0os
            references users,
    primary key ()
);

alter table refresh_tokens
    owner to dev;

create unique index unique_user_date_range
    on refresh_tokens (???);

create table shopping_lists
(
    id         uuid                        not null
        primary key,
    created_at timestamp(6) with time zone not null,
    end_date   date                        not null,
    items      jsonb                       not null,
    start_date date                        not null,
    updated_at timestamp(6) with time zone not null,
    user_id    uuid                        not null
        constraint fkllqvt8eyww5jxnjjun6upx184
            references users,
    constraint unique_user_date_range
        unique (user_id, start_date, end_date)
);

alter table shopping_lists
    owner to dev;

create table user_custom_recipes
(
    id                    uuid                        not null
        primary key,
    cook_time_minutes     smallint,
    created_at            timestamp(6) with time zone not null,
    description           text,
    difficulty            varchar(20)
        constraint user_custom_recipes_difficulty_check
            check ((difficulty)::text = ANY
                   ((ARRAY ['EASY'::character varying, 'MEDIUM'::character varying, 'HARD'::character varying])::text[])),
    folder                varchar(100),
    image_url             varchar(500),
    instructions          jsonb                       not null,
    is_modified           boolean                     not null,
    is_private            boolean                     not null,
    modifications_summary text,
    name                  varchar(200)                not null,
    notes                 text,
    prep_time_minutes     smallint                    not null,
    rest_time_minutes     smallint,
    servings              smallint                    not null,
    tags                  text[],
    total_time_minutes    smallint generated always as (((prep_time_minutes + cook_time_minutes) + rest_time_minutes)) stored,
    updated_at            timestamp(6) with time zone not null,
    base_recipe_id        uuid
        constraint fkfdsmm4pfhfrk2ig6trajsntdn
            references recipe
            on delete set null,
    user_id               uuid                        not null
        constraint fks4tlof7hqbb9m2st6x1os8hlx
            references users
            on delete cascade,
    constraint unique_user_recipe_name
        unique (user_id, name)
);

alter table user_custom_recipes
    owner to dev;

create table planned_meals
(
    id               uuid                        not null
        primary key,
    completed_at     timestamp(6) with time zone,
    created_at       timestamp(6) with time zone not null,
    meal_date        date                        not null,
    meal_type        varchar(20)                 not null
        constraint planned_meals_meal_type_check
            check ((meal_type)::text = ANY
                   ((ARRAY ['BREAKFAST'::character varying, 'LUNCH'::character varying, 'DINNER'::character varying, 'SNACK'::character varying])::text[])),
    notes            text,
    servings         smallint                    not null,
    status           varchar(20)                 not null
        constraint planned_meals_status_check
            check ((status)::text = ANY
                   ((ARRAY ['PLANNED'::character varying, 'IN_PROGRESS'::character varying, 'COMPLETED'::character varying, 'SKIPPED'::character varying])::text[])),
    custom_recipe_id uuid
        constraint fkovkj172mrijmal3cdwke2d9to
            references user_custom_recipes
            on delete cascade,
    recipe_id        uuid
        constraint fkdr9nsprbg6fo8a2namt8fsry1
            references recipe
            on delete cascade,
    user_id          uuid                        not null
        constraint fkjdrkluiixcmpe32stik4kuk8b
            references users
            on delete cascade
);

alter table planned_meals
    owner to dev;

create index idx_planned_meals_recipe
    on planned_meals (created_at);

create index idx_planned_meals_user_date
    on planned_meals ();

create index idx_planned_meals_recipe
    on planned_meals ();

create index idx_planned_meals_custom_recipe
    on planned_meals (custom_recipe_id);

create table user_custom_recipe_ingredients
(
    id               uuid                        not null
        primary key,
    created_at       timestamp(6) with time zone not null,
    display_order    smallint                    not null,
    is_optional      boolean                     not null,
    preparation_note varchar(200),
    quantity         numeric(10, 2)              not null,
    unit             varchar(20)                 not null,
    custom_recipe_id uuid                        not null
        constraint fk7f7hnb740f38sytfgnm85vdf4
            references user_custom_recipes
            on delete cascade,
    ingredient_id    uuid                        not null
        constraint fkggg5ljd4cqnwefoc9hnr8v2lc
            references ingredient
            on delete restrict,
    constraint unique_custom_recipe_ingredient
        unique (custom_recipe_id, ingredient_id)
);

alter table user_custom_recipe_ingredients
    owner to dev;

create index idx_custom_recipe_ingredients_recipe
    on user_custom_recipe_ingredients (custom_recipe_id);

create index idx_custom_recipe_ingredients_ingredient
    on user_custom_recipe_ingredients (ingredient_id);

create index idx_custom_recipes_user
    on user_custom_recipes (user_id);

create index idx_custom_recipes_base
    on user_custom_recipes (base_recipe_id);

create index idx_custom_recipes_modified
    on user_custom_recipes (is_modified);

create index idx_custom_recipes_folder
    on user_custom_recipes (user_id, folder);

create table user_preference
(
    user_id               uuid                        not null
        primary key
        constraint fk_user_preferences_user
            references users,
    batch_portion_target  integer                     not null,
    prefer_seasonal       boolean                     not null,
    weekly_budget_euros   numeric(38, 2),
    avoid_alcohol         boolean,
    avoid_gluten          boolean,
    avoid_lactose         boolean,
    avoid_pork            boolean,
    batch_cooking_enabled boolean,
    cooking_skill_level   varchar(255)
        constraint user_preference_cooking_skill_level_check
            check ((cooking_skill_level)::text = ANY
                   ((ARRAY ['BEGINNER'::character varying, 'INTERMEDIATE'::character varying, 'ADVANCED'::character varying, 'EXPERT'::character varying])::text[])),
    created_at            timestamp(6) with time zone not null,
    max_cook_time_minutes integer,
    max_prep_time_minutes integer,
    prefer_local          boolean                     not null,
    prefer_organic        boolean                     not null,
    preferred_batch_days  varchar(255)[],
    updated_at            timestamp(6) with time zone not null
);

alter table user_preference
    owner to dev;

create table user_allergen
(
    user_id     uuid not null
        constraint fk3xo3c7psequ4ri5jm8ofb7acm
            references user_preference,
    allergen_id uuid not null
        constraint fkqevv01qv3ejvrw3kxatwkg9eq
            references allergen,
    primary key (user_id, allergen_id)
);

alter table user_allergen
    owner to dev;

create table user_cooking_methods
(
    user_id           uuid not null
        constraint fkj9osyybmowpuvi8ge4psd7g6o
            references user_preference,
    cooking_method_id uuid not null
        constraint fk7ihkecj5cwkp12nk60bq67jih
            references cooking_method,
    primary key (user_id, cooking_method_id)
);

alter table user_cooking_methods
    owner to dev;

create table user_cuisine_type
(
    user_id         uuid not null
        constraint fk6jkldtca2pib1xi1jncpbbr3q
            references user_preference,
    cuisine_type_id uuid not null
        constraint fk2veoehdge1v6vcbsafjyagwbl
            references cuisine_type,
    primary key (user_id, cuisine_type_id)
);

alter table user_cuisine_type
    owner to dev;

create table user_diet_type
(
    user_id      uuid not null
        constraint fkghn3vig5bobh8wbwbqurm913h
            references user_preference,
    diet_type_id uuid not null
        constraint fkmu04x5j7ko4x5cbvy9csrr4g8
            references diet_type,
    primary key (user_id, diet_type_id)
);

alter table user_diet_type
    owner to dev;

create table user_disliked_ingredient
(
    user_id       uuid not null
        constraint fkqj1y5w1voygpsw1a5giy0dru3
            references user_preference,
    ingredient_id uuid not null
        constraint fkhggdraiybtufoqhc7e70slva2
            references ingredient,
    primary key (user_id, ingredient_id)
);

alter table user_disliked_ingredient
    owner to dev;

create table user_favorite_ingredient
(
    user_id       uuid not null
        constraint fkadr9wo0tq2brotcnedbxpnc1k
            references user_preference,
    ingredient_id uuid not null
        constraint fk1cmry63o6ow9xah8kej21h7k2
            references ingredient,
    primary key (user_id, ingredient_id)
);

alter table user_favorite_ingredient
    owner to dev;

create index idx_user_pref_skill
    on user_preference (cooking_skill_level);

create index idx_user_pref_batch
    on user_preference (batch_cooking_enabled);

create table user_rating
(
    id         uuid                        not null
        primary key,
    comment    text,
    created_at timestamp(6) with time zone not null,
    rating     smallint                    not null,
    updated_at timestamp(6) with time zone,
    recipe_id  uuid                        not null
        constraint fk617otsod5mxcgai12hf6hgi38
            references recipe
            on delete cascade,
    user_id    uuid                        not null
        constraint fk80i3u6gcsphrjinfw38axoxrp
            references users
            on delete cascade,
    constraint unique_user_recipe_rating
        unique (user_id, recipe_id)
);

alter table user_rating
    owner to dev;

create index idx_ratings_recipe
    on user_rating (recipe_id);

create index idx_ratings_user
    on user_rating (user_id);

create index idx_email
    on users (email);

create table utensils
(
    id              uuid         not null
        primary key,
    category        varchar(255)
        constraint utensils_category_check
            check ((category)::text = ANY
                   ((ARRAY ['COOKWARE'::character varying, 'CUTLERY'::character varying, 'BAKEWARE'::character varying, 'PREPARATION'::character varying, 'SMALL_APPLIANCES'::character varying, 'MEASURING'::character varying, 'STORAGE'::character varying, 'SERVING'::character varying, 'SPECIALTY'::character varying])::text[])),
    description     varchar(255),
    image_url       varchar(255),
    is_active       boolean      not null,
    name            varchar(255) not null
        constraint uk830hkl139m6ailknn84385hct
            unique,
    necessity_level varchar(255)
        constraint utensils_necessity_level_check
            check ((necessity_level)::text = ANY
                   ((ARRAY ['ESSENTIAL'::character varying, 'RECOMMENDED'::character varying, 'OPTIONAL'::character varying])::text[]))
);

alter table utensils
    owner to dev;

create table recipe_utensils
(
    id              uuid                        not null
        primary key,
    created_at      timestamp(6) with time zone not null,
    necessity_level varchar(20)                 not null
        constraint recipe_utensils_necessity_level_check
            check ((necessity_level)::text = ANY
                   ((ARRAY ['ESSENTIAL'::character varying, 'RECOMMENDED'::character varying, 'OPTIONAL'::character varying])::text[])),
    usage_note      varchar(200),
    recipe_id       uuid                        not null
        constraint fkfwo3tsfqxxsryerfb82r261bw
            references recipe
            on delete cascade,
    utensil_id      uuid                        not null
        constraint fk74ax8wpomtcwbpi4glcowxjhf
            references utensils
            on delete restrict,
    constraint unique_recipe_utensil
        unique (recipe_id, utensil_id)
);

alter table recipe_utensils
    owner to dev;

create index idx_recipe_utensils_recipe
    on recipe_utensils (recipe_id);

create index idx_recipe_utensils_utensil
    on recipe_utensils (???);

create index idx_recipe_utensils_necessity
    on recipe_utensils (???);

create unique index unique_recipe_utensil
    on recipe_utensils (???);

create index idx_recipe_utensils_recipe
    on recipe_utensils (recipe_id);

create index idx_recipe_utensils_utensil
    on recipe_utensils (utensil_id);

create index idx_recipe_utensils_necessity
    on recipe_utensils (necessity_level);

alter table recipe_utensils
    add constraint unique_recipe_utensil
        unique ();

create table user_custom_recipe_utensils
(
    id               uuid                        not null
        primary key,
    created_at       timestamp(6) with time zone not null,
    necessity_level  varchar(20)                 not null
        constraint user_custom_recipe_utensils_necessity_level_check
            check ((necessity_level)::text = ANY
                   ((ARRAY ['ESSENTIAL'::character varying, 'RECOMMENDED'::character varying, 'OPTIONAL'::character varying])::text[])),
    usage_note       varchar(200),
    custom_recipe_id uuid                        not null
        constraint fko1ub9g5rxkyrxvultclj20dsi
            references user_custom_recipes
            on delete cascade,
    utensil_id       uuid                        not null
        constraint fkfixs7thyxp9kdsplyoaqy9sbp
            references utensils
            on delete restrict,
    constraint unique_custom_recipe_utensil
        unique (custom_recipe_id, utensil_id)
);

alter table user_custom_recipe_utensils
    owner to dev;

create index idx_custom_recipe_utensils_recipe
    on user_custom_recipe_utensils (custom_recipe_id);

create index idx_custom_recipe_utensils_utensil
    on user_custom_recipe_utensils (utensil_id);

create index idx_utensils_category
    on utensils (category);

create index idx_utensils_necessity
    on utensils (necessity_level);

