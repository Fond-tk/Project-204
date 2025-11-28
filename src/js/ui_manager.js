import { animate } from "https://cdn.jsdelivr.net/npm/motion@10.17.0/+esm";

const elements = {
    playerHealthBar: document.getElementById('player-health-bar'),
    enemyHealthBar: document.getElementById('enemy-health-bar'),
    playerHpText: document.getElementById('player-hp-text'),
    enemyHpText: document.getElementById('enemy-hp-text'),
    consoleOutput: document.getElementById('console-output'),
    runCodeBtn: document.getElementById('run-code-btn'),
    playerCharacter: document.getElementById('player-character'),
    enemyCharacter: document.getElementById('enemy-character'),
    successAttackEffect: document.getElementById('success-attack-effect'),
    failAttackEffect: document.getElementById('fail-attack-effect'),
    gameStatusOverlay: document.getElementById('game-status-overlay'),
    currentTaskDesc: document.getElementById('current-task-desc'),
    codeEditor: document.getElementById('code-editor'),
    levelIndicator: document.getElementById('level-indicator') 
};

export function updateLevelDisplay(stageNumber) {
    if (elements.levelIndicator) {
        elements.levelIndicator.textContent = `1-${stageNumber}`;
    }
}

export function clearCodeEditor() {
    if (elements.codeEditor) elements.codeEditor.value = '';
}

export function updateTaskDisplay(description) {
    if (elements.currentTaskDesc) {
        elements.currentTaskDesc.textContent = description;
        animate(elements.currentTaskDesc, { scale: [1.2, 1] }, { duration: 0.3 });
    }
}

export function setCharacterImage(type, imagePath) {
    const el = type === 'player' ? elements.playerCharacter : elements.enemyCharacter;
    if (el) el.src = imagePath;
}

export function updateHealthBar(target, percentage, currentHp, maxHp) {
    const bar = target === 'player' ? elements.playerHealthBar : elements.enemyHealthBar;
    const text = target === 'player' ? elements.playerHpText : elements.enemyHpText;

    if (bar && text) {
        animate(bar, { width: `${percentage}%` }, { duration: 0.5, ease: "easeOut" });
        text.textContent = `${Math.round(currentHp)} / ${maxHp}`;
    }
}

export function logToConsole(message, type = 'info') {
    if (!elements.consoleOutput) return;

    const p = document.createElement('p');
    p.textContent = `> ${message}`;

    switch (type) {
        case 'success': p.className = 'text-green-400 font-bold'; break;
        case 'error': p.className = 'text-red-400'; break;
        case 'system': p.className = 'text-fuchsia-400'; break;
        case 'info': p.className = 'text-cyan-400'; break;
        case 'enemy': p.className = 'text-yellow-400'; break;
        case 'damage': p.className = 'text-orange-500'; break;
        case 'victory': p.className = 'text-lime-300 font-bold text-lg'; break;
        case 'defeat': p.className = 'text-rose-500 font-bold text-lg'; break;
        default: p.className = 'text-slate-300';
    }

    elements.consoleOutput.appendChild(p);
    elements.consoleOutput.scrollTop = elements.consoleOutput.scrollHeight;
}

export function toggleRunButton(enabled) {
    if (elements.runCodeBtn) {
        elements.runCodeBtn.disabled = !enabled;
        elements.runCodeBtn.style.opacity = enabled ? '1' : '0.5';
        elements.runCodeBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
    }
}

export function animateAttack(attacker, target, resultType) {
    const targetElement = target === 'player' ? elements.playerCharacter : elements.enemyCharacter;
    const attackerElement = attacker === 'player' ? elements.playerCharacter : elements.enemyCharacter;

    if (attackerElement && targetElement) {
        const direction = attacker === 'player' ? 50 : -50;
        animate(attackerElement, { x: [0, direction, 0], scale: [1, 1.1, 1] }, { duration: 0.4, ease: 'easeOut' });
        
        setTimeout(() => {
            const effectElement = resultType === 'success' ? elements.successAttackEffect : elements.failAttackEffect;
            if (effectElement) {
                effectElement.style.display = 'block';
                animate(effectElement, { opacity: [1, 0] }, { duration: 0.8, onComplete: () => { effectElement.style.display = 'none'; }});
            }

            if(resultType === 'success') {
                targetElement.classList.add('shake');
                animate(targetElement, { filter: ["brightness(1)", "brightness(2) sepia(1) hue-rotate(-50deg)", "brightness(1)"] }, { duration: 0.3 });
                setTimeout(() => targetElement.classList.remove('shake'), 500);
            }
        }, 200);
    }
}

export function animateDamage(target) {
    const el = target === 'player' ? elements.playerCharacter : elements.enemyCharacter;
    if (el) {
        el.classList.add('shake');
        animate(el, { 
            filter: ["brightness(1)", "brightness(2) sepia(1) hue-rotate(-50deg)", "brightness(1)"] 
        }, { duration: 0.3 });
        setTimeout(() => el.classList.remove('shake'), 500);
    }
}

// --- UPDATED FUNCTION ---
export function showGameStatus(titleText, subText, isVictory) {
    let statusDiv = document.getElementById('game-status-overlay');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'game-status-overlay';
        statusDiv.className = 'absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-900/90 backdrop-blur-sm';
        document.body.appendChild(statusDiv);
    }
    statusDiv.innerHTML = ''; 
    statusDiv.classList.remove('hidden');

    const title = document.createElement('h2');
    title.textContent = titleText;
    title.className = 'text-6xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]';
    
    const sub = document.createElement('p');
    sub.textContent = subText;
    sub.className = 'text-xl text-slate-300 mb-8';

    if(isVictory) {
        title.style.color = '#22d3ee'; 
    } else {
        title.style.color = '#f43f5e'; 
    }
    
    const reloadBtn = document.createElement('button');
    reloadBtn.textContent = "Play Again";
    reloadBtn.className = "px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-cyan-500/50";
    reloadBtn.onclick = () => location.reload();
    statusDiv.appendChild(title);
    statusDiv.appendChild(sub);
    statusDiv.appendChild(reloadBtn);
}