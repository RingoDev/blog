import React, {useEffect, useState} from "react";
import throttle from "lodash.throttle";

/**
 * Check if an element is in viewport
 */

export default function useScrolledPast<Element extends HTMLElement>(
    ref: React.RefObject<Element>,
    offset: number = 0,
    throttleMilliseconds: number = 100,
): Boolean {
    const [scrolledPast, setScrolledPast] = useState(false);

    const detect = () => {
        if (!ref.current) {
            setScrolledPast(false);
            return;
        }
        const bottom = ref.current.getBoundingClientRect().bottom;
        setScrolledPast(bottom + offset <= 0);
    }

    const onScroll = throttle(detect, throttleMilliseconds);


    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        detect()
        return () => document.removeEventListener('scroll', onScroll, true);
    });


    return scrolledPast;
}
