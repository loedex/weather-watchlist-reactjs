#  Weather Watchlist

A small React app for building a personal watchlist of cities and tracking their live weather — built as a hands-on project to practice `useState`, `useEffect`, controlled forms, and lifting state up.

Each city card fetches and auto-refreshes its own weather data independently, using the free [Open-Meteo](https://open-meteo.com/) API (no API key required).

---

##  Features

-  **Search and add cities** to a personal watchlist via a controlled form
-  **Input validation** — rejects empty input, unknown cities, and duplicate entries
-  **Live weather data** — current temperature and wind speed per city
-  **Auto-refresh** — each city's weather updates automatically on a timer, independent of the others
-  **Remove cities** from the watchlist at any time
-  **Loading and error states** handled per city, not globally
-  Clean component structure with state lifted to a single source of truth

---

##  Tech Stack

- **React** (functional components + hooks)
- **Tailwind CSS** for styling
- **Open-Meteo API** for weather data (`current_weather=true`)

---

## 📂 Project Structure

```
src/
├── App.jsx                    # Root component — owns the watchlist state
├── components/
│   ├── WeatherHeader.jsx      # Static page title and subtitle
│   ├── WeatherSearch.jsx      # Controlled search form + validation
│   └── WeatherCard.jsx        # Per-city weather fetch, auto-refresh, and display
    └── WeatherCityInputData.jsx
└── index.css                  # Tailwind entry point
```

---

## ⚙️ How It Works

### State ownership

The `watchlist` array (the list of added cities) lives in `App.jsx` — the single source of truth. Both `WeatherSearch` and `WeatherCard` receive what they need via props and communicate changes back up through callback functions (`onWatchlist`, `onRemove`), following React's **lifting state up** pattern.

### Per-city independence

Each `WeatherCard` is a separate component instance with its own local state (`weatherData`, `isLoading`, `error`, `refreshTrigger`) and its own `useEffect` hooks. This means every city:

- Fetches its weather independently
- Refreshes on its **own** timer, started from the moment it was added — cities are not synced to a single global clock
- Handles its own loading/error state without affecting other cards

### Effect separation

Each card uses two effects with a single responsibility each:

| Effect | Responsibility | Dependency array |
|---|---|---|
| Fetch effect | Calls the weather API and updates state | `[cityobj, refreshTrigger]` |
| Timer effect | Increments `refreshTrigger` on an interval | `[]` (runs once, on mount) |

The timer effect never touches the network directly — it only updates a trigger value, which the fetch effect reacts to. This keeps each effect focused and avoids duplicating fetch logic.

### Cleanup

Each card's timer is cleared via `clearInterval` in the effect's cleanup function, which runs automatically when that specific card is removed from the watchlist — preventing orphaned timers from continuing to run after a city is deleted.

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/loedex/weather-watchlist-reactjs.git
cd weather-watchlist

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port your dev server reports).

---

## 🏙️ Supported Cities

This project uses a small hardcoded lookup table (`WeatherCityInputData.jsx`) instead of a geocoding API, to keep the focus on React state and effects. Currently supported:

- Lahore
- Karachi
- Islamabad
- London
- New York
- Tokyo
- Dubai

More cities can be added by extending the `CITY_COORDINATES` object with a `name`, `lat`, and `lon`.

---

##  What This Project Practices

This project was built as a learning exercise to apply:

- Controlled form inputs and validation
- Lifting state up across sibling/parent-child components
- `useEffect` with all three dependency array forms
- Correct async data fetching inside `useEffect` (inner async function, `try`/`catch`/`finally`)
- Cleanup functions to prevent memory leaks from timers
- Rendering independent, per-item side effects in list-based UIs

---

##  Possible Improvements

- Replace the hardcoded city list with a real geocoding API for free-text city search
- Add debouncing to search input
- Persist the watchlist to `localStorage` so it survives page refreshes
- Add unit tests for the search validation logic

---

## 📄 License

This project is open source and available for learning purposes.
