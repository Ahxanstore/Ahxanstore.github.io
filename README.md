````markdown
# 🔥 Ahxan FF Store - Free Fire ID Marketplace

A modern Glassmorphism-themed Free Fire ID marketplace built with HTML, CSS, and JavaScript. The store features a fully functional admin panel for managing IDs, complete authentication system, and beautiful neon gradient UI.

## ✨ Features

### 🏠 **Home Page**
- Modern hero section with glassmorphism design
- Feature showcase cards
- Statistics section
- Call-to-action sections
- Fully responsive layout

### 🛍️ **Store Page**
- Grid-based ID display with glass cards
- Search functionality
- Sort options (Latest, Price Low-High, Price High-Low)
- Empty state with admin-only notice
- Buy now and view details buttons

### 🔐 **Authentication System**
- **Login Page** - Email & password authentication
- **Register Page** - New user registration
- **Google Sign-In** (Ready for implementation)
- Session management via localStorage
- Profile access control

### 👤 **User Profile**
- User information display
- Order history
- Purchase tracking
- Profile management options

### 🎮 **Admin Panel**
- **Dashboard** with real-time statistics
- **ID Management** - Upload, edit, delete Free Fire IDs
- **User Management** - View and manage users
- **Order Management** - Track customer purchases
- **Settings** - Store configuration

### 📞 **Contact Page**
- Contact information display
- Contact form with validation
- FAQ section
- Social media links

## 🎨 **Design Features**

- **Glassmorphism Theme** - Frosted glass effect with blur
- **Dark Neon Gradient** - Modern dark background with cyan and purple accents
- **Responsive Design** - Works on all device sizes
- **Smooth Animations** - Floating orbs and hover effects
- **Color Scheme:**
  - Primary: `#00E5FF` (Cyan)
  - Secondary: `#8B5CF6` (Purple)
  - Accent: `#FF006E` (Pink)

## 📁 **File Structure**

```
ahxanstore.github.io/
├── index.html          # Home page
├── store.html          # Store/marketplace page
├── login.html          # Login page
├── register.html       # Registration page
├── profile.html        # User profile page
├── admin.html          # Admin dashboard
├── contact.html        # Contact page
├── style.css           # Complete styling with glassmorphism
├── script.js           # JavaScript functionality & localStorage
└── README.md           # Documentation
```

## 🚀 **Getting Started**

### Installation
1. Clone the repository
```bash
git clone https://github.com/Ahxanstore/Ahxanstore.github.io.git
cd Ahxanstore.github.io
```

2. Open in browser
- Simply open `index.html` in your web browser
- Or visit: https://ahxanstore.github.io

### Admin Access
**Demo Admin Credentials:**
- Email: `admin@ahxanstore.com`
- Password: `admin123`

**User Registration:**
- Click "Register" to create a new account
- Login with your credentials
- Browse the store (admin will add IDs)

## 💾 **Data Storage**

The app uses **localStorage** for data persistence:

- `ahxan_user` - Current logged-in user data
- `ahxan_fire_ids` - All Free Fire IDs
- `ahxan_users` - Registered users list
- `ahxan_orders` - Purchase orders
- `ahxan_admin_user` - Admin user data

**Note:** Data is stored locally in the browser and is cleared when browser cache is cleared.

## 🔧 **Features Guide**

### Adding Fire Fire IDs (Admin Only)
1. Login with admin credentials
2. Go to "Admin Panel"
3. Click "Upload New ID"
4. Fill in the form:
   - Fire ID
   - Player Name
   - Level
   - Price
   - Description
   - Image URL
5. Click "Upload ID"

### Buying Fire Fire IDs (Users)
1. Register/Login to your account
2. Go to "Store"
3. Browse available IDs
4. Click "Buy Now"
5. Confirm purchase
6. Check email for account details

### Managing Profile (Users)
1. Login to your account
2. Click "Profile" in navigation
3. View your information
4. See purchase history
5. Manage account settings

## 📱 **Responsive Breakpoints**

- **Desktop:** 1200px and above
- **Tablet:** 768px - 1199px
- **Mobile:** Below 768px
- **Small Mobile:** Below 480px

## 🎯 **Important Notes**

### Store Policy
- ✅ **Admin Only Upload:** All Free Fire IDs must be uploaded through the admin panel
- ✅ **No Pre-loaded Data:** Store starts completely empty
- ✅ **No Auto-generation:** IDs are not auto-generated
- ✅ **Manual Management:** Admins have full control over inventory

### Features Status
- ✅ Login/Register - Fully Functional
- ✅ Google Sign-In - UI Ready (Backend needed)
- ✅ Search & Filter - Fully Functional
- ✅ Admin Panel - Fully Functional
- ✅ User Profile - Fully Functional
- ✅ All Buttons - Working
- ⚠️ Payment Gateway - Ready for integration
- ⚠️ Email Notifications - Ready for integration

## 🔗 **Browser Compatibility**

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers

## 🛡️ **Security Notes**

- LocalStorage is used for demo purposes
- For production, implement backend authentication
- Use proper password hashing
- Implement SSL/TLS encryption
- Add CSRF protection
- Validate all inputs server-side

## 📝 **Future Enhancements**

- [ ] Backend integration (Node.js/Python)
- [ ] Real payment gateway (Stripe/PayPal)
- [ ] Email notifications
- [ ] User account recovery
- [ ] Advanced analytics
- [ ] Two-factor authentication
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Multiple payment methods
- [ ] Order tracking

## 🤝 **Contributing**

Feel free to fork this project and submit pull requests for any improvements.

## 📄 **License**

This project is open source and available under the MIT License.

## 👤 **Author**

**Ahxanstore**
- GitHub: [@Ahxanstore](https://github.com/Ahxanstore)

## 📧 **Support**

For issues, questions, or suggestions:
- Email: support@ahxanstore.com
- Website: https://ahxanstore.github.io

---

**Made with ❤️ using HTML, CSS & JavaScript**

*Last Updated: June 2026*
````