# One Minute for Tomorrow

A minimalist, emotionally resonant web application where users have exactly 60 seconds to write a message to their future self or the world.

## Concept
- **Time Pressure**: 60 seconds to write. No edits. No second chances.
- **Honesty**: The pressure creates truth.
- **The Wall**: A collection of public messages from around the world.
- **Midnight Mode**: The UI shifts to a deeper, dimmer aesthetic between 00:00 and 05:00 local time.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Mongoose)
- **Animations**: Framer Motion

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create `.env.local` and add your MongoDB URI:
   ```bash
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/oneminute
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Deployment

This project is optimized for deployment on **Netlify** or **Vercel**.

### Netlify
1. Connect your repository.
2. Set the `MONGODB_URI` environment variable in Netlify dashboard.
3. Deploy. The Next.js plugin will handle the serverless functions for the API automatically.

## License
MIT