import React from "react";

import { render } from "@testing-library/react";

import Application from "components/Application";

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Application />);
  });
})

// write the tests to confirm that our Application component makes the necessary requests to the API. 
// To accomplish this will need to replace the real implementation of the axios library with a mock version. 
// We will use mocks to remove the dependency on HTTP request library specifically during testing.

// We will mock the functions we use from the axios library.
// We will write a test to confirm that the scheduler can load data.
// We will write an asynchronous test that waits for a component to update before proceeding.
// We will use containers to find specific DOM nodes.
// We will chain promises to handle asynchronous testing.
// We will override mock implementations for specific tests.
// We will use setup and teardown functions provided by Jest to perform common tasks.