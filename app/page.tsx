"use client";
import { useState } from "react";
import Cursor        from "@/components/Cursor";
import ContactModal  from "@/components/ContactModal";
import CreatorModal  from "@/components/CreatorModal";
import Loader    from "@/components/Loader";
import Navbar    from "@/components/Navbar";
import Hero      from "@/components/Hero";
import Billboard from "@/components/Billboard";
import Services  from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import Brands    from "@/components/Brands";
import Closing   from "@/components/Closing";
import Footer    from "@/components/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Cursor />
      <Loader onDone={() => setReady(true)} />
      <ContactModal />
      <CreatorModal />

      <main className={ready ? "" : "opacity-0 pointer-events-none"}>
        <Navbar ready={ready} />
        <Hero />
        <Billboard />
        <Services />
        <Manifesto />
        <Brands />
        <Closing />
        <Footer />
      </main>
    </>
  );
}
