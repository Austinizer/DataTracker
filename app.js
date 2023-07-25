const playerData = {};

async function fetchPlayerData(playerNameOrID) {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    playerData.Steamid = data.Steamid[0];

    return playerData.Steamid[playerNameOrID] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function updateSuggestions(inputValue) {
  const suggestionsArea = document.getElementById('suggestionsArea');
  const filteredNames = playerNames.filter((name) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const suggestionsList = filteredNames
    .map((name) => `<div class="suggestion">${name}</div>`)
    .join('');

  suggestionsArea.innerHTML = suggestionsList;
}

function populatePlayerList() {
  const playerList = document.getElementById('playerList');
  const listItems = playerNames
    .map((name) => `<li>${name}</li>`)
    .join('');

  playerList.innerHTML = listItems;
}

async function search() {
  const resultArea = document.getElementById('resultArea');
  const input = document.getElementById('playerInput').value.trim();

  if (!input) {
    resultArea.innerHTML = "<h2>Player Data</h2><p>Please enter a name or ID.</p>";
    return;
  }

  const playerInfo = await fetchPlayerData(input);
  if (playerInfo) {
    resultArea.innerHTML = `
      <h2>Player Data</h2>
      <p>Name: ${playerInfo.Name}</p>
      <p>User ID: ${playerInfo.User}</p>
      <p>Playtime: ${playerInfo.Playtime} hours</p>
      <p>Points: ${playerInfo.Points}</p>
      <p>Lives: ${playerInfo.Lives}</p>
      <p>Weight: ${playerInfo.Weight}</p>
    `;
  } else {
    resultArea.innerHTML = "<h2>Player Data</h2><p>No data found.</p>";
  }
}

document.getElementById('playerInput').addEventListener('input', (event) => {
  const inputValue = event.target.value.trim();
  updateSuggestions(inputValue);
});

document.getElementById('playerInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search();
  }
});

document.getElementById('suggestionsArea').addEventListener('click', (event) => {
  const clickedSuggestion = event.target.textContent.trim();
  document.getElementById('playerInput').value = clickedSuggestion;
  updateSuggestions('');
  search();
});

document.getElementById('playerList').addEventListener('click', (event) => {
  if (event.target.nodeName === 'LI') {
    document.getElementById('playerInput').value = event.target.textContent.trim();
    search();
  }
});

async function fetchPlayerNamesFromData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    playerData.Steamid = data.Steamid[0];
    playerNames = Object.values(playerData.Steamid).map(playerInfo => playerInfo.Name);
    populatePlayerList();
  } catch (error) {
    console.error(error);
  }
}

let playerNames = [];
fetchPlayerNamesFromData();
