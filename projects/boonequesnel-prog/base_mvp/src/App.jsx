import TurfQuoteCalculator from './components/TurfQuoteCalculator.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <span className="logo" aria-hidden="true">
            ◆
          </span>
          <div>
            <h1 className="app-title">Turf Quoting Tool</h1>
            <p className="app-subtitle">
              Estimate sod and installation from lawn size and your rates — all in the browser.
            </p>
          </div>
        </div>
      </header>
      <main className="app-main">
        <TurfQuoteCalculator />
      </main>
      <footer className="app-footer">
        <p>Workshop MVP — numbers stay on this device. Adjust rates to match your business.</p>
      </footer>
    </div>
  );
}
