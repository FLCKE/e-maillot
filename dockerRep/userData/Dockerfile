# Utiliser une image de base appropriée pour Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN rm -rf node_modules
RUN npm install
RUN npm install bcryptjs

# Copier tout le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application va tourner
EXPOSE 5000

# Démarrer l'application
CMD ["node", "userApi.js"]
