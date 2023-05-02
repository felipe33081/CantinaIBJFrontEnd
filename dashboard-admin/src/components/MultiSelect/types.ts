import React from "react";

export type MultiSelectProps = {
    label: string;
    fields: { name: string, value: string }[];
    value: string[];
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    id: string;
    required?: boolean;
    disabled?: boolean;
    errors?: any;
};