import Layout from '../libs/views/layout'

import TroubleshootView from '../libs/views/troubleshoot'

export default function Home() {
  return (
    <Layout menuActive="troubleshoot">
      <TroubleshootView />
    </Layout>
  )
}
