import express from "express";

const host= "0.0.0.0"; // Funcionara em todas as redes do computador
const porta = 3000;
const app= express();

function cadastroInteressado(req,resp)
{
    resp.send(`
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
            <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
        </head>
        <body>
            <div class="container text-center">
            <h1>Cadastro De Interessados:</h1>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>`);
        }

app.get("/");

app.listen(porta,host,() =>{
    console.log("Servidor em execução http://" + host + ":" + porta);
})
