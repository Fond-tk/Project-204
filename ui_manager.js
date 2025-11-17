

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
    failAttackEffect: document.getElementById('fail-attack-effect')
};

export function updateHealthBar(target, percentage, currentHp, maxHp) {
    const bar = target === 'player' ? elements.playerHealthBar : elements.enemyHealthBar;
    const text = target === 'player' ? elements.playerHpText : elements.enemyHpText;

    if (bar && text) {
        animate(bar, {
            width: `${percentage}%`
        }, {
            duration: 0.5,
            ease: "easeOut"
        });
        text.textContent = `${Math.round(currentHp)} / ${maxHp}`;
    }
}

export function logToConsole(message, type = 'info') {
    if (!elements.consoleOutput) return;

    const p = document.createElement('p');
    p.textContent = `> ${message}`;

    switch (type) {
        case 'success':
            p.className = 'text-green-400';
            break;
        case 'error':
            p.className = 'text-red-400';
            break;
        case 'system':
            p.className = 'text-fuchsia-400';
            break;
        case 'info':
            p.className = 'text-cyan-400';
            break;
        case 'enemy':
            p.className = 'text-yellow-400';
            break;
        case 'damage':
            p.className = 'text-orange-500';
            break;
        case 'victory':
            p.className = 'text-lime-300 font-bold';
            break;
        case 'defeat':
            p.className = 'text-rose-500 font-bold';
            break;
        default:
            p.className = 'text-slate-300';
    }

    elements.consoleOutput.appendChild(p);
    elements.consoleOutput.scrollTop = elements.consoleOutput.scrollHeight;
}


export function toggleRunButton(enabled) {
    if (elements.runCodeBtn) {
        elements.runCodeBtn.disabled = !enabled;
    }
}

export function animateAttack(attacker, target, resultType) {
    const targetElement = target === 'player' ? elements.playerCharacter : elements.enemyCharacter;

    if (targetElement) {
        if (attacker === 'player') {
            animate([
                [elements.playerCharacter, { x: 50, scale: 1.1 }, { duration: 0.2, ease: 'easeOut' }],
                [elements.playerCharacter, { x: 0, scale: 1 }, { duration: 0.5, ease: 'spring' }]
            ]);
        }
        
        setTimeout(() => {
            const effectElement = resultType === 'success' ? elements.successAttackEffect : elements.failAttackEffect;
            if (effectElement) {
                effectElement.style.display = 'block';
                animate(effectElement, 
                    { opacity: [1, 0] }, 
                    { 
                        duration: 0.8, 
                        onComplete: () => {
                            effectElement.style.display = 'none';
                        }
                    }
                );
            }

            targetElement.classList.add('attack-anim');
            targetElement.addEventListener('animationend', () => {
                targetElement.classList.remove('attack-anim');
            }, { once: true });
        }, 200);
    }
}

export function showGameStatus(message) {
    const statusDiv = document.createElement('div');
    statusDiv.textContent = message;
    statusDiv.className = 'absolute inset-0 flex items-center justify-center text-6xl font-bold z-10 text-white';
    statusDiv.style.textShadow = '0 0 20px #000';
    statusDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
    
    if(message === "You Win!") {
        statusDiv.style.color = '#22d3ee'; // สี Victory
        // Animation ตอน Victory
        statusDiv.style.animation = 'victory-anim 1s ease-out forwards';
    } else {
        statusDiv.style.color = '#f43f5e'; // สี Defeat
        statusDiv.style.animation = 'defeat-anim 1s ease-out forwards';
    }

    document.querySelector('.lg\\:col-span-8.panel').appendChild(statusDiv);
}

