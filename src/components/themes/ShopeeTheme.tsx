import React from 'react';

interface ThemeProps {
  children: React.ReactNode;
}

const ShopeeTheme: React.FC<ThemeProps> = ({ children }) => {
  return (
    <div className="shopee-theme">
      <style>{`
        .shopee-theme {
          --primary-color: #ee4d2d;
          --primary-hover: #d73211;
          --secondary-color: #ff6b35;
          --accent-color: #ffa726;
          --success-color: #4caf50;
          --warning-color: #ff9800;
          --error-color: #f44336;
          --text-primary: #222;
          --text-secondary: #757575;
          --background: #f5f5f5;
          --card-background: #fff;
          --border-color: #e0e0e0;
        }
        
        .btn-primary {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: var(--primary-hover);
          border-color: var(--primary-hover);
        }
        
        .text-primary {
          color: var(--primary-color) !important;
        }
        
        .bg-primary {
          background-color: var(--primary-color) !important;
        }
        
        .border-primary {
          border-color: var(--primary-color) !important;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(238, 77, 45, 0.15);
        }
      `}</style>
      {children}
    </div>
  );
};

export default ShopeeTheme;