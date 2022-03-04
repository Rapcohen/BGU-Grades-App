import React, { useState } from "react";

function useForm<T>(initialInputs: T, callback: () => void) {

    const [inputs, setInputs] = useState<T>(initialInputs);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        if (event) {
            event.preventDefault();
        }
        callback();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    return {
        inputs,
        handleInputChange,
        handleSubmit
    };
}

export default useForm;