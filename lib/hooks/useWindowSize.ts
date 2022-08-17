import {useEffect, useState} from "react";


export default function useWindowSize(): [width: number, height: number] {
    const [size, setSize] = useState<[number, number]>([0, 0]);
    useEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}