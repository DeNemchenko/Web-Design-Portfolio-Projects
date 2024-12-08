/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.getElementsByTagName('section');  // Get all sections in the document
const navList = document.getElementById('navbar__list');    // Get the navbar list element

/**
 * End Global Variables
* Start Helper Functions
 * 
*/

// Make the Landing Page load dynamically from the start
document.addEventListener('DOMContentLoaded', () => {
  navBar();
  navBarStyle();
});

/**
 * Begin Main Functions
 * 
*/

// build the nav
 
// Create the Navigation Menu on Top and activate current clicked item
function navBar () { 
  for (let i = 0; i < sections.length; i++) {
      // Create the <li> and <a> elements for each section
      let listItem = document.createElement('li');
      let anchor = document.createElement('a');
      
      // Get the section name from the 'data-nav' attribute
      let sectionName = sections[i].getAttribute('data-nav');
      let sectionNameWithoutUnderscore = sectionName.replace(/_/g, ' ');  // Replace underscores with spaces for readable text

      // Set the inner text and attributes for the anchor
      anchor.innerText = sectionNameWithoutUnderscore;  // Use the name without underscores
      anchor.setAttribute('data-target', `section${i + 1}`);  // Use data-target to reference the section ID
      anchor.setAttribute('id', 'link_no' + (i + 1));  // Create a unique ID for each link

      // Append the anchor to the list item
      listItem.appendChild(anchor);

      // Append the list item to the navbar list
      navList.appendChild(listItem);

       // Add the click event listener to the anchor element
      anchor.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent default link behavior
      let targetId = anchor.getAttribute('data-target');
      let targetSection = document.getElementById(targetId);

      // Smooth scroll to the target section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Activate the clicked button
      anchor.classList.add('active'); // Add the 'active' class to the clicked button
      currentActiveButton = anchor;  // Update the current active button to the clicked one

      // Activate section and navigation link
      sectionActivate(i);
      navActivate(i + 1);
    });
  }
}

/**
* Scroll Top Button process
*
**/

// Get the button element
let scrollButton = document.getElementById("topBtn");   

// Show the button when scrolled more than 150px
window.onscroll = function() {scrollFunction()};          

// Show or hide the scroll button based on scroll position
function scrollFunction() {
  if (window.scrollY > 150) {
    scrollButton.style.display = "block"; // Show the button
  } else {
    scrollButton.style.display = "none";  // Hide the button when less than 150px
  }
}

// Scroll back to the top when the button is clicked
function topFunction() {                              
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Dynamic Style for Navigation Menu
function navBarStyle () { 
  // Select all the anchor elements
  let anchors = document.getElementsByTagName('a');

// Add a CSS class for styling
for (let i = 0; i < anchors.length; i++) {
   anchors[i].classList.add('navbar-link');
  }

}

// Activate section on scroll based on its position relative to the viewport
function sectionActivate() {
  const sections = document.querySelectorAll('section'); // Get all sections
  const activeClass = 'your-active-class'; // The active class to highlight the section

  // Iterate over each section
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();  // Get the section's position relative to the viewport

    // If the section is in the viewport (we set a threshold of 150px)
    if (rect.top >= 0 && rect.top <= window.innerHeight - 150) {
      // Add the active class to the section if it's in view
      section.classList.add(activeClass);
    } else {
      // Remove the active class if it's not in view
      section.classList.remove(activeClass);
    }
  });
}

// Listen for the scroll event and call sectionActivate
window.addEventListener('scroll', sectionActivate); 

// Activate clicked navigation menu element
function navActivate(no) { 
  let activeNav = document.getElementById('link_no' + no);
  let otherNavs = document.getElementsByTagName('a');

  // Remove 'active' class from all nav links
  for (let i = 0; i < otherNavs.length; i++) {
    otherNavs[i].classList.remove('active');
  }

  // Add 'active' class to the clicked nav link
  activeNav.classList.add('active');
} 

 