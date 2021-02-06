function charNumToUpper(num) {
  if (num === "1") {
    return "!";
  } else if (num === "2") {
    return "@";
  } else if (num === "3") {
    return "#";
  } else if (num === "4") {
    return "$";
  } else if (num === "5") {
    return "%";
  } else if (num === "6") {
    return "^";
  } else if (num === "7") {
    return "&";
  } else if (num === "8") {
    return "*";
  } else if (num === "9") {
    return "(";
  } else if (num === "0") {
    return ")";
  }
}
// `-=[];',./\
function specialCodeToLower(num) {
  if (num === 192) {
    return "`";
  } else if (num === 189) {
    return "-";
  } else if (num === 187) {
    return "=";
  } else if (num === 219) {
    return "[";
  } else if (num === 221) {
    return "]";
  } else if (num === 186) {
    return ";";
  } else if (num === 222) {
    return "'";
  } else if (num === 190) {
    return ".";
  } else if (num === 188) {
    return ",";
  } else if (num === 191) {
    return "/";
  } else if (num === 220) {
    return "\\";
  } else {
    return "";
  }
}

// ~_+{}|:"<>?
function specialCodeToUpper(num) {
  if (num === 192) {
    return "~";
  } else if (num === 189) {
    return "_";
  } else if (num === 187) {
    return "+";
  } else if (num === 219) {
    return "{";
  } else if (num === 221) {
    return "}";
  } else if (num === 186) {
    return ":";
  } else if (num === 222) {
    return '"';
  } else if (num === 190) {
    return ">";
  } else if (num === 188) {
    return "<";
  } else if (num === 191) {
    return "?";
  } else if (num === 220) {
    return "|";
  } else {
    return "";
  }
}
