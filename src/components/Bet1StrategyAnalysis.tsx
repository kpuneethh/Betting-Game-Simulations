import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SimulationResult {
  won: boolean;
  finalMoneyBalance: number;
  finalCumulativeEarnings: number;
  totalBets: number;
  moneyHistory: Array<{
    bet: number;
    moneyBalance: number;
    cumulativeEarnings: number;
  }>;
  simNumber?: number;
}

interface Stats {
  wins: number;
  totalSims: number;
  avgBetsWhenLost: number;
  winRate: string;
}

interface Bet1StrategyAnalysisProps {
  simCount: number;
}

const Bet1StrategyAnalysis = ({ simCount }: Bet1StrategyAnalysisProps) => {
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [stats, setStats] = useState<Stats>({ wins: 0, totalSims: 0, avgBetsWhenLost: 0, winRate: '0' });
  
  // Mathematical expectation calculation
  const calculateExpectedValue = (numBets: number): number => {
    const pWin = 0.35;
    const pLose = 0.65;
    const expectedNetChange = numBets * (pWin * 1 + pLose * (-1));
    return expectedNetChange;
  };
  
  // Single simulation of bet-1 strategy
  const runSingleSimulation = (): SimulationResult => {
    let moneyBalance = 5; // Current money available to bet
    let cumulativeEarnings = 0; // Total money won (goal: $25)
    let totalBets = 0;
    let moneyHistory: Array<{bet: number; moneyBalance: number; cumulativeEarnings: number}> = [];
    
    while (moneyBalance > 0 && cumulativeEarnings < 25) {
      // Record current state
      if (totalBets % 10 === 0) { // Sample every 10 bets for visualization
        moneyHistory.push({ 
          bet: totalBets, 
          moneyBalance: moneyBalance,
          cumulativeEarnings: cumulativeEarnings 
        });
      }
      
      // Must have at least $1 to bet
      if (moneyBalance < 1) break;
      
      // Place $1 bet
      totalBets++;
      moneyBalance -= 1; // Lose the bet amount first
      
      if (Math.random() < 0.35) {
        // Win: get back bet + winnings
        moneyBalance += 2; // Get back the $1 bet + $1 winnings
        cumulativeEarnings += 1; // Only the winnings count toward goal
      }
      // If lose: money is already subtracted, nothing added back
    }
    
    return {
      won: cumulativeEarnings >= 25,
      finalMoneyBalance: moneyBalance,
      finalCumulativeEarnings: cumulativeEarnings,
      totalBets: totalBets,
      moneyHistory: moneyHistory
    };
  };
  
  // Run multiple simulations
  const runSimulations = (numSims: number): void => {
    let wins = 0;
    let totalBetsWhenLost = 0;
    let lossCount = 0;
    let sampleSimulations: SimulationResult[] = [];
    
    for (let i = 0; i < numSims; i++) {
      const result = runSingleSimulation();
      
      if (result.won) {
        wins++;
      } else {
        totalBetsWhenLost += result.totalBets;
        lossCount++;
      }
      
      // Keep first 5 simulations for visualization
      if (i < 5) {
        sampleSimulations.push({
          ...result,
          simNumber: i + 1
        });
      }
    }
    
    setStats({
      wins: wins,
      totalSims: numSims,
      avgBetsWhenLost: lossCount > 0 ? totalBetsWhenLost / lossCount : 0,
      winRate: (wins / numSims * 100).toFixed(4)
    });
    
    setSimulations(sampleSimulations);
  };
  
  useEffect(() => {
    runSimulations(simCount);
  }, [simCount]);
  
  // Prepare data for money balance chart
  const moneyBalanceChartData: Array<{[key: string]: number}> = [];
  const maxLength = Math.max(...simulations.map(sim => sim.moneyHistory.length));
  
  for (let i = 0; i < maxLength; i++) {
    const dataPoint: {[key: string]: number} = { bet: i * 10 };
    simulations.forEach((sim, idx) => {
      if (i < sim.moneyHistory.length) {
        dataPoint[`balance${idx + 1}`] = sim.moneyHistory[i].moneyBalance;
      }
    });
    moneyBalanceChartData.push(dataPoint);
  }

  // Prepare data for cumulative earnings chart
  const cumulativeEarningsChartData: Array<{[key: string]: number}> = [];
  
  for (let i = 0; i < maxLength; i++) {
    const dataPoint: {[key: string]: number} = { bet: i * 10 };
    simulations.forEach((sim, idx) => {
      if (i < sim.moneyHistory.length) {
        dataPoint[`earnings${idx + 1}`] = sim.moneyHistory[i].cumulativeEarnings;
      }
    });
    cumulativeEarningsChartData.push(dataPoint);
  }

  return (
    <div className="strategy-analysis">
      <div className="stats-container">
        <h3>Simulation Results</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Simulations:</span>
            <span className="stat-value">{stats.totalSims.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wins:</span>
            <span className="stat-value">{stats.wins.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Win Rate:</span>
            <span className="stat-value">{stats.winRate}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Bets When Lost:</span>
            <span className="stat-value">{stats.avgBetsWhenLost.toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={() => runSimulations(simCount)}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Run New Simulation
        </button>
      </div>
      
      <div className="chart-container">
        <h3>Money Balance Over Bets</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moneyBalanceChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bet" label={{ value: 'Bet number', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Dollars ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {simulations.map((sim, idx) => (
              <Line 
                key={idx}
                type="monotone" 
                dataKey={`balance${idx + 1}`} 
                stroke={`hsl(${idx * 60 + 240}, 70%, 50%)`}
                name={`Sim ${sim.simNumber}`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Cumulative Earnings Over Bets</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cumulativeEarningsChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bet" label={{ value: 'Bet number', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Earnings ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {simulations.map((sim, idx) => (
              <Line 
                key={idx}
                type="monotone" 
                dataKey={`earnings${idx + 1}`} 
                stroke={`hsl(${idx * 60 + 240}, 70%, 50%)`}
                name={`Sim ${sim.simNumber}`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="strategy-description">
        <h3>Strategy Overview</h3>
        <p>
          The <strong>Bet $1 Strategy</strong> places minimal $1 bets on each round.
          This low-risk approach allows for many bets but has a negative expected value
          (-0.3 dollars per bet). While it provides the most stability, it requires
          significantly more bets to reach the $25 earnings goal.
        </p>
        <div className="expected-value">
          <h4>Mathematical Expectation</h4>
          <p>Expected value per bet: {calculateExpectedValue(1).toFixed(2)} dollars</p>
          <p>Expected value after 100 bets: {calculateExpectedValue(100).toFixed(0)} dollars</p>
        </div>
      </div>
    </div>
  );
};

export default Bet1StrategyAnalysis;
