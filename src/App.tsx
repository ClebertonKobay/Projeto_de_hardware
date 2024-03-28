import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from '@tauri-apps/api/window';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import "./App.css";

await appWindow.setAlwaysOnTop(true);

function App() {
  const [words, setWords] = useState("");

  async function onChange(word: string) {
    console.log("Input changed", word);
    setWords(word)
  }

  async function onKeyPress(letter: string) {
    console.log("Button pressed", letter);
    window.blur()
    await invoke('type_letter', { letter })
  }


  return (
    <div>
      <Keyboard
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}

export default App;
