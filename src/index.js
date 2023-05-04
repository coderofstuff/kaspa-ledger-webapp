import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import './styles/index.css';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<div id="root">
    <Header />
    <Body />
    {/* <Footer /> */}
</div>);