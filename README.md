# AgriOk Frontend

A modern, responsive web application for agricultural monitoring and insights visualization. This dashboard enables farmers to monitor real-time sensor data and receive actionable recommendations for optimal crop management.

## 🌟 Features

- **User Authentication**: Secure login system for farmers and administrators
- **Admin Dashboard**: Complete product management system for administrators
  - Create and edit products
  - Manage product listings
  - Order management system
- **Farmer Dashboard**: Specialized interface for farmers with real-time data
- **Shopping Cart**: Fully functional cart system for agricultural products
- **Responsive Design**: Optimized viewing experience across all devices
- **Real-time Stats**: Interactive statistics cards for quick insights
- **Custom Components**: Reusable UI components for consistent user experience

## 🚀 Technologies

- **React.js** - Frontend framework for building the user interface
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Redux** (via store.js) - State management
- **React Router** - For handling navigation

## 📁 Project Structure

```
src/
├── assets/           # Static assets and images
├── components/       # Reusable UI components
│   ├── BlackHeader.jsx
│   ├── CustomLabel.jsx
│   ├── EmptyCart.jsx
│   ├── EmptyOrderState.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── HomeProducts.jsx
│   ├── Loader.jsx
│   ├── Pagination.jsx
│   ├── ShopHeroSection.jsx
│   ├── Spinner.jsx
│   └── StatsCard.jsx
├── layouts/          # Layout components
├── pages/           # Application pages
│   ├── AboutPage.jsx
│   ├── AdminCreateProductPage.jsx
│   ├── AdminEditProductPage.jsx
│   ├── AdminHomePage.jsx
│   ├── AdminListProductsPage.jsx
│   ├── AllOrdersPage.jsx
│   ├── CartPage.jsx
│   ├── FarmerCreateTrendingPage.jsx
│   ├── FarmerHomePage.jsx
│   ├── HomePage.jsx
│   └── LoginPage.jsx
├── slices/          # Redux slices for state management
├── App.jsx          # Main application component
├── index.css        # Global styles
├── main.jsx        # Application entry point
└── store.js        # Redux store configuration
```

## 🛠️ Prerequisites

- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/kirengamartial/agriok-frontend.git
cd agriok-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```bash
VITE_API_URL=your_api_endpoint
```

4. Start the development server:
```bash
npm run dev
```

## 🔐 User Roles

The application supports two types of users:

1. **Administrators**
   - Manage product catalog
   - View and manage orders
   - Access administrative dashboard
   - Create/Edit products

2. **Farmers**
   - View product listings
   - Place orders
   - Access farming insights
   - View personalized recommendations

## 💻 Core Components

- **BlackHeader**: Main navigation component
- **StatsCard**: Display key metrics and statistics
- **Hero & ShopHeroSection**: Landing page components
- **CustomLabel**: Reusable label component
- **Pagination**: Handle data pagination
- **Loader & Spinner**: Loading state components
- **EmptyStates**: Custom empty state displays
