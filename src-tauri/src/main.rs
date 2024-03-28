// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use simulate::{self};
// use tauri::Window;
// use std::thread;
// use std::time::Duration;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn type_letter(letter: &str) {
    simulate::type_str(letter).unwrap();
}

#[tauri::command]
fn move_mouse(x: i32, y: i32) {
    simulate::move_mouse_relative(x, y).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, type_letter, move_mouse,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
