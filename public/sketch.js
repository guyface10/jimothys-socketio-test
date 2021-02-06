const socket = io();

let pos;
let dir;

let size;
let speed;

let nickname;

let chatInput;
let messageContainer;

let players = [];

function setup() {
  createCanvas(innerWidth, innerHeight);

  pos = createVector();
  dir = createVector();

  size = width / 75 + height / 75;
  speed = 70 * (width / 500 + height / 500);

  nickname = prompt("Choose a nickname.");
  if (nickname === undefined || nickname === "") nickname = "default";
  socket.emit("chose-name", nickname);

  let h = height / 30;
  chatInput = new InputBox(0, height - h, width, h, width / (width / 5), "Click or press t to type a message... then press enter to send it.");
  messageContainer = new TextList(0, chatInput.y - chatInput.h, 20, (drawType = "down"), (shift = true));
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
  push();

  background(0);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  translate(width / 2, height / 2);

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

function mouseClicked() {
  chatInput.onMousePressed();
}

function calculateTagSize(nickname) {
  return width / 75 + height / 75 - nickname.length / 2;
}
