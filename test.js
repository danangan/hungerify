const { getNow } = require("./helper");

const result = getNow();

if (result.hours === 16) {
  console.log("it is correct");
} else {
  throw new Error();
}
