import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import Game from './Game';
import { store } from '../engine';

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </Provider>
);
