// src/styles/theme.js

const theme = {
  colors: {
    primary: '#7b2cbf',        // Slightly deeper purple
    primaryLight: '#9d4edd',   // Lighter shade of primary
    secondary: '#5a189a',      // Darker purple
    accent: '#c77dff',         // Lighter accent purple
    dark: '#10002b',           // Very dark purple
    light: '#f8f0ff',          // Very light purple tint
    text: '#2d00f7',           // Deep blue-purple for text
    textLight: '#6c63ff',      // Lighter purple-blue for secondary text
    white: '#ffffff',
    black: '#000000',
    testBorder: '#fc0000ff',         // Light purple for borders
  },

  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Segoe UI', sans-serif",
    heading: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2d00f7',
    },
    subheading: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#5a189a',
    },
    text: {
      fontSize: '1rem',
      color: '#2d00f7',
    },
  },

  buttons: {
    primary: {
      backgroundColor: '#7b2cbf',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },
    primaryHover: {
      backgroundColor: '#9d4edd',
    },
    secondary: {
      backgroundColor: '#5a189a',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
    },
    accent: {
      backgroundColor: '#c77dff',
      color: '#10002b',
      border: 'none',
      borderRadius: '4px',
    },
  },

  layout: {
    headerHeight: '64px',
    maxContentWidth: '1200px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },

  scrollbar: {
    hidden: {
      msOverflowStyle: 'none',  // IE and Edge
      scrollbarWidth: 'none',   // Firefox
    },
  },

  spacing: (factor) => `${factor * 8}px`, // Example: theme.spacing(2) => "16px"
};

export default theme;
