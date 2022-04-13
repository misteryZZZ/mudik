import { useState, useEffect } from "react";
// import GoogleMap from './GoogleMap'
import dynamic from "next/dynamic";

import { getMap } from '../../../models/mapModel'

export default function SectionMap() {
  const LeafletMap = dynamic(() => import("../../liveMap/LeafletMap"), {
    ssr: false
  });

  const [maps, setMaps] = useState([])

  const getData = async () => {
    const response = await getMap();
    setMaps(response)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <section className="rounded-2xl overflow-hidden w-full h-72 md:h-auto">
      <LeafletMap markers={maps} />
    </section>
  );
}