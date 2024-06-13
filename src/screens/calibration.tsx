import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { appWindow } from '@tauri-apps/api/window';
import { api } from '../utils/api';
import { invoke } from '@tauri-apps/api';

export function CalibrationScreen() {
    const [visiblePoint, setVisiblePoint] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);


    useEffect(() => {
        console.log(visiblePoint)
        if (visiblePoint < 4) {
            const pointTimer = setTimeout(() => {
                calibration()
                setVisiblePoint((prev) => (prev + 1) % 5);
                setTimeLeft(5);
            }, 5000);

            const countdownTimer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);


            return () => {
                clearTimeout(pointTimer);
                clearInterval(countdownTimer);
            };

        } else {
            closeWindow()
        }
    }, [visiblePoint]);

    const calibration = async () => {
        await invoke('calibration')
    }

    const closeWindow = async () => {
        await appWindow.close().then((res) => console.log(res))
    }


    const points = [
        { top: "0", left: "0" },
        { top: "0", right: "0" },
        { bottom: "0", right: "0" },
        { bottom: "0", left: "0" }
    ];

    return (
        <div
            style={{
                backgroundColor: "#F1F1F1",
                display: 'flex',
                flex: "1 1 0",
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                width: '95vw',
                height: '95vh',
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <h1>Olhe para os pontos verdes para calibrar</h1>
                <h2>Tempo restante: {timeLeft} segundos</h2>
            </div>
            {points.map((point, index) => (
                index === visiblePoint && (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            width: '50px',
                            height: "50px",
                            borderRadius: "999px",
                            backgroundColor: '#00FF00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...point,
                        }}
                    >
                        <FaPlus />
                    </div>
                )
            ))}
        </div >
    );
}
