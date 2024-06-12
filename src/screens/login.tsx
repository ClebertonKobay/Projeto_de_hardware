import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { FiUserPlus } from "react-icons/fi";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import { SIMPLES } from '../constants/keyboard_types';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';



export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        await api.post(`/login-user`, null, {
            params: {
                password,
                username
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(login(res.data))
        })
    };

    return (
        <div className="login-container"
            style={{
                display: "flex",
                flexGrow:"1",
                backgroundColor: "#F1F1F1",
                padding: "10px"
            }}
        >
            <form className="login-form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                    }}
                >
                    <h2>Entrar no perfil</h2>
                    <div
                    style={{
                        display:"flex",
                    }}
                    >
                        <Link
                            // onClick={openLogin}
                            to="/config"
                            title='Voltar a tela de configurações'
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
                            <IoIosArrowRoundBack style={{ color: '#000' }} size={20} />
                        </Link>
                        <Link
                            // onClick={openLogin}
                            to="/register"
                            title='Abrir tela de adição de perfil'
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
                            <FiUserPlus style={{ color: '#000' }} size={20} />
                        </Link>
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="username">Usuário:</label>
                    <input
                        style={{
                            height: '50px'
                        }}
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        style={{
                            height: '50px'
                        }}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                 style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#ABABAB',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
                type="button" onClick={handleLogin} className="login-button">Logar</button>
            </form>
        </div>
    );
}
