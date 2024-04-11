import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela404 from "./telas/tela404";
import TelaLogin from "./telas/telaLogin";
import TelaMenu from './telas/telaMenu';
import TelaCadastroAutores from "./telas/telaCadastroAutores";
/* import TelaCadastroBiblioteca from "./componentes/telas/telaCadastroBiblioteca";
import TelaCadastroLivro from "./componentes/telas/telaCadastroLivro"; */

export const ContextoUsuario = createContext('');

function App() 
{
    const [usuario, setUsuario] = useState({
        nome: "adminbiblioteca",
        senha: "admin",
        logado: true
    });

    if (!usuario.logado)
        return (
            <ContextoUsuario.Provider value={[usuario, setUsuario]}>
                <TelaLogin/>
            </ContextoUsuario.Provider>
        );
    else 
    {
        return (
            <div className="App">
                <ContextoUsuario.Provider value={[usuario, setUsuario]}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/autor" element={<TelaCadastroAutores/>}/>
                            {/* <Route path="/biblioteca" element={<TelaCadastroBiblioteca/>}/>
                            <Route path="/livro" element={<TelaCadastroLivro/>}/> */}
                            <Route path="/" element={<TelaMenu/>} />
                            <Route path="*" element={<Tela404/>} />
                        </Routes>
                    </BrowserRouter>
                </ContextoUsuario.Provider>
            </div>
        );
    }
}

export default App;
