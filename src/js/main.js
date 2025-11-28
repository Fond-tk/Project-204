import {
    initGameState,
    handlePlayerTurn,
    resetGameProgress
} from './game_logic.js';
import {
    logToConsole,
    initGrimoireUI // <--- IMPORT THIS
} from './ui_manager.js';

document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();
    
    const runCodeBtn = document.getElementById('run-code-btn');
    const codeEditor = document.getElementById('code-editor');
    const resetBtn = document.getElementById('reset-btn');

    if (!runCodeBtn || !codeEditor) {
        console.error("Essential UI elements not found!");
        return;
    }

    // Start Game & UI
    initGameState();
    initGrimoireUI(); // <--- CALL THIS

    // Attach Event Listeners
    runCodeBtn.addEventListener('click', () => {
        const userCode = codeEditor.value;
        if (userCode) {
            handlePlayerTurn(userCode);
        } else {
            logToConsole('You must write some code to cast a spell!', 'error');
        }
    });

    // Run with Ctrl+Enter
    codeEditor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            runCodeBtn.click();
        }
    });

    // Reset Progress Listener
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to wipe your save and restart?")) {
                resetGameProgress();
            }
        });
    }
});