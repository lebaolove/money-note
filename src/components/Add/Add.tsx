import React, { useEffect } from 'react';
import { setTimeout } from 'timers';

function Add() {
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 1000);
        return () => setIsMounted(false);
    }, []);

    return (
        <div id="add" className={isMounted ? "on" : ""}>내역 추가하는 곳</div>
    );
}

export default Add;