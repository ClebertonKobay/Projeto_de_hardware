import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { FiUserPlus } from "react-icons/fi";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';



export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="login-container"
            style={{
                display: "flex",
                backgroundColor: "#F1F1F1",
                padding: "10px"
            }}
        >
            <form onSubmit={handleLogin} className="login-form"
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
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="password">Password:</label>
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
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}
