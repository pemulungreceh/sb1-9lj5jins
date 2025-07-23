import React from 'react';

interface ThemeProps {
  children: React.ReactNode;
}

const LazadaTheme: React.FC<ThemeProps> = ({ children }) => {
  return (
    <div className="lazada-theme">
      <style>{`
        .lazada-theme {
          --primary-color: #f57c00;
          --primary-hover: #ef6c00;
          --secondary-color: #ff9800;
          --accent-color: #ffc107;
          --success-color: #4caf50;
          --warning-color: #ff9800;
          --error-color: #f44336;
          --text-primary: #212121;
          --text-secondary: #757575;
          --background: #fafafa;
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
          box-shadow: 0 4px 12px rgba(245, 124, 0, 0.15);
        }
      `}</style>
      {children}
    </div>
  );
};

export default LazadaTheme;