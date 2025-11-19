import React from 'react'
import { FeatureBentoGrid } from './FeaturesBentoGrid'
import LeftContent from './LeftContent'

export default function Grid() {
  return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-16 min-h-[calc(100vh-17rem)]">
			<LeftContent />
			<FeatureBentoGrid />
		</div>
  )
}
