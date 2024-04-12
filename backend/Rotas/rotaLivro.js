import { Router } from 'express';
import LivroCtrl from '../Controle/livroCtrl.js';

const rotaLivro = new Router();
const livroCtrl = new LivroCtrl();

rotaLivro
.post('/', livroCtrl.gravar)
.get('/:termo', livroCtrl.consultar)
.get('/', livroCtrl.consultar)
.put('/', livroCtrl.alterar)
.delete('/', livroCtrl.excluir)

export default rotaLivro;
