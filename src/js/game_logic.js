import {
    updateHealthBar,
    logToConsole,
    toggleRunButton,
    animateAttack,
    showGameStatus
} from './ui_manager.js';

let gameState = {
    player: { maxHp: 100, currentHp: 100 },
    enemy: { maxHp: 100, currentHp: 100 },
    isPlayerTurn: true,
    gameOver: false,
};

// ---------------------------
// Progressive JS Learning Tasks (5 ด่าน)
// ---------------------------
const spellTasks = [
    { desc: 'Declare a variable spell with value "fireball"', codeCheck: /const\s+spell\s*=\s*['"]fireball['"]/ },
    { desc: 'Create let damage = 10 + 5', codeCheck: /let\s+damage\s*=\s*10\s*\+\s*5/ },
    { desc: 'Create array spells with ["fireball","iceblast"]', codeCheck: /const\s+spells\s*=\s*\[\s*['"]fireball['"],\s*['"]iceblast['"]\s*\]/ },
    { desc: 'Create function cast(spell) returning spell+"!"', codeCheck: /function\s+cast\s*\(\s*spell\s*\)\s*{[^}]+}/ },
    { desc: 'Write for loop 0 to 2', codeCheck: /for\s*\(\s*let\s+i\s*=\s*0;\s*i\s*<\s*3;\s*i\+\+\)/ }
];

let currentTaskIndex = 0;

// ---------------------------
// Initialize Game
// ---------------------------
export function initGameState() {
    gameState.player.currentHp = gameState.player.maxHp;
    gameState.enemy.currentHp = gameState.enemy.maxHp;
    gameState.isPlayerTurn = true;
    gameState.gameOver = false;

    updateHealthBar('player', 100, gameState.player.currentHp, gameState.player.maxHp);
    updateHealthBar('enemy', 100, gameState.enemy.currentHp, gameState.enemy.maxHp);

    logToConsole("Welcome to JS Quest!", 'system');
    logToConsole("A pesky Glitchelin blocks your path!", 'enemy');

    // แสดงโจทย์แรก
    currentTaskIndex = 0;
    logToConsole(`Current task: ${spellTasks[currentTaskIndex].desc}`, 'info');

    toggleRunButton(true);
}

// ---------------------------
// Check Code Function
// ---------------------------
function checkCode(code) {
    const task = spellTasks[currentTaskIndex];

    if(task.codeCheck.test(code.trim())) {
        return { success: true, damage: 20, message: `Correct! ${task.desc}` };
    } else {
        // Hint
        let hint;
        if (!/const|let|function|for/.test(code)) hint = "Check your keyword (const, let, function, for).";
        else if (!code.includes(task.desc.split('"')[1])) hint = `Check the value or variable name. It should match "${task.desc.split('"')[1]}"`;
        else hint = "Check your syntax carefully.";

        return { success: false, damage: 10, message: `Incorrect. Hint: ${hint}` };
    }
}

// ---------------------------
// Handle Player Turn
// ---------------------------
export function handlePlayerTurn(userCode) {
    if (!gameState.isPlayerTurn || gameState.gameOver) return;

    gameState.isPlayerTurn = false;
    toggleRunButton(false);
    logToConsole("Casting your spell...", 'info');

    const result = checkCode(userCode);

    setTimeout(() => {
        if(result.success) {
            // ลด HP ศัตรู
            gameState.enemy.currentHp = Math.max(0, gameState.enemy.currentHp - result.damage);
            const enemyHpPercent = (gameState.enemy.currentHp / gameState.enemy.maxHp) * 100;
            updateHealthBar('enemy', enemyHpPercent, gameState.enemy.currentHp, gameState.enemy.maxHp);

            logToConsole(result.message, 'success');
            animateAttack('player', 'enemy', 'success');

            // ด่านต่อไป
            currentTaskIndex++;
            if(currentTaskIndex < spellTasks.length) {
                logToConsole(`Next task: ${spellTasks[currentTaskIndex].desc}`, 'info');
            }

        } else {
            // โค้ดผิด → ผู้เล่นโดนดาเมจ
            gameState.player.currentHp = Math.max(0, gameState.player.currentHp - result.damage);
            const playerHpPercent = (gameState.player.currentHp / gameState.player.maxHp) * 100;
            updateHealthBar('player', playerHpPercent, gameState.player.currentHp, gameState.player.maxHp);

            logToConsole(result.message, 'error');
            animateAttack('player', 'enemy', 'fail');
            logToConsole(`Your spell fizzles! You take ${result.damage} damage.`, 'damage');
        }

        // ตรวจ Win / Lose
        if(checkWinCondition()) return;

        setTimeout(() => {
            gameState.isPlayerTurn = true;
            toggleRunButton(true);
        }, 1500);

    }, 500);
}

// ---------------------------
// Check Win / Lose
// ---------------------------
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
