import Livro from '../Modelo/livro.js';

export default class LivroCtrl
{
    gravar(requisicao, resposta)
    {
        resposta.type('application/json');
        if (requisicao.method==='POST' && requisicao.is('application/json'))
        {
            const dados = requisicao.body;
            if (dados.titulo && dados.editora && dados.genero && dados.dataPublicacao && dados.numPaginas && dados.autor)  
            {
                const livro = new Livro(0, dados.titulo, dados.editora, dados.genero, dados.dataPublicacao, dados.numPaginas, dados.autor);
                livro.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "codigoGerado": livro.codigo,
                        "mensagem": "Livro gravado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar livro: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para gravação do livro!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para gravar um livro!"
            });
        }
    }

    consultar(requisicao, resposta) 
    {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo)
            termo = "";
        if (requisicao.method==="GET")
        {
            const livro = new Livro();
            livro.consultar(termo).then((listaLivros) => {
                resposta.status(200).json({
                    "status": true,
                    listaLivros
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao obter livros: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar livros!"
            });
        }
    }

    alterar(requisicao, resposta)
    {
        resposta.type('application/json');
        if ((requisicao.method==='PUT') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            if (dados.codigo && dados.titulo && dados.editora && dados.genero && dados.dataPublicacao && dados.numPaginas && dados.autor)  
            {
                const livro = new Livro(dados.codigo, dados.titulo, dados.editora, dados.genero, dados.dataPublicacao, dados.numPaginas, dados.autor);
                livro.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro alterado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar livro: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para a alteração do livro!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método PUT para alterar o livro!"
            });
        }
    }

    excluir(requisicao, resposta)
    {
        resposta.type('application/json');
        if ((requisicao.method==='DELETE') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            if (dados.codigo) 
            {
                const livro = new Livro(dados.codigo);
                livro.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir livro: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro a ser excluído!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir o livro!"
            });
        }
    }
}
