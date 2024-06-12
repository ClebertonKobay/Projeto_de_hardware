import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { api } from '../utils/api';
import { updateUser } from '../reducers/userReducer';
import { changeKeyboard } from '../reducers/keyboardReducer';
import { UserContext } from '../Context/userContext';



export default function Edit() {
    const [usernameState, setUsernameState] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername,username} = useContext(UserContext);

    const user = useSelector((state: any) => state.userState)
    const dispatch = useDispatch()
    useEffect(() => {
        setUsername(user.username)
    }, [])

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        await api.post(`/create-user`, {
            keyboardType: user.keyboardType
        }, {
            params: {
                password,
                username
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(updateUser({username:usernameState }))
            dispatch(changeKeyboard({...res.data}))
            
            redirect('/config')
        })
    };

    return (
        <div className="login-container"
            style={{
                display: "flex",
                flexGrow: "1",
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
                    <h2>Editar Perfil</h2>
                    <div
                        style={{
                            display: "flex",
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
                        onChange={(e) => setUsernameState(e.target.value)}
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
                    onClick={handleUpdate}
                    type="button" className="login-button">Atualizar</button>
            </form>
        </div>
    );
}
