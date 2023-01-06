import { Flex, Table, Thead, Tr, Td, Th, Tbody, Toast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import React from "react";

export const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3001/${id}`)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        Toast({
          title: "Usuário deletado com sucesso",
          description: data,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(({ data }) => {
        return Toast({
          title: "Erro ao deletar usuário",
          description: data,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Fone</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td w="30%" pt="15px" textAlign="center">
                {item.nome}
              </Td>
              <Td w="30%" pt="15px" textAlign="center">
                {item.email}
              </Td>
              <Td w="30%" pt="15px" textAlign="center">
                {item.fone}
              </Td>
              <Td align="center" w="5%" pt="15px" textAlign="center">
                <EditIcon cursor="pointer" onClick={() => handleEdit(item)} />
              </Td>
              <Td pt="15px" align="center" w="5%" textAlign="center">
                <DeleteIcon
                  onClick={() => handleDelete(item.id)}
                  cursor="pointer"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};
