import Layout from "../../components/Layout";

export default function admin() {
  return (
    <Layout>
      <div className="w-full h-screen bg-[#131d35] pt-16">
        <div className="max-w-[1000px] px-5 mx-auto py-10">
          <main>
            <div className="mb-10">
              <h1 className="bg-gradient-to-r bg-clip-text text-transparent text-3xl font-semibold from-[#24a4a7] to-indigo-600 ">
                Welcome to Admin page
              </h1>
              <p className="text-gray-200 text-lg">
                Lets start your first blog easily 🔥
              </p>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
