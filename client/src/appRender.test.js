import React from "react";
import 'esm';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App.js";
import { Provider } from "react-redux";
import store from './redux/store'; 
const { EventEmitter } = require('events');

// Adjust the maximum event listeners for your use case
EventEmitter.defaultMaxListeners = 10;

// Define a mock for window.matchMedia
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

test("expects appRender", () => {
    const { queryByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    // Check if the "appRender" element is present in the rendered component
    const appRender = screen.queryByTestId("appRender");
    expect(appRender).toBeInTheDocument();
});
