# Money Game Strategy Analysis

A React-based web application that simulates and analyzes different betting strategies for a money-based gambling game. The app compares three distinct strategies through Monte Carlo simulations and visualizes the results with interactive charts.

Try it out: https://kpuneethh.github.io/Betting-Game-Simulations

## Problem Statement

You have $5 and your goal is to reach $25 in earnings cumulatively by betting your money. Each bet you place has a 33% chance of winning and 67% chance of losing. That means, if you’re starting with $5 and bet $3, you have a 33% chance of winning $3 to have a new balance of $8, and a 67% chance of losing $3 to have a new balance of $2. For every turn, the minimum bet you can place is $1 and the maximum bet you can place is your current balance. If your balance reaches $0 and you haven’t reached the cumulative goal of $25 yet, you fail.

What betting strategy do you use to maximize your chances of reaching the goal?

## Local Deployment

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will open automatically in your default browser at `http://localhost:3000`

### 3. Alternative Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Start development server (alternative)
npm start
```

## Project Structure

```
src/
├── components/
│   ├── AllInStrategyAnalysis.tsx      # All-in betting strategy
│   ├── Bet5StrategyAnalysis.tsx       # Fixed $5 betting strategy
│   └── Bet1StrategyAnalysis.tsx       # $1 betting strategy
├── App.tsx                            # Main application component
├── App.css                            # Application styles
├── main.tsx                           # Application entry point
└── index.css                          # Global styles
```

## Game Rules

- **Starting Balance**: $5
- **Win Probability**: 33% (0.33)
- **Goal**: Accumulate $25 in cumulative earnings
- **Win Outcome**: Get back bet amount + winnings (double your money)
- **Loss Outcome**: Lose the bet amount

## Strategy Analysis

### All-In Strategy
- **Risk Level**: Very High
- **Expected Value**: Negative
- **Characteristics**: Quick wins or rapid losses

### Bet $5 Strategy
- **Risk Level**: High
- **Expected Value**: Negative
- **Characteristics**: Moderate stability with consistent betting

### Bet $1 Strategy
- **Risk Level**: Low
- **Expected Value**: Negative (-0.34 dollars per bet)
- **Characteristics**: Maximum stability, requires many bets

## Technologies Used

- **React 18** - User interface framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Recharts** - Charting library for data visualization
- **CSS3** - Modern styling with responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- --port 3001
   ```

2. **Dependencies not installing**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```
