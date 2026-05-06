# Data-Chef-project

## ENGLISH VERSION BELLOW !

## Présentation du projet

Data Chef est une application web ayant pour but de faciliter la gestion des repas des utilisateurs, en prenant en compte de nombreux critères, comme le temps disponible, le nombre de personnes par repas, les moyens financiers ou encore les préférences alimentaires (allergènes, végan, sans porc, etc.). Grâce à l'application vous pouvez, prévoir dans un semainier quel repas sera à faire pour quel jour selon les critères précédents, et Data Chef vous fera votre liste de courses pour la semaine. C'est donc un énorme gain de temps tout en gardant le plaisir de la bonne nourriture. Il est également possible de choisir des recettes selon votre niveau en cuisine et le temps dont vous disposez afin de rendre accessible la cuisine à tout le monde.


## Objectifs

- Faciliter la gestion des repas selon de nombreux critères 
- Regrouper beaucoup de recettes différentes 
- Rendre accessible la cuisine à tous les types de modes de vie


## Fonctionnalités principales 

- Proposition de diverses recettes 
- Sauvegarder des recettes aimées 
- Filtre selon les préférences alimentaires, le budget, le temps disponible ...
- Liste de courses automatique et semainier


## Technologies utilisées

    FRONT-END :
    - HTML 
    - CSS
    - JavaScript 

    BACK-END :
    - Java
    - HTTP
    - JSON

    DATA :
    - Python  
    - SQL
    - BeautifulSoup 
    - Requests
    - API OpenFoodFacts

    INFRA :
    - Traefik 
    - bare-metal open-source
    - API Proxmox
    - pfSense 


## Équipe de projet

- 2 Data 
- 3 Devs 
- 1 Design 
- 1 Infra



## Projet actuellement en cours de développement 

## Mock API (Swagger/OpenAPI)

Vous pouvez simuler le back-end localement a partir du fichier `apiswaggerjson.json`.

1. Creer `.env.local` a la racine du projet avec cette ligne :

```env
VITE_API_BASE_URL=http://localhost:4010
VITE_ENABLE_LOCAL_AUTH_MOCK=true
```

2. Lancer la fausse API (terminal 1) :

```bash
npm run mock:api
```

3. Lancer le front (terminal 2) :

```bash
npm run dev
```

URL mock par defaut : `http://localhost:4010`.

Le front peut ensuite lire `import.meta.env.VITE_API_BASE_URL` pour faire ses requetes.

### Compte de test pre-cree (mock auth local)

Quand `VITE_ENABLE_LOCAL_AUTH_MOCK=true`, la connexion/inscription est geree localement pour simuler un vrai controle d'existence de compte.

- Username: `demo`
- Email: `demo@datachef.local`
- Password: `Demo123!`

Si le compte n'existe pas, la connexion retourne une erreur 401 (comme un vrai back).










## ENGLISH :


## Project Overview

Data Chef is a web application designed to simplify meal planning for users by taking into account various criteria such as available time, number of people per meal, budget, and dietary preferences (allergens, vegan, pork-free, etc.).
Through the application, users can plan their meals using a weekly planner, choosing which dish to prepare for each day based on the selected criteria. Data Chef then automatically generates a weekly grocery list.
This results in a significant time saving while preserving the pleasure of good food. Users can also choose recipes based on their cooking skill level and the time they have available, making cooking accessible to everyone.


## Objectives

- Simplify meal planning based on multiple criteria
- Gather a wide variety of recipes
- Make cooking accessible to all lifestyles


## Main Features

- Suggestions of various recipes
- Saving favorite recipes
- Filters based on dietary preferences, budget, and available time
- Automatic generation of a weekly meal planner and grocery list


## Technologies Used

    Front-end :

    - HTML
    - CSS
    - JavaScript

    Back-end :

    - Java
    - HTTP
    - JSON

    Data :

    - Python
    - SQL
    - BeautifulSoup
    - Requests
    - OpenFoodFacts API

    Infrastructure :

    - Traefik
    - Bare-metal open-source server
    - Proxmox API
    - pfSense


## Project Team

- 2 Data
- 3 Devs
- 1 Infrastructure
- 1 Design  


## Project currently under development