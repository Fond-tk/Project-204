# JS Quest: Code & Combat

Welcome to JS Quest! This is a web-based "Code & Combat" game where you battle a monster by writing JavaScript spells.

This project is built with HTML, CSS (using TailwindCSS), and modern JavaScript modules.

---

##  How to Run (Using Docker)

This project is fully containerized using Docker. This solves all compatibility issues between operating systems (like macOS and Windows) by building a consistent Arch Linux environment for the project.

### Prerequisites

You must have **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** installed and running on your computer.

### Running the Application

1.  **Open Your Terminal:** Open your terminal (PowerShell, CMD, or Terminal) in this project's main folder (the one containing `Dockerfile` and `docker-compose.yml`).

2.  **Start the Docker Container:**
    Run the following command. The very first time you run this, Docker will download the Arch Linux image, install Node.js, and set up your project. This might take a few minutes.

    ```bash
    docker compose up
    ```
    * **Note:** This command runs the server in your terminal and shows you live logs. To run it in the background, you can use `docker compose up -d`.

3.  **View the Game:**
    Once the build is complete and the server is running, open your web browser and go to:
    > **`http://localhost:3000`**

4.  **Stopping the Application:**
    * If you ran `docker compose up`, just press `Ctrl + C` in your terminal.
    * If you ran `docker compose up -d`, run this command to stop the container:
        ```bash
        docker compose down
        ```

### Development

Because of the `volumes` setting in `docker-compose.yml`, you do not need to restart your container after changing code.

* **For HTML, CSS, or JavaScript changes:** Just edit your `index.html`, `style.css`, or `.js` files and **refresh your browser** to see the changes live.
* **For `package.json` changes:** If you add a new `npm` package, you must rebuild the image by running: `docker compose up --build`