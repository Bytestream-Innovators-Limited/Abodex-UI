"use client"

import React from 'react'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'

export default function AboutGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-8'>
      <LeftComponent />
      <RightComponent />
    </div>
  )
}
