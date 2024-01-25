import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Intro from "./components/intro/Intro";
import Planes from "./components/planes/Planes";
import Section from "./components/section-homepage/Section";

export default async function Home() {

  const session = await getServerSession(authOptions)

  const sections = [
    {
      id: 1,
      title: 'Location',
      img: '/img/location-homepage.jpeg',
      content: 'Que vous soyez un particulier ou un aéroclub, louez dès aujourd’hui notre VL3, avec ou sans pilote.',
      buttonLabel: 'Louer l\'avion',
      linkTo: '/location',
      price: 140
    },
    {
      id: 2,
      title: 'Formation',
      img: '/img/formation-homepage.jpeg',
      content: 'Vous cherchez à vous former sur une technologie de navigation récente, nous vous proposons notre formation Glass Cockpit.',
      buttonLabel: 'Me former',
      linkTo: '/formation',
      price: 140
    }
  ]

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden mx-auto">
      <h1>{session?.user?.name}</h1>
      <Intro />
      <Planes />
      {sections && 
        sections.map((item) =>
          <Section
          key={item.id}
          title={item.title}
          img={item.img}
          content={item.content}
          buttonLabel={item.buttonLabel}
          linkTo={item.linkTo}
          price={item.price}
          />
        )
      }
    </main>
  );
}
