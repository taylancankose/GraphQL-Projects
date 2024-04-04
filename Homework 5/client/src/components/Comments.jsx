import React from "react";
import { Text, Card, Stack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Comments({ data }) {
  const navigate = useNavigate();

  const handleDetails = (id, data) => {
    navigate(`/comment/${id}`, { state: data });
  };

  return (
    <Stack className="event-container">
      {data?.events?.map((event, i) => (
        <Card
          key={i}
          width={"83%"}
          padding={"0.5rem"}
          marginBottom={"1rem"}
          onClick={() => handleDetails(event.id, event)}
        >
          <Flex
            data-type="Flex"
            flexWrap="wrap"
            justifyContent={"space-between"}
            padding={"2rem"}
          >
            <div
              style={{
                maxWidth: "85%",
              }}
            >
              <Text fontWeight={"bold"}>{event?.title}</Text>
              <Text>{event?.desc}</Text>
            </div>
            <div>
              <Text>{event?.date}</Text>
            </div>
          </Flex>
        </Card>
      ))}
    </Stack>
  );
}

export default Comments;
