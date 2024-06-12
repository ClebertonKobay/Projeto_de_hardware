import ReactDOM from "react-dom/client";
import { FaRegUserCircle } from "react-icons/fa";
import "./configs.css";
import { OptionButton } from "../components/optionButtons";
import { ARABICO, COMPLETO, NUMERICO, SIMPLES } from "../constants/keyboard_types";
import { useSelector } from "react-redux";
import { RootState } from "../types/storeTypes";
import { WebviewWindow } from "@tauri-apps/api/window";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";

const options = [
    SIMPLES, COMPLETO, NUMERICO, ARABICO
]

// function openLogin() {
//     const settingsWindow = new WebviewWindow('Login', {
//         url: '/login',
//         title: 'Login',
//         width: 400,
//         height: 300,
//         resizable: false,
//     });

//     settingsWindow.once('tauri://created', () => {
//         console.log('Settings window created');
//     });

//     settingsWindow.once('tauri://error', (e) => {
//         console.error('Failed to create settings window', e);
//     });
// }

export default function Configs() {
    const opcao = useSelector((state: RootState) => { return state.keyboard.keyType });
    const user = useSelector((state:any)=>state.userState)

    return (
        <>
            <div style={{
                padding: '5px',
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F1F1F1",
            }}>
                <h3>Tela de Configurações do teclado</h3>
                <div
                    style={{
                        backgroundColor: "#fff",
                        height: "30px",
                        textAlign: "center",
                        borderRadius: "10px",
                        border: "1px solid #000",
                        padding: "5px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "0 0 20px 0 "
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaRegUserCircle
                            style={{
                                margin: "0 10px"
                            }}
                            size={35}
                        />
                        <span
                            style={{
                                fontWeight: "bold"
                            }}
                        >{user?.username ?? `Usuário Padrão`}</span>
                    </div>
                    <Link
                        // onClick={openLogin}
                        to="/login"
                        title='Abrir tela de Login'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F1F1F1',
                            height: '30px',
                            width: '30px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        }}
                    >
                        <CiLogin style={{ color: '#000' }} size={20} />
                    </Link>
                </div>
                <div
                    style={{
                        backgroundColor: "#fff",
                        textAlign: "center",
                        borderRadius: "10px",
                        border: "1px solid #000",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexGrow: 1,
                        flexDirection: 'column'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            margin: 'auto',
                            textAlign: 'center',
                            fontWeight: "bold"
                        }}
                    ><div
                    style={{
                        display:"flex",
                        flexDirection:"column"
                    }}
                    >
                        
                            <div>Opções de teclado</div>
                            <div>Atual: {opcao}</div>
                    </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        {options.map((option) => (
                            <OptionButton key={option} option={option}></OptionButton>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Configs />
);
