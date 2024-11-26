import { Button, Stack, Heading, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function CredentialModalContent() {
  const [credentials, setCredentials] = useState([]);
  const toast = useToast();

  useEffect( () => {
    fetchCredentials();
  }, [])

  const fetchCredentials = async () => {
    const { data, error } = await supabase
      .from("credentials")
      .select("*");

    if (error) {
      console.error("Error fetching credentials:", error);
    } else {
      setCredentials(data);
    }
  };

  const handleInputChange = (id, field, value) => {
    setCredentials((prevCredentials) =>
      prevCredentials.map((credential) =>
        credential.id === id ? { ...credential, [field]: value } : credential
      )
    );
  };

  const handleUpdateCredentials = async () => {
    for (const credential of credentials) {
      const { id, username, password } = credential;
      const { error } = await supabase
        .from("credentials")
        .update({ username, password })
        .eq("id", id);

      if (error) {
        console.error("Error updating credentials:", error);
      } else {
        toast({
          title: "Update Successful",
          description: "All credentials have been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return(
    <ModalContent>
      <ModalHeader>Credentials</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={4}>
          {credentials.map((credential) => (
            <React.Fragment key={credential.id}>
              <Heading size='md'>{credential.role}</Heading>
              <Input
                value={credential.username}
                size="sm"
                type="text"
                onChange={(e) =>
                  handleInputChange(credential.id, "username", e.target.value)
                }
              />
              <Input
                value={credential.password}
                size="sm"
                type="text"
                onChange={(e) =>
                  handleInputChange(credential.id, "password", e.target.value)
                }
              />
            </React.Fragment>
          ))}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleUpdateCredentials}>Update</Button>
      </ModalFooter>
    </ModalContent>
  )
}