# Honey Bloom Flower Shop - E-commerce Website
A modern, responsive flower shop website with real-time search, cart functionality, and WhatsApp ordering.

## 🌸 Live Demo
https://honeybloom.honeyblooomshop.workers.dev/

## ✨ Features

### 🛒 **E-commerce Functionality**
- **Shopping Cart System** with persistent storage using localStorage
- **Real-time Search** with product highlighting and dropdown suggestions
- **WhatsApp Integration** for seamless order placement
- **Dynamic Cart Updates** with quantity controls
- **Product Categories** for easy navigation

### 🎨 **Modern UI/UX**
- **Responsive Design** that works on all devices (desktop, tablet, mobile)
- **Smooth Animations** and transitions for enhanced user experience
- **Clean, Elegant Layout** with pink floral theme
- **Lazy Loading Images** for better performance
- **Sticky Header** with scroll effects

### 🔧 **Interactive Elements**
- **User Authentication** (Login/Signup forms)
- **Dropdown Navigation Menus**
- **Product Filtering** by category
- **Notifications System** for user feedback
- **WhatsApp Floating Button** for quick contact

### 📱 **Mobile-First Features**
- **Hamburger Menu** for mobile navigation
- **Touch-friendly** buttons and controls
- **Optimized Layout** for smaller screens
- **Cart Sidebar** with swipe-out functionality

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **LocalStorage** - Persistent cart and user data
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📁 Project Structure

```
Honeybloom/
├── index.html          # Main HTML file
├── Honeybloom.css      # Stylesheet
├── Honeybloom.js       # JavaScript functionality
├── images/             # All images (products, icons, banners)
└── README.md           # Documentation
```

## 🚀 Key Features in Detail

### 1. **Shopping Cart System**
- Add/remove products
- Quantity adjustment (+/- buttons)
- Persistent cart across sessions
- Visual cart counter
- Cart sidebar with product summary

### 2. **Order Processing**
- WhatsApp order form with customer details
- Automatic order summary generation
- Delivery fee calculation (Rs.500 fixed)
- Order history saved in localStorage
- Confirmation notifications

### 3. **Search Functionality**
- Real-time product search
- Category-based filtering
- Search result highlighting
- Dropdown suggestions
- Smooth scroll to products

### 4. **User Experience**
- Form validation
- Loading animations
- Error handling
- Responsive notifications
- Smooth scrolling navigation

## 🎯 Target Audience

- Individuals looking for unique handmade floral gifts
- People celebrating special occasions (birthdays, anniversaries, weddings)
- Those seeking custom bouquet arrangements
- Flower enthusiasts wanting artisanal creations

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full features)
- **Tablet**: 768px - 1199px (Adaptive layout)
- **Mobile**: < 768px (Mobile-optimized)
- **Small Mobile**: < 480px (Compact layout)

## 🔑 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/honeybloom.git
   ```

2. **Navigate to project directory**
   ```bash
   cd honeybloom
   ```

3. **Open in browser**
   - Double-click `index.html` or
   - Use a local server for best experience

4. **Customize for your business**
   - Update WhatsApp number in `Honeybloom.js`
   - Replace product images in `images/` folder
   - Modify prices and product details in HTML
   - Update contact information in footer

## ⚙️ Configuration

### WhatsApp Setup
Edit `Honeybloom.js` line 27:
```javascript
const WHATSAPP_NUMBER = "+94*********"; // Replace with your number
```

### Delivery Fee
Edit `Honeybloom.js` line 30:
```javascript
const DELIVERY_FEE = 500; // Set your delivery fee
```

### Product Images
Replace images in `images/` folder:
- `p1.png` to `p17.png` - Product images
- `c1.png` to `c6.png` - Category images
- `model.png` - Hero image
- `icon.png` - Logo

## 📞 Contact & Support

- **Business Contact**: WhatsApp: +94 76 669 0980
- **Social Media**: Links in footer
- **Location**: Colombo, Sri Lanka

## 🏆 Features for Future Enhancement

- [ ] Payment gateway integration
- [ ] User account dashboard
- [ ] Order tracking system
- [ ] Product reviews and ratings
- [ ] Newsletter subscription
- [ ] Advanced search filters
- [ ] Multi-language support

## 📄 License

This project is for educational and business purposes. All images and content are property of Honey Bloom Flower Shop.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from Font Awesome
- Fonts from Google Fonts
- WhatsApp Business API integration

---

**Made with ❤️ by Yashodha Sanchith**  
© Copyright 2026 - Honey Bloom Shop
