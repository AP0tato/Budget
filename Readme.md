# Budget App

A simple React-based budget management app with interactive tables and charts.

## Features

- Add, edit, and delete income and expense items
- View totals and breakdowns by category
- Switch between different currencies and timeframes
- Interactive pie and bar charts (powered by [Recharts](https://recharts.org/))
- Responsive modal for item entry and editing

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn, but pnpm is preferred)

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
src/
  App.jsx
  index.jsx
  Navigator.jsx
  pages/
    Budget.jsx
    Dashboard.jsx
    resources/
      add.png
      edit.png
      trash.png
    styles/
      App.css
      Budget.css
      Dashboard.css
      Navigator.css
  test/
    data.json
```

## Customization

- **Edit categories:** Change the `CATEGORIES` array in `Budget.jsx`.
- **Edit test data:** Modify `src/test/data.json`.
- **Change colors:** Update the `COLORS` object in `Budget.jsx` and `Dashboard.jsx`.

## License

MIT

---

*Built with [React](https://react.dev/) and [Recharts](https://recharts.org/).*