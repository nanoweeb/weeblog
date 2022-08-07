import { useState } from "react";

export default function create() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    endpoint: "",
  });

  async function sendPost(e) {
    e.preventDefault();
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await res.json();
  }

  function formHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

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
