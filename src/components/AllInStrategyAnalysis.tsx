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

interface AllInStrategyAnalysisProps {
  simCount: number;
}

const AllInStrategyAnalysis = ({ simCount }: AllInStrategyAnalysisProps) => {
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [stats, setStats] = useState<Stats>({ wins: 0, totalSims: 0, avgBetsWhenLost: 0, winRate: '0' });
  
  // Single simulation of all-in strategy
  const runSingleSimulation = (): SimulationResult => {
    let moneyBalance = 5; // Current money available to bet
    let cumulativeEarnings = 0; // Total money won (goal: $25)
    let totalBets = 0;
    let moneyHistory: Array<{bet: number; moneyBalance: number; cumulativeEarnings: number}> = [];
    
    while (moneyBalance > 0 && cumulativeEarnings < 25) {
      // Record current state
      moneyHistory.push({ 
        bet: totalBets, 
        moneyBalance: moneyBalance,
        cumulativeEarnings: cumulativeEarnings 
      });
      
      // All-in bet: bet everything you have
      const betAmount = moneyBalance;
      totalBets++;
      moneyBalance = 0; // Lose all money initially
      
      if (Math.random() < 0.35) {
        // Win: get back bet + winnings (double your money)
        moneyBalance = betAmount * 2;
        cumulativeEarnings += betAmount; // Winnings count toward goal
      }
      // If lose: money balance stays at 0, game over
    }
    
    // Record final state
    moneyHistory.push({ 
      bet: totalBets, 
      moneyBalance: moneyBalance,
      cumulativeEarnings: cumulativeEarnings 
    });
    
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
      winRate: (wins / numSims * 100).toFixed(2)
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
    const dataPoint: {[key: string]: number} = { bet: i };
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
    const dataPoint: {[key: string]: number} = { bet: i };
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
            <span className="stat-value">{stats.avgBetsWhenLost.toFixed(2)}</span>
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
                stroke={`hsl(${idx * 60}, 70%, 50%)`}
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
                stroke={`hsl(${idx * 60}, 70%, 50%)`}
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
          The <strong>All-In Strategy</strong> bets all available money on each bet. 
          This high-risk approach can lead to quick wins but also rapid losses.
          With a 35% win probability, this strategy has a negative expected value
          and will lose money in the long run.
        </p>
      </div>
    </div>
  );
};

export default AllInStrategyAnalysis;
