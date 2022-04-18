import { useState, useEffect } from "react";
// import GoogleMap from './GoogleMap'
import dynamic from "next/dynamic";

export default function SectionMap({ maps }) {
  const LeafletMap = dynamic(() => import("../../liveMap/LeafletMap"), {
    ssr: false
  });

  return (
    <section className="grow rounded-2xl overflow-hidden w-2/5 h-72 md:h-auto">
      <LeafletMap markers={maps} />
    </section>
  );
}