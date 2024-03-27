import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");


  async function onChange(letter: string) {
    console.log("Input changed", letter);
    await invoke('type_letter',{letter})
  }

  function onKeyPress(value: string) {
    console.log("Button pressed", value);
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
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
