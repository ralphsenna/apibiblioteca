import Autor from '../Modelo/autor.js';

export default class AutorCtrl
{
    gravar(requisicao, resposta)
    {
        resposta.type('application/json');
        if (requisicao.method==='POST' && requisicao.is('application/json'))
        {
            const dados = requisicao.body;
            if (dados.nome && dados.nacionalidade && dados.dataNascimento)
            {
                const autor = new Autor(0, dados.nome, dados.nacionalidade, dados.dataNascimento);
                autor.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "codigoGerado": autor.codigo,
                        "mensagem": "Autor gravado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar autor: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para gravação do autor!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para gravar um autor!"
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
            const autor = new Autor();
            autor.consultar(termo).then((listaAutores) => {
                resposta.status(200).json({
                    "status": true,
                    listaAutores
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao obter autores: " + erro.message
                });
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar autores!"
            });
        }
    }

    alterar(requisicao, resposta)
    {
        resposta.type('application/json');
        if ((requisicao.method==='PUT') && requisicao.is('application/json')) 
        {
            const dados = requisicao.body;
            if (dados.codigo && dados.nome && dados.nacionalidade && dados.dataNascimento) 
            {
                const autor = new Autor(dados.codigo, dados.nome, dados.nacionalidade, dados.dataNascimento);
                autor.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor alterado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar autor: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados para a alteração do autor!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método PUT para alterar o autor!"
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
                const autor = new Autor(dados.codigo);
                autor.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir autor: " + erro.message
                    });
                });
            }
            else 
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do autor a ser excluído!"
                });
            }
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir o autor!"
            });
        }
    }
}
