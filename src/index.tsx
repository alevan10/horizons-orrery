import React from 'react';
import {Orrery} from "app/orrery";
import { createRoot } from 'react-dom/client';
import './index.less';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container)
    root.render(<Orrery />);
} else {
    console.log("Failed to generate Orrery");
}
