import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  // application loads without crashing and makes the requests to the API server to retrieve appointment data to display in the schedule
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    //  waitForElement is a function that returns a DOM node. In this case, it is looking for something based on the text "Monday"
    await waitForElement(() => getByText('Monday'))
    
    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
  
})



// write the tests to confirm that our Application component makes the necessary requests to the API. 
// To accomplish this will need to replace the real implementation of the axios library with a mock version. 
// We will use mocks to remove the dependency on HTTP request library specifically during testing.

// We will mock the functions we use from the axios library. [DONE]
// We will write a test to confirm that the scheduler can load data. [IN-PROGRESS]
// We will write an asynchronous test that waits for a component to update before proceeding.
// We will use containers to find specific DOM nodes.
// We will chain promises to handle asynchronous testing.
// We will override mock implementations for specific tests.
// We will use setup and teardown functions provided by Jest to perform common tasks.
