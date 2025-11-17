# **Module 1: The Whispering Woods**
### *Variables & First Spells*

---

### **1. Story Introduction: The First Step**

You take your first steps into the **Whispering Woods**, a realm where the very air hums with latent magic. But something is wrong. A strange corruption twists the path ahead, and a low, chittering sound echoes through the trees. A magical barrier, flickering with broken code, blocks your progress.

An ancient inscription on a nearby stone glows, hinting at a solution: to dispel the corruption, you must learn to name and control a sliver of magic. This is your first test, hero.

![A hero character facing a small, green bug-like monster in a forest setting.](https://r2.flowith.net/files/png/SV3UX-js_quest_battle_ui_mockup_index_0@1024x1024.png)

### **2. Learning Objective**

In this level, you will learn the fundamental magic of JavaScript: **Variables**. You'll discover how to create a container for a magical word—a spell—that will vanquish the foe and clear your path.

### **3. The Challenge**

A pesky **Glitchelin** blocks your way! It feeds on broken code and is the source of the barrier. To defeat it, you must cast your first spell.

**Your Task:** In your spellbook (the code editor), you must declare a new constant named `spell` and assign it the magical incantation `"fireball"` as its value. This will conjure a powerful attack to defeat the monster.

### **4. Enemy Details**

| Property | Description |
| :--- | :--- |
| **Name** | Glitchelin |
| **Health Points (HP)** | 20 |
| **Behavior** | The Glitchelin is a minor code-bug. It doesn't attack fiercely, but its very presence corrupts the environment, causing your magic to fizzle. Defeat it quickly to proceed! |
| **Vulnerability** | It is vulnerable to a properly declared and assigned spell variable. |

### **5. Code Validation Logic**

The system will validate the user's input against the following exact string. The test should check for the declaration of a constant named `spell` with the string value `"fireball"`.

```javascript
const spell = "fireball";
```

### **6. Player Feedback Messages**

Clear and encouraging feedback is crucial for learning. The system should provide the following messages based on the code validation outcome.

| Condition | Message Type | Console Output |
| :--- | :--- | :--- |
| **Correct Code** | **Success** | > **ZAP!** A blazing fireball erupts from your hands and strikes the Glitchelin! It dissolves into harmless pixels. You've successfully cast your first spell and mastered the art of declaring variables. The path is clear! Well done, Coder! |
| **Incorrect Variable Name** | **Hint** | > Hmm, the magic fizzles. The ancient runes speak of a specific container for your magic. Did you name your variable `spell` correctly? |
| **Incorrect String Value** | **Hint** | > Close! The spell almost worked, but the incantation seems off. Check the spelling of the magic word. It should be `"fireball"`. |
| **Missing Assignment (`=`)**| **Hint** | > Your spell name and the magic word are there, but they aren't connected. You need the **assignment operator** (`=`) to give the value to the variable. |
| **Missing Declaration (`const`)**| **Hint** | > You must declare your intention to create a new magical container. Are you missing a keyword like `const` at the beginning? |
| **General Syntax Error** | **Hint** | > The code is corrupted, and the Glitchelin seems to be drawing power from it! Check your syntax carefully. Every symbol, letter, and quote matters. |