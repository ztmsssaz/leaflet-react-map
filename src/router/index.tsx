import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from '../layout'
import FallbackLoading from '../components/fallbackLoading'

const Home = lazy(() => import('../pages/home'))
const Manageshapes = lazy(() => import('../pages/manageshapes'))

function MainRouter() {
  return (
    <Router>
      <Suspense fallback={<FallbackLoading />}>
        <Layout>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/show-shapes'
              element={<Manageshapes />}
            />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  )
}
export default MainRouter
