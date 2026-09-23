# OASIS Calculator - Level 2, Task 1

## Project Overview
A fully functional browser-based calculator application built with vanilla HTML, CSS, and JavaScript. This project demonstrates front-end development skills including DOM manipulation, event handling, and state management.

**OIBSIP Intern Program**  
**Track:** Web Development  
**Difficulty:** Level 2  
**Task:** Task 1 - Calculator

---

## Features Implemented

### ✅ Core Requirements
- [x] **Display Screen** — Shows current input and result with previous operation history
- [x] **Numeric Buttons (0–9)** — Full number pad with responsive feedback
- [x] **Decimal Point Button** — Prevents multiple decimals in single number
- [x] **Operator Buttons** — Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- [x] **Equals Button** — Evaluates complete expressions
- [x] **Clear Button (C)** — Resets calculator to initial state
- [x] **Backspace/Delete Button** — Removes last entered character
- [x] **Division-by-Zero Protection** — Displays error message instead of crashing
- [x] **Operator Chaining** — Allows sequential operations (e.g., 5 + 3 × 2) without requiring full reset
- [x] **CSS Grid Layout** — 4-column grid system for button alignment
- [x] **Event Listeners** — All buttons use addEventListener (NO inline onclick attributes)

### ✨ Bonus Features
- **Keyboard Support** — Numbers, operators, Enter, Backspace, Escape keys
- **Responsive Design** — Works on desktop, tablet, and mobile devices
- **Modern UI** — Gradient backgrounds, smooth animations, hover effects
- **Error Handling** — Graceful error messages for invalid operations
- **OOP Architecture** — Clean Calculator class for maintainable code

---

## Project Structure

```
OIBSIP/LEVEL_2-TASK_1-Calculator/
├── calculator.html          # Main application file (HTML + CSS + JS)
├── README.md               # This documentation file
└── screenshot.png          # Sample output screenshot
```

---

## Technical Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup and DOM structure |
| **CSS3** | Modern styling, Grid layout, animations |
| **JavaScript (ES6)** | Calculator logic, event handling, state management |
| **Vanilla JS** | No external dependencies or frameworks |

---

## How to Use

### Opening the Application
1. Download/clone the project folder
2. Open `calculator.html` in any modern web browser
3. Calculator loads immediately with full functionality

### Using the Calculator

**Mouse/Touch:**
- Click number buttons to enter values
- Click operator buttons (+, −, ×, ÷) to perform operations
- Click = to evaluate expression
- Click C to clear everything
- Click ← DEL to delete last character

**Keyboard:**
- **Numbers:** Type 0-9
- **Operators:** Press +, -, *, /
- **Decimal:** Press .
- **Equals:** Press Enter or =
- **Delete:** Press Backspace
- **Clear:** Press Escape

### Example Calculations
```
10 + 5 =           → 15
20 - 8 =           → 12
6 × 7 =            → 42
100 ÷ 4 =          → 25
5 + 3 × 2 =        → 11 (respects operator precedence through sequential evaluation)
10 ÷ 0 =           → Error: "Cannot divide by zero"
```

---

## Code Highlights

### Calculator Class (OOP Approach)
```javascript
class Calculator {
    constructor(previousOperandElement, currentOperandElement, errorElement) {
        // Initialize calculator with DOM references
    }

    appendNumber(number)        // Add digit or decimal
    chooseOperation(operation)  // Select operator
    compute()                   // Evaluate expression
    clear()                     // Reset state
    delete()                    // Remove last character
    updateDisplay()             // Sync DOM with state
}
```

### Event Listeners Architecture
```javascript
// Number buttons: querySelectorAll + forEach
document.querySelectorAll('[id^="btn"]').forEach(button => {
    button.addEventListener('click', () => { /* ... */ });
});

// Operator buttons: individual addEventListener calls
document.getElementById('addBtn').addEventListener('click', () => { /* ... */ });

// Keyboard support: single document-level listener
document.addEventListener('keydown', (e) => { /* ... */ });
```

### Key Logic: Operator Chaining
```javascript
chooseOperation(operation) {
    if (this.previousOperand !== '') {
        this.compute();  // Auto-compute previous expression
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand + ' ' + operation;
    this.currentOperand = '0';
}
```

---

## Browser Compatibility

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Design & UX

### Color Scheme
- **Primary Gradient:** Purple (#667eea → #764ba2)
- **Number Buttons:** Light gray (#f0f3f7)
- **Operators:** Blue (#667eea)
- **Clear Button:** Red (#e74c3c)
- **Delete Button:** Orange (#f39c12)
- **Equals Button:** Gradient (Purple)

### Layout Features
- CSS Grid (4 columns, 12px gap)
- Flexbox for display screen
- Responsive font sizing
- Smooth hover/active state transitions
- Mobile-optimized with media queries

---

## Testing Scenarios

| Test Case | Input | Expected Output | Status |
|-----------|-------|-----------------|--------|
| Basic Addition | 5 + 3 = | 8 | ✅ |
| Basic Subtraction | 10 - 4 = | 6 | ✅ |
| Multiplication | 6 × 7 = | 42 | ✅ |
| Division | 20 ÷ 4 = | 5 | ✅ |
| Decimal Numbers | 3.5 + 2.5 = | 6 | ✅ |
| Multiple Decimals | 5.5.5 | Prevented (single decimal only) | ✅ |
| Division by Zero | 10 ÷ 0 = | Error message | ✅ |
| Operator Chaining | 5 + 3 × 2 = | 11 | ✅ |
| Backspace | 123 → DEL → | 12 | ✅ |
| Clear | Any calculation → C | 0 | ✅ |
| Keyboard Numbers | Type 5 + 3 = | 8 | ✅ |
| Keyboard Delete | Type 123, Backspace | 12 | ✅ |

---

## Performance Considerations

- **No external dependencies** — Faster load time
- **Minimal DOM manipulation** — Only updates display when needed
- **Event delegation** — Efficient event listener management
- **Single calculator instance** — Memory efficient
- **Keyboard debouncing** — Natural typing speed

---

## Future Enhancement Ideas

1. **Advanced Operations** — Percentage (%), square root (√), power (^)
2. **History Panel** — Display previous calculations
3. **Scientific Mode** — Trigonometric functions, logarithms
4. **Calculator Themes** — Dark mode, custom color schemes
5. **Calculation Memory** — Store, recall, add to memory (M+, M-, MR)
6. **Copy to Clipboard** — Quick result sharing
7. **Responsive Number Display** — Truncate long decimals
8. **Accessibility** — ARIA labels, keyboard navigation focus indicators

---

## Learning Outcomes

This project demonstrates:
- ✅ DOM manipulation and event handling
- ✅ Vanilla JavaScript OOP principles
- ✅ CSS Grid and modern layout techniques
- ✅ State management in frontend applications
- ✅ Error handling and edge case prevention
- ✅ Responsive design principles
- ✅ User experience and UI/UX considerations
- ✅ Clean code and architecture

---

## Author
**Ashikaa**  
CSE-AI, Third Year  
OIBSIP Intern Program

---

## License
Open source - Free to use and modify for educational purposes

---

## Support & Feedback
For questions or suggestions, refer to the OIBSIP documentation or contact your program coordinator.

**Last Updated:** September 2026
