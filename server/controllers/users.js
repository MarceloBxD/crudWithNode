const mysql = require("mysql");

// Conecting to the database

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Br@cet051528",
  database: "newcrud",
});

// Creating a query to get all users

const getUser = (_, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.status(200).json(result);
  });
};

const addUser = (req, res) => {
  const q =
    "INSERT INTO users ('nome', 'email', 'fone', 'data_nascimento') VALUES (?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) res.json(err);

    return res.status(200).json("Usuário adicionado com sucesso!");
  });
};

const updateUser = (req, res) => {
  const q =
    "UPDATE users SET 'nome' = ?, 'email' = ?, 'fone' = ?, 'data_nascimento' = ? WHERE 'id' = ?";
  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso!");
  });
};

const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE 'id' = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso!");
  });
};

// exportar as funções para serem usadas em outro arquivo
module.exports = { getUser, addUser, updateUser, deleteUser };
