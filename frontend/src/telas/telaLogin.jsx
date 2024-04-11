import { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ContextoUsuario } from "../App";

export default function TelaLogin() 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);

    function manipulaMudanca(evento)
    {
        const {id, value} = evento.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [id]: value
        }));
    }

    function realizarLogin(evento)
    {
        evento.preventDefault();
        if (usuario.nome==="adminbiblioteca" && usuario.senha==="admin")
            setUsuario(prevUsuario => ({
                ...prevUsuario,
                logado: true
            }));
    }

    return (
        <Container className="d-flex align-items-center justify-content-center w-50">
            <Form onSubmit={realizarLogin}>
                <Form.Group className="mb-3" style={{ marginTop: '40px' }}>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control 
                        type="text"  
                        id="nome" 
                        name="nome"
                        value={usuario.nome}
                        onChange={manipulaMudanca}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="senha" 
                        name="senha"  
                        value={usuario.senha}
                        onChange={manipulaMudanca}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}
