import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  Text,
  Card,
  Flex,
  CardBody,
  CardHeader,
  Image,
} from "@chakra-ui/react";

const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      user {
        id
        username
        email
      }
      location {
        id
        name
      }
      participants {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

function CommentDetail() {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: {
      id: location.state.id,
    },
  });
  console.log(data?.event);
  return (
    <div
      style={{
        backgroundColor: "tomato",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card maxW="xl" width={"83%"} padding={"0.5rem"} marginBottom={"1rem"}>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          height={"10%"}
          objectFit="cover"
        />
        <CardHeader>
          <Flex
            data-type="Flex"
            flexWrap="wrap"
            justifyContent={"space-between"}
          >
            <div
              style={{
                maxWidth: "85%",
              }}
            >
              <Text fontWeight={"bold"}>{data?.event?.title}</Text>
              <Text>{data?.event?.desc}</Text>
            </div>
            <div>
              <Text>{data?.event?.date}</Text>
            </div>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            <span style={{ fontWeight: "bold" }}>Location: </span>
            {data?.event?.location?.name}
          </Text>
          {data?.event?.participants.map((participant) => (
            <Text key={participant?.id}>
              <span style={{ fontWeight: "bold" }}>Participants: </span>
              {participant?.user.username}
            </Text>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default CommentDetail;
