# JS Quest: Chronicles of the Arcane Mage

Welcome to **JS Quest**! This is a web-based "Code & Combat" game where you battle monsters by writing real JavaScript code to cast spells.

This project is built with HTML, CSS (TailwindCSS), and modern JavaScript (ES6 Modules).

---

## 🎮 Option 1: Quick Start (Recommended)
**Use this method to play the game immediately on Windows.** No manual installation of Node.js or Docker is required. The launcher handles everything automatically.

### How to Run
1.  **Unzip** the project folder.
2.  Locate the file named **`PLAY_GAME.bat`**.
3.  **Double-click** it.
4.  If prompted by Windows (User Account Control) to install tools, click **Yes**.
    * *The script uses the official Windows Package Manager (WinGet) or portable tools to set up a temporary local server.*
5.  A black terminal window will appear, and the game will automatically open in your default web browser at `http://localhost:3000`.

**Note:** Please keep the terminal window **OPEN** while playing. Closing it will stop the game server.

---

## 🛠️ Option 2: Developer Mode (Using Docker)
**Use this method if you want to debug the containerized environment.**
This project is fully containerized using Docker, building a consistent Arch Linux environment to ensure compatibility across all systems.

### Prerequisites
* **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** must be installed and running.

### Debugging & Running
1.  **Open Your Terminal:** Open PowerShell, CMD, or Terminal in this project's main folder (where `Dockerfile` is located).

2.  **Start the Container:**
    Run the following command. The first time you run this, Docker will download the Arch Linux image and set up the environment (this may take a few minutes).

    ```bash
    docker compose up
    ```
    * *To run in the background (detached mode), use:* `docker compose up -d`

3.  **Access the Game:**
    Once the server is running, open your web browser and go to:
    > **`http://localhost:3000`**

4.  **Stopping the Server:**
    * Press `Ctrl + C` in the terminal.
    * Or run: `docker compose down`

### Live Reloading
This Docker setup uses **Volumes**. You do not need to restart the container when you change code.
* **Edit:** Modify `index.html`, `style.css`, or any `.js` file in `src/`.
* **Refresh:** Simply reload your browser to see changes instantly.

---

## 📖 Game Features
* **20 Levels:** A full campaign across 4 Chapters (Goblins, Cyclops, Bats, Dragon).
* **Interactive Coding:** Solve coding puzzles to deal damage.
* **Grimoire:** Built-in documentation to help you learn JavaScript syntax.
* **Persistent Progress:** Your progress is saved automatically. If you are defeated, you restart at the beginning of the current Chapter.