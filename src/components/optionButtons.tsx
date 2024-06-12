export type OptionButtonProp = {
    option: string
    setKeyboard: (option:string)=> void
}

export function OptionButton({ option,setKeyboard }: OptionButtonProp) {

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
            onClick={()=>setKeyboard(option)}
        >
            {option}
        </div>
    )
}