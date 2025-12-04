-- APAGAR COMPLETAMENTE O DATABASE
DROP DATABASE IF EXISTS SenseCare;

-- CRIAR NOVO DATABASE
CREATE DATABASE SenseCare;
USE SenseCare;

-- =============================
-- TABELA: PACIENTE
-- =============================
CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nurse_id VARCHAR(50) NOT NULL,
    primeiro_nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(30) NOT NULL,

    nome_responsavel VARCHAR(100),
    telefone_responsavel VARCHAR(30),

    procedimento VARCHAR(255) NOT NULL,
    historico_doencas TEXT,
    medicacoes TEXT,

    sexo ENUM('masculino', 'feminino') NOT NULL,

    prioridade ENUM('alta', 'media', 'baixa') NOT NULL,
    risco ENUM('idoso', 'nada') NOT NULL,

    alergias TEXT,
    especificacoes TEXT,
    FOREIGN KEY (nurse_id) REFERENCES Enfermeiro(id)
);

-- =============================
-- INSERT ALEATÓRIO DE PACIENTE
-- =============================
INSERT INTO Paciente (
    nurse_id, primeiro_nome, sobrenome, data_nascimento, cpf, endereco, telefone,
    nome_responsavel, telefone_responsavel,
    procedimento, historico_doencas, medicacoes,
    sexo, prioridade, risco,
    alergias, especificacoes
) VALUES (
    '1', 'Mariana',
    'Oliveira Santos',
    '2010-08-12',
    '321.654.987-00',
    'Av. Brasil, 445 - Centro, Recife - PE',
    '(81) 98745-3321',

    'João Santos',
    '(81) 99876-1122',

    'Avaliação pediátrica',
    'Bronquite leve; sem internações.',
    'Usa bombinha quando necessário.',

    'feminino',
    'alta',
    'nada',

    'Alergia a penicilina',
    'Paciente demonstra ansiedade antes de procedimentos.'
);

-- =============================
-- SELECT PACIENTE
-- =============================
SELECT * FROM Paciente;

-- =============================
-- TABELA: CUIDADO
-- =============================
CREATE TABLE Cuidado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    nurse_id VARCHAR(50) NOT NULL,
    cuidados TEXT NOT NULL,
    observacoes TEXT,
    data_cuidado DATE NOT NULL,
    horario TIME NOT NULL,
    status ENUM('Pendente', 'Concluído') DEFAULT 'Pendente',
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id) ON DELETE CASCADE,
    FOREIGN KEY (nurse_id) REFERENCES Enfermeiro(id)
);


-- =============================
-- TABELA: ENFERMEIRO
-- =============================
CREATE TABLE Enfermeiro (
    id varchar(50) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    cpf_email VARCHAR(120) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    sexo ENUM('masculino', 'feminino') NOT NULL,
    data_contratacao DATE NOT NULL,
    data_nascimento DATE NOT NULL,
    diploma VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    complementos VARCHAR(255)
);

-- =============================
-- INSERT ALEATÓRIO DE ENFERMEIRO
-- =============================
INSERT INTO Enfermeiro ( id,
    nome, sobrenome, cpf_email, telefone,
    senha, sexo,
    data_contratacao, data_nascimento,
    diploma, cargo, complementos
) VALUES (
    '1', 'Lucas',
    'Ferreira Mendes',
    'lucas.mendes@sensecare.com',
    '(11) 99123-7788',

    -- Senha exemplo hash bcrypt
    '$2y$10$T8R7eY1dQ8X0YhVqZIv1xe8FWyN4cvYF1eQ7o8mHpe6UjswW0ae9W',

    'masculino',
    '2024-04-20',
    '1992-10-05',

    'Enfermagem - USP',
    'Enfermeiro Chefe',
    'Responsável por triagem e supervisão.'
);

-- =============================
-- SELECT ENFERMEIRO
-- =============================
SELECT * FROM Enfermeiro;