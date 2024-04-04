import Autor from '../Modelo/autor.js';
import conectar from './conexao.js'; 

export default class AutorDAO
{
    async gravar(autor)
    {
        if (autor instanceof Autor)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Autor (aut_nome, aut_nacionalidade, aut_data_nascimento) 
                             VALUES (?, ?, ?)`;
                const parametros = [autor.nome, autor.nacionalidade, autor.dataNascimento];
                const retorno = await conexao.execute(sql, parametros);
                autor.codigo = retorno[0].insertId;
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }

    async consultar(parametroConsulta)
    {
        let parametros = [];
        let sql;
        if (!isNaN(parseInt(parametroConsulta)))
        {
            sql = "SELECT * FROM Autor WHERE aut_cod = ?";
            parametros = [parametroConsulta];
        }
        else
        {
            sql = "SELECT * FROM Autor WHERE aut_nome LIKE ?";
            parametros = ["%" + parametroConsulta + "%"];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaAutores = [];
        for (const registro of registros)
        {
            registro.aut_data_nascimento = registro.aut_data_nascimento.toISOString().split('T')[0];
            const autor = new Autor(registro.aut_cod, registro.aut_nome, registro.aut_nacionalidade, registro.aut_data_nascimento);
            listaAutores.push(autor);
        }
        conexao.release();
        return listaAutores;
    }

    async alterar(autor)
    {
        if (autor instanceof Autor)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = "UPDATE Autor SET aut_nome = ?, aut_nacionalidade = ?, aut_data_nascimento = ? WHERE aut_cod = ?";
                const parametros = [autor.nome, autor.nacionalidade, autor.dataNascimento, autor.codigo];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }

    async excluir(autor)
    {
        if (autor instanceof Autor)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                let sql = "DELETE FROM Autor WHERE aut_cod = ?";
                let parametros = [autor.codigo];
                await conexao.execute(sql, parametros);
                /* sql = "DELETE FROM Livro WHERE aut_cod = ?";
                parametros = [autor.codigo];
                await conexao.execute(sql, parametros); */
                await conexao.commit();
            }
            catch (erro)
            {
                await conexao.rollback();
                throw erro;
            }
            finally
            {
                conexao.release();
            }
        }
    }
}
