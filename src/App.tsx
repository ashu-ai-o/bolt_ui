import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppStateProvider } from './contexts/AppStateContext';
import { MainLayout } from './components/layout/MainLayout';
import { Header } from './components/layout/Header';

function App() {
  return (
    <ThemeProvider>
      <AppStateProvider>
        <div className="min-h-screen flex flex-col theme-bg-primary theme-text-primary">
          <Header />
          <MainLayout />
        </div>
      </AppStateProvider>
    </ThemeProvider>
  );
}

export default App;