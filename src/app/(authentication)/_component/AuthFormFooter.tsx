import React from 'react'
import { FieldDescription } from '@/components/ui/field'

export default function AuthFormFooter() {
  return (
		<>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our{" "}
				<a href="/terms-and-condition">Terms of Service</a> and{" "}
				<a href="/privacy-policy">Privacy Policy</a>.
			</FieldDescription>
		</>
  )
}
