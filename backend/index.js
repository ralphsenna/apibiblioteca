import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaBiblioteca from './Rotas/rotaBiblioteca.js';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import { verificarAcesso } from './Seguranca/autenticacao.js';

const host='0.0.0.0';
const porta='4000';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000*60*60*24
}))
app.use('/login', rotaLogin);
app.use('/biblioteca', /* verificarAcesso,  */rotaBiblioteca);
app.use('/autor', /* verificarAcesso,  */rotaAutor);
app.use('/livro', /* verificarAcesso,  */rotaLivro);
app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
