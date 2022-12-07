import React from "react";

export default function Status({ message }) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
        message={message}
      />
      <h1 className="text--semi-bold">Deleting</h1>
    </main>
  )
}