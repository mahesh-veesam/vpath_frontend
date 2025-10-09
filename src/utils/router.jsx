import App from "../App";
import Coursecard from "@/components/Coursecard";
import UploadForm from "@/components/UploadForm";
import Home from "@/pages/Home";
import PyqsPage from "@/pages/PyqsPage";
import RecentSem from "@/pages/RecentSem";
import Communities from "@/pages/Communities";
import Courses from "@/components/Courses";
import EditForm from "@/components/EditForm";
import GpaCalc from "@/components/GpaCalc";
import CgpaCalc from "@/components/CgpaCalc";

import { createBrowserRouter, Navigate } from "react-router-dom";
import Calculator from "@/pages/Calculator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "pyqs",
        element: <PyqsPage />,
        children: [
          { path: "", element: <Navigate to="/pyqs/freshers" replace /> },
          { path: ":batch", element: <PyqsPage/> },
          { path : "*", element : <Navigate to="/pyqs" replace/>}
        ]
      },

      {
        path: "recentSem",
        element: <RecentSem />,
        children: [
          { path: "", element: <Courses/> },
          { path: "upload", element: <UploadForm /> },
          {
            path: "course/:code", element: <Coursecard />,
            children: [
              { path: "edit", element: <EditForm /> }
            ]
          },
          { path : "*", element : <Navigate to="/recentSem" replace/>}
        ]
      },
      
      {
        path: "calculator", element: <Calculator />,

      },

      {
        path: "communities", element: <Communities />,

      },
      { path : "*", element : <Navigate to="/home" replace/>},
    ]
  }
]);

export default router;
