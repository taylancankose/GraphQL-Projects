import { v4 as uuidv4 } from "uuid";

export const Mutation = {
  // Event
  createEvent: (_, { data }, { db }) => {
    const event = { id: uuidv4(), ...data };
    db.events.push(event);
    pubSub.publish("eventCreated", event);
    return event;
  },
  updateEvent: (_, { id, data }, { db }) => {
    const event_index = db.events.findIndex(
      (event) => event.id.toString() === id
    );
    if (event_index === -1) {
      throw new Error("Event not found.");
    }
    const updated_event = (db.events[event_index] = {
      ...db.events[event_index],
      ...data,
    });
    return updated_event;
  },
  deleteEvent: (_, { id }, { db }) => {
    const event_index = db.events.findIndex(
      (event) => event.id.toString() === id
    );
    if (event_index === -1) {
      throw new Error("Event not found.");
    }
    const deleted_event = db.events[event_index];
    db.events.splice(event_index, 1);
    return deleted_event;
  },
  deleteAllEvents: () => {
    const length = db.events.length;
    db.events.splice(0, length);
    return { count: length };
  },
  // User
  createUser: (_, { data }, { db }) => {
    const user = { id: uuidv4(), ...data };
    db.users.push(user);
    pubSub.publish("userCreated", user);
    return user;
  },
  updateUser: (_, { id, data }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id.toString() === id);
    if (user_index === -1) {
      throw new Error("User not found.");
    }
    const updated_user = (db.users[user_index] = {
      ...db.users[user_index],
      ...data,
    });
    return updated_user;
  },
  deleteUser: (_, { id }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id.toString() === id);
    if (user_index === -1) {
      throw new Error("User not found.");
    }
    const deleted_user = db.users[user_index];
    db.users.splice(user_index, 1);
    return deleted_user;
  },
  deleteAllUsers: () => {
    const length = db.users.length;
    db.users.splice(0, length);
    return { count: length };
  },
  // Location
  createLocation: (_, { data }, { db }) => {
    const location = { id: uuidv4(), ...data };
    db.locations.push(location);
    return location;
  },
  updateLocation: (_, { id, data }, { db }) => {
    const location_index = db.locations.findIndex(
      (location) => location.id.toString() === id
    );
    if (location_index === -1) {
      throw new Error("Location not found.");
    }
    const updated_location = (db.locations[location_index] = {
      ...db.locations[location_index],
      ...data,
    });
    return updated_location;
  },
  deleteLocation: (_, { id }, { db }) => {
    const location_index = db.locations.findIndex(
      (location) => location.id.toString() === id
    );
    if (location_index === -1) {
      throw new Error("Location not found.");
    }
    const deleted_location = db.locations[location_index];
    db.locations.splice(location_index, 1);
    return deleted_location;
  },
  deleteAllLocations: () => {
    const length = db.locations.length;
    db.locations.splice(0, length);
    return { count: length };
  },
  // Participant
  createParticipant: (_, { data }, { db }) => {
    const participant = { id: uuidv4(), ...data };
    db.participants.push(participant);
    pubSub.publish("participantCreated", participant);
    return participant;
  },
  updateParticipant: (_, { id, data }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id.toString() === id
    );
    if (participant_index === -1) {
      throw new Error("Participant not found.");
    }
    const updated_participant = (db.participants[participant_index] = {
      ...db.participants[participant_index],
      ...data,
    });
    return updated_participant;
  },
  deleteParticipant: (_, { id }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id.toString() === id
    );
    if (participant_index === -1) {
      throw new Error("Participant not found.");
    }
    const deleted_participant = db.participants[participant_index];
    db.participants.splice(participant_index, 1);
    return deleted_participant;
  },
  deleteAllParticipants: () => {
    const length = db.participants.length;
    db.participants.splice(0, length);
    return { count: length };
  },
};
