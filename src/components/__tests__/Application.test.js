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
  getByAltText,
  queryByText,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    //  waitForElement is a function that returns a DOM node. In this case, it is looking for something based on the text "Monday"
    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, cancels an inerview and increases the spots remaining for Monday by 1', async () => {
    // Test plan
    // 1. render the app
    // 2. wait until the text "Arcchie Cohen" is displayed
    // 3. Click the delete button on that same appointment
    // 4. Check that confirm message come up "Are you sure you would like to delete"
    // 5. Click the confirm button
    // 6. check that text 'deleting...' shows up
    // 7. wait for the add button to show up
    // 8. check that the dylistiitem with text 'monday' also has text '2 spots remaining'
  })
});