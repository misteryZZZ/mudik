import Layout from '../libs/views/layout'

import LiveMapView from '../libs/views/liveMap'

export default function Home() {
  return (
    <Layout menuActive="map">
      <LiveMapView />
    </Layout>
  )
}
