import express from "express";

const host= "0.0.0.0"; // Funcionara em todas as redes do computador
const porta = 3000;
const app= express();

app.listen(porta,host,() =>{
    console.log("Servidor em execução http://" + host + ":" + porta);
})
