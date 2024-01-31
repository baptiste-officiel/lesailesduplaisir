import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Intro from "./components/intro/Intro";
import Planes from "./components/planes/Planes";
import Section from "./components/section-homepage/Section";
import HomepageCalendar from "./components/calendar-homepage/HomepageCalendar";
import HomepageNews from "./components/news-homepage/HomepageNews";
import React from "react";
import { unknown } from "zod";
import Contact from "./components/contact/Contact";

export default async function Home() {

  const session = await getServerSession(authOptions);

  const sections = [
    {
      id: 1,
      title: `Location\nULM`,
      img: '/img/location-homepage.jpeg',
      content: 'Que vous soyez un particulier ou un aéroclub, louez dès aujourd’hui notre VL3, avec ou sans pilote.',
      buttonLabel: 'Louer l\'avion',
      linkTo: '/location',
      price: 140
    },
    {
      id: 2,
      title: 'Formation\nGlass Cockpit',
      img: '/img/formation-homepage.jpeg',
      content: 'Vous cherchez à vous former sur une technologie de navigation récente, nous vous proposons notre formation Glass Cockpit.',
      buttonLabel: 'Me former',
      linkTo: '/formation',
      price: 140
    }
  ]

  const insertLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden mx-auto margin-top-navbar">
      <h1>{session?.user?.name}</h1>
      <Intro />
      <Planes />
      <div className="w-full md:flex md:justify-between pt-16 md:py-28 max-w-7xl mx-auto">
        {sections && 
          sections.map((item) =>
            <Section
            key={item.id}
            title={insertLineBreaks(item.title)}
            img={item.img}
            content={item.content}
            buttonLabel={item.buttonLabel}
            linkTo={item.linkTo}
            price={item.price}
            />
          )
        }
      </div>
      <HomepageCalendar />
      <HomepageNews />
      <Contact />
    </main>
  );
}
