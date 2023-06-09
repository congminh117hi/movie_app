import {
    createBrowserRouter
} from "react-router-dom";
import { lazy, Suspense } from "react";
import SpinMovies from "../components/commons/Spin";

const HomePage = lazy(() => import('../pages/Home'));
const UpcomingPage = lazy(() => import('../pages/Upcoming'));
const SearchPage = lazy(() => import('../pages/Search'));
const NotfoundPage = lazy(() => import('../pages/404'));
const DetailPage = lazy(() => import('../pages/Detail'));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<SpinMovies/>}>
                <HomePage/>
            </Suspense>
        ),
        errorElement: <NotfoundPage/>
    },
    {
        path: "/upcoming",
        element: (
            <Suspense fallback={<SpinMovies/>}>
                <UpcomingPage/>
            </Suspense>
        ),
        errorElement: <NotfoundPage/>
    },
    {
        path: "/search",
        element: (
            <Suspense fallback={<SpinMovies/>}>
                <SearchPage/>
            </Suspense>
        ),
        errorElement: <NotfoundPage/>
    },
    {
        // localhost:1537/movie/qua-nhanh-qua-nguy-hiem/1234
        // :slug va :id la tham so truyen len url ( co the thay doi gia tri duoc)
        path: "/movie/:slug/:id",
        element: (
            <Suspense fallback={<SpinMovies/>}>
                <DetailPage/>
            </Suspense>
        ),
        errorElement: <NotfoundPage/>
    }
])
export default router;