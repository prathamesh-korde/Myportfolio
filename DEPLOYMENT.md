# Vercel Deployment Guide

## Deploy Backend (API)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to server directory:
   ```bash
   cd server
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: portfolio-api (or your choice)
   - Directory: ./
   - Override settings: No

5. Set environment variables on Vercel:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add these variables:
     - `MONGO_URI`: Your MongoDB connection string (use MongoDB Atlas for production)
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password
     - `NOTIFICATION_EMAIL`: mr.kordeprathamesh01@gmail.com

6. Redeploy after adding environment variables:
   ```bash
   vercel --prod
   ```

7. Note your API URL (e.g., https://portfolio-api.vercel.app)

## Deploy Frontend

1. Update API URL in client code:
   - Open `client/src/pages/Projects.jsx`
   - Change `http://localhost:5000/api/projects` to `https://your-api-url.vercel.app/api/projects`
   - Open `client/src/pages/Contact.jsx`
   - Change `http://localhost:5000/api/contact` to `https://your-api-url.vercel.app/api/contact`

2. Navigate to client directory:
   ```bash
   cd ../client
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: portfolio (or your choice)
   - Directory: ./
   - Override settings: No

5. Deploy to production:
   ```bash
   vercel --prod
   ```

6. Your portfolio will be live at the provided URL!

## MongoDB Atlas Setup (Required for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Go to Database Access → Add New Database User
5. Go to Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Go to Database → Connect → Connect your application
7. Copy the connection string and replace `<password>` with your database user password
8. Use this connection string as `MONGO_URI` in Vercel environment variables

## Alternative: Deploy as Monorepo

If you want to deploy both frontend and backend together:

1. Create a `vercel.json` in the root directory
2. Use Vercel's monorepo support
3. Set up build commands for both client and server

## Quick Deploy (One Command)

From the root directory:
```bash
# Deploy backend
cd server && vercel --prod

# Deploy frontend
cd ../client && vercel --prod
```

## Notes

- Backend will be deployed as serverless functions
- Make sure to seed your MongoDB Atlas database with projects
- Update CORS settings in server to allow your frontend domain
- Consider using environment variables for API URL in frontend
