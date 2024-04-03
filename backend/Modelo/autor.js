import AutorDAO from '../Persistencia/autorDAO.js';

export default class Autor 
{
    #codigo
    #nome
    #nacionalidade
    #dataNascimento

    constructor(codigo=0, nome="", nacionalidade="", dataNascimento="")
    {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#nacionalidade = nacionalidade;
        this.#dataNascimento = dataNascimento;
    }

    get codigo()
    {
        return this.#codigo;
    }
    set codigo(novoCodigo)
    {
        this.#codigo = novoCodigo;
    }

    get nome()
    {
        return this.#nome;
    }
    set nome(novoNome)
    {
        this.#nome = novoNome;
    }

    get nacionalidade()
    {
        return this.#nacionalidade;
    }
    set nacionalidade(novaNacionalidade)
    {
        this.#nacionalidade = novaNacionalidade;
    }

    get dataNascimento()
    {
        return this.#dataNascimento;
    }
    set dataNascimento(novaDataNascimento)
    {
        this.#dataNascimento = novaDataNascimento;
    }


    toJSON()
    {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            nacionalidade: this.#nacionalidade,
            dataNascimento: this.#dataNascimento
        }
    }

    async gravar()
    {
        const autorDAO = new AutorDAO();
        await autorDAO.gravar(this);
    }

    async consultar(termo)
    {
        const autorDAO = new AutorDAO();
        return await autorDAO.consultar(termo);
    }

    async alterar()
    {
        const autorDAO = new AutorDAO();
        await autorDAO.alterar(this);
    }

    async excluir()
    {
        const autorDAO = new AutorDAO();
        await autorDAO.excluir(this);
    }
}
