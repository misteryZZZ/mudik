import Layout from '../libs/views/layout'

import DashboardView from '../libs/views/dashboard'

export default function Home() {
  return (
    <Layout menuActive="dashboard">
      <DashboardView />
    </Layout>
  )
}
