import React from 'react'

/**
 * returns a ref that can be applied to an element and a function that will be called when a click happens outside of that element
 * @param onClickOutside
 * @param active
 */

export default function useOnClickOutside<Element extends HTMLElement>(
    onClickOutside: () => void,
    active: boolean = true
): React.RefObject<Element> {

    const ref = React.useRef<Element>(null)

    React.useEffect(() => {
            if (active) {
                // by making it asynchronous it won't be batched by react with other state updates
                setTimeout(() => window.addEventListener('click', checkForClickOutside))
                return () => {
                    window.removeEventListener('click', checkForClickOutside)
                }
            } else {
                window.removeEventListener('click', checkForClickOutside)
            }
        }, [active]
    );

    const checkForClickOutside = (e: MouseEvent) => {
        if (ref.current) {
            if (e.target instanceof Node && !ref.current.contains(e.target)) {
                onClickOutside()
            }
        }
    }
    return ref;
}