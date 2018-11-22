import FChatLib from "../src/FChatLib";
import Config from "./config/Config.example";
let myFchatBot = new FChatLib(new Config());
myFchatBot.connect();
console.log("ok");