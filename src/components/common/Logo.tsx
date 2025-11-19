import Image from "next/image"

export default function Logo() {
	return (
		<>
			<Image
				alt="logo"
				src={"/logo.png"}
				width={2100}
				height={620}
				className="w-auto h-12"
			/>
		</>
	)
}
