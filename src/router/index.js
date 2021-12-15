import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/loader";
import Layout from "../layout";


const Home = lazy(() => import("../pages/home"));
const ShowShapes = lazy(() => import("../pages/show-shapes"));

function MainRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show-shapes" element={<ShowShapes />} />
                    </Routes>
                </Layout>
            </Suspense>
        </BrowserRouter >
    )
}
export default MainRouter;