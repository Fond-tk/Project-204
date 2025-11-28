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
    updateLevelDisplay,
    updateStoryDisplay
} from './ui_manager.js';

let gameState = {
    player: { maxHp: 100, currentHp: 100 },
    enemy: { maxHp: 100, currentHp: 100 },
    isPlayerTurn: true,
    gameOver: false,
};

// ... (KEEP THE spellTasks ARRAY EXACTLY AS IT IS) ...
const spellTasks = [
    // --- BOSS 1: GOBLIN CAMP ---
    { 
        story: "In the mystical realm of Elderglen, magic flows through every vein of existence. Our tale begins with Elara, an accomplished young mage from the Academy of Arcanum.",
        actionLog: "Elara begins her journey.", 
        desc: 'Define a constant named "hero" with the value "Elara".', 
        hint: 'const hero = "Elara"',
        codeCheck: /const\s+hero\s*=\s*['"]Elara['"]/ 
    },
    { 
        story: "Her journey starts innocuously enough as she ventures through Whisperwood Forest in search of rare herbs for her potion-making classes.",
        actionLog: "Gathering resources in the forest...",
        desc: 'Store the number 5 in a variable named "herbs".', 
        hint: 'let herbs = 5',
        codeCheck: /let\s+herbs\s*=\s*5/ 
    },
    { 
        story: "Suddenly, she stumbles upon a bandit camp guarded by vicious goblins. The creatures' beady eyes and sharpened teeth leave no doubt about their malicious intent.",
        actionLog: "Ambush! Goblins detected.",
        desc: 'Prepare "Fireball" as your constant spell.', 
        hint: 'const spell = "Fireball"',
        codeCheck: /const\s+spell\s*=\s*['"]Fireball['"]/ 
    },
    { 
        story: "Each battle becomes increasingly challenging as the Goblin Boss summons minions, forcing Elara to perfect her fireball spells while evading swift blade strikes.",
        actionLog: "Enemy charges! Calculating damage...",
        desc: 'Calculate "attack": multiply base 10 by 2.', 
        hint: 'let attack = 10 * 2',
        codeCheck: /let\s+attack\s*=\s*10\s*\*\s*2/ 
    },
    { 
        story: "She learns to cast shielding wards and area-of-effect magic that scorch the earth beneath their feet, pushing back the goblin menace.",
        actionLog: "Incoming attack! Shields up!",
        desc: 'Activate "hasShield" by setting it to true.', 
        hint: 'const hasShield = true',
        codeCheck: /const\s+hasShield\s*=\s*true/ 
    },

    // --- BOSS 2: CYCLOPS LABYRINTH ---
    { 
        story: "Her triumph grants passage deeper into Whisperwood where she discovers an ancient stone archway adorned with cyclopean runes.",
        actionLog: "Approaching the Ancient Archway...",
        desc: 'Check if "heroPower" is greater than 10.', 
        hint: 'heroPower > 10',
        codeCheck: /heroPower\s*>\s*10/ 
    },
    { 
        story: "Beyond this threshold lies a labyrinth guarded by monstrous Cyclops, each wielding massive clubs capable of crushing boulders to dust.",
        actionLog: "A Stone Cyclops blocks the path!",
        desc: 'If "path" equals "clear", execute move().', 
        hint: 'if (path === "clear") { move() }',
        codeCheck: /if\s*\(\s*path\s*===\s*['"]clear['"]\s*\)\s*\{\s*move\(\)\s*\}/ 
    },
    { 
        story: "The one-eyed giants' sheer strength and stamina prove formidable. Elara must use teleportation magic for evasive maneuvers around devastating swings.",
        actionLog: "Heavy swing incoming! Dodge it!",
        desc: 'Write the logic for: run AND dodge.', 
        hint: 'run && dodge',
        codeCheck: /run\s*&&\s*dodge/ 
    },
    { 
        story: "For grueling rounds, Elara employs earth-shaking spells to disrupt the giant's footing while targeting weak points.",
        actionLog: "The giant stumbles. Target the weak spot.",
        desc: 'Write the logic for: aimHead OR aimLegs.', 
        hint: 'aimHead || aimLegs',
        codeCheck: /aimHead\s*\|\|\s*aimLegs/ 
    },
    { 
        story: "Through strategic spell-casting and resource management, she emerges victorious—her arcane skills honed sharper than ever before.",
        actionLog: "Finish him off!",
        desc: 'Use a ternary: if energy > 0 "strike", else "hide".', 
        hint: 'const action = energy > 0 ? "strike" : "hide"',
        codeCheck: /const\s+action\s*=\s*energy\s*>\s*0\s*\?\s*['"]strike['"]\s*:\s*['"]hide['"]/ 
    },

    // --- BOSS 3: BAT CAVERNS ---
    { 
        story: "Elara's victory echoes through the stone corridors as a cacophony of wings fills her ears—the bat infested caverns lie ahead.",
        actionLog: "Entering the dark caverns...",
        desc: 'List "bat1" and "bat2" inside a "bats" array.', 
        hint: 'const bats = ["bat1", "bat2"]',
        codeCheck: /const\s+bats\s*=\s*\[\s*['"]bat1['"]\s*,\s*['"]bat2['"]\s*\]/ 
    },
    { 
        story: "These winged terrors descend upon Elara in swarms. She relies heavily on wind magic to keep the airborne assailants at bay.",
        actionLog: "Swarm incoming! Use Wind magic.",
        desc: 'Push the "Wind" spell into your array.', 
        hint: 'spells.push("Wind")',
        codeCheck: /spells\.push\(\s*['"]Wind['"]\s*\)/ 
    },
    { 
        story: "They possess enhanced senses making them near-impossible to outmaneuver in the dark.",
        actionLog: "Scanning the darkness...",
        desc: 'Find the total number (.length) of bats.', 
        hint: 'bats.length',
        codeCheck: /bats\.length/ 
    },
    { 
        story: "As each wave falls, Elara learns new summoning spells, calling forth spectral allies to fend off the swarm.",
        actionLog: "Casting Area of Effect spell!",
        desc: 'Create a loop that runs 5 times.', 
        hint: 'for(let i=0; i<5; i++) { attack() }',
        codeCheck: /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*5\s*;\s*i\+\+\s*\)\s*\{\s*attack\(\)\s*\}/ 
    },
    { 
        story: "With three mini-bosses defeated and countless lessons learned, she targets the Alpha Bat leading the raid.",
        actionLog: "Targeting the Alpha Bat.",
        desc: 'Access the first element of the "bats" array.', 
        hint: 'bats[0]',
        codeCheck: /bats\[\s*0\s*\]/ 
    },

    // --- BOSS 4: DRAGON'S LAIR ---
    { 
        story: "Elara finally stands before the dragon's lair. The air is thick with sulfur as she approaches the obsidian spikes of Drakkonis.",
        actionLog: "BOSS FIGHT: Drakkonis!",
        desc: 'Define a "dragon" object with a "name" property.', 
        hint: 'const dragon = { name: "Drakkonis" }',
        codeCheck: /const\s+dragon\s*=\s*\{\s*name\s*:\s*['"]Drakkonis['"]\s*\}/ 
    },
    { 
        story: "His scales shimmer like black diamonds. Fire belches from his gaping maw, scorching every surface it touches.",
        actionLog: "Dragon Breath detected! Shielding!",
        desc: 'Write a "cast" function that returns "fire".', 
        hint: 'function cast() { return "fire" }',
        codeCheck: /function\s+cast\s*\(\s*\)\s*\{\s*return\s*['"]fire['"]\s*\}/ 
    },
    { 
        story: "The battle rages across caverns, sky, and molten rivers. Drakkonis roars, shaking the very foundations of Elderglen.",
        actionLog: "Analyzing breath weapon pattern...",
        desc: 'Assign "fire" to the dragon.breath property.', 
        hint: 'dragon.breath = "fire"',
        codeCheck: /dragon\.breath\s*=\s*['"]fire['"]/ 
    },
    { 
        story: "Fireballs morph into ice spears when confronting him mid-air, while lightning strikes target weak points revealed during lulls.",
        actionLog: "Mid-air combat! Switching elements.",
        desc: 'Create an arrow function "iceSpear" returning "frozen".', 
        hint: 'const iceSpear = (target) => "frozen"',
        codeCheck: /const\s+iceSpear\s*=\s*\(\s*target\s*\)\s*=>\s*['"]frozen['"]/ 
    },
    { 
        story: "Ultimately, Elara's masterful combination of elemental control turns the tide, allowing her to emerge victorious from this climactic confrontation.",
        actionLog: "Unleashing Ultimate Magic!",
        desc: 'Define a "win" function that returns true.', 
        hint: 'function win() { return true }',
        codeCheck: /function\s+win\s*\(\s*\)\s*\{\s*return\s*true\s*\}/ 
    }
];

let currentTaskIndex = 0;
const SAVE_KEY = 'js_quest_save_v7'; 

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

// --- NEW: Helper to calculate 1-1, 1-5, 2-1 etc. ---
function refreshLevelBadge() {
    const chapter = Math.floor(currentTaskIndex / 5) + 1; // 1, 2, 3, 4
    const stage = (currentTaskIndex % 5) + 1; // 1, 2, 3, 4, 5
    updateLevelDisplay(chapter, stage);
}

export function initGameState() {
    gameState.isPlayerTurn = true;
    gameState.gameOver = false;
    gameState.player.currentHp = 100;
    gameState.enemy.currentHp = 100;
    currentTaskIndex = 0;

    const hasSave = loadGame();
    
    // --- UPDATED: Calculate Chapter/Stage for display ---
    const chapter = Math.floor(currentTaskIndex / 5) + 1;
    const stage = (currentTaskIndex % 5) + 1;

    if (hasSave) {
        logToConsole(`Resume Game: Chapter ${chapter} - Stage ${stage}`, 'system');
    } else {
        logToConsole("Welcome to Chronicles of the Arcane Mage!", 'system');
    }

    refreshLevelBadge(); // Updates UI 1-1
    updateBossUI(); 

    updateHealthBar('player', (gameState.player.currentHp / 100) * 100, gameState.player.currentHp, 100);
    updateHealthBar('enemy', (gameState.enemy.currentHp / 100) * 100, gameState.enemy.currentHp, 100);

    if (currentTaskIndex < spellTasks.length) {
        updateStoryDisplay(spellTasks[currentTaskIndex].story); 
        logToConsole(spellTasks[currentTaskIndex].actionLog, 'info'); 
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
        refreshLevelBadge(); // Updates UI to next level like 1-2
        updateTaskDisplay(spellTasks[currentTaskIndex].desc);
        
        updateStoryDisplay(spellTasks[currentTaskIndex].story);
        setTimeout(() => {
            logToConsole(spellTasks[currentTaskIndex].actionLog, 'info'); 
        }, 500);
    }
}

function checkWinCondition() {
    if(gameState.enemy.currentHp <= 0 && currentTaskIndex === spellTasks.length - 1) {
        logToConsole("LEGENDARY VICTORY! Elderglen is saved!", 'victory');
        showGameStatus('LEGENDARY VICTORY', 'Elderglen is saved!', true);
        gameState.gameOver = true;
        toggleRunButton(false);
        localStorage.removeItem(SAVE_KEY); 
        return true;
    }

    if(gameState.player.currentHp <= 0) {
        logToConsole("DEFEAT... The saga ends here.", 'defeat');
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