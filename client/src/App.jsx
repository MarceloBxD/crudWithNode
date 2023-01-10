import React, { useState, useEffect } from "react";
import { Grid } from "./components/Grid";
import { Form } from "./components/Form";
import { Flex } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001");
      if (res) {
        // console.log("Usuários carregados com sucesso: ", res);
        setUsers(res.data);
      }
    } catch {
      console.log("getUsers Erro: Erro ao carregar os usuários");
    }
    // const res = await axios
    //   .get("http://localhost:3001")
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // .sort((a, b) => (a.nome > b.nome ? 1 : -1)); Arrumar a ordenação depois...
    // console.log(users.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <Flex h="100vh" flexDir="column">
      <Flex w="100%" justify="center">
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      </Flex>
      <Flex mt="30px" justify="center">
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Flex>
    </Flex>
  );
}

export default App;
