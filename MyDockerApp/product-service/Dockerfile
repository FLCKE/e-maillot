# Utiliser une image de base node
FROM node:18-alpine

# Mettre à jour npm
RUN npm install -g npm@latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Définir la commande de démarrage de l'application
CMD ["npm", "start"]
