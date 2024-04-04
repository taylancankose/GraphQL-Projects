export const User = {
  events: (_, parent, { db }) => {
    const result = db.events.filter(
      (event) => event.user_id.toString() === parent.id.toString()
    );
    return result;
  },
  attended_events: (parent) => {
    const attended_events = db.participants.filter(
      (participant) => participant.user_id.toString() === parent.id.toString()
    );
    let arr = [];
    attended_events.forEach((item) => {
      const result = db.events.find(
        (event) => event.id.toString() === item.event_id.toString()
      );
      if (result) {
        arr.push(result);
      }
    });
    return arr;
  },
};
