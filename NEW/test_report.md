# Bean Boutique Website Test Report

## 1. W3C Validation Testing
The HTML and CSS files for the Bean Boutique website were tested using the W3C Markup Validation Service (http://validator.w3.org/) and the W3C CSS Validation Service. The role of the W3C is to develop web standards ensuring the long-term growth of the Web. Validating code against these standards guarantees better cross-browser compatibility and cleaner code.

During the initial HTML validation, a few non-compliant features were found:
- **Error:** Missing `alt` attributes on a few images on the Coffee Selection page.
- **Rectification:** Added descriptive `alt` text to all `<img>` tags to improve accessibility and pass validation.
- **Error:** Unnecessary trailing slashes on self-closing tags (e.g., `<img />`) which are not strictly required in HTML5.
- **Rectification:** Removed trailing slashes to conform perfectly to HTML5 syntax.
CSS validation passed with zero errors, confirming that all custom variables and properties align with modern CSS3 standards.

## 2. Accessibility & Screen Reader Testing
The website was tested for accessibility using NVDA (NonVisual Desktop Access) screen reader. 
**Findings:**
- Navigation was mostly clear, but the interactive modal popup for first-time visitors trapped focus unexpectedly for disabled users.
- **Rectification:** I added `role="dialog"` and `aria-labelledby="modal-title"` to the modal, and ensured the close button could be accessed via keyboard navigation. 
- Form inputs were initially missing linked labels. I added `<label>` tags (sometimes hidden visually via a `.sr-only` CSS class) to ensure screen readers announce input fields correctly, such as the newsletter email field and event registration form.

## 3. Cross-Browser & Mobile Testing
The website was tested on TWO browsers:
1. **Google Chrome (Desktop, Windows 11):** The site rendered perfectly. Hover effects, box shadows, and the animated text search function performed smoothly.
2. **Safari (Mobile, iOS/iPhone):** 
- **Discrepancies:** The subscription tiers flexbox container did not stack correctly on very small screens, causing horizontal scrolling. Additionally, hover effects for the navigation menu are not functional on touch devices.
- **Rectification:** I implemented a CSS media query `@media (max-width: 768px)` to change the `.subscription-tiers` layout from `flex-direction: row` to `flex-direction: column`. For navigation, I introduced a JavaScript-powered hamburger menu that toggles an `.active` class to display the menu links vertically on mobile devices, circumventing the reliance on hover states. 

## 4. Evaluation & Outstanding Problems
The testing phase was suitable and effective for a static prototype, identifying critical usability and responsive design flaws. The website now performs well on both desktop and mobile platforms. 

**Outstanding Problems:** 
- The animated text search on the Coffee Selection page relies heavily on JavaScript. If a user has JavaScript disabled, the search functionality breaks.
- **Recommendation:** A backend search functionality should be implemented in future development phases. This would ensure the search works server-side regardless of client-side script settings, providing a more robust fallback.
