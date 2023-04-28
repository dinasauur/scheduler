# Interview Scheduler

The Interviewer Scheduler is an app that allows users to book and cancel interviews. The purpose of this project is to build and test a React application by combining a concise API with a WebSocket server for realtime experience. 

## Dependencies
- React
- WebSocket
- Axios
- Storybook
- Jest
- Cypress
- @testing-library/react-hooks
- react-test-renderer

## Quick glance of the project

This is the main page where a user can select any day from the list of days of their choosing. They can see which time slots are taken and how many spots are remaining for each day.
!["Screenshot of main page"](https://github.com/dinasauur/scheduler/blob/master/docs/main-page.png?raw=true)
Here, users ccan click on the plus button and an appointment form will show up for them to fill out. They have a list of interviewers they can choose from. They can also get access to the edit and delete buttons if they hover above any existing appointments. 
!["Screenshot of add and edit components"](https://github.com/dinasauur/scheduler/blob/master/docs/add-edit.png?raw=true)
Should the user wish to delete an appointment, a confirmation message would pop up.
!["Screenshot of confirmation message to delete"](https://github.com/dinasauur/scheduler/blob/master/docs/confirm.png?raw=true)
If there is an error between saving an appointment or deleting an appointment, an error message would pop up.
!["Screenshot of error messages"](https://github.com/dinasauur/scheduler/blob/master/docs/error.png?raw=true)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```