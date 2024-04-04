export const Event = {
  location: (_, parent, { db }) => {
    const result = db.locations.find(
      (location) => location.id.toString() === parent.location_id.toString()
    );
    return result;
  },
  user: (_, parent, { db }) => {
    const result = db.users.find(
      (user) => user.id.toString() === parent.user_id.toString()
    );
    return result;
  },
  participants: (_, parent, { db }) => {
    const result = db.participants.filter(
      (participant) => participant.event_id.toString() === parent.id.toString()
    );
    return result;
  },
};
