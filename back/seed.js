//連接MongoDB//
const mongoose = require("mongoose");
const StoredData = require("./storedDataSchema");
const dbUrl =
  "mongodb+srv://dhoper777:apollo777@ecommerce-website.v7ymhpd.mongodb.net/?retryWrites=true&w=majority" ||
  "mongodb://127.0.0.1:27017/ecommerce-website";

async function main() {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
main()
  .then((solved) => console.log(solved, "成功!!!"))
  .catch((err) => console.log("錯誤發生...", err));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function sowing() {
  await StoredData.deleteMany({})
  .then(() => console.log("成功刪除文檔!"))
  .catch((err) => console.log("文檔刪除失敗!", err));

for (let i = 1; i < 8; i++) {
  let day = `2023-07-0${i}`;
  let htvalue = [];

  for (let j = 0; j < 24; j++) {
    htvalue.push({
      temp: getRandomInt(23, 35),
      humid: getRandomInt(40, 60),
      hour: j,
    });
    console.log(i, j);
  }

  await StoredData.create({
    date: day,
    HTValue: htvalue,
  })
    .then(() => console.log("種子植入成功!", i))
    .catch((err) => console.log(err));
}

}
sowing();