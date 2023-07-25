async function fetchPlayerData(playerNameOrID) {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const steamids = data.Steamid[0];

    console.log('PlayerNameOrID:', playerNameOrID); // Debugging line

    for (const steamid in steamids) {
      const playerInfo = steamids[steamid];
      console.log('SteamID:', steamid, 'PlayerInfo:', playerInfo); // Debugging line

      if (
        playerInfo &&
        playerInfo.Name && typeof playerInfo.Name === "string" &&
        (playerInfo.Name.toLowerCase() === playerNameOrID.toLowerCase() ||
          steamid === playerNameOrID)
      ) {
        console.log('PlayerData:', playerInfo); // Debugging line
        return {
          'User ID': steamid,
          'Name': playerInfo.Name,
          'Playtime': round(playerInfo.Playtime / 3600, 1),
          'Points': round(playerInfo.Points, 0),
          'Lives': playerInfo.Lives,
          'Weight': playerInfo.Weight
        };
      }
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}


  
  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
  
  async function search() {
    const resultArea = document.getElementById('resultArea');
    const input = document.getElementById('playerInput').value.trim();
    console.log("Button clicked!"); // Add this line for testing
    if (!input) {
      resultArea.innerHTML = "<h2>Player Data</h2><p>Please enter a name or ID.</p>";
      return;
    }
  
    const playerData = await fetchPlayerData(input);
    if (playerData) {
      resultArea.innerHTML = `
        <h2>Player Data</h2>
        <p>Name: ${playerData.Name}</p>
        <p>User ID: ${playerData['User ID']}</p>
        <p>Playtime: ${playerData.Playtime} hours</p>
        <p>Points: ${playerData.Points}</p>
        <p>Lives: ${playerData.Lives}</p>
        <p>Weight: ${playerData.Weight}</p>
      `;
    } else {
      resultArea.innerHTML = "<h2>Player Data</h2><p>No data found.</p>";
    }
  }
  
