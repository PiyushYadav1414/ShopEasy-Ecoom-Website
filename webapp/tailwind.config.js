// Tailwind CSS is a CSS framework that uses utility classes to style elements directly in your HTML. Instead of 
// writing custom CSS, you apply predefined classes like bg-blue-500 for background color or p-4 for padding.
//It's fast for building custom designs, highly customizable, and helps keep your code clean by only including the styles you use. 

/** @type {import('tailwindcss').Config} */
module.exports = {
  // jab project compile hoga toh src ke andar ki saari html and ts file of component ko watch kro 
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// Why are we doing all this?
// The purpose of this setup is to ensure that when the project runs, Tailwind CSS only looks at the input.css file and imports
// the classes used in the project's HTML. Otherwise, Tailwind comes with a large number of pre-built classes that can significantly
// increase the website's load time if included in the final CSS file, leading to poor user experience.



// ## How to setup Tailwind CSS

// Step 1: Run the following commands to install Tailwind CSS and initialize the configuration file:


// npm install -D tailwindcss postcss autoprefixer (The first command installs the tools you need to use Tailwind CSS.)
// npx tailwindcss init (creates a configuration file so you can customize Tailwind for your project.)

// Step 2: Update the tailwind.config.js file to include the following line:
// content: ["*.html"],

// Step 3: Create a src/input.css file and include the following lines:
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// Step 4: Link the src/output.css file in your HTML file.

// Step 5: Run the following command to generate the final output CSS file:
// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch



// ## Tailwind CSS Breakpoints

// There are five default breakpoints in Tailwind CSS, inspired by common device resolutions:

// 1. `sm` (Small) - Minimum width: 640px aftwards below css will apply
//    CSS: @media (min-width: 640px) { ... }

// 2. `md` (Medium) - Minimum width: 768px  if it exceed 768 px then below css will apply
//    CSS: @media (min-width: 768px) { ... }

// 3. `lg` (Large) - Minimum width: 1024px  if it exceed 1024px  then below css will apply
//    CSS: @media (min-width: 1024px) { ... }

// 4. `xl` (Extra Large) - Minimum width: 1280px if it exceed 1280px  then below css will apply
//    CSS: @media (min-width: 1280px) { ... }

// 5. `2xl` (2X Extra Large) - Minimum width: 1536px if it exceed 1536px then below css will apply
//    CSS: @media (min-width: 1536px) { ... }

// These breakpoints allow you to create responsive designs by applying specific styles at different screen widths.


