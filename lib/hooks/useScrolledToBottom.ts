import {useEffect, useState} from "react";
import throttle from "lodash.throttle";

/**
 * Check if an element is in viewport
 */

export default function useScrolledToBottom(
    offset: number = 0,
    throttleMilliseconds: number = 100,
): Boolean {
    const [atBottom, setAtBottom] = useState(false);

    const detect = () => {
        const bottom = document.body.getBoundingClientRect().bottom;
        setAtBottom(Math.round((bottom - offset) - window.innerHeight) <= 0);
    }

    const onScroll = throttle(detect, throttleMilliseconds);


    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        detect()
        return () => document.removeEventListener('scroll', onScroll, true);
    });


    return atBottom;
}