import React from 'react'
import { TwoFactorSetup } from './two-factor-form'

export default function page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 2xl:gap-6 md:py-6">
          <h1 className="text-2xl font-semibold mb-4 p-4">
            Setup Two-Factor Authentication
          </h1>
          
          <TwoFactorSetup />
        </div>
  )
}
