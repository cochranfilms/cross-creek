# 🚀 Vercel Deployment Guide

## **Secure GitHub Upload Setup**

Your contract system now uses secure Vercel API endpoints instead of browser-based GitHub calls!

## **What This Fixes:**

- ✅ **No more CORS errors** - Server-side API calls
- ✅ **Secure token storage** - GitHub token in environment variables
- ✅ **Professional deployment** - Vercel handles hosting and scaling
- ✅ **Rate limit handling** - Proper GitHub API usage

## **Deployment Steps:**

### **1. Install Vercel CLI**
```bash
npm install -g vercel
```

### **2. Login to Vercel**
```bash
vercel login
```

### **3. Deploy Your Project**
```bash
vercel --prod
```

### **4. Set Environment Variables**
In your Vercel dashboard:
1. Go to your project settings
2. Add environment variable: `GITHUB_TOKEN`
3. Value: Your GitHub Personal Access Token

## **Environment Variables Needed:**

```
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=cochranfilms
GITHUB_REPO=cross-creek
```

## **How It Works Now:**

1. **Client signs contract** → PDF generated
2. **PDF sent to Vercel API** → `/api/upload-contract`
3. **Vercel API uploads to GitHub** → Using secure token
4. **Download link returned** → Admin email gets working link
5. **Contract stored in GitHub** → `/contracts/` directory

## **Security Benefits:**

- 🔒 **GitHub token never exposed** in browser code
- 🔒 **Server-side validation** of all uploads
- 🔒 **Rate limiting** handled properly
- 🔒 **Error handling** with proper HTTP status codes

## **Test Deployment:**

1. Deploy to Vercel
2. Set environment variables
3. Sign a contract
4. Watch it upload automatically! 🎉

---

**Need Help?** Check Vercel logs in your dashboard for any API errors.
