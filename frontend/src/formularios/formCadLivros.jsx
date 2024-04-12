import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function FormCadLivross(props)
{
    const [validado, setValidado] = useState(true);
    const [livro, setLivro] = useState(props.livro);

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        if (componente.name === 'autor')
        {
            setLivro({ ...livro, autor: {"codigo": componente.value}});
        }
        else
        {
            setLivro({ ...livro, [componente.name]: componente.value});
        }
    }

    function manipularSubmissao(evento) 
    {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (!form.checkValidity())
        {
            setValidado(false);
        }
        else
        {
            setValidado(true);
            if (!props.atualizando)
                props.gravarLivro(livro);
            else
                props.alterarLivro(livro);
        }
    }

    return (
        <Form noValidate validated={!validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="1">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        disabled
                        type="number"
                        placeholder=""
                        id="codigo"
                        name="codigo"
                        value={livro.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="5">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Titulo do Livro"
                        id="titulo"
                        name="titulo"
                        value={livro.titulo}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o titulo do livro.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Editora</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Editora"
                        id="editora"
                        name="editora"
                        value={livro.editora}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a editora do livro.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" >
                    <Form.Label>Gênero</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Gênero"
                        id="genero"
                        name="genero"
                        value={livro.genero}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o genero do livro.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="2" >
                    <Form.Label>Data de Publicação</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder=""
                        id="dataPublicacao"
                        name="dataPublicacao"
                        value={livro.dataPublicacao}
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a data de publicação do livro.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" >
                    <Form.Label>N° de Páginas</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="N° de Páginas"
                        id="numPaginas"
                        name="numPaginas"
                        value={livro.numPaginas}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o número de páginas do livro.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Select
                        required
                        id="autor"
                        name="autor"
                        value={livro.autor.codigo}
                        onChange={manipularMudanca}
                    >
                        {
                            props.listaAutores[0].codigo!=="" ?
                            (
                                <><option key={0} value={""}></option>
                                {
                                    props.listaAutores.map((autor) => {
                                        return (
                                            <option key={autor.codigo} value={autor.codigo}>{autor.nome}</option>
                                        )
                                    })
                                }
                                </>
                            ): <option key={0} value={""}>{props.listaAutores[0].nome}</option>
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o autor do livro.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">
                {props.atualizando ? 'Alterar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setLivroAtual(props.livroVazio);
            }}>Voltar</Button>
        </Form>
    );
}
