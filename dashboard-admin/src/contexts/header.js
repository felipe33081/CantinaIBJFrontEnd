import React, { createContext, useContext, useState } from 'react';

const HeaderContext = createContext({ title: "", setTitle: ()=>{}});

export const HeaderProvider = ({ children }) => { 
	const [title, setTitle] = useState([]);

	return (
		<HeaderContext.Provider
			value={{
				title,
				setTitle
			}}
		>
			{children}
		</HeaderContext.Provider>
	);
};

export function useHeader() { 
	const context = useContext(HeaderContext);
	const {
		title,
		setTitle,
	} = context;
	return {
		title,
		setTitle
	};
}
