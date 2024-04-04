import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NEW_QUESTION_MUTATION } from "./queries";

const initialOptions = [{ title: "" }, { title: "" }];

function NewQuestion() {
  const [addQuestion, { loading, data }] = useMutation(NEW_QUESTION_MUTATION);

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = (e) => {
    const newArr = options;

    newArr[e.target.id].title = e.target.value;
    setOptions([...newArr]);
  };

  const handleSave = () => {
    const filledOptions = options.filter((o) => o.title !== ""); // boş değilse ekle

    if (title === "" || filledOptions.length < 2) {
      return false;
    }
    console.log(filledOptions);
    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });

    setTitle("");
    setOptions(initialOptions);
  };

  return (
    <div>
      <h2>Question</h2>
      <input
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
      />

      <h2>Options</h2>
      {options.map((option, i) => (
        <div key={i}>
          <input
            placeholder="type your option"
            value={option.title}
            onChange={handleChangeOption}
            id={i}
            disabled={loading}
          />
        </div>
      ))}

      <button
        onClick={() => setOptions([...options, { title: "" }])}
        disabled={loading}
      >
        New Option
      </button>
      <button onClick={handleSave} disabled={loading}>
        Save
      </button>
    </div>
  );
}

export default NewQuestion;
