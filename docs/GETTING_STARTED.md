# 📖 Getting Started Guide

## 🎯 What is "One Minute for Tomorrow"?

A beautiful, interactive web application where you write your wish for tomorrow in just 60 seconds, choose whether to share it publicly, and then view wishes from others on a beautiful gallery wall.

---

## ⚡ Quick Setup (30 seconds)

### Step 1: Open Terminal
Navigate to the project folder:
```bash
cd "c:\Users\rakot\OneDrive\Bureau\STEM\Philibert\NewYearsEve\one-minute-for-tomorrow"
```

### Step 2: Start Server
```bash
node server.js
```

You'll see:
```
Server running at http://localhost:3000/
```

### Step 3: Open Browser
Go to: **http://localhost:3000**

✅ **You're in!**

---

## 🗺️ What You'll See

### Screen 1: Main Menu 🏠
```
╔════════════════════════════╗
║                            ║
║   One Minute for Tomorrow  ║
║                            ║
║  [Start Writing]           ║
║  [View Wall of Tomorrow]   ║
║                            ║
╚════════════════════════════╝
```

### Screen 2: Introduction 📖
```
╔════════════════════════════╗
║                            ║
║  You have one minute.      ║
║  Say what matters.         ║
║                            ║
║        [Begin]             ║
║                            ║
╚════════════════════════════╝
```

### Screen 3: Writing Experience ✍️
```
╔════════════════════════════╗
║      00:45                 ║
║                            ║
║  [Text Input Area]         ║
║  [Typed text appears here] ║
║                            ║
║              [Done] 23/200  ║
╚════════════════════════════╝
```

### Screen 4: Privacy Choice 🔐
```
╔════════════════════════════╗
║                            ║
║   Share your wish?         ║
║                            ║
║  [Yes, Share It] (gold)    ║
║  [Keep It Private] (gray)  ║
║                            ║
╚════════════════════════════╝
```

### Screen 5: Success 🎉
```
╔════════════════════════════╗
║                            ║
║   Your words live on.      ║
║                            ║
║  [View Wall]               ║
║  [Back to Home]            ║
║                            ║
╚════════════════════════════╝
```

### Screen 6: The Wall 🗂️
```
╔════════════════════════════╗
║  Wall of Tomorrow          ║
├────────────────────────────┤
║ ┌────────┐ ┌────────────┐  ║
║ │ Wish 1 │ │ Wish 2     │  ║
║ │ ..text │ │ ..longer   │  ║
║ │2m ago  │ │ text ...   │  ║
║ └────────┘ │Just now    │  ║
║ ┌────────────────────────┐  ║
║ │ Wish 3                 │  ║
║ │ ..text.. Wish text     │  ║
║ │5m ago                  │  ║
║ └────────────────────────┘  ║
├────────────────────────────┤
║[Home] [Write] [Wall]        ║
╚════════════════════════════╝
```

---

## 🎮 Interaction Guide

### Writing Screen Timer
```
When you click "Begin":
- Timer starts at 60 seconds
- Counts down: 59, 58, 57... 3, 2, 1, 0
- Type your wish as you go
- Timer auto-submits when reaches 0:00
- Or click "Done" anytime to submit early
```

### Character Counter
```
As you type:
- Count shows: 0/200
- Updates in real-time
- Max 200 characters
- Won't let you type more
```

### Sharing Choice
```
You must choose:

YES, SHARE IT
├─ Your wish goes on Wall
├─ Others can see it
└─ You get credit (anonymous)

KEEP IT PRIVATE
├─ Only you see it
├─ Won't appear on Wall
└─ Stored locally only
```

### Wall Gallery
```
Wishes appear as cards:
- Most recent at top
- Oldest at bottom
- Sorted by timestamp
- Shows "Just now", "2m ago", etc.
- Animated entrance
```

---

## 💾 Where Is My Data Stored?

**Everything stays in your browser:**
- ✅ No account needed
- ✅ No passwords
- ✅ No cloud storage
- ✅ No company sees it
- ✅ Data persists until you clear browser data

**To find your wishes:**
1. Open Browser DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Find "one-minute-for-tomorrow"
5. See all your wishes in JSON format

---

## ❓ Common Questions

### Q: What if I close the browser?
**A:** Your wishes are saved! They'll still be there when you come back.

### Q: Can anyone see my wishes?
**A:** Only if you choose "Yes, Share It". Private wishes are only for you.

### Q: What if the timer runs out?
**A:** Your wish auto-submits automatically. You don't lose anything!

### Q: Can I edit my wish?
**A:** Not currently, but you can write new ones anytime.

### Q: Are wishes really anonymous?
**A:** Yes! No names, usernames, or personal info is collected.

### Q: Can I delete a wish?
**A:** Not in the UI currently, but you can do it in DevTools if needed.

### Q: What happens to my wishes?
**A:** They stay in your browser until you clear browser data.

### Q: Can I export my wishes?
**A:** You can copy from DevTools, but there's no export button yet.

---

## 🎯 Tips for the Best Experience

### 1. Find a Quiet Moment
- Turn off distractions
- Find a comfortable place
- Take a few deep breaths

### 2. Write Your First Instinct
- Don't overthink it
- The timer creates urgency
- Urgency leads to honesty

### 3. Be Authentic
- Most meaningful wishes are sincere
- Share real hopes, not polished ones
- Your truth matters

### 4. Share Thoughtfully
- Consider sharing if comfortable
- The Wall is more beautiful with diversity
- Privacy is always an option

### 5. Browse Others' Wishes
- Read for inspiration
- See what others hope for
- Feel connected to strangers

---

## 🚨 Troubleshooting

### Problem: "Can't connect to localhost:3000"

**Solution:**
1. Check server is running (terminal shows message)
2. Try a different port (modify server.js PORT)
3. Restart the server
4. Check firewall isn't blocking it

### Problem: "Page looks broken"

**Solution:**
1. Wait 2 seconds for CSS to load
2. Press F5 to refresh
3. Press Ctrl+Shift+Delete to clear cache
4. Try a different browser

### Problem: "Timer doesn't work"

**Solution:**
1. Open DevTools (F12)
2. Check Console for errors (red text)
3. Refresh the page
4. Try a different browser

### Problem: "Wishes aren't saving"

**Solution:**
1. Check if JavaScript is enabled
2. Check if localStorage is enabled
3. Check browser storage isn't full
4. Try a private/incognito window

### Problem: "Can't see other wishes on Wall"

**Solution:**
1. Write and share a wish first
2. Only shared wishes appear
3. Refresh the wall page
4. Check localStorage in DevTools

---

## 📱 Mobile vs Desktop

### Works on Both!

**Desktop Experience:**
- Full-width interface
- Large readable text
- Comfortable typing
- Masonry grid with 3 columns

**Mobile Experience:**
- Optimized for touch
- Finger-sized buttons
- Single column for wishes
- Portrait orientation

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Escape | Go back |
| Tab | Navigate elements |
| Enter | Submit (varies) |
| Ctrl+Shift+Delete | Clear cache |
| F12 | Open DevTools |

---

## 🔄 Workflow

### First Time Users
```
1. Click "Start Writing"
2. Read the introduction
3. Click "Begin"
4. Type your wish (60 seconds)
5. Choose to share or keep private
6. See confirmation
7. View the Wall
```

### Returning Users
```
1. Start Writing again (write new wish)
2. Or View Wall to see others' wishes
3. Your previous wishes are still in localStorage
```

---

## 🎉 You're All Set!

Now you're ready to:
1. Start the server
2. Open the app
3. Write your wish
4. Share with the world (or keep it private)
5. See what others hope for

**Let's begin!** 🌟

```bash
node server.js
```

Then go to: **http://localhost:3000**

---

## 📚 Need More Help?

- **Quick questions?** → Check QUICKSTART.md
- **Full documentation?** → Read README.md
- **Technical details?** → See ARCHITECTURE.md
- **What was built?** → Check BUILD_SUMMARY.md

---

## 🌟 Enjoy the Experience!

This is your moment to reflect on tomorrow's hopes and dreams. Whether you share or keep it private, your wish matters.

**Happy wishing!** ✨

---

*One Minute for Tomorrow*
*A moment for reflection.*
