const { chain } = require("stream-chain");

const { parser } = require("stream-json");
const { pick } = require("stream-json/filters/Pick");
const { ignore } = require("stream-json/filters/Ignore");
const { streamArray } = require("stream-json/streamers/StreamArray");

const fs = require("fs");

const pipeline = chain([
  fs.createReadStream("seagull.json"),
  parser(),
  streamArray(),
]);

let counter = 0;
pipeline.on("data", (data) => {
  if (counter % 10 === 0) console.log(counter);
  counter += 1;
});
pipeline.on("end", () => {
  console.log(counter);
});
