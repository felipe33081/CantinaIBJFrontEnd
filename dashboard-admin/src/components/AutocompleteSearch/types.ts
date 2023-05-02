import React from "react";

export type AutocompleteProps = {
    id: string;
    name: string;
    label: string;
    displayField: string;
    watch: any;
    setValue: any;
    fetch: any;
    options: [];
    params: { page: number, size: number };
    disabled?: boolean;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, options: any) => void;
    endAdornment?: any;
    showEndAdornment?: boolean;
    errors?: any;
};