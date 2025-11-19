import { useEffect, useState } from 'react';

type ScreenType = 'mobile' | 'tablet' | 'desktop' | 'tv';

const getScreenType = (width: number): ScreenType => {
    if (width < 600) return 'mobile';
    if (width >= 600 && width < 1024) return 'tablet';
    if (width >= 1024 && width < 1920) return 'desktop';
    return 'tv';
};

/**
 * Custom React hook that returns the current screen type based on the window's inner width.
 * It listens for window resize events and updates the screen type accordingly.
 *
 * @returns {ScreenType} The current screen type (e.g., 'mobile', 'tablet', 'desktop').
 *
 * @example
 * ```tsx
 * import { useMediaQuery } from './hooks/useMediaQuery';
 *
 * const MyComponent = () => {
 *   const screenType = useMediaQuery();
 *
 *   return (
 *     <div>
 *       {screenType === 'mobile' && <MobileComponent />}
 *       {screenType === 'tablet' && <TabletComponent />}
 *       {screenType === 'desktop' && <DesktopComponent />}
 *     </div>
 *   );
 * };
 * ```
 */
export const useMediaQuery = () => {
	const [screenType, setScreenType] = useState<ScreenType>("desktop") // Default value

	useEffect(() => {
		// Only proceed if window is available
		if (typeof window === "undefined") return

		// Set initial value
		setScreenType(getScreenType(window.innerWidth))

		const handleResize = () => {
			setScreenType(getScreenType(window.innerWidth))
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return screenType
}