class TextList {
  constructor(x, y, maxSize, maxTextWidth, xWrap, drawType, shiftTexts) {
    this.x = x;
    this.y = y;

    this.texts = [];
    this.maxSize = maxSize;
    this.maxTextWidth = maxTextWidth;
    this.xWrap = xWrap;
    this.drawType = drawType;
    this.shiftTexts = shiftTexts;

    this.textSize = constrain((width * height) / 40000, 15, 15);
    this.spaceBtwTexts = this.textSize / 1.5;
  }

  draw() {
    this.textSize = constrain((width * height) / 40000, 15, 15);
    this.spaceBtwTexts = this.textSize / 1.5;

    push();

    textAlign(LEFT, CENTER);
    textSize(this.textSize);
    textLeading(textAscent());
    fill(255);

    if (this.texts.length === 0) {
      return;
    }

    let prevY = this.y;
    for (let i = 0; i < this.texts.length; i++) {
      let wrapData = wrap(this.texts[i], this.xWrap);

      let x = this.x;
      let yIncrement = this.spaceBtwTexts + this.textSize / 1.25;

      let y;
      if (drawType === "up") {
        y = i === 0 ? this.y : prevY - yIncrement;
        y -= wrapData.numLines * textAscent() + this.spaceBtwTexts;
        text(wrapData.text, x, y);
        prevY = y;
      } else if (drawType === "down") {
        y = i === 0 ? this.y : prevY + yIncrement;
        y += wrapData.numLines * textAscent() - this.spaceBtwTexts;
      }
      text(wrapData.text, x, y);
      prevY = y;
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
