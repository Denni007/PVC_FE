// document.addEventListener('contextmenu', (event) => event.preventDefault());

// // Function to check if developer tools are open
// const detectDevTools = () => {
//   // Create a dummy element and check if its properties are overridden by dev tools
//   const devtools = {
//     isOpen: false
//   };
//   const element = new Image();
//   Object.defineProperty(element, 'id', {
//     get: () => {
//       devtools.isOpen = true; // Developer tools detected
//       return null;
//     }
//   });

//   setInterval(() => {
//     devtools.isOpen = false;
//     // console.log(element);
//     // console.clear();
//   }, 1000);

//   setInterval(() => {
//     if (devtools.isOpen) {
//       // If developer tools are detected, take action
//       // For example, redirect the user to another page
//       window.location.href = 'http://localhost:3000'; // Redirect to homepage
//     }
//   }, 1000);
// };

// detectDevTools(); // Call the function to start checking

// document.addEventListener('keydown', (event) => {
//   // Prevent F12
//   // if (event.keyCode === 123) {
//   //   event.preventDefault();
//   // }

//   // Prevent Ctrl+Shift+I
//   if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
//     event.preventDefault();
//   }

//   // Prevent Ctrl+Shift+J
//   if (event.ctrlKey && event.shiftKey && event.keyCode === 74) {
//     event.preventDefault();
//   }

//   // Prevent Ctrl+U
//   if (event.ctrlKey && event.keyCode === 85) {
//     event.preventDefault();
//   }

//   // Prevent Ctrl+Shift+C
//   if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
//     event.preventDefault();
//   }
// });
