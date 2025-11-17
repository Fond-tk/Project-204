# 1. Start from the official, latest Arch Linux image
FROM archlinux:latest

# 2. Update the system and install Node.js and npm
#    -Syu = Sync, Refresh, and Update all packages
#    --noconfirm = Don't ask "yes/no" during installation
RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm nodejs npm

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy the package files
COPY package.json package-lock.json ./

# 5. Install ALL your project's dependencies (including http-server)
RUN npm install

# 6. Copy the rest of your project code (index.html, main.js, etc.)
COPY . .

# 7. Tell Docker your app will run on port 3000
EXPOSE 3000

# 8. The command to run when the container starts
CMD ["npm", "start"]