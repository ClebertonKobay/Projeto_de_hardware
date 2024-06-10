import { ChangeEvent, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./fullKeyboard.css";

type FullKeyboardProps = {
    onChange: (word: string) => {},
    onPress: (letter: string) => {}
}

export function FullKeyboard({ onChange, onPress }: FullKeyboardProps) {

    const [state, setState] = useState({
        layoutName: "default",
        input: ""
    })


    const commonKeyboardOptions = {
        // onChange: (input:string) => onChange(input),
        // onKeyPress: (button:string) => onKeyPress(button),
        theme: "simple-keyboard hg-theme-default hg-layout-default",
        physicalKeyboardHighlight: true,
        syncInstanceInputs: true,
        mergeDisplay: true,
        debug: true
    };

    const keyboardOptions = {
        ...commonKeyboardOptions,
        /**
         * Layout by:
         * Sterling Butters (https://github.com/SterlingButters)
         */
        layout: {
            default: [
                "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
                "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
                "{tab} q w e r t y u i o p [ ] \\",
                "{capslock} a s d f g h j k l ; ' {enter}",
                "{shiftleft} z x c v b n m , . / {shiftright}",
                "{controlleft} {altleft} {metaleft} {space} {metaright} {altright}"
            ],
            shift: [
                "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
                "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
                "{tab} Q W E R T Y U I O P { } |",
                '{capslock} A S D F G H J K L : " {enter}',
                "{shiftleft} Z X C V B N M < > ? {shiftright}",
                "{controlleft} {altleft} {metaleft} {space} {metaright} {altright}"
            ]
        },
        display: {
            "{escape}": "esc",
            "{tab}": "tab ⇥",
            "{backspace}": "backspace ⌫",
            "{enter}": "enter ↵",
            "{capslock}": "caps lock ⇪",
            "{shiftleft}": "shift ⇧",
            "{shiftright}": "shift ⇧",
            "{controlleft}": "ctrl ⌃",
            "{controlright}": "ctrl ⌃",
            "{altleft}": "alt ⌥",
            "{altright}": "alt ⌥",
            "{metaleft}": "cmd ⌘",
            "{metaright}": "cmd ⌘"
        }
    };

    const keyboardControlPadOptions = {
        ...commonKeyboardOptions,
        layout: {
            default: [
                "{prtscr} {scrolllock} {pause}",
                "{insert} {home} {pageup}",
                "{delete} {end} {pagedown}"
            ]
        }
    };

    const keyboardArrowsOptions = {
        ...commonKeyboardOptions,
        layout: {
            default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
        }
    };

    const keyboardNumPadOptions = {
        ...commonKeyboardOptions,
        layout: {
            default: [
                "{numlock} {numpaddivide} {numpadmultiply}",
                "{numpad7} {numpad8} {numpad9}",
                "{numpad4} {numpad5} {numpad6}",
                "{numpad1} {numpad2} {numpad3}",
                "{numpad0} {numpaddecimal}"
            ]
        }
    };

    const keyboardNumPadEndOptions = {
        ...commonKeyboardOptions,
        layout: {
            default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
        }
    };

    // const onChange = (input: string) => {
    //     setState((prevState) => {
    //         return {
    //             input: input,
    //             layoutName: prevState.layoutName
    //         }
    //     });
    //     console.log("Input changed", input);
    // };

    const onKeyPress = (button: string) => {
        console.log("Button pressed", button);
        onPress(button)
        if (
            button === "{shift}" ||
            button === "{shiftleft}" ||
            button === "{shiftright}" ||
            button === "{capslock}"
        ) {
            handleShift();
        }
    };

    const handleShift = () => {
        let layoutName = state.layoutName;

        setState((prevState) => {
            return {
                input: prevState.input,
                layoutName: layoutName === "default" ? "shift" : "default"
            }
        });
    };

    const onChangeInput = (event:ChangeEvent<HTMLInputElement> ) => {
        let input = event.target.value;
        onChange(input)
        setState((prevState)=>
            {
          return {
            layoutName:prevState.layoutName,
            input: input
          }}
        );
      };


    return (
        <div>
            {/* <input
          value={state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => onChangeInput(e)}
        /> */}
            <div className={"keyboardContainer"}>
                <Keyboard
                    baseClass={"simple-keyboard-main"}
                    // keyboardRef={r => (keyboard = r)}
                    layoutName={state.layoutName}
                    {...keyboardOptions}
                    onKeyPress={onKeyPress}
                />

                <div className="controlArrows">
                    <Keyboard
                        baseClass={"simple-keyboard-control"}
                        {...keyboardControlPadOptions}
                        onKeyPress={onKeyPress}
                    />
                    <Keyboard
                        baseClass={"simple-keyboard-arrows"}
                        {...keyboardArrowsOptions}
                        onKeyPress={onKeyPress}
                    />
                </div>

                <div className="numPad">
                    <Keyboard
                        baseClass={"simple-keyboard-numpad"}
                        {...keyboardNumPadOptions}
                        onKeyPress={onKeyPress}
                    />
                    <Keyboard
                        baseClass={"simple-keyboard-numpadEnd"}
                        {...keyboardNumPadEndOptions}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>
        </div>
    );

}