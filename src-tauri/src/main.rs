// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use simulate::{self, Key, EventBuffer};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn type_letter(letter: &str) {
    simulate::move_mouse_relative(100, 100).unwrap();
    simulate::type_str(letter).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, type_letter,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
