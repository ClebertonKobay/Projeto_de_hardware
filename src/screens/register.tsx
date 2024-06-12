import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import '../styles.css'
import { api } from '../utils/api';
import { useDispatch } from 'react-redux';
import { createUser } from '../reducers/userReducer';
import { SIMPLES } from '../constants/keyboard_types';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch()

    const handleRegister = async (event: any) => {
        console.log('oahid')
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("As senhas não são iguais!");
            return;
        }
        console.log('Username:', username);
        console.log('Password:', password);
        await api.post(`/create-user`, {
            keyboardType: SIMPLES
        }, {
            params: {
                password,
                username
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(createUser(res.data))
        })

    };

    return (
        <div className="register-container"
            style={{
                display: "flex",
                backgroundColor: "#F1F1F1",
                padding: "10px"
            }}
        >
            <form className="register-form"
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
                    <h2>Criar um perfil</h2>
                    <Link
                        // onClick={openLogin}
                        to="/login"
                        title='Voltar ao Login'
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                    <input
                        style={{
                            height: '50px'
                        }}
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="button"
                onClick={handleRegister}
                    style={{
                        marginTop: '15px',
                        padding: '10px 20px',
                        backgroundColor: '#ABABAB',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                    className="register-button">Adicionar Perfil</button>
            </form>
        </div>
    );
}
