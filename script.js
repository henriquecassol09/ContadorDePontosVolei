// Variáveis globais
let scoreA = 0; // Pontos do Time A no set atual
let scoreB = 0; // Pontos do Time B no set atual
let currentSet = 1; // Set atual (de 1 a 3)
let setsWonA = 0; // Sets ganhos pelo Time A
let setsWonB = 0; // Sets ganhos pelo Time B
let previousWinner = null; // Vencedor do set anterior ('A', 'B' ou null)
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
    
    checkSetWinner(); // Verifica se o set terminou
}

// Função para verificar o vencedor do set
function checkSetWinner() {
    if ((scoreA >= 25 && scoreA >= scoreB + 2) || (scoreB >= 25 && scoreB >= scoreA + 2)) {
        let currentWinner = (scoreA > scoreB) ? 'A' : 'B';
        
        if (currentWinner === 'A') {
            setsWonA++;
            document.getElementById('setsA').textContent = setsWonA;
            showMessage('Time A venceu o set ' + currentSet + '!');
        } else {
            setsWonB++;
            document.getElementById('setsB').textContent = setsWonB;
            showMessage('Time B venceu o set ' + currentSet + '!');
        }
        
        // Verifica se o vencedor atual ganhou o set anterior
        if (currentWinner === previousWinner) {
            showMessage(`Time ${currentWinner} venceu a partida por ganhar 2 sets seguidos!`);
            setTimeout(resetGame, 5000);  // Reinicia automaticamente após 5 segundos
            return;  // Encerra o jogo aqui
        } else {
            previousWinner = currentWinner;  // Atualiza o vencedor anterior
        }
        
        // Reinicia os pontos para o próximo set
        scoreA = 0;
        scoreB = 0;
        document.getElementById('scoreA').textContent = scoreA;
        document.getElementById('scoreB').textContent = scoreB;
        
        if (currentSet < 3) {
            currentSet++;
            document.getElementById('currentSet').textContent = currentSet + '/3';
        } else if (currentSet === 3) {
            determineMatchWinner();  // Verifica o vencedor após o terceiro set
        }
    }
}

// Função para determinar o vencedor da partida (apenas após 3 sets)
function determineMatchWinner() {
    if (setsWonA > setsWonB) {
        showMessage('Time A venceu a partida!');
    } else if (setsWonB > setsWonA) {
        showMessage('Time B venceu a partida!');
    } else {
        showMessage('A partida empatou! Cada time ganhou sets iguais.');
    }
    
    setTimeout(resetGame, 5000);  // Reinicia automaticamente após 5 segundos
}

// Função para exibir mensagens
function showMessage(message) {
    messageDiv.textContent = message;
    messageDiv.classList.add('visible');
    setTimeout(() => {
        messageDiv.classList.remove('visible');
    }, 3000);
}

// Função para reiniciar o jogo
function resetGame() {
    scoreA = 0;
    scoreB = 0;
    currentSet = 1;
    setsWonA = 0;
    setsWonB = 0;
    previousWinner = null;  // Reseta o rastreamento de vencedor anterior
    
    document.getElementById('scoreA').textContent = scoreA;
    document.getElementById('scoreB').textContent = scoreB;
    document.getElementById('currentSet').textContent = currentSet + '/3';
    document.getElementById('setsA').textContent = setsWonA;
    document.getElementById('setsB').textContent = setsWonB;
    messageDiv.classList.remove('visible');
}

// Adiciona eventos aos botões
document.getElementById('btnPointA').addEventListener('click', () => addPoint('A'));
document.getElementById('btnPointB').addEventListener('click', () => addPoint('B'));
document.getElementById('btnReset').addEventListener('click', resetGame);