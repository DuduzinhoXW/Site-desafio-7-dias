// Dados dos desafios e imagens
const challenges = {
    day1: ["Beber 2 litros de água", "Comer 3 porções de frutas", "Evitar refrigerantes"],
    day2: ["Incluir vegetais no almoço e jantar", "Fazer um suco natural", "Reduzir açúcar no café"],
    day3: ["Consumir proteína magra", "Substituir lanche industrializado", "Comer devagar"],
    day4: ["Experimentar vegetal novo", "Refeição sem fritura", "Anotar tudo que comeu"],
    day5: ["Salada colorida (3 cores)", "Água antes das refeições", "Evitar doces após almoço"],
    day6: ["6 refeições pequenas", "Carboidratos integrais", "Dormir 7 horas"],
    day7: ["Planejar refeições semana", "Cozinhar receita nova", "Refletir sobre mudanças"]
};

const dayImages = [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
];

// Elementos do DOM
const daysContainer = document.getElementById('daysContainer');
const warningModal = document.getElementById('warningModal');
const warningMessage = document.getElementById('warningMessage');

// Inicialização
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Limpa o localStorage para resetar o progresso
    localStorage.removeItem('challengeProgress');
    localStorage.removeItem('completedDays');
    
    createDayButtons();
    updateDayButtons();
}

function createDayButtons() {
    daysContainer.innerHTML = '';
    
    for (let i = 1; i <= 7; i++) {
        const button = document.createElement('button');
        button.className = 'day-btn';
        button.textContent = `Dia ${i}`;
        button.style.setProperty('--bg-image', `url(${dayImages[i-1]})`);
        button.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), url(${dayImages[i-1]})`;
        
        button.addEventListener('click', () => handleDayClick(i));
        daysContainer.appendChild(button);
    }
}

function handleDayClick(day) {
    const completedDays = getCompletedDays();
    const isLocked = day > 1 && !completedDays.includes(day - 1);

    if (isLocked) {
        showWarning(`Complete o dia ${day-1} primeiro!`);
        return;
    }
    openModal(day);
}

function openModal(day) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const progress = getProgress();
    const dayProgress = progress[`day${day}`] || [];
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2 style="color: var(--verde-escuro);">Desafios do Dia ${day}</h2>
            <div class="challenges-list">
                ${challenges[`day${day}`].map((challenge, index) => `
                    <div class="challenge-item">
                        <input type="checkbox" id="day${day}-challenge${index}" 
                            ${dayProgress[index] ? 'checked' : ''}>
                        <label for="day${day}-challenge${index}">${challenge}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Adiciona eventos aos checkboxes
    challenges[`day${day}`].forEach((_, index) => {
        const checkbox = modal.querySelector(`#day${day}-challenge${index}`);
        checkbox.addEventListener('change', (e) => {
            saveProgress(day, index, e.target.checked);
        });
    });

    // Fecha o modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
        updateDayButtons();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            updateDayButtons();
        }
    });
}

// Sistema de progresso
function getProgress() {
    return JSON.parse(localStorage.getItem('challengeProgress')) || {};
}

function getCompletedDays() {
    return JSON.parse(localStorage.getItem('completedDays')) || [];
}

function saveProgress(day, index, completed) {
    const progress = getProgress();
    if (!progress[`day${day}`]) progress[`day${day}`] = [];
    progress[`day${day}`][index] = completed;
    localStorage.setItem('challengeProgress', JSON.stringify(progress));
    checkDayCompletion(day);
}

function checkDayCompletion(day) {
    const progress = getProgress();
    const dayProgress = progress[`day${day}`] || [];
    const allCompleted = dayProgress.length === 3 && dayProgress.every(Boolean);
    
    if (allCompleted) {
        const completedDays = getCompletedDays();
        if (!completedDays.includes(day)) {
            completedDays.push(day);
            localStorage.setItem('completedDays', JSON.stringify(completedDays));
            
            // Verifica se completou todos os dias
            if (completedDays.length === 7) {
                setTimeout(showCongratulations, 1000);
            }
        }
    }
    updateDayButtons();
}

function updateDayButtons() {
    const completedDays = getCompletedDays();
    document.querySelectorAll('.day-btn').forEach((btn, index) => {
        const day = index + 1;
        const isCompleted = completedDays.includes(day);
        const isLocked = day > 1 && !completedDays.includes(day - 1);
        
        btn.classList.toggle('completed', isCompleted);
        btn.classList.toggle('locked', isLocked && !isCompleted);
    });
}

function showWarning(message) {
    warningMessage.textContent = message;
    warningModal.style.display = 'block';
    
    warningModal.querySelector('.close-btn').onclick = () => {
        warningModal.style.display = 'none';
    };
    
    window.onclick = (e) => {
        if (e.target === warningModal) {
            warningModal.style.display = 'none';
        }
    };
}

function showCongratulations() {
    const congratsModal = document.getElementById('congratsModal');
    congratsModal.style.display = 'block';
    
    // Dispara fogos de artifício
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    // Repete os fogos a cada segundo
    const interval = setInterval(() => {
        confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.6 }
        });
    }, 1000);
    
    // Fecha o modal
    document.getElementById('closeCongrats').onclick = () => {
        clearInterval(interval);
        congratsModal.style.display = 'none';
    };
    
    window.onclick = (e) => {
        if (e.target === congratsModal) {
            clearInterval(interval);
            congratsModal.style.display = 'none';
        }
    };
}