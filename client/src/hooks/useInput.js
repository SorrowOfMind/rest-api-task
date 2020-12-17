import {useState} from 'react'

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue);

    const handleChange = e => setValue(e.target.value);
    const clearInput = () => setValue('');

    return [
        value,
        {
            setInput : {value, onChange: handleChange},
            clearInput
        }
    ]
}

export default useInput;