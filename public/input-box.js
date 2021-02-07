const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const special = " ";
let shifting = false;

class InputBox {
  constructor(x, y, w, h, xPadding, emptyMessage) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xPadding = xPadding;
    this.emptyMessage = emptyMessage;

    this.active = false;

    this.onInput = function (outText) {};

    this.text = "";
    this.textSize = constrain((width * height) / 40000, 15, 30);
  }

  draw() {
    this.textSize = constrain((width * height) / 40000, 15, 30);

    push();

    textAlign(LEFT, CENTER);
    textSize(this.textSize);

    fill(80, 200);
    let r = rect(this.x, this.y, this.w, this.h);

    if (this.text === "") {
      fill(150);
      noStroke();
      text(this.emptyMessage, this.x + this.xPadding, this.y + this.h / 2);
    } else {
      fill(255);
      noStroke();
      text(this.text, this.x + this.xPadding, this.y + this.h / 2);
    }

    if (this.active) {
      rectMode(CENTER);
      rect(this.x + textWidth(this.text) + this.xPadding, this.y + this.h / 2, 2, this.h);
    }

    pop();
  }

  onKeyPressed() {
    // t
    if (keyCode === 84 && !this.active) {
      this.active = true;
      return;
    }

    if (!this.active) {
      return;
    }

    // enter key
    if (keyCode === 13 && this.text.trim() !== "") {
      this.onInput(this.text);
      this.text = "";
    }
    if (keyCode === 16) shifting = true;
    if (keyCode === 8) chatInput.subText();

    let c = char(keyCode).toLowerCase();
    if (letters.indexOf(c) !== -1) {
      if (shifting) c = c.toUpperCase();
    } else if (numbers.indexOf(c) !== -1) {
      if (shifting) {
        c = charNumToUpper(c);
      }
    } else if (special.indexOf(c) === -1) {
      if (shifting) c = specialCodeToUpper(keyCode);
      else c = specialCodeToLower(keyCode);
    }
    this.addText(c);
  }

  onMousePressed() {
    if (mouseButton === LEFT) {
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.active = true;
      } else {
        this.active = false;
      }
    }
  }

  addText(text) {
    if (this.active) {
      this.text += text;
    }
  }

  setText(text) {
    if (this.active) {
      this.text = text;
    }
  }

  subText() {
    if (this.active) {
      this.text = this.text.slice(0, -1);
    }
  }
}
