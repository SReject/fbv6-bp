// renderer main entry point
import './css/main.css';

import React from "react";
import { createRoot } from 'react-dom/client';


class App extends React.Component {
    render() {
        return (
            <span className="font-bold">Fixed tailwind!!</span>
        );
    }
}

const container = document.getElementById('firebot');
const root = createRoot(container!);
root.render(<App />);