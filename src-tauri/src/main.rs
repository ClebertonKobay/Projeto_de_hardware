#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io::Read, path::Prefix};

use enigo::{Button, Key, Keyboard, Mouse};

// static mut EYE_INITIAL_POSITION : (i32, i32) = (-1, -1);
// static mut EYE_POSITION : (i32, i32) = (0, 0);
// static mut ACTION : i32 = 0;

fn update_state() -> (i32, (i32, i32), (i32, i32)) {
    let mut buf = String::new();

    let mut file = std::fs::File::open("/home/bueno/Documents/Programming/eye-tracker.txt").unwrap();

    let _ = file.read_to_string(&mut buf).unwrap();
    
    let slices = buf.split(";").map(|s| String::from(s)).collect::<Vec<String>>();

    let action = slices[0].parse::<i32>().unwrap_or(0);
    let left_eye = slices[1].split(",").map(|s| s.parse::<i32>().unwrap_or(-1)).collect::<Vec<i32>>();
    let right_eye = slices[2].split(",").map(|s| s.parse::<i32>().unwrap_or(-1)).collect::<Vec<i32>>();

    (action, (left_eye[0], left_eye[1]), (right_eye[0], right_eye[1]))

    // unsafe {
    //     let action = slices[0].parse::<i32>().unwrap();
    //     let left_eye = slices[1].split(",").map(|s| s.parse::<i32>().unwrap()).collect::<Vec<i32>>();
    //     let right_eye = slices[2].split(",").map(|s| s.parse::<i32>().unwrap()).collect::<Vec<i32>>();

    //     let mean_eye = ((left_eye[0] + right_eye[0])/2, (left_eye[1] + right_eye[1])/2);

    //     if EYE_INITIAL_POSITION == (-1, -1) {
    //         EYE_INITIAL_POSITION = mean_eye;
    //     } else {
    //         EYE_POSITION = mean_eye;
    //     }

    //     ACTION = action;
    //     println!("{}", ACTION);
    // }

}

fn move_mouse(initial_position: (i32, i32), actual_position: (i32, i32)) -> () {
    let diff = (-(actual_position.0 - initial_position.0)/2, (actual_position.1 - initial_position.1)/2);

    let mut enigo = enigo::Enigo::new(&enigo::Settings::default()).unwrap();

    // ->
    // /|

    enigo.move_mouse(diff.0 * 100, -diff.1 * 20, enigo::Coordinate::Rel).unwrap();    
}

fn click_mouse() -> () {
    let mut enigo = enigo::Enigo::new(&enigo::Settings::default()).unwrap();

    enigo.button(Button::Left, enigo::Direction::Click).unwrap();
    enigo.button(Button::Left, enigo::Direction::Release).unwrap();
}

fn move_mouse_center() -> () {
    let mut enigo = enigo::Enigo::new(&enigo::Settings::default()).unwrap();

    enigo.move_mouse(1920/2, 1080/2, enigo::Coordinate::Abs).unwrap();
}

#[tokio::main]
async fn main() {
    tokio::task::spawn(async {
        let mut action = 0;
        let mut last_position = (-1, -1);
        let mut left_eye = (-1, -1);
        let mut right_eye = (-1, -1);

        move_mouse_center();

        loop {
            tokio::time::sleep(tokio::time::Duration::from_millis(160)).await;
            // std::thread::sleep(tok::Duration::from_millis(160));
            (action, left_eye, right_eye) = update_state();
            // let point = (left_eye + right_eye)/2;

            let m = ((left_eye.0 + right_eye.0)/2, (left_eye.1 + right_eye.1)/2);

            match action {
                1 => click_mouse(),
                4 => move_mouse(last_position, m),
                _ => ()
            }

            last_position = m;
        }
    });

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}