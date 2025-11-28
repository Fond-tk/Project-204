import {
    updateHealthBar,
    logToConsole,
    toggleRunButton,
    animateAttack,
    showGameStatus,
    updateTaskDisplay,
    setCharacterImage,
    clearCodeEditor,
    animateDamage,
    updateLevelDisplay 
} from './ui_manager.js';

let gameState = {
    player: { maxHp: 100, currentHp: 100 },
    enemy: { maxHp: 100, currentHp: 100 },
    isPlayerTurn: true,
    gameOver: false,
};

// ---------------------------------------------------------
// REWRITTEN OBJECTIVES
// ---------------------------------------------------------
const spellTasks = [
    // --- BOSS 1: GOBLIN CAMP (Variables) ---
    { 
        story: "Elara enters Whisperwood Forest. A bandit camp guarded by Goblins blocks the path!",
        desc: 'Define a constant named "hero" with the value "Elara".', 
        hint: 'const hero = "Elara"',
        codeCheck: /const\s+hero\s*=\s*['"]Elara['"]/ 
    },
    { 
        story: "She spots rare herbs nearby, but needs to count them quickly before the Goblins notice.",
        desc: 'Store the number 5 in a variable named "herbs".', 
        hint: 'let herbs = 5',
        codeCheck: /let\s+herbs\s*=\s*5/ 
    },
    { 
        story: "The Goblins attack! Elara prepares her signature spell.",
        desc: 'Prepare "Fireball" as your constant spell.', 
        hint: 'const spell = "Fireball"',
        codeCheck: /const\s+spell\s*=\s*['"]Fireball['"]/ 
    },
    { 
        story: "The Goblin Captain charges. Elara needs to calculate double damage!",
        desc: 'Calculate "attack": multiply base 10 by 2.', 
        hint: 'let attack = 10 * 2',
        codeCheck: /let\s+attack\s*=\s*10\s*\*\s*2/ 
    },
    { 
        story: "Blades fly everywhere! Elara raises a magical ward.",
        desc: 'Activate "hasShield" by setting it to true.', 
        hint: 'const hasShield = true',
        codeCheck: /const\s+hasShield\s*=\s*true/ 
    },

    // --- BOSS 2: CYCLOPS LABYRINTH (Conditionals) ---
    { 
        story: "Elara reaches the Stone Archway. A massive Cyclops blocks the labyrinth entrance.",
        desc: 'Check if "heroPower" is greater than 10.', 
        hint: 'heroPower > 10',
        codeCheck: /heroPower\s*>\s*10/ 
    },
    { 
        story: "The Cyclops smashes the ground! She must check if the path is clear.",
        desc: 'If "path" equals "clear", execute move().', 
        hint: 'if (path === "clear") { move() }',
        codeCheck: /if\s*\(\s*path\s*===\s*['"]clear['"]\s*\)\s*\{\s*move\(\)\s*\}/ 
    },
    { 
        story: "A massive club swing! She needs to run AND dodge.",
        desc: 'Write the logic for: run AND dodge.', 
        hint: 'run && dodge',
        codeCheck: /run\s*&&\s*dodge/ 
    },
    { 
        story: "The Cyclops is tired. Aim for the head OR the legs.",
        desc: 'Write the logic for: aimHead OR aimLegs.', 
        hint: 'aimHead || aimLegs',
        codeCheck: /aimHead\s*\|\|\s*aimLegs/ 
    },
    { 
        story: "The Giant stumbles! Finish him or hide?",
        desc: 'Use a ternary: if energy > 0 "strike", else "hide".', 
        hint: 'const action = energy > 0 ? "strike" : "hide"',
        codeCheck: /const\s+action\s*=\s*energy\s*>\s*0\s*\?\s*['"]strike['"]\s*:\s*['"]hide['"]/ 
    },

    // --- BOSS 3: BAT CAVERNS (Arrays & Loops) ---
    { 
        story: "Victory! But now screeching fills the air. The Bat Caverns...",
        desc: 'List "bat1" and "bat2" inside a "bats" array.', 
        hint: 'const bats = ["bat1", "bat2"]',
        codeCheck: /const\s+bats\s*=\s*\[\s*['"]bat1['"]\s*,\s*['"]bat2['"]\s*\]/ 
    },
    { 
        story: "They are swarming! Elara needs Wind magic in her spell list.",
        desc: 'Push the "Wind" spell into your array.', 
        hint: 'spells.push("Wind")',
        codeCheck: /spells\.push\(\s*['"]Wind['"]\s*\)/ 
    },
    { 
        story: "It's too dark. How many are there?",
        desc: 'Find the total number (.length) of bats.', 
        hint: 'bats.length',
        codeCheck: /bats\.length/ 
    },
    { 
        story: "She must attack them all at once!",
        desc: 'Create a loop that runs 5 times.', 
        hint: 'for(let i=0; i<5; i++) { attack() }',
        codeCheck: /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*5\s*;\s*i\+\+\s*\)\s*\{\s*attack\(\)\s*\}/ 
    },
    { 
        story: "The Alpha Bat remains. Target the first one in the list.",
        desc: 'Access the first element of the "bats" array.', 
        hint: 'bats[0]',
        codeCheck: /bats\[\s*0\s*\]/ 
    },

    // --- BOSS 4: DRAGON'S LAIR (Functions & Objects) ---
    { 
        story: "The Obsidian Spikes. Drakkonis Rex, the Dragon, descends!",
        desc: 'Define a "dragon" object with a "name" property.', 
        hint: 'const dragon = { name: "Drakkonis" }',
        codeCheck: /const\s+dragon\s*=\s*\{\s*name\s*:\s*['"]Drakkonis['"]\s*\}/ 
    },
    { 
        story: "He breathes fire! Cast a protective ward function.",
        desc: 'Write a "cast" function that returns "fire".', 
        hint: 'function cast() { return "fire" }',
        codeCheck: /function\s+cast\s*\(\s*\)\s*\{\s*return\s*['"]fire['"]\s*\}/ 
    },
    { 
        story: "The Dragon prepares a breath attack. Analyze its property.",
        desc: 'Assign "fire" to the dragon.breath property.', 
        hint: 'dragon.breath = "fire"',
        codeCheck: /dragon\.breath\s*=\s*['"]fire['"]/ 
    },
    { 
        story: "Mid-air combat! Morph fireball into Ice Spear.",
        desc: 'Create an arrow function "iceSpear" returning "frozen".', 
        hint: 'const iceSpear = (target) => "frozen"',
        codeCheck: /const\s+iceSpear\s*=\s*\(\s*target\s*\)\s*=>\s*['"]frozen['"]/ 
    },
    { 
        story: "The Final Blow! Combine all elements!",
        desc: 'Define a "win" function that returns true.', 
        hint: 'function win() { return true }',
        codeCheck: /function\s+win\s*\(\s*\)\s*\{\s*return\s*true\s*\}/ 
    }
];

let currentTaskIndex = 0;
const SAVE_KEY = 'js_quest_save_v5'; 

function getCurrentBossInfo(levelIndex) {
    if (levelIndex < 5) return { name: "Goblin Scout", img: "src/assets/images/Glitchlin.png" };
    if (levelIndex < 10) return { name: "Stone Cyclops", img: "src/assets/images/Cyclop.png" };
    if (levelIndex < 15) return { name: "Cave Bat", img: "src/assets/images/Bat.png" };
    return { name: "Drakkonis Rex", img: "src/assets/images/Dragon.png" };
}

function saveGame(customData = null) {
    const data = customData || {
        level: currentTaskIndex,
        playerHp: gameState.player.currentHp,
        enemyHp: gameState.enemy.currentHp
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
    try {
        const rawData = localStorage.getItem(SAVE_KEY);
        if (!rawData) return false;
        const data = JSON.parse(rawData);
        if (typeof data.level === 'number' && data.level < spellTasks.length) {
            currentTaskIndex = data.level;
            gameState.player.currentHp = data.playerHp;
            gameState.enemy.currentHp = data.enemyHp;
            return true; 
        } 
        return false;
    } catch (error) {
        localStorage.removeItem(SAVE_KEY);
        return false;
    }
}

export function resetGameProgress() {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
}

function updateBossUI() {
    const boss = getCurrentBossInfo(currentTaskIndex);
    setCharacterImage('enemy', boss.img);
    if (currentTaskIndex % 5 === 0) {
        logToConsole(`--- ENCOUNTER: ${boss.name} ---`, 'system');
    }
}

export function initGameState() {
    gameState.isPlayerTurn = true;
    gameState.gameOver = false;
    gameState.player.currentHp = 100;
    gameState.enemy.currentHp = 100;
    currentTaskIndex = 0;

    const hasSave = loadGame();
    
    if (hasSave) {
        logToConsole(`Resume Game: Stage ${currentTaskIndex + 1}`, 'system');
    } else {
        logToConsole("Welcome to Chronicles of the Arcane Mage!", 'system');
    }

    updateLevelDisplay(currentTaskIndex + 1);
    updateBossUI(); 

    updateHealthBar('player', (gameState.player.currentHp / 100) * 100, gameState.player.currentHp, 100);
    updateHealthBar('enemy', (gameState.enemy.currentHp / 100) * 100, gameState.enemy.currentHp, 100);

    if (currentTaskIndex < spellTasks.length) {
        logToConsole(spellTasks[currentTaskIndex].story, 'info'); 
        updateTaskDisplay(spellTasks[currentTaskIndex].desc); 
    }

    setCharacterImage('player', 'src/assets/images/Player.png');
    toggleRunButton(true);
}

function checkCode(code) {
    const task = spellTasks[currentTaskIndex];
    if(task.codeCheck.test(code.trim())) {
        return { success: true, damage: 20, message: `Correct! ${task.desc}` };
    } else {
        let hint;
        if (!/const|let|function|for|if/.test(code)) hint = "Check your keywords (const, let, if, for).";
        else hint = "Check your syntax carefully.";
        return { success: false, damage: 10, message: `Incorrect. Hint: ${task.hint}` };
    }
}

export function handlePlayerTurn(userCode) {
    if (!gameState.isPlayerTurn || gameState.gameOver) return;

    gameState.isPlayerTurn = false;
    toggleRunButton(false);
    logToConsole("Casting spell...", 'info');

    const result = checkCode(userCode);

    setTimeout(() => {
        if(result.success) {
            let newEnemyHp = gameState.enemy.currentHp - result.damage;

            const isBossFinalStage = (currentTaskIndex + 1) % 5 === 0;
            const isLastGameStage = currentTaskIndex === spellTasks.length - 1;

            if (!isBossFinalStage && !isLastGameStage) {
                newEnemyHp = Math.max(1, newEnemyHp); 
            } else {
                newEnemyHp = Math.max(0, newEnemyHp);
            }

            gameState.enemy.currentHp = newEnemyHp;
            updateHealthBar('enemy', (newEnemyHp/100)*100, newEnemyHp, 100);

            logToConsole(result.message, 'success');
            animateAttack('player', 'enemy', 'success');
            clearCodeEditor();

            if (gameState.enemy.currentHp > 0) {
                currentTaskIndex++;
                saveGame();
                proceedToNextTask();
            } else {
                if (isLastGameStage) {
                    checkWinCondition();
                    return;
                }
                
                logToConsole("Boss Defeated! The path opens...", 'victory');
                
                setTimeout(() => {
                    currentTaskIndex++;
                    gameState.enemy.currentHp = 100; 
                    updateHealthBar('enemy', 100, 100, 100);
                    updateBossUI(); 
                    saveGame();
                    proceedToNextTask();
                }, 2000);
            }

        } else {
            gameState.player.currentHp = Math.max(0, gameState.player.currentHp - result.damage);
            updateHealthBar('player', (gameState.player.currentHp/100)*100, gameState.player.currentHp, 100);

            logToConsole(result.message, 'error');
            animateDamage('player'); 
            logToConsole(`You take ${result.damage} damage.`, 'damage');

            if (gameState.player.currentHp > 0) saveGame();
        }

        if(checkWinCondition()) return;

        setTimeout(() => {
            if(!gameState.gameOver) {
                gameState.isPlayerTurn = true;
                toggleRunButton(true);
            }
        }, 1500);

    }, 500);
}

function proceedToNextTask() {
    if(currentTaskIndex < spellTasks.length) {
        updateLevelDisplay(currentTaskIndex + 1);
        updateTaskDisplay(spellTasks[currentTaskIndex].desc);
        setTimeout(() => {
            logToConsole(spellTasks[currentTaskIndex].story, 'info');
        }, 500);
    }
}

function checkWinCondition() {
    if(gameState.enemy.currentHp <= 0 && currentTaskIndex === spellTasks.length - 1) {
        logToConsole("LEGENDARY VICTORY! Elderglen is saved!", 'victory');
        
        // --- THIS USES THE NEW SIGNATURE ---
        showGameStatus('LEGENDARY VICTORY', 'Elderglen is saved!', true);
        
        gameState.gameOver = true;
        toggleRunButton(false);
        localStorage.removeItem(SAVE_KEY); 
        return true;
    }

    if(gameState.player.currentHp <= 0) {
        logToConsole("DEFEAT... The saga ends here.", 'defeat');
        
        // --- THIS USES THE NEW SIGNATURE ---
        showGameStatus('GAME OVER', 'The saga ends here.', false);
        
        gameState.gameOver = true;
        toggleRunButton(false);
        saveGame({
            level: currentTaskIndex,
            playerHp: 100,
            enemyHp: 100
        });
        return true;
    }
    return false;
}