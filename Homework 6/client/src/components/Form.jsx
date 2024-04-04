import React from "react";
import { Input, Text, Button, Select } from "@chakra-ui/react";

function Form({
  form,
  handleSubmit,
  handleChange,
  users,
  eventLoading,
  locations,
}) {
  console.log(locations);
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
        disabled={eventLoading}
        isLoading={eventLoading}
      />
      <Text marginBottom={2}>Description:</Text>
      <Input
        onChange={handleChange}
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor={"white"}
        placeholder="Enter event description"
        value={form.desc}
        name="desc"
        disabled={eventLoading}
        isLoading={eventLoading}
      />
      <Text marginBottom={2}>Event Organizer:</Text>
      <Select
        placeholder="Select option"
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor={"white"}
        onChange={handleChange}
        name="user_id"
        disabled={eventLoading}
        isLoading={eventLoading}
      >
        {users?.users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </Select>
      <Text marginBottom={2}>Event Location:</Text>
      <Select
        placeholder="Select option"
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor={"white"}
        onChange={handleChange}
        name="location_id"
        disabled={eventLoading}
        isLoading={eventLoading}
      >
        {locations?.locations?.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Select>
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
        disabled={eventLoading}
        isLoading={eventLoading}
      />
      <Text marginBottom={2}>Start Hour:</Text>
      <Input
        onChange={handleChange}
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor="white"
        placeholder="Enter time"
        value={form.from}
        name="from"
        disabled={eventLoading}
        isLoading={eventLoading}
      />
      <Text marginBottom={2}>End Hour:</Text>
      <Input
        onChange={handleChange}
        display="block"
        width="80%"
        marginBottom={8}
        backgroundColor="white"
        placeholder="Enter time"
        value={form.to}
        name="to"
        disabled={eventLoading}
        isLoading={eventLoading}
      />
      <Button
        onClick={handleSubmit}
        type="submit"
        colorScheme="blue"
        disabled
        isLoading={eventLoading}
        loadingText="loading"
      >
        Add Event
      </Button>
    </form>
  );
}

export default Form;
