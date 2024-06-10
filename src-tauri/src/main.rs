#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serialport::SerialPort;

static mut PORT_CONNECTION: Option<Box<dyn SerialPort>> = None;

fn get_connection() -> Box<dyn SerialPort> {
    unsafe {
        match PORT_CONNECTION.take() {
            Some(pc) => {
                PORT_CONNECTION = Some(pc.try_clone().unwrap());
                pc
            }
            None => todo!(),
        }
    }
}

#[tauri::command]
async fn get_available_ports() -> Result<Vec<String>, String> {
    match serialport::available_ports() {
        Ok(ports) => Ok(ports
            .into_iter()
            .map(|p| p.port_name)
            .filter(|pn| pn.contains("ttyUSB") || pn.contains("COM"))
            .collect::<Vec<String>>()),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
async fn connect_to_port(port_name: String) -> Result<(), String> {
    unsafe {
        if let Some(_) = PORT_CONNECTION {
            return Err("Voce ja esta conectado a esta porta".into());
        }

        match serialport::new(port_name, 9600).open() {
            Ok(sp) => {
                PORT_CONNECTION = Some(sp);
                Ok(())
            }
            Err(_) => Err("Nao foi possivel se conectar ao dispositivo".into()),
        }
    }
}

#[tauri::command]
async fn disconnect_to_port() -> Result<(), String> {
    unsafe {
        match PORT_CONNECTION.take() {
            Some(p) => {
                std::mem::drop(p);
                Ok(())
            }
            None => Err("Nao foi possivel desconectar a porta, desconecte manualmente".into()),
        }
    }
}

#[tauri::command]
async fn read_signal() -> Result<String, String> {
    let mut port = get_connection();

    let mut buffer = String::new();

    match port.read_to_string(&mut buffer) {
        Ok(_size) => Ok(buffer),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
async fn write_signal(content: String) -> Result<usize, String> {
    let mut port = get_connection();

    match port.write(content.as_bytes()) {
        Ok(size) => Ok(size),
        Err(err) => Err(err.to_string()),
    }
}

fn main() {
    // init_port();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_available_ports,
            connect_to_port,
            disconnect_to_port,
            read_signal,
            write_signal
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
