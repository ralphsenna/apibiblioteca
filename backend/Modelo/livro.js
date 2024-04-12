import LivroDAO from '../Persistencia/livroDAO.js';

export default class Livro 
{
    #codigo
    #titulo
    #editora
    #genero
    #dataPublicacao
    #numPaginas
    #autor

    constructor(codigo=0, titulo="", editora="", genero="", dataPublicacao="", numPaginas=0, autor={})
    {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#editora = editora;
        this.#genero = genero;
        this.#dataPublicacao = dataPublicacao;
        this.#numPaginas = numPaginas;
        this.#autor = autor;
    }

    get codigo()
    {
        return this.#codigo;
    }
    set codigo(novoCodigo)
    {
        this.#codigo = novoCodigo;
    }

    get titulo()
    {
        return this.#titulo;
    }
    set titulo(novoTitulo)
    {
        this.#titulo = novoTitulo;
    }

    get editora()
    {
        return this.#editora;
    }
    set editora(novaEditora)
    {
        this.#editora = novaEditora;
    }

    get genero()
    {
        return this.#genero;
    }
    set genero(novoGenero)
    {
        this.#genero = novoGenero;
    }

    get dataPublicacao()
    {
        return this.#dataPublicacao;
    }
    set dataPublicacao(novaDataPublicacao)
    {
        this.#dataPublicacao = novaDataPublicacao;
    }

    get numPaginas()
    {
        return this.#numPaginas;
    }
    set numPaginas(novoNumPaginas)
    {
        this.#numPaginas = novoNumPaginas;
    }

    get autor()
    {
        return this.#autor;
    }
    set autor(novoAutor)
    {
        this.#autor = novoAutor;
    }
    

    toJSON()
    {
        return {
            codigo: this.#codigo,
            titulo: this.#titulo,
            editora: this.#editora,
            genero: this.#genero,
            dataPublicacao: this.#dataPublicacao,
            numPaginas: this.#numPaginas,
            autor: this.#autor
        }
    }

    async gravar()
    {
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
    }

    async consultar(termo)
    {
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
    }

    async alterar()
    {
        const livroDAO = new LivroDAO();
        await livroDAO.alterar(this);
    }

    async excluir()
    {
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
    }
}
