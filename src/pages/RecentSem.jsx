import React from 'react'
import { Outlet } from 'react-router-dom'
import Courses from '@/components/Courses'
import UploadForm from '@/components/UploadForm'

const RecentSem = () => {

  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default RecentSem
