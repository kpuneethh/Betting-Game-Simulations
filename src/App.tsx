import { useState } from 'react';
import AllInStrategyAnalysis from './components/AllInStrategyAnalysis';
import Bet5StrategyAnalysis from './components/Bet5StrategyAnalysis';
import Bet1StrategyAnalysis from './components/Bet1StrategyAnalysis';
import './App.css';

function App() {
  const [globalSimCount, setGlobalSimCount] = useState(10000);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Money Game Strategy Analysis</h1>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1>Money Game Strategy Analysis</h1>
          <p style={{ marginBottom: "20px" }}>Comparing different betting strategies through simulation</p>
          <p style={{ marginBottom: "20px" }}>
            You have $5 and your goal is to reach $25 in earnings cumulatively by betting your money. Each bet you place has a 35% chance of winning and 65% chance of losing. That means, if you’re starting with $5 and bet $3, you have a 35% chance of winning $3 to have a new balance of $8, and a 65% chance of losing $3 to have a new balance of $2. For every turn, the minimum bet you can place is $1 and the maximum bet you can place is your current balance. If your balance reaches $0 and you haven’t reached the cumulative goal of $25 yet, you fail.
          </p>
          <p>
            What betting strategy do you use to maximize your chances of reaching the goal?
          </p>
        </div>


        
        <div className="simulation-controls">
          <label htmlFor="simCount">Total Simulations:</label>
          <input
            id="simCount"
            type="number"
            min="100"
            max="1000000"
            step="100"
            value={globalSimCount}
            onChange={(e) => setGlobalSimCount(parseInt(e.target.value) || 1000)}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              width: '120px'
            }}
          />
          <span style={{ marginLeft: '0.5rem', opacity: 0.8 }}>
            (100 - 1,000,000)
          </span>
        </div>
        
        <div className="simulation-warning">
          <span>⚠️ Note: Larger simulation counts (10,000+) may take a few seconds to load</span>
        </div>
      </header>
      
      <main className="App-main">
        <section className="strategy-section">
          <h2>All-In Strategy Analysis</h2>
          <p>Simulates betting all available money on each bet</p>
          <AllInStrategyAnalysis simCount={globalSimCount} />
        </section>
        
        <section className="strategy-section">
          <h2>Bet $5 Strategy Analysis</h2>
          <p>Simulates betting $5 (or all available if less) on each bet</p>
          <Bet5StrategyAnalysis simCount={globalSimCount} />
        </section>
        
        <section className="strategy-section">
          <h2>Bet $1 Strategy Analysis</h2>
          <p>Simulates betting $1 on each bet</p>
          <Bet1StrategyAnalysis simCount={globalSimCount} />
        </section>
      </main>
    </div>
  );
}

export default App;
