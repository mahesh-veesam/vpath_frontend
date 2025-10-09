import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from "@/components/ui/provider"
import './index.css'
import router from "./utils/router"

createRoot(document.getElementById('root')).render(
    <Provider>
        <RouterProvider router={router}/>
    </Provider>
)
