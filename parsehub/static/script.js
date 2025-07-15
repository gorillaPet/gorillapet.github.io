const socket = io(window.location.origin);




let currentUser = {
  discordId: null,
  username: null,
  balance: null,
};

let isRoundActive = false;
let hasPlacedBet = false;
let cashedOut = false;
let currentMultiplier = 1.0;
let lastCashOut = null;

window.onload = async () => {
  const btn = document.getElementById('placeBetBtn');
  const loginBtn = document.getElementById('loginBtn');

  // Check login session
  const userRes = await fetch('/current_user');
  const userData = await userRes.json();

  if (userData.logged_in) {
    currentUser.discordId = userData.discord_id;
    currentUser.username = userData.username;

    const balanceRes = await fetch(`/get_user/${currentUser.discordId}`);
    const balanceData = await balanceRes.json();
    currentUser.balance = balanceData.balance;
    currentUser.hasBet = balanceData.has_bet;
    updateLoginDisplay();
  }

  // Discord login
  if (!userData.logged_in){
      loginBtn.addEventListener('click', () => {
      window.location.href = "/login";
  });
  }


  // Countdown
  socket.on('countdown', (data) => {
    document.getElementById('bet').textContent = `PLACE BETS: ${data.time}`;
    if (!hasPlacedBet) {
      btn.textContent = "Place Bet";
      btn.className = "";
      btn.disabled = false;
    } else {
      btn.textContent = "Wait...";
      btn.className = "wait";
      btn.disabled = true;
    }
  });

  // Round Start
  socket.on('start_round', () => {
    isRoundActive = true;
    cashedOut = false;

    document.getElementById('bet').textContent = "Game in progress...";
    document.getElementById('mult').textContent = "Starting...";
    const mult = document.getElementById('mult');
    mult.classList.remove('red', 'green', 'blue', 'purple', 'orange');
    if (hasPlacedBet) {
      btn.textContent = "Stop";
      btn.className = "stop";
      btn.disabled = false;
    } else {
      btn.textContent = "Too Late";
      btn.className = "wait";
      btn.disabled = true;
    }
  });

  // Multiplier
  socket.on('multiplier_update', (data) => {
    currentMultiplier = data.multiplier;
    document.getElementById('mult').textContent = `${currentMultiplier}x`;
  });

  // Crash
  socket.on('crash', async (data) => {
    isRoundActive = false;



    if (!userData.error) {
      currentUser.balance = userData.balance;
      currentUser.hasBet = userData.has_bet;
    }
    const crash = data.crash_point;
    document.getElementById('mult').textContent = `${crash}x`;
    document.getElementById('bet').textContent = "Please wait for betting to open.";

    const mult = document.getElementById('mult');
    mult.classList.remove('red', 'green', 'blue', 'purple', 'orange');

    let colorClass = 'orange';
    if (crash === 0) colorClass = 'red';
    else if (crash <= 1.5) colorClass = 'green';
    else if (crash < 2) colorClass = 'blue';
    else if (crash < 3) colorClass = 'purple';

    mult.classList.add(colorClass);

    const crashFeed = document.getElementById('crash-feed');
    const entry = document.createElement('div');
    entry.className = `crash-feed-entry ${colorClass}`;
    entry.textContent = `${crash}x`;
    crashFeed.insertBefore(entry, crashFeed.firstChild);
    if (crashFeed.children.length > 20) crashFeed.removeChild(crashFeed.lastChild);

    if (hasPlacedBet && cashedOut) {
      btn.textContent = `${lastCashOut}x`;
      btn.className = "cashed-out";
    } else if (hasPlacedBet) {
      btn.textContent = "Crashed";
      btn.className = "wait";
    } else {
      btn.textContent = "Place Bet";
      btn.className = "";
    }
    btn.disabled = true;
    hasPlacedBet = false;
    cashedOut = false;
  });

  // Bet Rejected
  socket.on('bet_rejected', (data) => {
    btn.textContent = "Too Late";
    btn.className = "wait";
    btn.disabled = true;
  });

  // Betting Button
  btn.addEventListener('click', () => {
    if (!hasPlacedBet && !isRoundActive) {
      if (currentUser.hasBet) {
        console.log("You already placed a bet.");
        return;
      }
      socket.emit('place_bet');


      btn.textContent = "Wait...";
      btn.className = "wait";
      btn.disabled = true;
    } else if (hasPlacedBet && isRoundActive && !cashedOut) {
      socket.emit('stop_bet');
      cashedOut = true;
      lastCashOut = currentMultiplier;
      btn.textContent = `${lastCashOut}x`;
      btn.className = "cashed-out";
      btn.disabled = true;
    }
  });
    socket.on('bet_accepted', () => {
      hasPlacedBet = true;
      btn.textContent = "Wait...";
      btn.className = "wait";
      btn.disabled = true;
    });

  // Feed updates
  socket.on('user_bet', (data) => {
    addFeedEntry(`${data.username} has placed a bet`);
    if (data.username === currentUser.username) {
      currentUser.balance = data.balance;
      updateLoginDisplay();
    }
  });

  socket.on('user_cashout', (data) => {
    addFeedEntry(`${data.username} cashed out at ${data.multiplier}x`, true, data.multiplier >= 2);
    if (data.username === currentUser.username) {
      currentUser.balance = data.balance;
      updateLoginDisplay();
    }
  });
};

function updateLoginDisplay() {
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.textContent = `${currentUser.username}: ${Math.floor(currentUser.balance)}g`;
  loginBtn.style.backgroundImage = 'none';
  loginBtn.style.backgroundColor = '#444';
  loginBtn.style.color = 'white';
  loginBtn.style.fontWeight = 'bold';
  loginBtn.classList.add('logged-in');
  loginBtn.disabled = true;
  loginBtn.style.cursor = 'default';
}

function addFeedEntry(message, isCashout = false, bigWin = false) {
  const feed = document.getElementById('feed');
  const entry = document.createElement('div');
  entry.className = 'feed-entry';
  if (isCashout) entry.classList.add('cash');
  if (bigWin) entry.classList.add('bigwin');
  entry.textContent = message;
  feed.appendChild(entry);
  feed.scrollTop = feed.scrollHeight;
}
