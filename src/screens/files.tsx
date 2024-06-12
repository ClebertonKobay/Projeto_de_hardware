import { useState } from "react";
import { FileButton } from "../components/fileButton";


export default function Files() {
    const [files, setFiles] = useState<String[]>()

    const fetchFile ()=>{}

    return (
        <>
            <div>
                {(files !== undefined) ? files.map(() => <FileButton  fetchFile={}  fileName="" />) :  }
            </div>
        </>

    )
}