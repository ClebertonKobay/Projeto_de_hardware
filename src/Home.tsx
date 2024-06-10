'use client'

import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';

export default function Home() {
  const [availablePorts, setAvailablePorts] = useState(['']);
  const [showReadWrite, setShowReadWrite] = useState(false);

  const [content, setContent] = useState('');
  const [serialContent, setSerialContent] = useState('');

  useEffect(() => {
    invoke<string[]>('get_available_ports', {})
      .then(res => setAvailablePorts(res))
      .catch(err => console.log(err))
  }, [])

  function connect(port: string) {
    invoke('connect_to_port', { portName: port })
      .then(() => {
        setShowReadWrite(true);
        console.log('Conectado');
      })
      // .then(() => e.classList.add('text-gren-500 hover:pointer-default'))
      .catch(err => console.log(err))
  }

  function disconnect() {
    invoke('disconnect_to_port', {})
      .then(() => {
        setShowReadWrite(false);
        console.log('Desconectado');
      })
      .catch(err => console.log(err))
  }

  function writeContent() {
    invoke('write_signal', { content })
      .then(res => console.log('#Bytes escritos = ', res))
      .catch(err => console.log(err))
  }

  function readContent() {
    console.log('read content')
    
    invoke<string>('read_signal', {})
      .then(res => {
        setSerialContent(res);
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  return (
    <main className='min-h-screen bg-white p-2'>
      <ul>
        {
          availablePorts.map((port) => (
            <li>
              <button onClick={(e) => connect(port)} className='font-semibold'>{port}</button>
            </li>
          ))
        }
      </ul>

      <button onClick={disconnect} className='bg-blue-200/80 hover:bg-blue-200/60 p-2 rounded-md shadow-sm duration-300'>Desconectar dispositivo</button>
      {showReadWrite ? 
        <div className='p-2 bg-red-100/80'>
          <div>
            <label htmlFor='content'>Campo de escrita</label>
            <textarea id='content' onChange={(e) => setContent(e.target.value)} value={content} />
            <button onClick={writeContent}>Escrever conteudo</button>
          </div>
          <div>
            <button onClick={readContent}>Ler conteudo</button>
            <p>{ serialContent }</p>
          </div>
        </div>
        :
        <></>
      }
    </main>
  );
}