const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const DATA = require("./data.json");

const { users, locations, events, participants } = DATA;

const typeDefs = `#graphql
 type User {
    id: ID!
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

 type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
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
`;

const resolvers = {
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
