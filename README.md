#  Flag Explorer App

webApp that displays country flags and names using a REST API.

## Tech Used
- React (Frontend)
- Express (Backend)
- Render (Deployment)
- GitHub Actions (CI/CD)

## Structure
```
flag-explorer/
├── client/       # React app (frontend)
├── server.js     # Express app (backend)
└── .github/workflows/deploy.yml
```

## 🚀 Deployment

### Backend:
- Deployed on [Render]
- Auto-deploy via GitHub Actions

### Frontend:
- Deployed using [Vercel]
- Set `REACT_APP_API_URL` in environment variables

## CI/CD
GitHub Actions to automatically deploy  app when changes are pushed to the `main` branch.
