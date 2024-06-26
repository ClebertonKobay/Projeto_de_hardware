import { useContext, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { WebviewWindow } from '@tauri-apps/api/window';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import "./App.css";
import Home from "./Home";
import { FullKeyboard } from "./components/fullKeyboard";
import { FaGear } from "react-icons/fa6";
import { ARABICO, COMPLETO, NUMERICO, SIMPLES } from "./constants/keyboard_types";
import { KeyboardContext } from "./Context/keyboardContext";
import { CgScreen } from "react-icons/cg";
import { ArabicKeyboard } from "./components/arabicKeyboard";

// await appWindow.setAlwaysOnTop(true);

function App() {
  const [forceRender, setForceRender] = useState(0);
  const {keyboard} = useContext(KeyboardContext);
  const [text, setText] = useState('')

  // let opcao = useSelector((state: RootState) => { return state.keyboard.keyType })

  async function onChange(word: string) {
    console.log("Input changed", word);
    setText(word)
  }

  async function onKeyPress(letter: string) {
    console.log("Button pressed", letter);
    window.blur()
    // await invoke('type_letter', { letter })
  }

  addEventListener("storage", () => {
    setForceRender((prev) => prev + 1)
    console.log(forceRender)
  });


  const renderKeyboard = () => {
    switch (keyboard) {
      case SIMPLES:
        return <Keyboard onChange={onChange} onPress={onKeyPress} />;
      case COMPLETO:
        return <FullKeyboard onChange={onChange} onPress={onKeyPress} />;
      case NUMERICO:
        return <ArabicKeyboard  onChange={onChange} />;
      case ARABICO:
        return <div />;
      default:
        return null;
    }
  };

  function openSettings() {
    const settingsWindow = new WebviewWindow('Settings', {
      url: '/config',
      title: 'Virtual Keyboard',
      width: 400,
      height: 400,
      resizable: false,
    });

    settingsWindow.once('tauri://created', () => {
      console.log('Settings window created');
    });
    settingsWindow.once('tauri://error', (e) => {
      console.error('Failed to create settings window', e);
    });
  }

  function openCalibration() {
    const settingsWindow = new WebviewWindow('Calibration', {
      url: '/calibration',
      title: 'Virtual Keyboard: Calibration',
      fullscreen:true,
      transparent:true,
      // alwaysOnTop:true,
      resizable: false,
    });

    settingsWindow.once('tauri://created', () => {
      console.log('Settings window created');
    });
    settingsWindow.once('tauri://error', (e) => {
      console.error('Failed to create settings window', e);
    });
  }


  return (
    
      <div style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <header className=""
          style={{
            display: 'inline-block',
            height: "35px",
            backgroundColor: '#fff'
          }}
        >
          <div
            onClick={openSettings}
            title='Abrir configurações'
            style={{
              display: 'inline-block',
              height: '25px',
              width: "25px",
              alignItems: 'center',
              justifyContent: 'center',
              margin: 0,
              padding: 0,
              cursor: 'pointer',
              float: "right",
            }}
          ><FaGear /></div>
          <div
               onClick={openCalibration}
               title='Calibrar Sensor'
               style={{
                 display: 'inline-block',
                 height: '25px',
                 width: "25px",
                 alignItems: 'center',
                 justifyContent: 'center',
                 margin: 0,
                 padding: 0,
                 cursor: 'pointer',
                 float: "right",
               }}
          >
            <CgScreen />
          </div>
        </header>
        <input
                value={text}
            />
        {
          renderKeyboard()
        }
      </div>
  );
}

export default App;
