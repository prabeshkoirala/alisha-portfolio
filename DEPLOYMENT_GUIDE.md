# Deployment & Update Guide

## How Vercel Deployment Works
Vercel is likely connected to your GitHub repository (`alisha-portfolio`). This means it has a **Continuous Deployment (CD)** pipeline set up.

**The Workflow:**
1.  **You make changes** locally on your computer.
2.  **You push those changes** to GitHub (`git push`).
3.  **Vercel detects the new commit** on GitHub automatically.
4.  **Vercel builds and deploys** the new version of your site instantly.

You **do not** need to do anything on Vercel's dashboard manually. As soon as the code is on GitHub, Vercel takes over.

---

## How to Update Your Site
Whenever you (or I) make changes to the code, follow these steps to update the live website:

### 1. Save & Test Locally
Ensure your changes are working in your local development server (`npm run dev`).

### 2. Commit and Push to GitHub
Run the following commands in your terminal:

```bash
# 1. Stage all changes
git add .

# 2. Commit changes with a message describing what you did
git commit -m "Description of changes"

# 3. Push to GitHub
git push origin main
```

### 3. Verify Deployment
*   Go to your **Vercel Dashboard**.
*   You will see a "Building" status for the latest commit.
*   Once it turns **Green (Ready)**, your live link is updated.

## Troubleshooting
*   **Image not showing?** Vercel caches images aggressively. If you update an image but keep the same filename, you might not see the change immediately.
    *   *Fix:* Redeploy or rename the file (e.g., `portrait-v2.jpg`).
*   **Build Error?** If Vercel shows a red error, check the "Logs" tab in Vercel. It usually means there's a coding error that didn't stop `npm run dev` but failed the stricter `npm run build` process.
