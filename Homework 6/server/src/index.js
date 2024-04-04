import { createServer } from "node:http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { useGraphQLSSE } from "@graphql-yoga/plugin-graphql-sse";
import typeDefs from "./graphql/typeDefs/index.js";
import db from "./db.js";
import data from "./data.js";
import User from "./models/User.js";
import Event from "./models/Event.js";
import Location from "./models/Location.js";
import Participant from "./models/Participant.js";
import mongoose from "mongoose";

const pubSub = createPubSub();

const { events, locations, participants, users } = db;
const resolvers = {
  Subscription: {
    // Event
    eventCreated: {
      subscribe: () => {
        return pubSub.subscribe("eventCreated");
      },
      resolve: (payload) => payload,
    },
    // User
    userCreated: {
      subscribe: () => {
        return pubSub.subscribe("userCreated");
      },
      resolve: (payload) => payload,
    },
    // Participant
    participantCreated: {
      subscribe: () => {
        return pubSub.subscribe("participantCreated");
      },
      resolve: (payload) => payload,
    },
  },
  Mutation: {
    // Event
    createEvent: async (_, { data }, { _db }) => {
      const user = await _db.User.findById(
        new mongoose.Types.ObjectId(data.user)
      );
      if (!user) throw new Error("User not found");
      const newEvent = new _db.Event({
        ...data,
      });

      const event = await newEvent.save();

      user.events.push(event.id);
      user.save();

      const eventCount = await _db.Event.countDocuments();
      pubSub.publish("eventCreated", event);
      pubSub.publish("postCount", { eventCount });
      return event;
    },
    updateEvent: async (_, { id, data }, { _db }) => {
      const eventExists = await _db.Event.findById(id);
      if (!eventExists) {
        throw new Error("Event not found.");
      }

      const updated_event = await _db.Event.findByIdAndUpdate(id, data, {
        new: true,
      });
      pubSub.publish("eventUpdated", updated_event);
      return updated_event;
    },
    deleteEvent: async (_, { id }, { _db }) => {
      const eventExists = await _db.Event.findById(id);
      if (!eventExists) {
        throw new Error("Event not found.");
      }
      const deleted_event = await _db.Event.findByIdAndDelete(id);

      pubSub.publish("eventDeleted", { eventDeleted: deleted_event });
      return deleted_event;
    },
    deleteAllEvents: async (_, __, { _db }) => {
      const deleteEvents = await _db.Event.deleteMany({});

      return { count: deleteEvents.deletedCount };
    },
    // User
    createUser: async (_, { data }, { _db }) => {
      const newUser = new _db.User({
        ...data,
      });

      const user = await newUser.save();

      pubSub.publish("userCreated", user);
      return user;
    },
    updateUser: async (_, { id, data }, { _db }) => {
      const userExists = await _db.User.findById(id);
      if (!userExists) {
        throw new Error("User not found.");
      }
      const updated_user = await _db.User.findByIdAndUpdate(id, data, {
        new: true,
      });

      pubSub.publish("userUpdated", { userUpdated: updated_user });
      return updated_user;
    },
    deleteUser: async (_, { id }, { _db }) => {
      const userExists = await _db.User.findById(id);
      if (!userExists) {
        throw new Error("User not found.");
      }
      const deleted_user = await _db.User.findByIdAndDelete(id);

      pubSub.publish("userDeleted", { userDeleted: deleted_user });
      return deleted_user;
    },
    deleteAllUsers: async (_, __, { _db }) => {
      const delete_users = await _db.User.deleteMany({});

      return { count: delete_users.deletedCount };
    },
    // Location
    createLocation: async (_, { data }, { _db }) => {
      const newLocation = await new _db.Location(location);
      const createdLocation = newLocation.save();

      pubSub.publish("locationCreated", { location });

      return createdLocation;
    },
    updateLocation: (_, { id, data }) => {
      const location_index = locations.findIndex(
        (location) => location.id.toString() === id
      );
      if (location_index === -1) {
        throw new Error("Location not found.");
      }
      const updated_location = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });
      return updated_location;
    },
    deleteLocation: (_, { id }) => {
      const location_index = locations.findIndex(
        (location) => location.id.toString() === id
      );
      if (location_index === -1) {
        throw new Error("Location not found.");
      }
      const deleted_location = locations[location_index];
      locations.splice(location_index, 1);
      return deleted_location;
    },
    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);
      return { count: length };
    },
    // Participant
    createParticipant: (_, { data }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      pubSub.publish("participantCreated", participant);
      return participant;
    },
    updateParticipant: (_, { id, data }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id.toString() === id
      );
      if (participant_index === -1) {
        throw new Error("Participant not found.");
      }
      const updated_participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });
      return updated_participant;
    },
    deleteParticipant: (_, { id }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id.toString() === id
      );
      if (participant_index === -1) {
        throw new Error("Participant not found.");
      }
      const deleted_participant = participants[participant_index];
      participants.splice(participant_index, 1);
      return deleted_participant;
    },
    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);
      return { count: length };
    },
  },
  Query: {
    // Event
    events: async (_, __, { _db }) => {
      const events = await _db.Event.find();
      return events;
    },
    event: async (_, args, { _db }) => {
      //const result = events.find((event) => event.id.toString() === args.id);
      const result = await _db.Event.findById(args.id);
      return result;
    },
    //Location
    locations: async (_, args, { _db }) => {
      const location = await _db.Location.find();
      return location;
    },
    location: async (_, args, { _db }) => {
      // const result = locations.find(
      //   (location) => location.id.toString() === args.id
      // );
      const result = await _db.Location.findById(args.id);
      return result;
    },
    // User
    users: async (_, __, { _db }) => {
      const users = await _db.User.find();
      return users;
    },
    user: async (_, args, { _db }) => {
      const result = await _db.User.findById(args.id);
      if (!result) {
        throw new Error("User not found");
      }
      return result;
    },
    // Participant
    participants: async (_, __, { _db }) => {
      const participants = await _db.Participant?.find();
      return participants;
    },
    participant: async (_, args, { _db }) => {
      // const result = participants.find(
      //   (participant) => participant.id.toString() === args.id
      // );
      const result = await _db.Participant.findById(args.id);
      return result;
    },
  },
  Event: {
    location: async (parent, __, { _db }) => {
      const result = await _db.Location.findById(String(parent.location));
      console.log(result);
      return result;
    },
    user: async (parent, __, { _db }) => {
      const result = await _db.User.findById(parent.user);
      return result;
    },
    participants: async (parent, __, { _db }) => {
      const result = await _db.Participant.find({ event: parent.id });
      console.log(result);
      return result;
    },
  },
  User: {
    events: async (parent, _, { _db }) => {
      const result = await _db.Event.find({ user: parent.id });
      return result;
    },
    attended_events: (parent) => {
      const attended_events = participants.filter(
        (participant) => participant.user_id.toString() === parent.id.toString()
      );
      let arr = [];
      attended_events.forEach((item) => {
        const result = events.find(
          (event) => event.id.toString() === item.event_id.toString()
        );
        if (result) {
          arr.push(result);
        }
      });
      return arr;
    },
  },
  Participant: {
    user: async (parent, __, { _db }) => {
      const result = await _db.User.findById(parent.user);

      return result;
    },
    event: async (parent, __, { _db }) => {
      const result = await _db.Event.findById(parent.event);
      return result;
    },
  },
};

db();

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  graphqlEndpoint: "/",
  schema,
  plugins: [useGraphQLSSE()],
  context: {
    db: data,
    _db: {
      User,
      Event,
      Location,
      Participant,
    },
  },
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/");
});
