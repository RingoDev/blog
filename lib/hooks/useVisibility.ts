import React, {useEffect, useRef, useState} from "react";
import throttle from "lodash.throttle";

/**
 * Check if an element is in viewport
 */

export default function useVisibility<Element extends HTMLElement>(
    offset: number = 0,
    throttleMilliseconds: number = 100,
): [Boolean, React.RefObject<Element>] {
    const [visible, setVisible] = useState(false);
    const ref = useRef<Element>(null)

    const detect = () => {
        if (!ref.current) {
            setVisible(false);
            return;
        }
        const top = ref.current.getBoundingClientRect().top;
        setVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    }


    const onScroll = throttle(detect, throttleMilliseconds);


    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        detect()
        return () => document.removeEventListener('scroll', onScroll, true);
    });


    return [visible, ref];
}
