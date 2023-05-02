import { action } from "@storybook/addon-actions";
import React, { VFC, ReactNode, FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const StorybookFormProvider: VFC<{ children: ReactNode }> = ({ children }) => {
	const methods = useForm();
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
			>
				{children}
			</form>
		</FormProvider>
	);
};

export const InputController = (showSubmitButton: boolean) => (
	Story: FC
) => (
	<StorybookFormProvider>
		<Story />
		{showSubmitButton && <button type="submit">Submit</button>}
	</StorybookFormProvider>
);