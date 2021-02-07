const socket = io();

let pos;
let dir;

let size;
let speed;

let nickname;

let chatInput;
let messageContainer;

let players = [];

let touching = false;

function setup() {
  createCanvas(innerWidth, innerHeight);

  pos = createVector(width / 2, height / 2);
  dir = createVector();

  size = width / 75 + height / 75;
  speed = 70 * (width / 500 + height / 500);

  nickname = prompt("Choose a nickname.");
  if (nickname === null || nickname.trim() === "") nickname = "default";
  nickname = nickname.trim();
  socket.emit("chose-name", nickname);

  let h = height / 25;
  chatInput = new InputBox(0, height - h, width, h, width / (width / 5), "Click or press t to type a message... then press enter to send it.");
  messageContainer = new TextList(0, chatInput.y - chatInput.h, 22, 40, (drawType = "down"), (shift = true));
  messageContainer.addTextStart("Use arrow keys to move around.");

  chatInput.onInput = (text) => {
    socket.emit("chat-message", text);
    messageContainer.addTextStart(`You: ${text}`);
  };

  socket.on("player-joined", (nickname) => {
    messageContainer.addTextStart(`${nickname} joined!`);
  });

  socket.on("player-left", (nickname) => {
    messageContainer.addTextStart(`${nickname} left.`);
  });

  socket.on("chat-message", (data) => {
    messageContainer.addTextStart(`${data.sender}: ${data.message}`);
  });

  socket.on("player-update", (_players) => {
    players = _players;
  });
}

function draw() {
  resize();

  push();

  background(0);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  if (deviceIsMobile() || deviceIsMobileTablet()) handleTouch();

  pos.add(p5.Vector.mult(dir.normalize(), speed * (deltaTime / 1000)));

  if (players.length > 0) {
    for (let p of players) {
      if (p.id === socket.id) continue;

      fill(255, 0, 0);
      square(p.x * width, p.y * height, size);

      textSize(calculateTagSize(p.nickname));
      fill(255);
      text(p.nickname, p.x * width, p.y * height - size);
    }
  }

  socket.emit("player-update", {
    id: socket.id,
    x: pos.x / width,
    y: pos.y / height,
  });
  fill(0, 100, 255);
  square(pos.x, pos.y, size);

  textSize(calculateTagSize(nickname));
  fill(255);
  text(nickname, pos.x, pos.y - size);

  pop();

  chatInput.draw();
  messageContainer.draw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    dir.y = -1;
  }
  if (keyCode === DOWN_ARROW) {
    dir.y = 1;
  }
  if (keyCode === RIGHT_ARROW) {
    dir.x = 1;
  }
  if (keyCode === LEFT_ARROW) {
    dir.x = -1;
  }

  chatInput.onKeyPressed();
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    dir.y = 0;
  }
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    dir.x = 0;
  }

  if (keyCode === 16) shifting = false;
}

function touchStarted() {
  touching = true;
}

function touchEnded() {
  touching = false;
}

function mouseClicked() {
  chatInput.onMousePressed();
}

function calculateTagSize(nickname) {
  let s = (width * height) / 2500000 / (nickname.length * 0.0025);
  return constrain(s, size / 1.5, size * 1.1);
}

function handleTouch() {
  if (touching) {
    let padding = size / 2;

    if (mouseY > pos.y + padding) {
      dir.y = 1;
    } else if (mouseY < pos.y - padding) {
      dir.y = -1;
    } else {
      dir.y = 0;
    }

    if (mouseX > pos.x + padding) {
      dir.x = 1;
    } else if (mouseX < pos.x - padding) {
      dir.x = -1;
    } else {
      dir.x = 0;
    }
  } else {
    dir = createVector();
  }
}

function resize() {
  pos.x /= width;
  pos.y /= height;

  resizeCanvas(innerWidth, innerHeight);
  chatInput.w = width;
  chatInput.h = height / 30;
  chatInput.y = height - chatInput.h;
  messageContainer.y = chatInput.y - chatInput.h;

  pos.x *= width;
  pos.y *= height;
  size = width / 75 + height / 75;
  speed = 70 * (width / 500 + height / 500);
}
