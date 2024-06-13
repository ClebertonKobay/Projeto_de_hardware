import { useState } from "react";
import layout from "simple-keyboard-layouts/build/layouts/arabic";
import Keyboard from "react-simple-keyboard";


type KeyboardProps = {
    onChange: (word: string) => {},
    // onPress: (letter: string) => {}
}

export function ArabicKeyboard({ onChange }: KeyboardProps) {

    const [state, setState] = useState({
        layoutName: "default",
        input: ""
    })


    function onKeyPress(button: string) {
        console.log("layout",layout)
        if (button === "{shift}" || button === "{lock}") handleShift();
    }

    const handleShift = () => {
        let layoutName = state.layoutName;

        setState((prevState) => {
            return {
                input: prevState.input,
                layoutName: layoutName === "default" ? "shift" : "default"
            }
        });
    };
    return (<Keyboard
    onChange={onChange}
    />)
}