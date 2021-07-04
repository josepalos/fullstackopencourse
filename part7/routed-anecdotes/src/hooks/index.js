import { useState } from 'react';

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const clear = () => {
        setValue("");
    }

    const asFormField = () => {
        const props = {value, onChange, type}
        return (<input {...props}></input>);
    }

    return {type, value, onChange, asFormField, clear}
}