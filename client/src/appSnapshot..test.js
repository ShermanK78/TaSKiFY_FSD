import React from 'react';
import 'esm';
import { render } from '@testing-library/react';
import App from "./App.js";
import { Provider } from 'react-redux';
import store from './redux/store.js';
const { EventEmitter } = require('events');

// Set the maximum event listeners for EventEmitter
EventEmitter.defaultMaxListeners = 10;

// Mock the behavior of window.matchMedia
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

test('App component snapshot', () => {
    const { asFragment } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    // Capture a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
});
