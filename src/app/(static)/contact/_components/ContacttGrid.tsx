import React from 'react'
import LeftContent from './LeftContent'
import { ContactForm } from './Form'

export default function ContacttGrid() {
  return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-16 min-h-[calc(100vh-17rem)]">
			<LeftContent />
			<ContactForm />
		</div>
  )
}
