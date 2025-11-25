let teamAName = "Time A"
let teamBName = "Time B"
let scoreA = 0
let scoreB = 0
let scoresA = ["", "", ""]
let scoresB = ["", "", ""]
let currentSet = 1
let setsWonA = 0
let setsWonB = 0
let previousWinner = null
const messageDiv = document.getElementById("message")
const teamAHeader = document.getElementById("teamAHeader")
const teamBHeader = document.getElementById("teamBHeader")
const setA1 = document.getElementById("setA1")
const setA2 = document.getElementById("setA2")
const setA3 = document.getElementById("setA3")
const setB1 = document.getElementById("setB1")
const setB2 = document.getElementById("setB2")
const setB3 = document.getElementById("setB3")

teamAHeader.addEventListener("click", () => makeEditable(teamAHeader, "A"))
teamBHeader.addEventListener("click", () => makeEditable(teamBHeader, "B"))

function makeEditable(element, team) {
  const input = document.createElement("input")
  input.type = "text"
  input.value = element.textContent
  input.className = "rename-input"
  element.textContent = ""
  element.appendChild(input)
  input.focus()

  input.addEventListener("blur", () => saveName(element, team, input.value))
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveName(element, team, input.value)
  })
}

function saveName(element, team, newName) {
  if (team === "A") {
    teamAName = newName || "Time A"
    element.textContent = teamAName
  } else {
    teamBName = newName || "Time B"
    element.textContent = teamBName
  }
}

function addPoint(team) {
  if (team === "A") {
    scoreA++
    document.getElementById("scoreA").textContent = scoreA
  } else if (team === "B") {
    scoreB++
    document.getElementById("scoreB").textContent = scoreB
  }
  checkSetWinner()
}

function subtractPoint(team) {
  if (team === "A" && scoreA > 0) {
    scoreA--
    document.getElementById("scoreA").textContent = scoreA
  } else if (team === "B" && scoreB > 0) {
    scoreB--
    document.getElementById("scoreB").textContent = scoreB
  }
}

function checkSetWinner() {
  if ((scoreA >= 25 && scoreA >= scoreB + 2) || (scoreB >= 25 && scoreB >= scoreA + 2)) {
    const currentWinner = scoreA > scoreB ? "A" : "B"
    const winnerName = currentWinner === "A" ? teamAName : teamBName

    if (currentWinner === "A") {
      setsWonA++
      document.getElementById("setsA").textContent = setsWonA
      scoresA[currentSet - 1] = scoreA
      scoresB[currentSet - 1] = scoreB
      showMessage(`${teamAName} venceu o set ${currentSet}!`, "#003366")
    } else {
      setsWonB++
      document.getElementById("setsB").textContent = setsWonB
      scoresA[currentSet - 1] = scoreA
      scoresB[currentSet - 1] = scoreB
      showMessage(`${teamBName} venceu o set ${currentSet}!`, "#dc3545")
    }

    updateSetBlocks()

    if (currentWinner === previousWinner) {
      showMessage(
        `${winnerName} venceu a partida por ganhar 2 sets seguidos!`,
        currentWinner === "A" ? "#003366" : "#dc3545",
      )
      setTimeout(resetGame, 5000)
      return
    } else {
      previousWinner = currentWinner
    }

    scoreA = 0
    scoreB = 0
    document.getElementById("scoreA").textContent = scoreA
    document.getElementById("scoreB").textContent = scoreB

    if (currentSet < 3) {
      currentSet++
      document.getElementById("currentSet").textContent = currentSet + "/3"
    } else if (currentSet === 3) {
      determineMatchWinner()
    }
  }
}

function updateSetBlocks() {
  setA1.textContent = scoresA[0]
  setA2.textContent = scoresA[1]
  setA3.textContent = scoresA[2]
  setB1.textContent = scoresB[0]
  setB2.textContent = scoresB[1]
  setB3.textContent = scoresB[2]
}

function determineMatchWinner() {
  if (setsWonA > setsWonB) {
    showMessage(`${teamAName} venceu a partida!`, "#003366")
  } else if (setsWonB > setsWonA) {
    showMessage(`${teamBName} venceu a partida!`, "#dc3545")
  } else {
    showMessage("A partida empatou!", "white")
  }
  setTimeout(resetGame, 5000)
}

function showMessage(message, color) {
  messageDiv.textContent = message
  messageDiv.style.color = color
  messageDiv.classList.add("visible")
  setTimeout(() => messageDiv.classList.remove("visible"), 3000)
}

function resetGame() {
  scoreA = 0
  scoreB = 0
  currentSet = 1
  setsWonA = 0
  setsWonB = 0
  previousWinner = null
  scoresA = ["", "", ""]
  scoresB = ["", "", ""]
  updateSetBlocks()
  document.getElementById("scoreA").textContent = scoreA
  document.getElementById("scoreB").textContent = scoreB
  document.getElementById("setsA").textContent = setsWonA
  document.getElementById("setsB").textContent = setsWonB
  document.getElementById("currentSet").textContent = currentSet + "/3"
  messageDiv.classList.remove("visible")
  messageDiv.style.color = "white"
}

// Eventos
document.getElementById("btnPointA").addEventListener("click", () => addPoint("A"))
document.getElementById("btnSubtractPointA").addEventListener("click", () => subtractPoint("A"))
document.getElementById("btnPointB").addEventListener("click", () => addPoint("B"))
document.getElementById("btnSubtractPointB").addEventListener("click", () => subtractPoint("B"))
document.getElementById("btnReset").addEventListener("click", resetGame)
