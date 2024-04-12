import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { ContextoUsuario } from '../App';

export default function Menu(props) 
{
    const [usuario, setUsuario] = useContext(ContextoUsuario);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/">Menu</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/autor">Autores</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/livro">Livros</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/biblioteca">Bibliotecas</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" onClick={() => {
                                setUsuario({ ...usuario, logado: false})
                            }}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
