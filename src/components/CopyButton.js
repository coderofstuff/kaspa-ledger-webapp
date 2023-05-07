import { useState } from "react"
import { BiCopy } from "react-icons/bi"
import { FaCheck } from "react-icons/fa"

export default (props) => {
    const [justCopied, setJustCopied] = useState(false)

    const handleOnClick = (e) => {
        setJustCopied(true)
        navigator.clipboard.writeText(props.text)
        setTimeout(() => {
            setJustCopied(false)
        }, 1000)
    }

    if (justCopied) {
        return <span><FaCheck className="mx-1 animate-spin-fast text-xl text-green-400" /></span>
    } else {
        return <span><BiCopy className="ml-1 text-white text-xl hover:cursor-pointer" onClick={handleOnClick} /></span>
    }
}