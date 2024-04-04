import { Router } from 'express';
import AutorCtrl from '../Controle/autorCtrl.js';

const rotaAutor = new Router();
const autorCtrl = new AutorCtrl();

rotaAutor
.post('/', autorCtrl.gravar)
.get('/:termo', autorCtrl.consultar)
.get('/', autorCtrl.consultar)
.put('/', autorCtrl.alterar)
.delete('/', autorCtrl.excluir)

export default rotaAutor;
