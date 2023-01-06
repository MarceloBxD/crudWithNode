import React, { useState, useEffect } from "react";
import { Grid } from "./components/Grid";
import { Form } from "./components/Form";
import { Flex } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    const res = await axios
      .get("http://localhost:3001")
      .then((res) => res)
      .catch((err) => console.log(err));
    setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    return res;
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

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
