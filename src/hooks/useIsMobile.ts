import { useEffect, useState } from "react"

const MOBILE_QUERY = "(max-width: 767px)"

export const isMobileNow = () => window.matchMedia(MOBILE_QUERY).matches

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(isMobileNow)

    const watchBreakpoint = () => {
        const mq = window.matchMedia(MOBILE_QUERY)
        const onChange = () => setIsMobile(mq.matches)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }
    useEffect(watchBreakpoint, [])

    return isMobile
}

export default useIsMobile
