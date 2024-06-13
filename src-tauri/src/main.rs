#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io::Read, path::Prefix};

use enigo::{Button, Key, Keyboard, Mouse};

// static mut EYE_INITIAL_POSITION : (i32, i32) = (-1, -1);
// static mut EYE_POSITION : (i32, i32) = (0, 0);
// static mut ACTION : i32 = 0;

static mut P1: (i32, i32) = (0, 0);
static mut P2: (i32, i32) = (0, 0);
static mut P3: (i32, i32) = (0, 0);
static mut P4: (i32, i32) = (0, 0);
static mut COUNTER: i32 = 0;

#[tauri::command]
fn calibration() -> () {
    let (_action, left_eye, right_eye) = update_state();
    let m = (
        (left_eye.0 + left_eye.1) / 2,
        (right_eye.0 + right_eye.1) / 2,
    );

    println!("Calling calibration");

    unsafe {
        match COUNTER {
            0 => P1 = m,
            1 => P2 = m,
            2 => P3 = m,
            3 => P4 = m,
            _ => (),
        }

        COUNTER += 1;
        println!("{}", COUNTER);
    }
}

fn update_state() -> (i32, (i32, i32), (i32, i32)) {
    let mut buf = String::new();

    let mut file =
        std::fs::File::open("/home/bueno/Documentos/Programming/eye-tracker.txt").unwrap();

    let _ = file.read_to_string(&mut buf).unwrap();

    let slices = buf
        .split(";")
        .map(|s| String::from(s))
        .collect::<Vec<String>>();

    let action = slices[0].parse::<i32>().unwrap_or(0);
    let left_eye = slices[1]
        .split(",")
        .map(|s| s.parse::<i32>().unwrap_or(-1))
        .collect::<Vec<i32>>();
    let right_eye = slices[2]
        .split(",")
        .map(|s| s.parse::<i32>().unwrap_or(-1))
        .collect::<Vec<i32>>();

    (
        action,
        (left_eye[0], left_eye[1]),
        (right_eye[0], right_eye[1]),
    )

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

fn move_mouse(actual_position: (i32, i32)) -> () {
    let mut enigo = enigo::Enigo::new(&enigo::Settings::default()).unwrap();

    // ->
    // /|
    unsafe {
        let diff_x = -P3.0 + P1.0;
        let diff_y = -P3.1 + P1.1;

        let center = ((P1.0 + P3.0) / 2, (P1.1 + P3.1) / 2);

        let step_x = (1920 as f32) / (diff_x as f32);
        let step_y = (1080 as f32) / (diff_y as f32);

        let position = (
            ((actual_position.0 - center.0 + diff_x) as f32) * step_x,
            ((actual_position.1 - center.1 + diff_y) as f32) * step_y,
        );

        println!(
            "{:?} {:?} : diff - {:?} {:?} - center: {:?} :: position {:?}",
            P1,
            P3,
            (diff_x, diff_y),
            (step_x, step_y),
            center,
            position
        );

        enigo
            .move_mouse(position.0 as i32, position.1 as i32, enigo::Coordinate::Abs)
            .unwrap();
    }
}

fn click_mouse() -> () {
    let mut enigo = enigo::Enigo::new(&enigo::Settings::default()).unwrap();

    enigo.button(Button::Left, enigo::Direction::Click).unwrap();
    enigo
        .button(Button::Left, enigo::Direction::Release)
        .unwrap();
}

fn move_mouse_center() -> () {
    let mut enigo = enigo::Enigo::new(&enigo::Settings::default()).unwrap();

    enigo
        .move_mouse(1920 / 2, 1080 / 2, enigo::Coordinate::Abs)
        .unwrap();
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

            unsafe {
                if COUNTER >= 4 {
                    // std::thread::sleep(tok::Duration::from_millis(160));
                    (action, left_eye, right_eye) = update_state();
                    // let point = (left_eye + right_eye)/2;

                    let m = (
                        (left_eye.0 + right_eye.0) / 2,
                        (left_eye.1 + right_eye.1) / 2,
                    );

                    match action {
                        1 => click_mouse(),
                        4 => move_mouse(m),
                        _ => (),
                    }
                }
            }
        }
    });

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calibration])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}