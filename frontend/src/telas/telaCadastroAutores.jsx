import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Pagina from "../templates/pagina";
import TabelaAutores from "../tabelas/tabelaAutores";
import FormCadAutores from "../formularios/formCadAutores";

const urlAutor = "http://localhost:4000/autor";

export default function TelaCadastroAutores(props) 
{
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaAutores, setListaAutores] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const autorVazio = {
        cod: 0,
        nome: "",
        nacionalidade: "",
        dataNascimento: ""
    };
    const [autorAtual, setAutorAtual] = useState(autorVazio);

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
    useEffect(() => {
        if (exibirTabela)
            consultarAutor();
    }, [exibirTabela]);

    async function gravarAutor(autor)
    {
        await fetch(urlAutor, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(autor)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status)
            {
                alert(retorno.mensagem + " Código do autor: " + retorno.codigoGerado); 
                setExibirTabela(true);
                setAutorAtual(autorVazio);                  
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

    async function alterarAutor(autor)
    {
        if (!atualizando)
        {
            setExibirTabela(false);
            setAtualizando(true);
            setAutorAtual(autor);
        }
        else
        {
            await fetch(urlAutor, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(autor)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status)
                {
                    alert(retorno.mensagem);
                    setAtualizando(false);
                    setExibirTabela(true);
                    setAutorAtual(autorVazio);
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

    async function excluirAutor(autor)
    {
        await fetch(urlAutor, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({codigo: autor.codigo})
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
        consultarAutor();
    }

    if (exibirTabela) 
    {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Autores</h1>
                    <br/>
                    <h2>Lista de Autores</h2>
                    <Button className="mb-3" onClick={() => {
                            setExibirTabela(false);
                        }}>
                        Cadastrar Novo Autor
                    </Button>
                    <TabelaAutores
                        setExibirTabela={setExibirTabela} 
                        listaAutores={listaAutores} 
                        alterarAutor={alterarAutor} 
                        excluirAutor={excluirAutor}
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
                    <h1>Tela de Cadastro de Autores</h1>
                    <br/>
                    <h2>Formulário de cadastro de Autores</h2>
                    <FormCadAutores
                        exibirTabela={exibirTabela}
                        setExibirTabela={setExibirTabela}
                        gravarAutor={gravarAutor}
                        alterarAutor={alterarAutor}
                        atualizando={atualizando}
                        setAtualizando={setAtualizando}
                        autor={autorAtual}
                        setAutorAtual={setAutorAtual}
                        autorVazio={autorVazio}
                    />
                </Pagina>
            </div>
        )
    }
}
