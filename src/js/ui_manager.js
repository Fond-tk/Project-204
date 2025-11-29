import { animate } from "https://cdn.jsdelivr.net/npm/motion@10.17.0/+esm";
import { GRIMOIRE_CHAPTERS } from "./grimoire_data.js";

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
    levelIndicator: document.getElementById('level-indicator'),
    storyBoxText: document.getElementById('story-box-text'),
    enemyName: document.getElementById('enemy-name'),
    
    // Grimoire
    grimoireOverlay: document.getElementById('grimoire-overlay'),
    grimoireToggleBtn: document.getElementById('grimoire-toggle-btn'),
    closeGrimoireBtn: document.getElementById('close-grimoire-btn'),
    grimoireList: document.getElementById('grimoire-list'),
    docTitle: document.getElementById('doc-title'),
    docContent: document.getElementById('doc-content'),

    // Level Select
    levelSelectBtn: document.getElementById('level-select-btn'),
    levelSelectOverlay: document.getElementById('level-select-overlay'),
    closeLevelBtn: document.getElementById('close-level-btn'),
    levelGrid: document.getElementById('level-grid'),

    // Level Up
    levelUpOverlay: document.getElementById('level-up-overlay'),
    levelUpContinueBtn: document.getElementById('level-up-continue-btn'),
    levelUpHpStatus: document.getElementById('level-up-hp-status') // --- NEW ID
};

// --- UPDATED: Accepts healedAmount to change text ---
export function showLevelUpModal(callback, healedAmount = 0) {
    if (elements.levelUpOverlay && elements.levelUpContinueBtn) {
        
        // Update HP Text based on heal result
        if (elements.levelUpHpStatus) {
            if (healedAmount > 0) {
                elements.levelUpHpStatus.textContent = `RECOVERED (+${healedAmount})`;
                elements.levelUpHpStatus.className = "text-green-400 font-mono font-bold";
            } else {
                elements.levelUpHpStatus.textContent = "PERSISTENT (No Heal)";
                elements.levelUpHpStatus.className = "text-red-400 font-mono font-bold";
            }
        }

        elements.levelUpOverlay.classList.remove('hidden');
        
        const newBtn = elements.levelUpContinueBtn.cloneNode(true);
        elements.levelUpContinueBtn.parentNode.replaceChild(newBtn, elements.levelUpContinueBtn);
        elements.levelUpContinueBtn = newBtn;

        elements.levelUpContinueBtn.addEventListener('click', () => {
            elements.levelUpOverlay.classList.add('hidden');
            if (callback) callback();
        });
    }
}

// ... (Rest of file is identical to previous) ...
export function initLevelSelectUI(isMapUnlocked, onLevelSelect) {
    if (!elements.levelSelectBtn) return;

    const newBtn = elements.levelSelectBtn.cloneNode(true);
    elements.levelSelectBtn.parentNode.replaceChild(newBtn, elements.levelSelectBtn);
    elements.levelSelectBtn = newBtn;

    const currentText = document.getElementById('level-indicator') ? document.getElementById('level-indicator').textContent : "1-1";
    
    elements.levelSelectBtn.innerHTML = `<span>Chapter <span id="level-indicator" class="text-amber-400 font-bold">${currentText}</span></span> <i data-lucide="map" class="w-3 h-3 ml-2"></i>`;
    elements.levelSelectBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    elements.levelSelectBtn.classList.add('hover:bg-slate-700', 'cursor-pointer');
    
    if(window.lucide) lucide.createIcons();

    elements.levelSelectBtn.addEventListener('click', () => {
        elements.levelSelectOverlay.classList.remove('hidden');
        renderLevelGrid();
    });

    const newClose = elements.closeLevelBtn.cloneNode(true);
    elements.closeLevelBtn.parentNode.replaceChild(newClose, elements.closeLevelBtn);
    elements.closeLevelBtn = newClose;
    
    elements.closeLevelBtn.addEventListener('click', () => {
        elements.levelSelectOverlay.classList.add('hidden');
    });

    function renderLevelGrid() {
        if (!elements.levelGrid) return;
        elements.levelGrid.innerHTML = ''; 

        if (!isMapUnlocked) {
            elements.levelGrid.className = "flex flex-col items-center justify-center h-64 text-center space-y-4";
            elements.levelGrid.innerHTML = `
                <div class="p-4 bg-slate-800/50 rounded-full border border-slate-700">
                    <i data-lucide="lock" class="w-8 h-8 text-slate-500"></i>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-slate-300">World Map Locked</h3>
                    <p class="text-slate-500 text-sm mt-1">Complete the Chronicles (Chapter 4-5) to unlock stage selection.</p>
                </div>
            `;
            if(window.lucide) lucide.createIcons();
            return;
        }

        elements.levelGrid.className = "grid grid-cols-5 gap-3 w-full";
        for (let i = 0; i < 20; i++) {
            const btn = document.createElement('button');
            const chapter = Math.floor(i / 5) + 1;
            const stage = (i % 5) + 1;
            
            btn.className = `p-3 rounded-lg border text-sm font-bold transition-all bg-slate-800 border-slate-600 hover:bg-cyan-900/50 hover:border-cyan-500 text-cyan-400`;
            btn.textContent = `${chapter}-${stage}`;

            btn.onclick = () => {
                elements.levelSelectOverlay.classList.add('hidden');
                onLevelSelect(i); 
            };

            elements.levelGrid.appendChild(btn);
        }
    }
}

export function updateEnemyName(name) {
    if (elements.enemyName) elements.enemyName.textContent = name;
}

export function initGrimoireUI() {
    if (!elements.grimoireToggleBtn) return;

    const newBtn = elements.grimoireToggleBtn.cloneNode(true);
    elements.grimoireToggleBtn.parentNode.replaceChild(newBtn, elements.grimoireToggleBtn);
    elements.grimoireToggleBtn = newBtn;

    elements.grimoireToggleBtn.addEventListener('click', () => {
        elements.grimoireOverlay.classList.remove('hidden');
        renderGrimoireList();
    });

    const newClose = elements.closeGrimoireBtn.cloneNode(true);
    elements.closeGrimoireBtn.parentNode.replaceChild(newClose, elements.closeGrimoireBtn);
    elements.closeGrimoireBtn = newClose;

    elements.closeGrimoireBtn.addEventListener('click', () => {
        elements.grimoireOverlay.classList.add('hidden');
    });

    function renderGrimoireList() {
        if (!elements.grimoireList) return;
        elements.grimoireList.innerHTML = ''; 

        GRIMOIRE_CHAPTERS.forEach(chapter => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.className = "w-full text-left px-4 py-3 rounded-lg hover:bg-purple-900/30 text-slate-300 hover:text-purple-300 transition-colors text-sm font-medium border border-transparent hover:border-purple-500/30";
            btn.textContent = chapter.title;
            
            btn.onclick = () => {
                Array.from(elements.grimoireList.children).forEach(c => c.firstChild.classList.remove('bg-purple-900/50', 'text-purple-300', 'border-purple-500/50'));
                btn.classList.add('bg-purple-900/50', 'text-purple-300', 'border-purple-500/50');
                elements.docTitle.textContent = chapter.title;
                elements.docContent.innerHTML = chapter.content;
            };

            li.appendChild(btn);
            elements.grimoireList.appendChild(li);
        });
    }
}

export function updateStoryDisplay(text) {
    if (elements.storyBoxText) {
        animate(elements.storyBoxText, { opacity: 0 }, { duration: 0.2 }).finished.then(() => {
            elements.storyBoxText.textContent = text;
            animate(elements.storyBoxText, { opacity: 1 }, { duration: 0.5 });
        });
    }
}

export function updateLevelDisplay(chapter, stage) {
    const indicator = document.getElementById('level-indicator');
    if (indicator) {
        indicator.textContent = `${chapter}-${stage}`;
    }
}

export function clearCodeEditor() {
    if (elements.codeEditor) elements.codeEditor.value = '';
}

export function updateTaskDisplay(description) {
    if (elements.currentTaskDesc) {
        elements.currentTaskDesc.textContent = description;
        animate(elements.currentTaskDesc, { scale: [1.1, 1] }, { duration: 0.3 });
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