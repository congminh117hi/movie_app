import {RouterProvider} from "react-router-dom";
import router from "./routes/Web";

export default function Movies(){
    return (
        <RouterProvider router={router}/>
    )
}