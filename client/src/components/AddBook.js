import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from "../queries/queries";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("Select author");
  const [addBook, { bookData }] = useMutation(addBookMutation);
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });

    setName("");
    setGenre("");

    console.log(authorId);
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(e) => {
            setAuthorId(e.target.value);
          }}
        >
          <option disabled>Select author</option>
          {loading || error ? (
            <option disabled>Working</option>
          ) : (
            data &&
            data.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;
