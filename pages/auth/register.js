import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function register() {
  async function register() {}
  return (
    <div>
      <h1>register</h1>
      <form>
        <input type="text" placeholder="username" />
        <br />
        <input type="text" placeholder="email" />
        <br />
        <input type="text" placeholder="password" />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}
