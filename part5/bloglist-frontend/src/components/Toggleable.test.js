import React, { useDebugValue } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Toggleable';

describe('<Toggleable />', () => {
	let component;
	const showButtonText = "show";
	const hideButtonText = "hide";

	beforeEach(() => {
		component = render(
			<Togglable showButtonLabel={ showButtonText } hideButtonLabel={ hideButtonText }>
				<div className="testDiv" />
			</Togglable>
		)
	})

	test('renders its children', () => {
		expect(
			component.container.querySelector('.testDiv')
		).toBeDefined()
	})

	test('at start the children are not displayed', () => {
		const div = component.container.querySelector('.toggleableContent');

		expect(div).not.toBeVisible();
	})

	test('after clicking the button, children are displayed', () => {
		const button = component.getByText(showButtonText);
		fireEvent.click(button)

		const div = component.container.querySelector('.toggleableContent')
		expect(div).not.toHaveStyle('display: none')
	})

})