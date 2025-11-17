import {
    initGameState,
    handlePlayerTurn
} from './game_logic.js';
import {
    logToConsole
} from './ui_manager.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const runCodeBtn = document.getElementById('run-code-btn');
    const codeEditor = document.getElementById('code-editor');

    if (!runCodeBtn || !codeEditor) {
        console.error("Essential UI elements not found!");
        return;
    }

    initGameState();

    runCodeBtn.addEventListener('click', () => {
        const userCode = codeEditor.value;
        if (userCode) {
            handlePlayerTurn(userCode);
        } else {
            logToConsole('You must write some code to cast a spell!', 'error');
        }
    });
});
