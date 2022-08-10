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

    //limit endpoint ben ra iso ke luwihen
    const getEndpoint = e.target.value.replace(/\s/g, "-");

    function limit(string = "", limit = 40) {
      return string.substring(0, limit);
    }
    //dadi iki sing di set nk endpoint random, iso title iso content, carane dewe dewe ra reti aku ketoke kudune nggo query selector nk from input e ning drung tak jajal

    const endpoint = limit(getEndpoint);

    setFormData({
      ...formData,
      [name]: value,
      endpoint: endpoint,
    });
  }

  // const reGetEndpoint = getEndpoint.join("");
  // const resultEndpoint = reGetEndpoint.replace(/\s/g, "-");
  // const finalEndpoint = resultEndpoint.toString().toLowerCase();

  // console.log(formData);

  // setFormData({
  //   endpoint: finalEndpoint,
  // });
  console.log(formData);

  return (
    <div className="w-full">
      <div className="max-w-[1000px] px-5 mx-auto mt-6 text-white">
        <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-2xl text-gray-200 font-semibold mb-10">
          Create a new posts
        </h1>

        <form
          onSubmit={sendPost}
          className="flex flex-col p-2 rounded-lg border-2 border-gray-700"
        >
          <input
            name="title"
            type="text"
            placeholder="title"
            onChange={formHandler}
          />
          {/* <input
          name="endpoint"
          type="text"
          placeholder="endpoint"
          onChange={formHandler}
          // defaultValue={finalEndpoint}
        /> */}
          <br />
          <textarea
            name="content"
            placeholder="content"
            onChange={formHandler}
          ></textarea>

          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
}
