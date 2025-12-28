import { useState } from "react";

export function useTogglePassword() {
    const [show, setShow] = useState(false);

    const toggle = () => setShow((prev) => !prev);

    return {
        type: show ? "text" : "password",
        show,
        toggle,
    };
}