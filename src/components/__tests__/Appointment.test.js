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