import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getByPlaceholderText,
  prettyDOM,
  getAllByTestId,
  getByAltText
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  // application loads without crashing and makes the requests to the API server to retrieve appointment data to display in the schedule
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    //  waitForElement is a function that returns a DOM node. In this case, it is looking for something based on the text "Monday"
    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />)
    
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones'}
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    debug();

// Check that the element with the text "Saving" is displayed.
// Wait until the element with the text "Lydia Miller-Jones" is displayed.
// Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  });
});

// write the tests to confirm that our Application component makes the necessary requests to the API.
// To accomplish this will need to replace the real implementation of the axios library with a mock version.
// We will use mocks to remove the dependency on HTTP request library specifically during testing.

// We will mock the functions we use from the axios library. [DONE]
// We will write a test to confirm that the scheduler can load data. [DONE]
// We will write an asynchronous test that waits for a component to update before proceeding. [IN-PROGRESS]
// We will use containers to find specific DOM nodes.
// We will chain promises to handle asynchronous testing.
// We will override mock implementations for specific tests.
// We will use setup and teardown functions provided by Jest to perform common tasks.
