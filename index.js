import express from "express";

const host= "0.0.0.0"; // Funcionara em todas as redes do computador
const porta = 3050;
const app= express();

import session from "express-session";

import cookieParser from "cookie-parser";

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, //utilizada com http e não somente com https
        httpOnly: true,
        maxAge: 1000 * 60 * 30 //30 minutos
    }
}));

app.use(cookieParser())

app.use(express.static('./pages/public'));

let listaInteressados = [];
let listaPets = [];


function cadastroInteressado(req,resp)
{
    resp.send(`
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Interessados</title>
            <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
        </head>
        <body>
            <div class="container text-center">
            <h1>Cadastro De Interessados:</h1>
            <br/>
                    <form method="POST" action="/cadastrainteressado"class="row g-3 needs-validation" novalidate>
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="validationCustom01" name="nome" >
                    
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Sobre nome</label>
                    <input type="text" class="form-control" id="validationCustom02" name="sobrenome" >
                    
                </div>
                <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">Email</label>
                    <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" name="email" aria-describedby="inputGroupPrepend" >
                    
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">Telefone</label>
                    <input type="text" class="form-control" id="validationCustom03" name="phone" >
                    <div class="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" >
                    <label class="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                    </label>
                    <div class="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Submit form</button>
                </div>
                </form>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
        }

function cadastroPets(req,resp)
        {
            resp.send(`
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Cadastro de Pets</title>
                    <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
                </head>
                <body>
                    <form method="POST" action="/cadastraPets" class="row gy-2 gx-3 align-items-center">
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInput">Nome</label>
                            <input type="text" class="form-control" id="autoSizingInput" name="nome_p" placeholder="Belinha">
                        </div>
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInputGroup">Raça</label>
                            <div class="input-group">
                            <input type="text" class="form-control" id="autoSizingInputGroup" name="raca" placeholder="Pintsher">
                            </div>
                        </div>
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingSelect">Idade</label>
                            <select class="form-select" id="autoSizingSelect" name="idade">
                            <option selected>Choose...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16+</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="autoSizingCheck">
                            <label class="form-check-label" for="autoSizingCheck">
                                Remember me
                            </label>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        </form>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                </html>
                `);
                }

function menu(req,resp)
{
    const dataUltimoLogin = req.cookies['dataUltimoLogin'];
    if (!dataUltimoLogin){
        dataUltimoLogin='';
    }

    resp.send(`
        <html>
        <head>
            <meta charset="UTF-8">
            <title>MENU</title>
            <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
        </head>
        <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
            <a class="navbar-brand" href="#">Petshop</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/cadastrarInterressado">Cad Interresados</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/cadastrarPets">Cad PETS</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/adotarPet">Adote!</a>
                </li>
                <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
            </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html> 
        `);
}

function cadastraInterressado(req,resp)
{
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const telefone = req.body.phone;

    const Interresado = {nome, sobrenome, email, telefone};
    
    if (nome && sobrenome && email && telefone)
        {

        
    listaInteressados.push(Interresado);

    resp.write(`<html>
        <head>
            <meta charset="UTF-8">
            <title>Interessados Cadastrados</title>
            <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
        </head>
        <body>
        <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Nome></th>
                <th scope="col">Sobrenome></th>
                <th scope="col">Email></th>
                <th scope="col">Telefone></th>
            </tr>
        </thead>
        <tbody>`);
        for(var i=0;i< listaInteressados.length;i++)
            {
                resp.write(`<tr>
                            <td>${listaInteressados[i].nome}</td>
                            <td>${listaInteressados[i].sobrenome}</td>
                            <td>${listaInteressados[i].email}</td>
                            <td>${listaInteressados[i].phone}</td>                 
                  </tr>  `)
            }
resp.write(`</tbody>
            </table>
            <a class="btn btn-primary" href="/cadastroInteressado">Continuar cadastro</a>
            <a class="btn btn-secondary" href="/">MENU</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html> 
            `);
        }
        else
        {
            resp.write(`<html>
                    <head>
                         <meta charset="UTF-8">
                        <title>Cadastro de Interessados</title>
                        <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
                    </head>
                    <body>
                        <div class="container text-center">
                        <h1>Cadastro De Interessados:</h1>
                        <br/>
                                <form method="POST" action="/cadastrainteressado"class="row g-3 needs-validation" novalidate>
                               <div class="col-md-4">
                               <label for="validationCustom01" class="form-label">Nome</label>
                               <input type="text" class="form-control" id="validationCustom01" name="nome" value="${nome}">
                    
                `);
                if(!nome)
                    {
                        resp.write(`<div>
                            <span><p class="bg-danger">Por favor informe o nome corretamente!</p></span>
                            `)
                    }
            resp.write(`</div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Sobre nome</label>
                    <input type="text" class="form-control" id="validationCustom02" name="sobrenome" value="${sobrenome}">
                `); 
                if(!sobrenome)
                    {
                        resp.write(`<div>
                            <span><p class="bg-danger">Por favor informe o sobrenome corretamente!</p></span>
                            `)
                    }
                    resp.write(`</div>
                <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">Email</label>
                    <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" name="email" aria-describedby="inputGroupPrepend"  value="${email}">
                        `);
                    if(!email)
                        {
                            resp.write(`<div>
                                <span><p class="bg-danger">Por favor informe o email corretamente!</p></span>
                                `)
                        }
                        resp.write(`  </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">Telefone</label>
                    <input type="text" class="form-control" id="validationCustom03" name="phone" >
                    <div class="invalid-feedback">
                    Please provide a valid city.
                    </div>
                            `);
                        if(!telefone)
                            {
                                resp.write(`<div>
                                    <span><p class="bg-danger">Por favor informe o telefone corretamente!</p></span>
                                    `)
                            };
        }
resp.end();

}

function cadastraPets(req,resp)
{
    const nome = req.body.nome_p;
    const raca = req.body.raca;
    const idade = req.body.idade;
    

    const PET = {nome, raca, idade};
    
    if(nome&&raca&&idade){
    listaInteressados.push(Interresado);

    resp.write(`<html>
        <head>
            <meta charset="UTF-8">
            <title>Interessados Cadastrados</title>
            <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
        </head>
        <body>
        <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">raca</th>
                <th scope="col">idade</th>
                
            </tr>
        </thead>
        <tbody>`);
        for(var i=0;i< listaPets.length;i++)
            {
                resp.write(`<tr>
                            <td>${listaInteressados[i].nome}</td>
                            <td>${listaInteressados[i].raca}</td>
                            <td>${listaInteressados[i].idade}</td>                             
                  </tr>  `)}
            
resp.write(`</tbody>
            </table>
            <a class="btn btn-primary" href="/cadastroInteressado">Continuar cadastro</a>
            <a class="btn btn-secondary" href="/">MENU</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html> 
            `);}

            else
            {
                resp.write(`<html>
                <head>
                    <meta charset="UTF-8">
                    <title>Cadastro de Pets</title>
                    <link href="<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">"
                </head>
                <body>
                    <form method="POST" action="/cadastraPets" class="row gy-2 gx-3 align-items-center">
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInput">Nome</label>
                            <input type="text" class="form-control" id="autoSizingInput" name="nome_p" placeholder="Belinha" value="${nome_p}">
                    `);
                if(!nome_p)
                    {
                        resp.write(`<div>
                                <span><p class="bg-danger">Por favor informe o nome corretamente!</p></span>
                                `)
                    }
                resp.write(`
                     </div>
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInputGroup">Raça</label>
                            <div class="input-group">
                            <input type="text" class="form-control" id="autoSizingInputGroup" name="raca" placeholder="Pintsher">
                            </div>`);
                        if(!raca)
                            {
                                resp.write(`<div>
                                    <span><p class="bg-danger">Por favor informe a raça corretamente!</p></span>
                                    `)
                            }
                        resp.write(`</div>
                        </div>
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingSelect">Idade</label>
                            <select class="form-select" id="autoSizingSelect" name="idade">
                            <option selected>Choose...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16+</option>
                            </select>
                        </div>`);
                    if(!idade)
                        {
                            resp.write(`<div>
                                <span><p class="bg-danger">Por favor informe  uma idade valida!</p></span>
                                `)
                        }
            }
        }
resp.end();


function autenticaUsuario(req,resp)
{
    const usuario = req.body.usuario;
    const password = req.body.senha;

    if(usuario === 'admin' && password === '123')
        {
            req.session.usuarioLogado = true;
            resp.cookie
            resp.redirect("/")
       
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        resp.redirect('/');
        }
        else
        {
            resp.send(`
                <html>
                    <head>
                     <meta charset="utf-8">
                     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                           integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    </head>
                    <body>
                        <div class="container w-25"> 
                            <div class="alert alert-danger" role="alert">
                                Usuário ou senha inválidos!
                            </div>
                            <div>
                                <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                            </div>
                        </div>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                            crossorigin="anonymous">
                    </script>
                </html>
              `
    );
        }
}

app.get("/login",(req,resp) =>{
    resp.send(`/login.html`)
});
app.post('/login',autenticaUsuario);
app.get("/",menu);
app.get("/cadastroPets",cadastroPets);
app.get("/cadastroInteressado",cadastroInteressado);//envia o formulario de cadastro de Interessados

app.post('/cadastroPets',cadastraPets);
app.post('/cadastroInteressado',cadastraInteressado);

app.listen(porta,host,() =>{
    console.log("Servidor em execução http://" + host + ":" + porta);
})
