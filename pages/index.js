import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="text-white bg-[#0F172A]">
      <Navbar />
      <main className="px-5">
        <h1>welcome</h1>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, optio
          obcaecati tempora repellat ad corrupti. Porro cum blanditiis ut
          suscipit?
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, ex
          veritatis, quia incidunt voluptatum, delectus labore nobis dolore fuga
          temporibus magnam sed rerum! Rerum facilis minus earum obcaecati
          voluptas similique. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aspernatur recusandae iusto eos voluptatum. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Voluptatem suscipit nesciunt
          necessitatibus deserunt quos libero aperiam neque nihil nisi minus?
        </p>
      </main>
      <Footer />
    </div>
  );
}
