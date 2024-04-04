import React from "react";
import { Input, Text, Button } from "@chakra-ui/react";
function Form({ form, handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <Text marginBottom={2}>Title:</Text>
      <Input
        onChange={handleChange}
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor={"white"}
        placeholder="Enter event title"
        value={form.title}
        name="title"
      />
      <Text marginBottom={2}>Description:</Text>
      <Input
        onChange={handleChange}
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor={"white"}
        placeholder="Enter event description"
        value={form.description}
        name="description"
      />
      <Text marginBottom={2}>Event Date:</Text>
      <Input
        onChange={handleChange}
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor="white"
        placeholder="Enter date in the format mm.dd.yyyy"
        value={form.date}
        name="date"
      />
      <Button onClick={handleSubmit} type="submit" colorScheme="blue">
        Add Event
      </Button>
    </form>
  );
}

export default Form;
