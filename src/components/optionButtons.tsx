import { useDispatch } from "react-redux"
import { changeKeyboard } from "../reducers/keyboardReducer"

export type OptionButtonProp = {
    option: string
}

export function OptionButton({ option }: OptionButtonProp) {
    const dispatch = useDispatch()
    
    const keyboard = (option:string)=>{
        console.log('opcao',option)
        dispatch(changeKeyboard(option))
    }

    return (
        <div
            style={{
                cursor: 'pointer',
                border: '1px solid #000',
                borderRadius:'5px',
                padding:'5px',
                margin:'10px',
                width:'40%',
            }}
            onClick={()=>keyboard(option)}
        >
            {option}
        </div>
    )
}