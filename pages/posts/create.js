import Router from "next/router";
import { useState } from "react";

export default function create() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    endpoint: "",
  });

  async function sendPost(e) {
    e.preventDefault();
    const createReq = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const createRes = await createReq.json();

    Router.push("/posts");
  }

  function formHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const getEndpoint = Object.keys(formData.title).map((key) => [
    formData.title[key],
  ]);

  const reGetEndpoint = getEndpoint.join("");
  const resultEndpoint = reGetEndpoint.replace(/\s/g, "-");
  const finalEndpoint = resultEndpoint.toString().toLowerCase();

  return (
    <div>
      <h1>Post something</h1>

      <form onSubmit={sendPost}>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={formHandler}
        />
        <input
          name="endpoint"
          type="text"
          placeholder="endpoint"
          onChange={formHandler}
          defaultValue={finalEndpoint}
        />
        <br />
        <textarea
          name="content"
          placeholder="content"
          onChange={formHandler}
        ></textarea>

        <button type="submit">send</button>
      </form>
    </div>
  );
}
