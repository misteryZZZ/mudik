import Layout from '../libs/views/layout'

import ManifestView from '../libs/views/manifest'

export default function Home() {
  return (
    <Layout menuActive="manifest">
      <ManifestView />
    </Layout>
  )
}
