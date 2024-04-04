const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const DATA = require("./data.json");
const { v4: uuidv4 } = require("uuid");

const { users, locations, events, participants } = DATA;

const typeDefs = `#graphql
 type User {
    id: ID!
    username: String
    email: String
 }

 input CreateUserInput {
  username: String!
  email: String!
 }

 input UpdateUserInput {
  username: String
  email: String
 }

 type Location {
    id: ID!
    name: String!
    desc: String
    lat: Float!
    lng: Float!
 }

 input CreateLocationInput {
  name: String!
  desc: String
  lat: Float!
  lng: Float!
 }

 input UpdateLocationInput{
  name: String
  desc: String
  lat: Float
  lng: Float
 }

 type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
 }

 input CreateParticipantInput {
  user_id: ID!
  event_id: ID!
 }

 input UpdateParticipantInput{
  user_id: ID
  event_id: ID
 }

 type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    user_id: ID!
    user: User!
    participants: [Participant]
    location: Location
 }

 input CreateEventInput{
  title: String!
  desc: String!
  user_id: ID!
  date: String!
  to: String!
  from: String!
 }

 input UpdateEventInput{
  title: String
  desc: String
  user_id: ID
  date: String
  to: String
  from: String
 }

 type Query {
    users: [User!]!
    user(id: ID!): User!

    events: [Event!]!
    event(id: ID!): Event!

    locations: [Location!]!
    location(id: ID!): Location!

    participants: [Participant!]!
    participant(id: ID!): Participant!
 }

 type deleteAllOutput{
  result: String!
 }

 type Mutation {
    # USER
    createUser(data: CreateUserInput): User!
    updateUser(id: ID!, data: UpdateUserInput): User!
    deleteUser(id: ID!): User
    deleteAllUsers: deleteAllOutput

    # EVENT
    createEvent(data: CreateEventInput): Event!
    updateEvent(id: ID!, data: UpdateEventInput): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: deleteAllOutput

    # Location
    createLocation(data: CreateLocationInput): Location!
    updateLocation(id: ID!, data: UpdateLocationInput): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations: deleteAllOutput

    # Participant
    createParticipant(data: CreateParticipantInput): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants: deleteAllOutput

 }
`;

const resolvers = {
  Mutation: {
    // User
    createUser: (parent, { data }) => {
      const user = {
        id: uuidv4(),
        ...data,
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === Number(id));
      if (user_index === -1) throw new Error("User not found");
      users[user_index] = {
        ...users[user_index],
        ...data,
      };

      return users[user_index];
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === Number(id));
      if (user_index === -1) throw new Error("User not found");
      console.log(user_index, "index");
      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      return deleted_user;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);
      return {
        result: `${length} users deleted`,
      };
    },

    // Event
    createEvent: (parent, { data }) => {
      const user_id_index = users.findIndex(
        (user) => Number(user.id) === Number(data.user_id)
      );
      if (user_id_index === -1) throw new Error("User not found");
      const event = {
        id: uuidv4(),
        ...data,
      };
      events.push(event);
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex((event) => event.id === Number(id));
      if (event_index === -1) throw new Error("Event not found");
      events[event_index] = {
        ...events[event_index],
        ...data,
      };
      return events[event_index];
    },
    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex((event) => event.id === Number(id));
      if (event_index === -1) throw new Error("Event not found");
      const deletedEvent = events[event_index];
      events.splice(event_index, 1);
      return deletedEvent;
    },
    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);
      return {
        result: `${length} events deleted`,
      };
    },

    // Location
    createLocation: (parent, { data }) => {
      const location = {
        id: uuidv4(),
        ...data,
      };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex(
        (location) => location.id === Number(id)
      );
      if (location_index === -1) throw new Error("location not found");
      locations[location_index] = {
        ...locations[location_index],
        ...data,
      };
      return locations[location_index];
    },
    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex(
        (location) => location.id === Number(id)
      );
      if (location_index === -1) throw new Error("location not found");
      const deletedLocation = locations[location_index];
      locations.splice(location_index, 1);
      return deletedLocation;
    },
    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);
      return {
        result: `${length} locations deleted`,
      };
    },

    // Participant
    createParticipant: (parent, { data }) => {
      const participant = {
        id: uuidv4(),
        ...data,
      };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === Number(id)
      );
      if (participant_index === -1) throw new Error("participant not found");
      participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      };
      return participants[participant_index];
    },
    deleteParticipant: (parent, { id }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === Number(id)
      );
      if (participant_index === -1) throw new Error("participant not found");
      const deletedParticipant = participants[participant_index];
      participants.splice(participant_index, 1);
      return deletedParticipant;
    },
    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);
      return {
        result: `${length} participants deleted`,
      };
    },
  },

  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === parseInt(args.id)),

    events: () => events,
    event: (parent, args) =>
      events.find((event) => event.id === parseInt(args.id)),

    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id === parseInt(args.id)),

    participants: () => participants,
    participant: (parent, args) =>
      participants.find((participant) => participant.id === parseInt(args.id)),
  },

  Event: {
    user: (parent, args) => {
      return users.find((user) => user.id === parent.id);
    },
    location: (parent, args) => {
      return locations.find((location) => location.id === parent.id);
    },
    participants: (parent, args) => {
      return participants.filter(
        // çünkü bu array
        (participant) => participant.event_id === parseInt(parent.id)
      );
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const server = async () =>
  await startStandaloneServer(apolloServer, {
    listen: { port: 4000 },
  });

server().then(({ url }) => console.log(`Server started at ${url}`));
