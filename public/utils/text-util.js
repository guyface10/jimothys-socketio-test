function wrap(text, width) {
  let words = text.split(" ");
  let finalText = "";
  let t = "";
  let timesWrapped = 0;

  for (let word of words) {
    let prevText = t;
    t += word + " ";
    finalText += word + " ";

    if (textWidth(t) > width) {
      finalText += "\n";
      timesWrapped++;
      t = "";
    }
  }

  return { text: finalText, numLines: timesWrapped };
}
