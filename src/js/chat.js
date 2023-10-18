"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display .container");

chatInput.addEventListener("keypress",(event)=>{
    if(event.keyCode === 13){
        send()
       chatInput.value = ""
    }

});

function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

socket.on("chatting", (data)=>{
    console.log(data)
    const {name, msg, time} = data;
    const item = new LiModel(name,msg,time);
    item.makeLi()
    displayContainer.scrollTo(0,displayContainer.scrollHeight)
})

function LiModel(name,msg,time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent":"received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img src="https://yt3.ggpht.com/6qNh0_e0Z6NCWiwnWMdmlQ06L1Cmk70uiX2W9UwlWmDovmofiVOKxnok23GPzZZFH1zr1O4CASmoVA=s640-c-fcrop64=1,000063c6ffffd6f9-nd-v1" alt="None" width="50px" height="50px">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li)
    }
}

console.log(socket)