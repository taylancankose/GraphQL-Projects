export const Participant = {
  user: (_, parent, { db }) => {
    const result = db.users.find(
      (user) => user.id.toString() === parent.user_id.toString()
    );
    return result;
  },
  event: (_, parent, { db }) => {
    const result = db.events.find(
      (event) => event.id.toString() === parent.event_id.toString()
    );
    return result;
  },
};
