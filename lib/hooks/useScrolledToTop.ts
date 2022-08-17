import {useEffect, useState} from "react";
import throttle from "lodash.throttle";

/**
 * Check if an element is in viewport
 */

export default function useScrolledToTop(
    offset: number = 0,
    throttleMilliseconds: number = 100,
): Boolean {
    const [atTop, setAtTop] = useState(false);

    const detect = () => {
        const top = document.body.getBoundingClientRect().top;
        setAtTop(top + offset >= 0);
    }

    const onScroll = throttle(detect, throttleMilliseconds);


    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        detect()
        return () => document.removeEventListener('scroll', onScroll, true);
    });


    return atTop;
}