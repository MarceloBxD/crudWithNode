import { Flex, Text, Input, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef } from "react";

export const Form = ({ onEdit, setOnEdit, getUsers }) => {
  const ref = useRef();
  const toast = useToast();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Preencha todos os campos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      if (onEdit) {
        await axios
          .put(`http://localhost:3001/${onEdit.id}`, {
            nome: user.nome.value,
            email: user.email.value,
            fone: user.fone.value,
            data_nascimento: user.data_nascimento.value,
          })
          .then(() => {
            toast({
              title: "Usuário sofreu alterações",
              message: "Dados atualizados com sucesso",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: "Erro ao editar usuário",
              status: "error",
              description: err,
              duration: 2000,
              isClosable: true,
            });
          });
      } else {
        await axios
          .post(`http://localhost:3001`, {
            nome: user.nome.value,
            email: user.email.value,
            fone: user.fone.value,
            data_nascimento: user.data_nascimento.value,
          })
          .then((response) => {
            toast({
              title: "Usuário cadastrado com sucesso",
              description: response.data,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: "Erro ao cadastrar usuário",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
      }
    }
    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <form
      style={{
        padding: "20px",
        boxShadow: "10px 5px 5px 1px rgba(0, 0, 0, 0.2)",
        marginTop: "20px",
        maxWidth: "1000px",
        width: "800px",
      }}
      ref={ref}
      onSubmit={handleSubmit}
    >
      <Flex p="15px" align="center" gap="20px" borderRadius="10px">
        <Flex flexDir="column">
          <Text>Nome</Text>
          <Input variant="flushed" name="nome" type="text" />
        </Flex>
        <Flex flexDir="column">
          <Text>Email</Text>
          <Input variant="flushed" name="email" type="email" />
        </Flex>
        <Flex flexDir="column">
          <Text>Telefone</Text>
          <Input variant="flushed" name="fone" type="tel" />
        </Flex>
        <Flex flexDir="column">
          <Text>Data Nascimento</Text>
          <Input variant="flushed" name="data_nascimento" type="date" />
        </Flex>
        <Button colorScheme="twitter" size="md" variant="solid" type="submit">
          Enviar
        </Button>
      </Flex>
    </form>
  );
};
