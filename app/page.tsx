import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Intro from "./components/intro/Intro";
import Planes from "./components/planes/Planes";

export default async function Home() {

  const session = await getServerSession(authOptions)
  console.log("🚀 ~ Home ~ session:", session)

  return (
    <main className="flex min-h-screen w-full flex-col p-4 overflow-hidden mx-auto">
      <h1>{session?.user?.name}</h1>
      <Intro />
      <Planes />
    </main>
  );
}
