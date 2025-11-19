"use client"

import React from 'react'
import { ResourcesSection } from './ResourseSection'
import { TrustedCompanies } from './TrustedCompanies'
import { GetInTouchHero } from './GetInTouchHero'

export default function LeftContent() {
  return (
		<div className="order-2 lg:order-1">
			<GetInTouchHero />
			<TrustedCompanies />
			<ResourcesSection />
		</div>
  )
}
