﻿'use strict';
import CommandHandler from "./CommandHandler";
import {IPlugin} from "./IPlugin";
let WebSocketClient = require('ws');
let request = require("request");
let requireNew = require('require-clean');
let jsonfile = require('jsonfile');
let fs = require('fs');
const throttle = require('throttle-function');
let pingInterval;
let configDir = process.cwd()+"/config";
let fileRoomsJs = "/config.rooms.js";


export default class FChatLib {

    addConnectionListener(fn){
        this.removeConnectionListener(fn);
        this.connectionListeners.push(fn);
    }

    removeConnectionListener(fn){
        let id = this.connectionListeners.indexOf(fn);
        if(id != -1){
            this.connectionListeners.splice(id,1);
        }
    }

    addJoinListener(fn){
        this.removeJoinListener(fn);
        this.joinListeners.push(fn);
    }

    removeJoinListener(fn){
        let id = this.joinListeners.indexOf(fn);
        if(id != -1){
            this.joinListeners.splice(id,1);
        }
    }

    addLeaveListener(fn){
        this.removeLeaveListener(fn);
        this.leaveListeners.push(fn);
    }

    removeLeaveListener(fn){
        let id = this.leaveListeners.indexOf(fn);
        if(id != -1){
            this.leaveListeners.splice(id,1);
        }
    }

    addOnlineListener(fn){
        this.removeOnlineListener(fn);
        this.onlineListeners.push(fn);
    }

    removeOnlineListener(fn){
        let id = this.onlineListeners.indexOf(fn);
        if(id != -1){
            this.onlineListeners.splice(id,1);
        }
    }

    addOfflineListener(fn){
        this.removeOfflineListener(fn);
        this.offlineListeners.push(fn);
    }

    removeOfflineListener(fn){
        let id = this.offlineListeners.indexOf(fn);
        if(id != -1){
            this.offlineListeners.splice(id,1);
        }
    }

    addStatusListener(fn){
        this.removeStatusListener(fn);
        this.statusListeners.push(fn);
    }

    removeStatusListener(fn){
        let id = this.statusListeners.indexOf(fn);
        if(id != -1){
            this.statusListeners.splice(id,1);
        }
    }

    addChatOPListListener(fn){
        this.removeChatOPListListener(fn);
        this.chatOPListListeners.push(fn);
    }

    removeChatOPListListener(fn){
        let id = this.chatOPListListeners.indexOf(fn);
        if(id != -1){
            this.chatOPListListeners.splice(id,1);
        }
    }

    addChatOPAddedListener(fn){
        this.removeChatOPAddedListener(fn);
        this.chatOPAddedListeners.push(fn);
    }

    removeChatOPAddedListener(fn){
        let id = this.chatOPAddedListeners.indexOf(fn);
        if(id != -1){
            this.chatOPAddedListeners.splice(id,1);
        }
    }

    addChatOPRemovedListener(fn){
        this.removeChatOPRemovedListener(fn);
        this.chatOPRemovedListeners.push(fn);
    }

    removeChatOPRemovedListener(fn){
        let id = this.chatOPRemovedListeners.indexOf(fn);
        if(id != -1){
            this.chatOPRemovedListeners.splice(id,1);
        }
    }

    addInviteListener(fn){
        this.removeInviteListener(fn);
        this.inviteListeners.push(fn);
    }

    removeInviteListener(fn){
        let id = this.inviteListeners.indexOf(fn);
        if(id != -1){
            this.inviteListeners.splice(id,1);
        }
    }

    addKickListener(fn){
        this.removeKickListener(fn);
        this.kickListeners.push(fn);
    }

    removeKickListener(fn){
        let id = this.kickListeners.indexOf(fn);
        if(id != -1){
            this.kickListeners.splice(id,1);
        }
    }

    addBanListener(fn){
        this.removeBanListener(fn);
        this.banListeners.push(fn);
    }

    removeBanListener(fn){
        let id = this.banListeners.indexOf(fn);
        if(id != -1){
            this.banListeners.splice(id,1);
        }
    }

    addDescriptionChangeListener(fn){
        this.removeDescriptionChangeListener(fn);
        this.descriptionChangeListeners.push(fn);
    }

    removeDescriptionChangeListener(fn){
        let id = this.descriptionChangeListeners.indexOf(fn);
        if(id != -1){
            this.descriptionChangeListeners.splice(id,1);
        }
    }

    addPingListener(fn){
        this.removePingListener(fn);
        this.pingListeners.push(fn);
    }

    removePingListener(fn){
        let id = this.pingListeners.indexOf(fn);
        if(id != -1){
            this.pingListeners.splice(id,1);
        }
    }

    addInitialChannelDataListener(fn){
        this.removeInitialChannelDataListener(fn);
        this.initialChannelDataListeners.push(fn);
    }

    removeInitialChannelDataListener(fn){
        let id = this.initialChannelDataListeners.indexOf(fn);
        if(id != -1){
            this.initialChannelDataListeners.splice(id,1);
        }
    }

    addMessageListener(fn){
        this.removeMessageListener(fn);
        this.messageListeners.push(fn);
    }

    removeMessageListener(fn){
        let id = this.messageListeners.indexOf(fn);
        if(id != -1){
            this.messageListeners.splice(id,1);
        }
    }

    addPrivateMessageListener(fn){
        //this.removePrivateMessageListener(fn);
        //this.privateMessageListeners.push(fn);
        this.privateMessageListeners = [fn];
    }

    removePrivateMessageListener(fn){
        let id = this.privateMessageListeners.indexOf(fn);
        if(id != -1){
            this.privateMessageListeners.splice(id,1);
        }
    }

    addRollListener(fn){
        this.removeRollListener(fn);
        this.rollListeners.push(fn);
    }

    removeRollListener(fn){
        let id = this.rollListeners.indexOf(fn);
        if(id != -1){
            this.rollListeners.splice(id,1);
        }
    }

    addVariableListener(fn){
        this.removeVariableListener(fn);
        this.variableListeners.push(fn);
    }

    removeVariableListener(fn){
        let id = this.variableListeners.indexOf(fn);
        if(id != -1){
            this.variableListeners.splice(id,1);
        }
    }

    config:IConfig = null;

    banListeners = [];
    chatOPAddedListeners = [];
    chatOPListListeners = [];
    chatOPRemovedListeners = [];
    connectionListeners = [];
    descriptionChangeListeners = [];
    initialChannelDataListeners = [];
    inviteListeners = [];
    joinListeners = [];
    kickListeners = [];
    leaveListeners = [];
    messageListeners = [];
    offlineListeners = [];
    onlineListeners = [];
    pingListeners = [];
    privateMessageListeners = [];
    rollListeners = [];
    statusListeners = [];
    variableListeners = [];

    usersInChannel = [];
    chatOPsInChannel = [];
    commandHandlers = [];

    channels:Map<string, Array<IPlugin>> = new Map<string, Array<IPlugin>>();

    ws:any;

    pingInterval:NodeJS.Timer;

    floodLimit:number = 2.0;
    lastTimeCommandReceived:number = Number.MAX_VALUE;
    commandsInQueue:number = 0;

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendData(messageType: string, content: string) {
        this.commandsInQueue++;
        let currentTime = parseInt(process.uptime().toString(), 10);

        if((currentTime - this.lastTimeCommandReceived) < this.floodLimit){
            let timeElapsedSinceLastCommand = currentTime - this.lastTimeCommandReceived;
            let timeToWait = (this.commandsInQueue * this.floodLimit) - timeElapsedSinceLastCommand;
            await this.timeout(timeToWait * 1000);
        }

        this.lastTimeCommandReceived = parseInt(process.uptime().toString(), 10);
        this.commandsInQueue--;
        this.sendWS(messageType, content);
    }

    constructor(configuration:IConfig){

        if(configuration == null){
            console.log('No configuration passed, cannot start.');
            process.exit();
        }
        else{
            this.config = configuration;
            if(this.config.username == undefined || this.config.username == "" || this.config.password == undefined || this.config.password == "" || this.config.character == "" || this.config.character == "" || this.config.master == "" || this.config.master == ""){
                console.log('Wrong parameters passed. All the fields in the configuration file are required.');
                process.exit();
            }
        }

        try {
            if (fs.statSync(configDir+fileRoomsJs)) {
                this.channels = new Map(jsonfile.readFileSync(configDir+fileRoomsJs));
            }
        }
        catch(err){}

        if(this.config.room !== undefined && this.channels.get(this.config.room) == null){
            this.channels.set(this.config.room, []);
            this.updateRoomsConfig();
        }
    }

    //create one commandHandler per room
    generateCommandHandlers() {
        for(let room of this.channels.keys()){
            this.commandHandlers[room] = new CommandHandler(this, room);
        }
    }

    private RateLimit(fn, delay, context) {
        let queue = [], timer = null;

        function processQueue() {
            let item = queue.shift();
            if (item)
                fn.apply(item.context, item.arguments);
        }

        return function limited() {
            queue.push({
                context: context || this,
                arguments: [].slice.call(arguments)
            });
            if (!timer) {
                processQueue();  // start immediately on the first invocation
                timer = setInterval(processQueue, delay);
            }
        }

    }

    setFloodLimit(delay){
        this.floodLimit = delay;
        //this.sendData = this.RateLimit(this.sendWS, this.floodLimit, this);
    }

    async connect() {
        this.ws = null;
        this.setFloodLimit(2);

        this.generateCommandHandlers();
        this.addMessageListener(this.commandListener); //basic commands + plugins loader, one instance for one bot

        this.addConnectionListener(this.joinChannelOnConnect);
        if(this.config.autoJoinOnInvite){
            this.addInviteListener(this.joinChannelsWhereInvited);
        }

        this.addVariableListener(this.variableChangeHandler);

        //user handling
        this.addInitialChannelDataListener(this.addUsersToList);
        this.addOfflineListener(this.removeUserFromChannels);
        this.addLeaveListener(this.removeUserFromList);
        this.addJoinListener(this.addUserToList);

        //permissions handling
        this.addChatOPListListener(this.addChatOPsToList);
        this.addChatOPAddedListener(this.addChatOPToList);
        this.addChatOPRemovedListener(this.removeChatOPFromList);

        let ticket = await this.getTicket();
        await this.startWebsockets(ticket);
    }

    joinChannelsWhereInvited(args){
        this.joinNewChannel(args.name);
    }

    joinChannelOnConnect(args) {
        for(let room of this.channels.keys()) {
            this.sendWS('JCH', { channel: room });
        }
    }

    setStatus(status:string, message:string){
        this.sendWS('STA', { status: status, statusmsg: message });
    }

    joinNewChannel(channel:string){
        if(this.channels.get(channel) == null){
            this.channels.set(channel, []);
        }
        this.sendWS('JCH', { channel: channel });
        this.commandHandlers[channel] = new CommandHandler(this, channel);

        //save file for rooms
        this.updateRoomsConfig();
    }

    commandListener(args:any, chanName:string) {
        if(typeof this.commandHandlers[args.channel] !== "undefined")
        {
            try {
                this.commandHandlers[args.channel].processCommand(args);
            }
            catch(ex){
                console.log(ex);
                this.throwError(args, ex.toString(), chanName);
            }
        }
    }

    throwError(args, error, chan){
        console.log("Error: Please message "+this.config.master+" with the following content:\n Error at "+new Date().toLocaleString()+" on command "+JSON.stringify(args)+" in channel "+chan+" with error: "+JSON.stringify(error));
        this.sendMessage("Error: Please message "+this.config.master+" with the following content:\n Error at "+new Date().toLocaleString()+" on command "+JSON.stringify(args)+" in channel "+chan+" with error: "+JSON.stringify(error), chan);
    }

    //user management
    addUsersToList(args) {
        if(typeof this.usersInChannel[args.channel] !== "object"){this.usersInChannel[args.channel] = [];}
        for(let i in args.users){
            if(this.usersInChannel[args.channel].indexOf(args.users[i].identity) == -1){
                this.usersInChannel[args.channel].push(args.users[i].identity);
            }
        }
    }

    addUserToList(args) {
        if(typeof this.usersInChannel[args.channel] !== "object"){this.usersInChannel[args.channel] = [];}
        if(this.usersInChannel[args.channel].indexOf(args.character.identity) == -1){
            this.usersInChannel[args.channel].push(args.character.identity);
        }
    }

    removeUserFromList(args) {
        if(typeof this.usersInChannel[args.channel] !== "object"){ return; }
        if(this.usersInChannel[args.channel].indexOf(args.character) != -1){
            this.usersInChannel[args.channel].splice(this.usersInChannel[args.channel].indexOf(args.character),1);
        }
    }

    removeUserFromChannels(args) { //remove if offline
        for(let i in this.usersInChannel){
            if(typeof this.usersInChannel[i] !== "object"){ continue; }
            if(this.usersInChannel[i].indexOf(args.character) != -1){
                this.usersInChannel[i].splice(this.usersInChannel[i].indexOf(args.character),1);
            }
        }
    }

    //permissions
    addChatOPsToList(args) {
        if(typeof this.chatOPsInChannel[args.channel] !== "object"){this.chatOPsInChannel[args.channel] = [];}
        for(let i in args.oplist){
            if(this.chatOPsInChannel[args.channel].indexOf(args.oplist[i]) == -1){
                this.chatOPsInChannel[args.channel].push(args.oplist[i]);
            }
        }
    }

    addChatOPToList(args) {
        if(typeof this.chatOPsInChannel[args.channel] !== "object"){this.chatOPsInChannel[args.channel] = [];}
        if(this.chatOPsInChannel[args.channel].indexOf(args.character) == -1){
            this.chatOPsInChannel[args.channel].push(args.character);
        }
    }

    removeChatOPFromList(args) {
        if(typeof this.chatOPsInChannel[args.channel] !== "object"){ return; }
        if(this.chatOPsInChannel[args.channel].indexOf(args.character) != -1){
            this.chatOPsInChannel[args.channel].splice(this.chatOPsInChannel[args.channel].indexOf(args.character),1);
        }
    }

    variableChangeHandler(args) {
        switch(args.variable){
            case "msg_flood":
                    this.floodLimit = args.value;
                break;
            default:
                break;
        }
    }

    async getTicket(){
        return new Promise<object>((resolve, reject) => {
            request.post({ url: 'https://www.f-list.net/json/getApiTicket.php', form: { account: this.config.username, password: this.config.password } }, (err, httpResponse, body) => {
                if(err){
                    reject(err);
                }
                let response = JSON.parse(body);
                let ticket = response.ticket;
                var json = { "method": "ticket", "account": this.config.username, "ticket": ticket, "character": this.config.character, "cname": this.config.cname, "cversion": this.config.cversion };
                resolve(json);
            });
        });
    }

    sendWS(command, object) {
        if (this.ws.readyState)
            this.ws.send(command + ' ' + JSON.stringify(object));
    }

    sendMessage(message, channel){
        let json:any = {};
        json.channel = channel;
        json.message = message;
        this.sendData('MSG', json);
    }

    sendPrivMessage(message, character){
        let json:any = {};
        json.message = message;
        json.recipient = character;
        this.sendData('PRI', json);
    }

    getUserList(channel){
        if(this.usersInChannel[channel] == undefined){ return [];}
        return this.usersInChannel[channel];
    }

    getAllUsersList(){
        return this.usersInChannel;
    }

    getChatOPList(channel){
        if(typeof this.chatOPsInChannel[channel] !== "object")
        {
            return [];
        }
        else{
            return this.chatOPsInChannel[channel];
        }

    }

    isUserChatOP(username, channel){
        return (this.getChatOPList(channel).indexOf(username) != -1 || username == this.config.master);
    }

    isUserMaster(username){
        return (username == this.config.master);
    }

    disconnect(){
        this.ws.close();
    }

    restart(){
        this.disconnect();
        setTimeout(this.connect,2000);
    }

    softRestart(channel){
        this.commandHandlers[channel] = new CommandHandler(this, channel);
    }

    roll(customDice, channel){
        let json:any = {};
        json.dice = customDice || "1d10";
        json.channel = channel;
        this.sendData("RLL", json);
    }

    updateRoomsConfig(){
        if (!fs.existsSync(configDir)){
            fs.mkdirSync(configDir);
        }

        let channelsNotContainingInstanciatedPlugins = this.channels;

        let temporaryPluginHolder = [];

        for(let key of channelsNotContainingInstanciatedPlugins.keys()){
            for(let plugin of channelsNotContainingInstanciatedPlugins.get(key)){
                temporaryPluginHolder[plugin.name] = plugin.instanciatedPlugin;
                plugin.instanciatedPlugin = null;
            }
        }

        jsonfile.writeFile(configDir+fileRoomsJs, [...channelsNotContainingInstanciatedPlugins]);

        for(let key of channelsNotContainingInstanciatedPlugins.keys()){
            for(let plugin of channelsNotContainingInstanciatedPlugins.get(key)){
                plugin.instanciatedPlugin = temporaryPluginHolder[plugin.name];
            }
        }
    }


    startWebsockets(json) {
        if (this.config.debug == true) {
            this.ws = new WebSocketClient('ws://chat.f-list.net:8722');
        }
        else {
            this.ws = new WebSocketClient('ws://chat.f-list.net:9722');
        }

        this.ws.on('open', (data) => {
            console.log("Started WS");
            this.sendWS('IDN', json);
            clearInterval(pingInterval);
            this.pingInterval = setInterval(() => { this.ws.send('PIN'); }, 25000);
        });

        this.ws.on('close', (data) => {
            console.log("Closed WS");
            process.exit();
        });

        this.ws.on('error', (data) => {
            console.log("Disconnected WS");
            setTimeout(() => { this.connect(); }, 4000);
        });

        this.ws.on('message', (data, flags) => {
            let command:string;
            let argument:any;
            if(this.config.debug){
                console.log(data);
            }
            if (data != null) {
                command = argument = "";
                command = splitOnce(data, " ")[0].trim();
                try{
                    if(data.substring(command.length).trim() != ""){
                        argument = JSON.parse(data.substring(command.length).trim());
                    }
                }
                catch (e) {
                }
                switch (command) {
                    case "CON"://CON { "count": int }
                        for (var i =0; i< this.connectionListeners.length; i++) {
                            this.connectionListeners[i].call(this, argument);
                        }
                        break;
                    case "COL": //COL {"oplist":["Newhalf Wrestling","Nastasya Bates","Rinko Saitou"],"channel":"ADH-d0bde7daca1dbe6c79ba"}
                        for (var i =0; i< this.chatOPListListeners.length; i++) {
                            this.chatOPListListeners[i].call(this,argument);
                        }
                        break;
                    case "COA": //COA { "channel": string, "character": string }
                        for (var i =0; i< this.chatOPAddedListeners.length; i++) {
                            this.chatOPAddedListeners[i].call(this,argument);
                        }
                        break;
                    case "COR": //COR { "channel": string, "character": string }
                        for (var i =0; i< this.chatOPRemovedListeners.length; i++) {
                            this.chatOPRemovedListeners[i].call(this,argument);
                        }
                        break;
                    case "FLN": //FLN {"character":"The Kid"}
                        for (var i =0; i< this.offlineListeners.length; i++) {
                            this.offlineListeners[i].call(this,argument);
                        }
                        break;
                    case "ICH": //ICH {"users": [{"identity": "Shadlor"}, {"identity": "Bunnie Patcher"}, {"identity": "DemonNeko"}, {"identity": "Desbreko"}, {"identity": "Robert Bell"}, {"identity": "Jayson"}, {"identity": "Valoriel Talonheart"}, {"identity": "Jordan Costa"}, {"identity": "Skip Weber"}, {"identity": "Niruka"}, {"identity": "Jake Brian Purplecat"}, {"identity": "Hexxy"}], "channel": "Frontpage", mode: "chat"}
                        for (var i =0; i< this.initialChannelDataListeners.length; i++) {
                            this.initialChannelDataListeners[i].call(this,argument);
                        }
                        break;
                    case "JCH": //JCH {"title":"Newhalf Sexual Federation of Wrestling","channel":"ADH-d0bde7daca1dbe6c79ba","character":{"identity":"Kirijou Mitsuru"}}
                        for (var i =0; i< this.joinListeners.length; i++) {
                            this.joinListeners[i].call(this,argument);
                        }
                        break;
                    case "LCH": //LCH {"character":"Darent","channel":"ADH-d0bde7daca1dbe6c79ba"}
                        for (var i =0; i< this.leaveListeners.length; i++) {
                            this.leaveListeners[i].call(this,argument);
                        }
                        break;
                    case "NLN": //FLN {"character":"The Kid"}
                        for (var i =0; i< this.onlineListeners.length; i++) {
                            this.onlineListeners[i].call(this,argument);
                        }
                        break;
                    case "PIN": //PIN
                        for (var i =0; i< this.pingListeners.length; i++) {
                            this.pingListeners[i].call(this,argument);
                        }
                        break;
                    case "RLL"://RLL {"channel": string, "results": [int], "type": enum, "message": string, "rolls": [string], "character": string, "endresult": int} OR RLL {"target":"string","channel":"string","message":"string","type":"bottle","character":"string"}
                        for (var i =0; i< this.rollListeners.length; i++) {
                            this.rollListeners[i].call(this,argument);
                        }
                        break;
                    case "STA": //STA { status: "status", character: "channel", statusmsg:"statusmsg" }
                        for (var i =0; i< this.statusListeners.length; i++) {
                            this.statusListeners[i].call(this,argument);
                        }
                        break;
                    case "CBU": //CBU {"operator":string,"channel":string,"character":string}
                        for (var i =0; i< this.kickListeners.length; i++) {
                            this.kickListeners[i].call(this,argument);
                        }
                        break;
                    case "CKU": //CKU {"operator":string,"channel":string,"character":string}
                        for (var i =0; i< this.banListeners.length; i++) {
                            this.banListeners[i].call(this,argument);
                        }
                        break;
                    case "CDS": //CDS { "channel": string, "description": string }
                        for (var i =0; i< this.descriptionChangeListeners.length; i++) {
                            this.descriptionChangeListeners[i].call(this,argument);
                        }
                        break;
                    case "CIU": //CIU { "sender":string,"title":string,"name":string }
                        for (var i =0; i< this.inviteListeners.length; i++) {
                            this.inviteListeners[i].call(this,argument);
                        }
                        break;
                    case "PRI": //PRI { "character": string, "message": string }
                        for (var i =0; i< this.privateMessageListeners.length; i++) {
                            this.privateMessageListeners[i].call(this,argument);
                        }
                        break;
                    case "MSG": //MSG { "character": string, "message": string, "channel": string }
                        for (var i =0; i< this.messageListeners.length; i++) {
                            this.messageListeners[i].call(this,argument, argument.channel);
                        }
                        break;
                    case "VAR": //VAR { "variable": string, "value": int/float }
                        for (var i =0; i< this.variableListeners.length; i++) {
                            this.variableListeners[i].call(this,argument);
                        }
                        break;
                }
            }
        });
    }

}

function splitOnce(str, delim) {
    var components = str.split(delim);
    var result = [components.shift()];
    if (components.length) {
        result.push(components.join(delim));
    }
    return result;
}