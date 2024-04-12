import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Pagina from "../templates/pagina";
import TabelaLivros from "../tabelas/tabelaLivros";
import FormCadLivros from "../formularios/formCadLivros";

const urlAutor = "http://localhost:4000/autor";
const urlLivro = "http://localhost:4000/livro";

export default function TelaCadastroLivros(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaLivros, setListaLivros] = useState([]);
    const [listaAutores, setListaAutores] = useState([{
        codigo: "",
        nome: "Nenhum autor cadastrado",
        nacionalidade: "",
        dataNascimento: ""
    }]);
    const [atualizando, setAtualizando] = useState(false);
    const livroVazio = {
        codigo: 0,
        titulo: "",
        editora: "",
        genero: "",
        dataPublicacao: "",
        numPaginas: 0,
        autor: {}
    };
    const [livroAtual, setLivroAtual] = useState(livroVazio);

    async function consultarAutor()
    {
        await fetch(urlAutor, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                setListaAutores(retorno.listaAutores);
            }
            else
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
    }

    async function consultarLivro() 
    {
        await fetch(urlLivro, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) 
            {
                setListaLivros(retorno.listaLivros);
            }
            else 
            {
                alert(retorno.mensagem); 
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
    }
    useEffect(() => {
        if (exibirTabela)
            consultarLivro();
        else
            consultarAutor();
    }, [exibirTabela]);

    async function gravarLivro(livro)
    {
        await fetch(urlLivro, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(livro)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + " Código do livro: " + retorno.codigoGerado); 
                setExibirTabela(true);
                setLivroAtual(livroVazio);                  
            }
            else
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
    }

    async function alterarLivro(livro)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setLivroAtual(livro);
        }
        else
        {
            await fetch(urlLivro, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(livro)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setLivroAtual(livroVazio);
                }
                else
                {
                    alert(retorno.mensagem);
                }
            })
            .catch(erro => {
                alert("Erro: " + erro.message);
            });
        }
    }

    async function excluirLivro(livro)
    {
        await fetch(urlLivro, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({codigo: livro.codigo})
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem);
            }
            else
            {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro: " + erro.message);
        });
        consultarLivro();
    }

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Livros</h1>
                    <br/>
                    <h2>Lista de Livros</h2>
                    <Button className="mb-3" onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Novo Livro
                    </Button>
                    <TabelaLivros
                        setExibirTabela={setExibirTabela} 
                        listaLivros={listaLivros}
                        alterarLivro={alterarLivro}
                        excluirLivro={excluirLivro}
                    />
                </Pagina>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Livros</h1>
                    <br/>
                    <h2>Formulário de cadastro de Livros</h2>
                    <FormCadLivros
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        listaAutores={listaAutores}
                        gravarLivro={gravarLivro}
                        alterarLivro={alterarLivro}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        livro={livroAtual}
                        setLivroAtual={setLivroAtual}
                        livroVazio={livroVazio}
                    />
                </Pagina>
            </div>
        )
    }
}
