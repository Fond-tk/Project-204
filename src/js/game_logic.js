import {
    updateHealthBar,
    logToConsole,
    toggleRunButton,
    animateAttack,
    showGameStatus,
    updateTaskDisplay,
    setCharacterImage,
    clearCodeEditor
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

export function initGameState() {
    // Reset State
    gameState.player.currentHp = gameState.player.maxHp;
    gameState.enemy.currentHp = gameState.enemy.maxHp;
    gameState.isPlayerTurn = true;
    gameState.gameOver = false;
    currentTaskIndex = 0; // Always start at 0

    // Reset UI
    updateHealthBar('player', 100, gameState.player.currentHp, gameState.player.maxHp);
    updateHealthBar('enemy', 100, gameState.enemy.currentHp, gameState.enemy.maxHp);

    logToConsole("Welcome to JS Quest!", 'system');
    logToConsole("A pesky Glitchelin blocks your path!", 'enemy');

    // Show Task 1
    updateTaskDisplay(spellTasks[currentTaskIndex].desc); 
    logToConsole(`Current task: ${spellTasks[currentTaskIndex].desc}`, 'info');

    // Set Images
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
            // Player Success
            gameState.enemy.currentHp = Math.max(0, gameState.enemy.currentHp - result.damage);
            const enemyHpPercent = (gameState.enemy.currentHp / gameState.enemy.maxHp) * 100;
            updateHealthBar('enemy', enemyHpPercent, gameState.enemy.currentHp, gameState.enemy.maxHp);

            logToConsole(result.message, 'success');
            animateAttack('player', 'enemy', 'success');
            
            clearCodeEditor();

            // Next Level Logic (No Save)
            currentTaskIndex++;
            if(currentTaskIndex < spellTasks.length) {
                updateTaskDisplay(spellTasks[currentTaskIndex].desc);
                setTimeout(() => logToConsole(`Next task: ${spellTasks[currentTaskIndex].desc}`, 'info'), 1000);
            }

        } else {
            // Player Fail
            gameState.player.currentHp = Math.max(0, gameState.player.currentHp - result.damage);
            const playerHpPercent = (gameState.player.currentHp / gameState.player.maxHp) * 100;
            updateHealthBar('player', playerHpPercent, gameState.player.currentHp, gameState.player.maxHp);

            logToConsole(result.message, 'error');
            animateAttack('player', 'enemy', 'fail');
            logToConsole(`Your spell fizzles! You take ${result.damage} damage.`, 'damage');
        }

        // Check Win/Lose
        if(checkWinCondition()) return;

        // Reset Turn
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
        return true;
    }

    if(gameState.player.currentHp <= 0) {
        logToConsole("DEFEAT... The Glitchelin defeated you.", 'defeat');
        showGameStatus('Game Over');
        gameState.gameOver = true;
        toggleRunButton(false);
        return true;
    }

    return false;
}