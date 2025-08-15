# Money Game Strategy Analysis

A React-based web application that simulates and analyzes different betting strategies for a money-based gambling game. The app compares three distinct strategies through Monte Carlo simulations and visualizes the results with interactive charts.

## Features

- **All-In Strategy**: Bets all available money on each bet
- **Bet $5 Strategy**: Consistently bets $5 (or all available if less)
- **Bet $1 Strategy**: Places minimal $1 bets on each round
- Real-time simulation results with statistics
- Interactive line charts showing money balance over time
- Mathematical expectation calculations
- Responsive design for all devices

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Local Deployment

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
- **Win Probability**: 35% (0.35)
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
- **Expected Value**: Negative (-0.3 dollars per bet)
- **Characteristics**: Maximum stability, requires many bets

## Technologies Used

- **React 18** - User interface framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Recharts** - Charting library for data visualization
- **CSS3** - Modern styling with responsive design

## Customization

You can modify the simulation parameters in each component:

- Change starting money balance
- Adjust win probability
- Modify goal amount
- Update number of simulations
- Customize chart colors and styling

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
