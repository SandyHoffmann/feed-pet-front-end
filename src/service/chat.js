import { io } from "socket.io-client";

export const socket = io("https://feed-pet-chat.herokuapp.com/", {autoConnect:false});

socket.onAny((event,...args) => {
    console.log(event,args)
})