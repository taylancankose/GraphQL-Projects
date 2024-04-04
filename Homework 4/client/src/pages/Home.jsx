import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Form from "../components/Form";
import Comments from "../components/Comments";

const initialForm = {
  title: "",
  description: "",
  date: "",
};
const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      desc
      date
    }
  }
`;

function Home() {
  const [form, setForm] = useState(initialForm);
  const [events, setEvents] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, form]);
    setForm(initialForm);
  };

  const { loading, error, data } = useQuery(GET_EVENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="container">
      <Form
        form={form}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Comments data={data} />
    </div>
  );
}

export default Home;
