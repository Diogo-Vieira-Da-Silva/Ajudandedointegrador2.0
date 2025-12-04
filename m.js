  const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SenseCare",
});

// POST /login → verifica login do enfermeiro
app.post("/login", (req, res) => {
  const { id } = req.body;
  db.query("SELECT * FROM Enfermeiro WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "Enfermeiro não encontrado" });
    }
  });
});

// GET /pacientes/:nurse_id → retorna pacientes do enfermeiro
app.get("/pacientes/:nurse_id", (req, res) => {
  const { nurse_id } = req.params;
  db.query("SELECT * FROM Paciente WHERE nurse_id = ?", [nurse_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET /enfermeiros → retorna todos os enfermeiros
app.get("/enfermeiros", (req, res) => {
  db.query("SELECT * FROM Enfermeiro", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST /enfermeiros → insere um novo enfermeiro
app.post("/enfermeiros", (req, res) => {
  const { nome, sobrenome, email, telefone, passwordField, sexo, dataContratacao, dataNascimento, diploma, cargo, complementos } = req.body;
  db.query(
    "INSERT INTO Enfermeiro (nome, sobrenome, cpfEmail, telefone, senha, sexo, dataContratacao, dataNascimento, diploma, cargo, complementos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [nome, sobrenome, email, telefone, passwordField, sexo, dataContratacao, dataNascimento, diploma, cargo, complementos],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Enfermeiro adicionado com sucesso!" });
    }
  );
});

// POST /pacientes → insere um novo paciente
app.post("/pacientes", (req, res) => {
  const { nurse_id, primeiroNome, sobrenome, dataNascimento, cpf, endereco, telefone, nomeResponsavel, telefoneResponsavel, procedimento, historicoDoencas, medicacoes, sexo, prioridade, risco, alergias, especificacoes } = req.body;
  db.query(
    "INSERT INTO Paciente (nurse_id, primeiro_nome, sobrenome, data_nascimento, cpf, endereco, telefone, nome_responsavel, telefone_responsavel, procedimento, historico_doencas, medicacoes, sexo, prioridade, risco, alergias, especificacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [nurse_id, primeiroNome, sobrenome, dataNascimento, cpf, endereco, telefone, nomeResponsavel, telefoneResponsavel, procedimento, historicoDoencas, medicacoes, sexo, prioridade, risco, alergias, especificacoes],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Paciente adicionado com sucesso!", id: result.insertId });
    }
  );
});

// GET /cuidados/paciente/:paciente_id → retorna cuidados do paciente
app.get("/cuidados/paciente/:paciente_id", (req, res) => {
  const { paciente_id } = req.params;
  db.query("SELECT * FROM Cuidado WHERE paciente_id = ?", [paciente_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET /cuidados/nurse/:nurse_id → retorna todos cuidados do enfermeiro
app.get("/cuidados/nurse/:nurse_id", (req, res) => {
  const { nurse_id } = req.params;
  db.query("SELECT * FROM Cuidado WHERE nurse_id = ?", [nurse_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST /cuidados → insere um novo cuidado
app.post("/cuidados", (req, res) => {
  const { paciente_id, nurse_id, cuidados, observacoes, data_cuidado, horario, status } = req.body;
  db.query(
    "INSERT INTO Cuidado (paciente_id, nurse_id, cuidados, observacoes, data_cuidado, horario, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [paciente_id, nurse_id, cuidados, observacoes, data_cuidado, horario, status || 'Pendente'],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Cuidado adicionado com sucesso!", id: result.insertId });
    }
  );
});

// PUT /cuidados/:id → atualiza status do cuidado
app.put("/cuidados/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    "UPDATE Cuidado SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Cuidado atualizado com sucesso!" });
    }
  );
});

// DELETE /pacientes/:id → deleta paciente
app.delete("/pacientes/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Paciente WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Paciente deletado com sucesso!" });
  });
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);