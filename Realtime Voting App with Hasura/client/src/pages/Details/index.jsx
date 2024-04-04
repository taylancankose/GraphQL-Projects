import { useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NEW_VOTE_MUTATION, SUBSCRIBE_QUESTION_DETAILS } from "./queries";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function Details() {
  const { id } = useParams();
  const [selected, setSelected] = useState();
  const [isVoted, setIsVoted] = useState(false);
  const { loading, data, error } = useSubscription(SUBSCRIBE_QUESTION_DETAILS, {
    variables: {
      id,
    },
  });

  const [newVote, { loading: loadingVote }] = useMutation(NEW_VOTE_MUTATION, {
    onCompleted: () => setIsVoted(true),
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  const { options, title } = data?.questions_by_pk;

  const handleVote = () => {
    newVote({
      variables: {
        input: {
          option_id: selected,
        },
      },
    });
  };

  const total = options.reduce(
    (t, value) => t + value?.votes_aggregate?.aggregate?.count,
    0
  );

  return (
    <div>
      <h2>{title}</h2>

      {options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            value={option.id}
            name="selected"
            onChange={({ target }) => setSelected(target.value)}
            id={i}
          />
          <label style={{ marginLeft: 4 }} htmlFor={i}>
            {option.title}
          </label>

          {isVoted && (
            <div>
              <progress
                value={option?.votes_aggregate?.aggregate?.count}
                max={total}
              />
              <span>
                {" "}
                {(
                  (option?.votes_aggregate?.aggregate?.count / total) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          )}
        </div>
      ))}

      {!isVoted && (
        <button disabled={loadingVote} onClick={handleVote}>
          Vote
        </button>
      )}
    </div>
  );
}

export default Details;
