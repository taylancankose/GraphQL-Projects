import { useEffect, useState } from "react";
import { useQuery, gql, useSubscription, useMutation } from "@apollo/client";
import Form from "../components/Form";
import Comments from "../components/Comments";

const initialForm = {
  title: "",
  desc: "",
  date: "",
  from: "",
  to: "",
  location_id: "1",
  user_id: "",
};
const GET_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      desc
      date
    }
  }
`;

const EVENT_SUBSCRIPTION = gql`
  subscription {
    subscription {
      eventCreated {
        _id
        title
        desc
        date
        from
        to
      }
    }
  }
`;

const NEW_EVENT_MUTATION = gql`
  mutation addEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      _id
      title
      desc
      date
      from
      to
      location_id
      user_id
    }
  }
`;

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      username
    }
  }
`;

const GET_ALL_LOCATIONS = gql`
  query getLocations {
    locations {
      _id
      name
    }
  }
`;

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);
  const { data: users } = useQuery(GET_ALL_USERS);
  const { data: locations } = useQuery(GET_ALL_LOCATIONS);
  const [form, setForm] = useState(initialForm);
  const [
    createEvent,
    { loading: eventLoading, data: eventData, error: eventError },
  ] = useMutation(NEW_EVENT_MUTATION);
  const [events, setEvents] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e, values) => {
    e.preventDefault();
    // setEvents([...events, form]);
    // setForm(initialForm);
    console.log(form);
    await createEvent({
      variables: {
        data: form,
      },
    });
  };

  useEffect(() => {
    subscribeToMore({
      document: EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;

        return {
          events: [...prev, events, subscriptionData.data.addEvent],
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="container">
      <Form
        form={form}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        users={users}
        eventLoading={eventLoading}
        locations={locations}
      />
      <Comments data={data} />
    </div>
  );
}

export default Home;
