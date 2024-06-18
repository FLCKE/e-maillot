# Étape de build
FROM node:18 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build  --configuration=production

# Étape de production
FROM nginx:alpine

# Copier les fichiers de build Angular vers Nginx
COPY --from=build /app/dist/app /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port sur lequel Nginx s'exécute
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
