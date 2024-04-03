CREATE TABLE Biblioteca (
    bli_cod INT PRIMARY KEY AUTO_INCREMENT,
    bli_cnpj VARCHAR(14) NOT NULL,
    bli_nome VARCHAR(100) NOT NULL,
    bli_endereco VARCHAR(100) NOT NULL,
    bli_telefone VARCHAR(15) NOT NULL,
    bli_email VARCHAR(100) NOT NULL,
    bli_site VARCHAR(100)
);

CREATE TABLE Autor (
    aut_cod INT PRIMARY KEY AUTO_INCREMENT,
    aut_nome VARCHAR(100) NOT NULL,
    aut_nacionalidade VARCHAR(50) NOT NULL,
<<<<<<< HEAD
    aut_data_nascimento DATE NOT NULL
=======
    aut_dataNasc DATE NOT NULL,
>>>>>>> f2a82ec43504656d68e7a1e423de70a54c24be53
);

CREATE TABLE Livro (
    liv_cod INT PRIMARY KEY AUTO_INCREMENT,
    liv_titulo VARCHAR(100) NOT NULL,
    liv_editora VARCHAR(100) NOT NULL,
    liv_genero VARCHAR(50) NOT NULL,
<<<<<<< HEAD
    liv_data_publicacao DATE NOT NULL,
=======
    liv_dataPubli DATE NOT NULL,
>>>>>>> f2a82ec43504656d68e7a1e423de70a54c24be53
    liv_numPag INT NOT NULL,
    aut_cod INT,
    FOREIGN KEY (aut_cod) REFERENCES Autor(aut_cod)
);

CREATE TABLE Livro_Biblioteca (
<<<<<<< HEAD
    liv_cod INT,
    bli_cod INT,
    lb_quantidade INT NOT NULL,
    lb_condicao VARCHAR(50) NOT NULL,
    lb_data_aquisicao DATE NOT NULL,
    PRIMARY KEY (liv_cod, bli_cod),
=======
    liv_cod INT PRIMARY KEY,
    bli_cod INT PRIMARY KEY,
    lb_quantidade INT NOT NULL,
    lb_condicao VARCHAR(50) NOT NULL,
    lb_dataAquisicao DATE NOT NULL,
>>>>>>> f2a82ec43504656d68e7a1e423de70a54c24be53
    FOREIGN KEY (liv_cod) REFERENCES Livro(liv_cod),
    FOREIGN KEY (bli_cod) REFERENCES Biblioteca(bli_cod)
);
