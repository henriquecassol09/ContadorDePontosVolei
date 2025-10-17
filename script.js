// Variáveis globais
let scoreA = 0;
let scoreB = 0;
let currentSet = 1;
let setsWonA = 0;
let setsWonB = 0;
let previousWinner = null;
const messageDiv = document.getElementById('message');

// Função para adicionar ponto
function addPoint(team) {
    if (team === 'A') {
        scoreA++;
        document.getElementById('scoreA').textContent = scoreA;
    } else if (team === 'B') {
        scoreB++;
        document.getElementById('scoreB').textContent = scoreB;
    }
    checkSetWinner();
}

// Função para subtrair ponto
function subtractPoint(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
        document.getElementById('scoreA').textContent = scoreA;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
        document.getElementById('scoreB').textContent = scoreB;
    }
}

// Resto das funções
function checkSetWinner() {
    if ((scoreA >= 25 && scoreA >= scoreB + 2) || (scoreB >= 25 && scoreB >= scoreA + 2)) {
        let currentWinner = (scoreA > scoreB) ? 'A' : 'B';
        
        if (currentWinner === 'A') {
            setsWonA++;
            document.getElementById('setsA').textContent = setsWonA;
            showMessage('Time A venceu o set ' + currentSet + '!', '#003366');  // Cor do Time A
        } else {
            setsWonB++;
            document.getElementById('setsB').textContent = setsWonB;
            showMessage('Time B venceu o set ' + currentSet + '!', '#dc3545');  // Cor do Time B
        }
        
        if (currentWinner === previousWinner) {
            showMessage(`Time ${currentWinner} venceu a partida por ganhar 2 sets seguidos!`, currentWinner === 'A' ? '#003366' : '#dc3545');
            setTimeout(resetGame, 5000);
            return;
        } else {
            previousWinner = currentWinner;
        }
        
        scoreA = 0;
        scoreB = 0;
        document.getElementById('scoreA').textContent = scoreA;
        document.getElementById('scoreB').textContent = scoreB;
        
        if (currentSet < 3) {
            currentSet++;
            document.getElementById('currentSet').textContent = currentSet + '/3';
        } else if (currentSet === 3) {
            determineMatchWinner();
        }
    }
}

function determineMatchWinner() {
    if (setsWonA > setsWonB) {
        showMessage('Time A venceu a partida!', '#003366');
    } else if (setsWonB > setsWonA) {
        showMessage('Time B venceu a partida!', '#dc3545');
    } else {
        showMessage('A partida empatou!', 'white');  // Cor padrão para empate
    }
    setTimeout(resetGame, 5000);
}

function showMessage(message, color) {
    messageDiv.textContent = message;
    messageDiv.style.color = color;  // Define a cor com base no time
    messageDiv.classList.add('visible');
    setTimeout(() => messageDiv.classList.remove('visible'), 3000);
}

function resetGame() {
    scoreA = 0;
    scoreB = 0;
    currentSet = 1;
    setsWonA = 0;
    setsWonB = 0;
    previousWinner = null;
    
    document.getElementById('scoreA').textContent = scoreA;
    document.getElementById('scoreB').textContent = scoreB;
    document.getElementById('currentSet').textContent = currentSet + '/3';
    document.getElementById('setsA').textContent = setsWonA;
    document.getElementById('setsB').textContent = setsWonB;
    messageDiv.classList.remove('visible');
    messageDiv.style.color = 'white';  // Reseta a cor
}

// Eventos
document.getElementById('btnPointA').addEventListener('click', () => addPoint('A'));
document.getElementById('btnSubtractPointA').addEventListener('click', () => subtractPoint('A'));
document.getElementById('btnPointB').addEventListener('click', () => addPoint('B'));
document.getElementById('btnSubtractPointB').addEventListener('click', () => subtractPoint('B'));
document.getElementById('btnReset').addEventListener('click', resetGame);