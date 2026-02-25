# Indiascope React Implementation Guide (Hinglish)

Bhai, maine aapki website ko React mein convert kar diya hai. Design bilkul same hai, bas ab ye "Modern" tarike se chalegi. 

## Kaha par kya banaya hai?

### 1. Project Structure
- **`public/` folder**: Isme aapke `PHOTOS` aur `fonts` ko shift kar diya hai. React mein static assets yahi par rakhe jaate hain.
- **`src/components/`**: Yaha par do main components hain:
    - `Home.jsx`: Isme aapka starting intro animation (tuti effect) aur dashboard grid hai.
    - `Category.jsx`: Isme details waala page hai jo "History", "Food", etc. ke liye badalta hai.
- **`App.jsx`**: Ye aapka main controller hai jo decide karta hai ki kab Home dikhana hai aur kab Category.

### 2. Kaise banaya hai? (Logic)

#### Intro Animation (Tuti Effect)
Pehle aap `script.js` mein DOM manipulation use kar rahe the. React mein humne `useState` use kiya hai:
- `currentIndex`: Kaunsi photo dikh rahi hai.
- `stripTransforms`: Saari strips ko ek saath flip karne ke liye CSS `transform` handle karta hai.
- `setTimeout`: Fast flipping transitions ke liye.

#### Category Switching
Pehle `window.location.href` se page change hota tha. Ab humne `react-router-dom` use kiya hai:
- `/`: Home page ke liye.
- `/category?type=history`: Category page ke liye.
- `useLocation` hook se hum URL se category ka naam nikalte hain aur `categoryData` se uska content load karte hain.

#### Styling
Har component ki apni CSS file hai (`Home.css`, `Category.css`). Isse code handle karna aasan ho jaata hai.

## Ab kaise chalana hai?

1. Terminal kholiye.
2. Type kijiye: `npm run dev`
3. Jo link aayega (usually `http://localhost:5173`) usse browser mein open kijiye.

### Important Note:
Maine aapki original files (`index.html`, `script.js`, etc.) ko delete nahi kiya hai (unhe `legacy_files` folder mein daal diya hai) taaki aapka original content safe rahe.

Enjoy your React version! 🚀
