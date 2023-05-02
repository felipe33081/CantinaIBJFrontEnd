import { render } from '@testing-library/react';
import Button from 'components/Button/Button';

it('button should renders', () => {
	const { getByText } = render(<Button>Click me</Button>);
	expect(getByText('Click me')).toBeInTheDocument();
});
