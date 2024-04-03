import { Router } from 'express';
import AutorCtrl from '../Controle/autorCtrl.js';

const rotaAutor = new Router();
const autorCtrl = new AutorCtrl();

rotaAutor
.post('/', autorCtrl.gravar)
.get('/', autorCtrl.consultar)
.get('/:termo', autorCtrl.consultar)
.put('/', autorCtrl.alterar)
.delete('/', autorCtrl.excluir)

export default rotaAutor;
