import { useState, useEffect } from "react";
// import GoogleMap from './GoogleMap'
import dynamic from "next/dynamic";

import { getMap } from '../../models/mapModel'

export default function SectionMap() {
  const LeafletMap = dynamic(() => import("./LeafletMap"), {
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
    <section className="rounded-2xl flex flex-col bg-white overflow-hidden h-[84vh] h-full">
      <LeafletMap markers={maps} />
    </section>
  );
}