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
    updateLevelDisplay // <--- IMPORT THIS
} from './ui_manager.js';

let gameState = {
    player: { maxHp: 100, currentHp: 100 },
    enemy: { maxHp: 100, currentHp: 100 },
    isPlayerTurn: true,
    gameOver: false,
};

const spellTasks = [
    { desc: 'Declare a variable spell with value "fireball"', codeCheck: /const\s+spell\s*=\s*['"]fireball['"]/ },
    { desc: 'Create let damage = 10 + 5', codeCheck: /let\s+damage\s*=\s*10\s*\+\s*5/ },
    { desc: 'Create array spells with ["fireball","iceblast"]', codeCheck: /const\s+spells\s*=\s*\[\s*['"]fireball['"]\s*,\s*['"]iceblast['"]\s*\]/ },
    { desc: 'Create function cast(spell) returning spell+"!"', codeCheck: /function\s+cast\s*\(\s*spell\s*\)\s*{[^}]+}/ },
    { desc: 'Write for loop 0 to 2', codeCheck: /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*3\s*;/ }
];

let currentTaskIndex = 0;
const SAVE_KEY = 'js_quest_save_v4'; 

function saveGame(customData = null) {
    const data = customData || {
        level: currentTaskIndex,
        playerHp: gameState.player.currentHp,
        enemyHp: gameState.enemy.currentHp
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    console.log("Game Saved:", data);
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
        console.error("Save corrupted, clearing...", error);
        localStorage.removeItem(SAVE_KEY);
        return false;
    }
}

export function resetGameProgress() {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
}

export function initGameState() {
    gameState.isPlayerTurn = true;
    gameState.gameOver = false;
    gameState.player.currentHp = 100;
    gameState.enemy.currentHp = 100;
    currentTaskIndex = 0;

    const hasSave = loadGame();
    
    if (hasSave) {
        logToConsole(`Resume Game: Level ${currentTaskIndex + 1}`, 'system');
    } else {
        logToConsole("Welcome to JS Quest! (New Game)", 'system');
    }

    // --- NEW: Update the Level Badge ---
    updateLevelDisplay(currentTaskIndex + 1);

    updateHealthBar('player', (gameState.player.currentHp / 100) * 100, gameState.player.currentHp, 100);
    updateHealthBar('enemy', (gameState.enemy.currentHp / 100) * 100, gameState.enemy.currentHp, 100);

    if (currentTaskIndex < spellTasks.length) {
        updateTaskDisplay(spellTasks[currentTaskIndex].desc); 
        logToConsole(`Current task: ${spellTasks[currentTaskIndex].desc}`, 'info');
    }

    setCharacterImage('player', 'src/assets/images/Player.png');
    setCharacterImage('enemy', 'src/assets/images/Glitchlin.png');

    toggleRunButton(true);
}

function checkCode(code) {
    const task = spellTasks[currentTaskIndex];
    if(task.codeCheck.test(code.trim())) {
        return { success: true, damage: 20, message: `Correct! ${task.desc}` };
    } else {
        let hint;
        if (!/const|let|function|for/.test(code)) hint = "Check your keyword (const, let, function, for).";
        else hint = "Check your syntax or variable names carefully.";
        return { success: false, damage: 10, message: `Incorrect. Hint: ${hint}` };
    }
}

export function handlePlayerTurn(userCode) {
    if (!gameState.isPlayerTurn || gameState.gameOver) return;

    gameState.isPlayerTurn = false;
    toggleRunButton(false);
    logToConsole("Casting your spell...", 'info');

    const result = checkCode(userCode);

    setTimeout(() => {
        if(result.success) {
            let newEnemyHp = gameState.enemy.currentHp - result.damage;

            if (currentTaskIndex < spellTasks.length - 1) {
                newEnemyHp = Math.max(1, newEnemyHp); 
            } else {
                newEnemyHp = Math.max(0, newEnemyHp);
                if (newEnemyHp > 0) newEnemyHp = 0;
            }

            gameState.enemy.currentHp = newEnemyHp;
            updateHealthBar('enemy', (newEnemyHp/100)*100, newEnemyHp, 100);

            logToConsole(result.message, 'success');
            animateAttack('player', 'enemy', 'success');
            clearCodeEditor();

            if (gameState.enemy.currentHp > 0) {
                currentTaskIndex++;
                
                // --- NEW: Update the Level Badge on success ---
                updateLevelDisplay(currentTaskIndex + 1);
                
                saveGame();
                if(currentTaskIndex < spellTasks.length) {
                    updateTaskDisplay(spellTasks[currentTaskIndex].desc);
                    setTimeout(() => logToConsole(`Next task: ${spellTasks[currentTaskIndex].desc}`, 'info'), 1000);
                }
            } else {
                checkWinCondition();
                return;
            }

        } else {
            gameState.player.currentHp = Math.max(0, gameState.player.currentHp - result.damage);
            updateHealthBar('player', (gameState.player.currentHp/100)*100, gameState.player.currentHp, 100);

            logToConsole(result.message, 'error');
            animateDamage('player'); 
            logToConsole(`Your spell fizzles! You take ${result.damage} damage.`, 'damage');

            if (gameState.player.currentHp > 0) {
                saveGame();
            }
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

function checkWinCondition() {
    if(gameState.enemy.currentHp <= 0) {
        logToConsole("VICTORY! You defeated the Glitchelin!", 'victory');
        showGameStatus('You Win!');
        gameState.gameOver = true;
        toggleRunButton(false);
        localStorage.removeItem(SAVE_KEY); 
        return true;
    }

    if(gameState.player.currentHp <= 0) {
        logToConsole("DEFEAT... The Glitchelin defeated you.", 'defeat');
        showGameStatus('Game Over');
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