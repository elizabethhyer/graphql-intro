import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :.(</div>;
  if (!data) return <div>No book selected</div>;

  if (data)
    return (
      <div id="book-details">
        {data.book ? (
          <div>
            <h2>{data.book.name}</h2>
            <p>By {data.book.author.name}</p>
            <p>{data.book.genre}</p>
            <p>Other books by {data.book.author.name}:</p>
            <ul className="other-books">
              {data.book.author.books.map((b) => {
                return <li key={b.id}>{b.name}</li>;
              })}
            </ul>
          </div>
        ) : (
          <div>No book selected</div>
        )}
      </div>
    );
}

export default BookDetails;
