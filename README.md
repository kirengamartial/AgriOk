# AgriOk Frontend

A modern, responsive web application for agricultural monitoring and insights visualization. This dashboard enables farmers to monitor real-time sensor data and receive actionable recommendations for optimal crop management.

## 🌟 Features

- **Real-time Data Visualization**: Interactive charts and graphs displaying sensor data including soil moisture, temperature, and pH levels
- **Actionable Insights Dashboard**: Clear presentation of ML-generated recommendations for irrigation, fertilization, and pest control
- **Responsive Design**: Optimized viewing experience across desktop and tablet devices
- **Real-time Notifications**: Alert system for time-sensitive agricultural actions

## 🚀 Technologies

- **React.js** - Frontend framework for building the user interface
- **Tailwind CSS** - Utility-first CSS framework for styling
- **D3.js/Chart.js** - Data visualization libraries for sensor data representation
- **RESTful APIs** - For fetching recommendations and sensor data from the backend

## 🛠️ Prerequisites

- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/kirengamartial/AgriOk.git
cd AgriOk
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```bash
REACT_APP_API_URL=your_api_endpoint
```

4. Start the development server:
```bash
npm start
```

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Dashboard/     # Dashboard-related components
│   ├── Charts/        # Data visualization components
│   └── Alerts/        # Notification components
├── pages/             # Main application pages
├── services/          # API service functions
├── utils/             # Utility functions
├── contexts/          # React contexts
└── styles/            # Global styles and Tailwind config
```

## 💻 Usage

The application provides a dashboard interface where users can:
- View real-time sensor data through interactive charts
- Monitor agricultural metrics and statistics
- Receive and view recommendations for crop management
- Access historical data and trends
- Set up custom alerts and notifications

## 🔗 API Integration

The frontend interfaces with the backend through RESTful APIs to:
- Fetch real-time sensor data
- Retrieve ML-generated recommendations
- Get notification updates
- Access historical data

## 🎨 UI/UX Design

The user interface was designed using Figma with a focus on:
- Intuitive navigation
- Clear data visualization
- Accessible design patterns
- Responsive layouts
- Consistent styling
