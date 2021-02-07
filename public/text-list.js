class TextList {
  constructor(x, y, maxSize, maxTextWidth, drawType, shiftTexts) {
    this.x = x;
    this.y = y;

    this.texts = [];
    this.maxSize = maxSize;
    this.maxTextWidth = maxTextWidth;
    this.drawType = drawType;
    this.shiftTexts = shiftTexts;

    this.textSize = constrain((width * height) / 40000, 15, 30);
    this.spaceBtwTexts = this.textSize / 1.5;
  }

  draw() {
    this.textSize = constrain((width * height) / 40000, 15, 30);
    this.spaceBtwTexts = this.textSize / 1.5;

    push();

    textAlign(LEFT, CENTER);
    textSize(this.textSize);
    fill(255);

    if (this.texts.length === 0) {
      return;
    }

    for (let i = 0; i < this.texts.length; i++) {
      if (drawType === "up") {
        text(this.texts[i], this.x, this.y + (this.spaceBtwTexts + this.textSize / 1.25) * i);
      } else if (drawType === "down") {
        text(this.texts[i], this.x, this.y - (this.spaceBtwTexts + this.textSize / 1.25) * i);
      }
    }

    pop();
  }

  addTextStart(text) {
    this.texts.unshift(text);
    this.checkText();
  }

  addTextEnd(text) {
    this.texts.push(text);
    this.checkText();
  }

  removeText(text) {
    this.texts.splice(this.texts.indexOf(text), 1);
  }

  checkText() {
    if (this.texts.length > this.maxSize) {
      if (this.shiftTexts) {
        this.texts.pop();
      } else {
        this.texts.shift();
      }
    }
  }
}
