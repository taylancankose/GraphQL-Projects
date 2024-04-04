export const Query = {
  // Event
  events: () => db.events,
  event: (_, args, { db }) => {
    const result = db.events.find((event) => event.id.toString() === args.id);
    if (!result) {
      throw new Error("Event not found");
    }
    return result;
  },
  //Location
  locations: () => db.locations,
  location: (_, args, { db }) => {
    const result = db.locations.find(
      (location) => location.id.toString() === args.id
    );
    if (!result) {
      throw new Error("Location not found");
    }
    return result;
  },
  // User
  users: () => db.users,
  user: (_, args, { db }) => {
    const result = db.users.find((user) => user.id.toString() === args.id);
    if (!result) {
      throw new Error("User not found");
    }
    return result;
  },
  // Participant
  participants: () => db.participants,
  participant: (_, args, { db }) => {
    const result = db.participants.find(
      (participant) => participant.id.toString() === args.id
    );
    if (!result) {
      throw new Error("Participant not found");
    }
    return result;
  },
};
