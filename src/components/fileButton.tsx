export interface FileButton {
    fetchFile: (fileName: string) => JSON
    fileName: string
}

export function FileButton({ fetchFile, fileName }: FileButton) {
    return (
        <div
            style={{
                cursor: 'pointer',
                border: '1px solid #000',
                borderRadius: '5px',
                padding: '5px',
                margin: '10px',
                width: '40%',
            }}
            onClick={() => fetchFile(fileName)}
        >
            {fileName}
        </div>

    )
}