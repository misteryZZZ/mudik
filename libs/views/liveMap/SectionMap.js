import React from "react";
// import GoogleMap from './GoogleMap'
import dynamic from "next/dynamic";

export default function Home() {
  const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false
  });

  return (
    <section className="rounded-2xl flex flex-col bg-white overflow-hidden h-[84vh] h-full">
      <LeafletMap />
      {/*<GoogleMap />*/}
    </section>
  );
}