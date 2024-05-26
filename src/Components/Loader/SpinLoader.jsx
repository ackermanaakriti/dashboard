import React from 'react';

const SpinLoader = () => (
  <>
    <style>
      {`
        .loader {
            background:#ffff
           border: 10px solid #054f2e;
          border-top: 10px solid #097d60;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
    <div className="loader"></div>
  </>
);

export default SpinLoader;
