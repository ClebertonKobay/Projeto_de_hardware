import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import '../styles.css'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Handle registration logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="register-container"
            style={{
                display:"flex",
                backgroundColor: "#F1F1F1",
                padding:"10px"
            }}
        >
            <form onSubmit={handleRegister} className="register-form"
            style={{
                display:"flex",
                flexDirection:"column",
                gap:"10px"
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                    style={{
                        height:'50px'
                    }}
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}
