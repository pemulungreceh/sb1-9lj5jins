import React from 'react';

interface ThemeProps {
  children: React.ReactNode;
}

const TokopediaTheme: React.FC<ThemeProps> = ({ children }) => {
  return (
    <div className="tokopedia-theme">
      <style>{`
        .tokopedia-theme {
          --primary-color: #42b883;
          --primary-hover: #369870;
          --secondary-color: #00aa5b;
          --accent-color: #7ed321;
          --success-color: #4caf50;
          --warning-color: #ff9800;
          --error-color: #f44336;
          --text-primary: #213547;
          --text-secondary: #6b7280;
          --background: #f8fafc;
          --card-background: #fff;
          --border-color: #e5e7eb;
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
          box-shadow: 0 4px 12px rgba(66, 184, 131, 0.15);
        }
      `}</style>
      {children}
    </div>
  );
};

export default TokopediaTheme;