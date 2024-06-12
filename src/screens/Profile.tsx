import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { FiUserPlus } from "react-icons/fi";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



export default function Edit() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state:any)=>state.userState)

    useEffect(()=>{
        setUsername(user.username)
    },[])

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
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
            <form onSubmit={handleUpdate} className="login-form"
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
                    <h2>Editar Perfil</h2>
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
                    <label htmlFor="password">Nova Senha:</label>
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
                type="submit" className="login-button">Atualizar</button>
            </form>
        </div>
    );
}
