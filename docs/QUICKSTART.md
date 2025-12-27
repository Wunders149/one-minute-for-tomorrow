# 🚀 Quick Start Guide

## Running the Application

### Step 1: Start the Server
```bash
cd one-minute-for-tomorrow
node server.js
```

You should see:
```
Server running at http://localhost:3000/
Serving files from: C:\Users\...\one-minute-for-tomorrow
Press Ctrl+C to stop the server
```

### Step 2: Open in Browser
Navigate to: **http://localhost:3000**

## User Journey

### 1️⃣ **Main Menu** (index.html)
- See "One Minute for Tomorrow" hero screen
- Two options appear:
  - **"Start Writing"** → Begin the one-minute experience
  - **"View Wall of Tomorrow"** → See wishes from others

### 2️⃣ **Introduction Screen** (landing_screen/code.html)
- Read the motivation: "You have one minute. Say what matters."
- Click **"Begin"** to start

### 3️⃣ **Writing Screen** (writing_screen/code.html) ⏱️
- **60-second timer** counts down at the top
- Type your wish in the text area
- Watch character count (max 200)
- **"Done"** button to submit manually (or wait for timer)
- Timer auto-submits when it reaches 0

### 4️⃣ **Privacy Choice** (visibility_choice_screen/code.html)
- Choose how to share your wish:
  - **"Yes, Share It"** (gold button)
    - Wish appears on the Wall of Tomorrow
    - Others can see it
  - **"Keep It Private"** (outlined button)
    - Wish saved only for you
    - Won't appear on the wall

### 5️⃣ **Confirmation** (confirmation_screen/code.html)
- See success message: "Your words live on"
- Two options:
  - **"View Wall"** → See all shared wishes
  - **"Back to Home"** → Return to main menu

### 6️⃣ **Wall of Tomorrow** (wall_of_tomorrow/code.html)
- Beautiful masonry grid of public wishes
- See who shared what and when
- Bottom navigation:
  - 🏠 **Home** - Go to main menu
  - ✍️ **Write** - Create a new wish
  - 🗂️ **Wall** - View shared wishes (currently here)

## Features in Action

### ⏱️ The Timer
- Starts at 60 seconds
- Counts down in real-time
- Font is monospace for clear visibility
- Auto-submits when it reaches 0:00

### 📝 Text Input
- Maximum 200 characters
- Real-time character counter below
- Placeholder text guides you
- Clears after submission

### 🔒 Privacy Control
- You choose who sees each wish
- Changes apply immediately
- Saved to your browser

### 🎨 Wall Display
- Wishes shown as cards in columns
- Sorted by most recent first
- Shows timestamp ("Just now", "2m ago", etc.)
- Smooth fade-in animation

## 💾 Data Storage

All your wishes are saved in your browser's **localStorage**:
- No account needed
- No cloud sync
- Data stays on your device
- Persists across browser sessions

## 🌙 Dark Mode

The app runs in dark mode by default. The design is optimized for:
- Eyes at midnight (perfect for New Year's Eve!)
- Minimal light pollution
- Beautiful atmospheric glow effects

## ⌨️ Keyboard Shortcuts

- **ESC or Back button**: Navigate back to previous screen
- **Enter after "Done" button**: Submit wish
- **Tab**: Navigate between elements

## 🐛 Troubleshooting

### Server won't start
```bash
# Make sure you're in the right directory
cd one-minute-for-tomorrow

# Check if Node.js is installed
node --version

# Port 3000 might be in use. Check with:
# Windows: netstat -ano | findstr :3000
```

### Page not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure server is running
- Try a different browser

### Timer not working
- Open browser developer console (F12)
- Check for JavaScript errors
- Try refreshing the page

### Wishes not saving
- Check if localStorage is enabled in browser settings
- Try a different browser
- Check browser console for errors

## 📱 Mobile vs Desktop

The app works on both:
- **Desktop**: Full width, optimized columns
- **Mobile**: Single column, optimized for touch

## 🎯 Tips for the Best Experience

1. **Pick a quiet moment** - The timer creates urgency, which leads to honesty
2. **Don't overthink** - Write your first instinct
3. **Be authentic** - Wishes are most meaningful when sincere
4. **Share if comfortable** - The Wall becomes more beautiful with diverse wishes
5. **Revisit later** - Come back to the Wall to see others' hopes

## 📞 Support

If something breaks:
1. Check the browser console for errors (F12)
2. Restart the server
3. Clear browser cache
4. Try a different browser

## 🎉 You're Ready!

Start the server and begin your "One Minute for Tomorrow" experience!

```bash
node server.js
```

Then open: **http://localhost:3000**

Happy wishing! 🌟
