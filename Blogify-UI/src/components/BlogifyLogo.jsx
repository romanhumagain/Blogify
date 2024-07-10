import React from 'react';

const BlogifyLogo = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
          
          .font-pacifico {
            font-family: 'Pacifico', cursive;
          }

          .logo-container {
            font-weight: bold;
            font-size: 1.3rem;
            transition: font-size 0.15s;
            letter-spacing: 0.1em;
            animation: zoomIn 0.5s ease-in-out; /* Reduced duration for faster animation */
          }

          .logo-highlight {
            font-size: 2.3rem;
          }

          {/* @keyframes zoomIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            } */}
          }
        `}
      </style>
      <h1 className="logo-container font-pacifico text-gray-800 dark:text-gray-200">
        <span className="logo-highlight text-teal-500 dark:text-teal-500 ">B</span>logify
      </h1>
    </>
  );
};

export default BlogifyLogo;
