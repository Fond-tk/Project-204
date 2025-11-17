# Project Proposal & Technical Specification: JS Quest: Code & Combat

### **1. Introduction: Your Coding Adventure Awaits**

Welcome to **JS Quest: Code & Combat**, an interactive learning platform where the journey to mastering JavaScript is transformed into an epic adventure. Forget dry tutorials and abstract examples. Here, you are a hero, and your weapon is your code. You will face down fearsome monsters, explore mystical lands, and level up your skills by writing real JavaScript to cast spells, launch attacks, and solve magical challenges. Every function you write, every loop you master, brings you one step closer to becoming a legendary coder. Are you ready to draw your keyboard and begin the quest?

---

### **2. Core Concept: The Gamified Learning Loop**

The educational philosophy of JS Quest is built on a simple, yet powerful, feedback loop that blends learning with immediate, gratifying results.



1.  **Learn a Concept:** Each stage begins with a concise, interactive lesson introducing a core JavaScript concept (e.g., variables, functions, arrays). The lesson is presented as a "spellbook" or "ancient scroll" to maintain thematic immersion.
2.  **Code the Challenge:** The player is presented with a coding challenge in an in-game editor. The goal is to use the newly learned concept to solve a problem that translates to a battle action. For example, declaring a variable might set the `power` of an attack, or writing a `for` loop might unleash a multi-hit combo.
3.  **Execute & Battle:** Upon running the code, the player witnesses the result in a dynamic battle scene. Correct, effective code results in a successful attack on the monster. Flawed code might fizzle out or result in a weaker attack.
4.  **Progress & Reward:** Defeating monsters grants Experience Points (EXP). Accumulating EXP allows the player to level up, unlocking more complex stages, tougher monsters, and more advanced JavaScript concepts.

---

### **3. Suggested Architecture & Technology Stack**

To build a responsive, scalable, and secure platform, we propose a modern, JavaScript-centric technology stack.

| Component | Technology | Rationale & Key Libraries |
| :--- | :--- | :--- |
| **Frontend** | **React.js** | Provides a robust, component-based architecture ideal for managing complex UI states (e.g., code editor content, battle animations, user data). Its vast ecosystem ensures long-term support. |
| | *Code Editor* | **Monaco Editor:** The engine that powers VS Code. Offers syntax highlighting, autocompletion, and error squiggles out-of-the-box, providing a professional-grade coding experience. |
| | *Animation* | **GSAP (GreenSock Animation Platform):** A high-performance animation library perfect for creating fluid battle sequences, UI transitions, and visual effects that are critical for game-feel. |
| **Backend** | **Node.js + Express** | A natural choice for a JS-focused application. It's fast, efficient, and allows for a unified language across the stack. The backend will serve as the central nervous system of the application. |
| | *Responsibilities* | - User Authentication & Session Management (JWT)<br>- API for managing user progress (EXP, level, completed stages)<br>- Serving stage/challenge content<br>- Securely handling code execution requests from the frontend |
| **Database** | **MongoDB** | A NoSQL database whose document-based structure is highly flexible. This is ideal for storing user profiles, progress data, and diverse challenge/stage content that may evolve over time without requiring rigid schema migrations. |
| **Code Execution** | **Docker** | Provides the ultimate security and isolation for running untrusted user code. Each submission is executed in an ephemeral, sandboxed container, preventing any potential harm to the host server. |

---

### **4. Game Mechanics**

#### **Battle System**
The combat is a turn-based system driven by the player's code.

-   **Player's Turn:** The player writes JavaScript in the editor to define an "attack." When they hit "Run," their code is executed. The outcome of the code (e.g., the return value of a function, the final value of a variable) determines the damage dealt to the monster's Health Points (HP).
-   **Monster's Turn:** After the player's action, or after a set timer, the monster performs its attack, reducing the player's HP. This creates a sense of urgency.
-   **Winning & Losing:** The battle is won when the monster's HP reaches zero. The player loses if their HP reaches zero.

#### **Progression System**
-   **EXP & Leveling:** Players earn EXP for solving challenges, defeating monsters, and completing stages. Reaching EXP thresholds causes the player to "Level Up."
-   **Unlocks:** Leveling up is the primary mechanism for progression. A new level can unlock:
    -   The next stage on the World Map.
    -   New, more complex JavaScript concepts and challenges.
    -   Cosmetic rewards or achievements on their dashboard.

#### **Challenge Design by Concept**
Each challenge is explicitly designed to test the understanding of a specific JavaScript concept.

| JS Concept | Example Challenge | In-Game Action |
| :--- | :--- | :--- |
| **Variables** | `const attackPower = 25;` | The player's attack deals 25 damage. The challenge might ask them to set it to the highest possible value. |
| **Arrays & Loops** | `for (let i = 0; i < 3; i++) { castFireball(); }` | The code triggers a 3-hit combo animation, with each hit dealing damage. The challenge could be to hit a monster `X` times. |
| **Functions** | `function calculateCritDamage(baseDamage) { return baseDamage * 2; }` | The player must write a function that correctly calculates and returns a critical damage value. |
| **Objects** | `const spell = { name: 'iceBolt', cost: 30, damage: 45 };` | The player must define a "spell" object with the correct properties to pass the stage. |

---

### **5. UI/UX Wireframe Concepts**

#### **A. The Battle Screen**
The central hub of the game, designed for focus and immediate feedback. It features a three-panel layout.

-   **Left Panel (The Spellbook):** A clean, embedded **Code Editor** where the player writes their solution. Includes the challenge prompt and a "Run Code" button.
-   **Center Panel (The Battlefield):** The largest section, displaying a dynamic **Battle Scene**. It features the player's character, the enemy monster, and prominent **HP bars** for both. This is where animations for attacks and damage play out.
-   **Right Panel (The Oracle's Scroll):** A **Console/Output Window**. It displays `console.log` outputs for debugging, custom game messages ("Success! Your 'Fireball' dealt 45 damage!"), and error messages ("Syntax Error: Missing `}` on line 4.").

#### **B. The World Map / Stage Select Screen**
This screen provides a visual representation of the player's journey and progress.

-   It's a stylized map with different regions (e.g., "The Forest of Variables," "The Mountains of Functions," "The Labyrinth of Loops").
-   Completed stages are marked (e.g., with a glowing checkmark or a planted flag).
-   The current, available stage is highlighted and clickable.
-   Future, locked stages are visible but grayed out, encouraging the player to progress.

#### **C. The Hero's Dashboard**
A simple, personal area for the player to track their overall growth.

-   **Player Level and EXP Bar:** Shows current level and progress toward the next one.
-   **Achievements:** A gallery of badges earned for milestones (e.g., "First Function," "Loop Master," "Object-Oriented Oracle").
-   **Stats:** Fun statistics like "Monsters Defeated," "Lines of Code Written," etc.

---

### **6. Secure Code Execution Implementation**

#### **The Core Problem: How Do We Run Untrusted Code Safely?**
The single greatest technical and security challenge is executing arbitrary JavaScript submitted by users. Directly running this code on our backend server using methods like `eval()` or `new Function()` would be catastrophic. A malicious user could easily:
-   Access the server's file system (`fs.readFile('/etc/passwd')`).
-   Make unauthorized database calls to steal or delete user data.
-   Initiate outbound network requests to attack other systems.
-   Execute infinite loops to cause a Denial-of-Service (DoS) attack.

> **Our guiding principle:** *Never trust user input. Execute it in a completely isolated environment.*

#### **Proposed Solution: A Multi-Layered Sandbox Approach**

We will implement two layers of execution: instant client-side feedback and robust server-side validation.

**1. Client-Side Linting (Web Workers)**
For instant feedback on syntax, we can run a linter or a lightweight parser within a **Web Worker** in the user's browser.
-   **Benefit:** This is instantaneous and completely safe, as the code is never executed. It can catch simple typos and syntax errors before the user even submits their solution.
-   **Limitation:** It cannot validate the *logic* or *outcome* of the code.

**2. Server-Side Validation (Docker Sandbox)**
This is the authoritative system for verifying challenge solutions. The process is isolated, secure, and scalable.



Here is the step-by-step flow for a single code submission:

1.  **API Request:** The frontend sends the user's code to a dedicated backend endpoint, e.g., `/api/v1/execute`.
    ```json
    {
      "challengeId": "stage-5-loops",
      "userCode": "for (let i = 0; i < 5; i++) { attack(); }"
    }
    ```

2.  **Job Queuing:** The API server receives the request and places a job into a queue. This prevents the main API from being blocked by code execution tasks.

3.  **Container Orchestration:** A worker process picks up the job. It issues a command to the Docker daemon to **spin up a new, ephemeral Docker container** from a pre-built image. This image contains:
    -   A minimal Node.js runtime.
    -   A testing harness/script.
    -   Strict resource limits (e.g., max 100MB RAM, 2-second execution timeout).
    -   Disabled network access.

4.  **Code Injection & Execution:** The user's code is mounted into the container or passed as an argument. The testing harness runs the user's code and captures the output, return value, or any errors.

5.  **Result Capture:** The testing harness writes the result (e.g., success/fail, output data) to `stdout`. The Docker daemon captures this output.

6.  **Container Destruction:** Whether the code succeeded, failed, or timed out, the container is **immediately stopped and destroyed**. This ensures no state persists between executions and cleans up all resources.

7.  **Response to User:** The worker process parses the result from the container's output and updates the database with the user's attempt (pass/fail). It then sends the final result back to the frontend, which triggers the appropriate battle animation and UI update.