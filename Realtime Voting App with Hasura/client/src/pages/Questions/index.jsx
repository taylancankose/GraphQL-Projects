import React from "react";
import { useSubscription } from "@apollo/client";
import { QUESTIONS_SUBSCRIPTION } from "./queries";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

function Questions() {
  const { loading, data } = useSubscription(QUESTIONS_SUBSCRIPTION);
  if (loading) {
    return <Loading />;
  }
  console.log(data.questions);
  return (
    <div>
      {data?.questions?.map((q) => (
        <div key={q.id}>
          <Link to={`/q/${q.id}`}>{q.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Questions;
