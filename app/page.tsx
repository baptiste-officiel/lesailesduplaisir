import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions)
  console.log("🚀 ~ Home ~ session:", session)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{session?.user?.name}</h1>
    </main>
  );
}
