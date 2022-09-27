// 載入關聯套件
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// 修改蒐集地點資料的URL
const url="https://webapi.91app.com/webapi/LocationV2/GetLocationList?lat=25.037929&lon=121.548818&startIndex=0&maxCount=100&r=null&isEnableRetailStore=false&lang=zh-TW&shopId=41308";

// 非同步函數抓取資料
async function scrapeData() {
  try {
    // 獲取得頁面HTML
    const { data } = await axios.get(url);

    // 載入上一行取得之HTML
    const $ = cheerio.load(data);

    // 使用 Selector 過濾 html 內容
    const listItems = $(".plainlist ul li");
  
    // 以陣列方式寫入地點資料至 place.json 中
    fs.writeFile("place.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("成功寫入至檔案中");
    });
  } catch (err) {
    console.error(err);
  }
}
// 引用上述函數
scrapeData();
