import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Loader from '../components/loader'
import Layout from '../layout'

const Home = lazy(() => import('../pages/home'))
const Manageshapes = lazy(() => import('../pages/manageshapes'))

function MainRouter() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
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
