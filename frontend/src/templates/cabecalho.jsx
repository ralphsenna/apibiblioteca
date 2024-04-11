import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { ContextoUsuario } from "../App";

export default function Cabecalho(props)
{
    const [usuario] = useContext(ContextoUsuario);

    return (
        <div>
            <Alert variant="light" className="text-center"><h1>{props?.texto}</h1><span className="text-end">Usuário: {usuario?.nome}</span></Alert>
        </div>
    );
}
