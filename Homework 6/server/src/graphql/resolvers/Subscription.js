import { createPubSub } from "graphql-yoga";

const pubSub = createPubSub();

export const Subscription = {
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
};
