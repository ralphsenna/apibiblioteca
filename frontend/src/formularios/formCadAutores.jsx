import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function FormCadAutores(props)
{
    const [validado, setValidado] = useState(true);
    const [autor, setAutor] = useState(props.autor);

    function manipularMudanca(evento) 
    {
        const componente = evento.currentTarget;
        setAutor({ ...autor, [componente.name]: componente.value});
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
                props.gravarAutor(autor);
            else
                props.alterarAutor(autor);
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
                        value={autor.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="5">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome Completo"
                        id="nome"
                        name="nome"
                        value={autor.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o nome do autor.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Nacionalidade</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="País de Origem"
                        id="nacionalidade"
                        name="nacionalidade"
                        value={autor.nacionalidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a nacionalidade do autor.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" >
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control 
                        required 
                        type="date" 
                        placeholder="" 
                        id="dataNascimento"
                        name="dataNascimento"
                        value={autor.dataNascimento}
                        onChange={manipularMudanca}
                        max={new Date(Date.now()).toISOString().split("T")[0]}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data de nascimento do autor.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{marginRight:'5px'}} type="submit">
                {props.atualizando ? 'Alterar' : 'Gravar'}
            </Button>
            <Button onClick={() => {
                if (props.atualizando)
                    props.setAtualizando(false);
                props.setExibirTabela(true);
                props.setAutorAtual(props.autorVazio);
            }}>Voltar</Button>
        </Form>
    );
}
