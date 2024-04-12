import Livro from '../Modelo/livro.js';
import Autor from '../Modelo/autor.js';
import conectar from './conexao.js';

export default class LivroDAO 
{
    async gravar(livro)
    {
        if (livro instanceof Livro)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `INSERT INTO Livro (liv_titulo, liv_editora, liv_genero, liv_data_publicacao, liv_num_paginas, aut_cod)
                             VALUES (?, ?, ?, ?, ?, ?)`;
                const parametros = [livro.titulo, livro.editora, livro.genero, livro.dataPublicacao, livro.numPaginas, livro.autor.codigo];
                const retorno = await conexao.execute(sql, parametros);
                livro.codigo = retorno[0].insertId;
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
            sql = `SELECT * FROM Livro l
                   INNER JOIN Autor a ON l.aut_cod = a.aut_cod`;
            parametros = [parametroConsulta];
        }
        else
        {
            sql = `SELECT * FROM Livro l
                   INNER JOIN Autor a ON l.aut_cod = a.aut_cod
                   WHERE liv_titulo LIKE ?`;
            parametros = ["%" + parametroConsulta + "%"];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaLivros = [];
        for (const registro of registros)
        {
            const autor = new Autor(registro.aut_cod, registro.aut_nome, registro.aut_nacionalidade, registro.aut_data_nascimento);
            registro.liv_data_publicacao = registro.liv_data_publicacao.toISOString().split('T')[0];
            const livro = new Livro(registro.liv_cod, registro.liv_titulo, registro.liv_editora, registro.liv_genero, 
                                    registro.liv_data_publicacao, registro.liv_num_paginas, autor);
            listaLivros.push(livro);
        }
        conexao.release();
        return listaLivros;
    }

    async alterar(livro)
    {
        if (livro instanceof Livro)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = `UPDATE Livro SET liv_titulo = ?, liv_editora = ?, liv_genero = ?,
                             liv_data_publicacao = ?, liv_num_paginas = ?, aut_cod = ? WHERE liv_cod = ?`;
                const parametros = [livro.titulo, livro.editora, livro.genero, livro.dataPublicacao, 
                                    livro.numPaginas, livro.autor.codigo, livro.codigo];
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

    async excluir(livro)
    {
        if (livro instanceof Livro)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {
                const sql = "DELETE FROM Livro WHERE liv_cod = ?";
                const parametros = [livro.codigo];
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
}
