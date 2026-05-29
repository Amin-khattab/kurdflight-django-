# KurdFlight Frontend

React frontend for the Django KurdFlight booking API.

## Run Locally

Make sure the Django backend is running first:

```bash
python manage.py runserver
```

Then start the React app:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Backend API URL

The frontend reads the API base URL from:

```text
frontend/src/api/config.js
```

By default it uses:

```text
http://127.0.0.1:8000/
```

You can also create a `.env` file in `frontend/`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/
```

Restart `npm run dev` after changing environment variables.

## CORS Note

During local development, React runs on `http://localhost:5173` and Django runs
on `http://127.0.0.1:8000`. If the browser blocks requests, enable CORS in
Django with `django-cors-headers` and allow the Vite origin:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

Also add `corsheaders` to `INSTALLED_APPS` and
`corsheaders.middleware.CorsMiddleware` near the top of `MIDDLEWARE`.

## Folder Structure

```text
src/
  api/          API base URL, auth calls, flight and booking calls
  components/   Shared layout, route protection, cards, messages
  context/      Simple auth state with localStorage tokens
  pages/        Home, flight details, login, register, my bookings
  utils/        Small formatting helpers
```
