const mqtt = require('mqtt');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./api.js');

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

//連結mqtt代理//
const client = mqtt.connect(`mqtt://broker.emqx.io:1883`)
client.on('connect', () => {
    console.log('Connected')
    client.subscribe(["aa123"], () => {
      console.log(`Subscribe to topic aa123`)
    })
  })

//製作時間戳//
const date = new Date();
function timestamp() {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}


//儲存溫溼度數據(上限十分鐘/600個)//
function storeRealtimeData(obj, today) {
  realtimeData = {date: today, HTValue: []};
  const HTV = realtimeData.HTValue; 
  if (HTV.length >= 600) {
      HTV.shift();
  }
  HTV.push(obj);
}

//紀錄小時更迭//
let dateRemainder = null;
let hourRemainder = [];
let dateStoreSwitch = true;
let hourStoreSwitch = true;
function timer(todayValue) {
  const hour = date.getHours();
  if(dateRemainder != todayValue) {  //日期是否有變更?有則重置小時紀錄//
    hourRemainder = [];
    dateRemainder = todayValue;
    dateStoreSwitch = true;
  }else {
    dateStoreSwitch = false;
  }

  if(hourRemainder.includes(hour)) {  //小時是否有變更?有則將hourStoreSwitch開關設為true//
    hourStoreSwitch = false;
  }else {
    hourRemainder.push(hour);
    hourStoreSwitch = true;
  }
}

//建立資料體//
let realtimeData = {};
let storeData = {}

//訂閱mqtt訊息//
client.on('message', (topic, message) => {
    console.log('Received Message:', topic, JSON.parse("{" + message.toString() + "}"));
    const today = timestamp();  //製作時間戳//

    //每小時儲存一次數據到MongoDB//
    timer(today);
    storedata = {
      date: today,
      HTValue: []
    };
    let storeHTV = JSON.parse("{" + message.toString() + "}");
    storeHTV.hour = date.getHours();

    if(dateStoreSwitch && hourRemainder) {  //換日0點
      try {
        StoredData.create({
          date: today,
          HTValue: [storeHTV]
        });
        console.log("換日0點，資料已儲存");
      }catch(err) {
        console.log("換日0點，資料儲存失敗:", err);
      }
    }else if(!dateRemainder && hourRemainder) {  //同日換時
      try {
        StoredData.findOneAndUpdate({date: today}, {$push: {HTValue: storeHTV}});
        console.log(`${date.getHours}點資料已儲存`);
      }catch(err) {
        console.log(`${date.getHours}點資料儲存失敗:` ,err);
      }
    }
    const value = JSON.parse("{" + message.toString() + "}"); //儲存即時數據
    storeRealtimeData(value, today);
    fs.writeFile('realtimeData.json', JSON.stringify(realtimeData) ,(err) => {
        err? console.log(err): console.log('數據已儲存至realtimeData.json')
    });
  })

//api//\
PORT = process.env.PORT | 8000;
app.use(cors());
app.use("/", router);
app.listen(PORT, () => {
  console.log(`運行於${PORT}端口`);
})


  