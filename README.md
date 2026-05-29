# KurdFlight

KurdFlight is a beginner-friendly flight booking project with a Django REST API
backend and a React frontend.

Users can register, log in, browse flights, view flight details, book seats, see
their own bookings, and log out. Authentication uses JWT access and refresh
tokens.

## Tech Stack

- Backend: Django, Django REST Framework
- Authentication: Simple JWT
- Database: PostgreSQL
- Frontend: React with Vite
- Styling: Plain CSS

## Project Structure

```text
.
├── config/          Django project settings and main URLs
├── flights/         Django app for airports, flights, bookings, auth views
├── frontend/        React frontend
├── manage.py
└── README.md
```

Important frontend folders:

```text
frontend/src/
├── api/             API helpers and backend base URL
├── components/      Shared UI components
├── context/         Simple auth state and token storage
├── pages/           Main app pages
└── utils/           Formatting helpers
```

## API Endpoints

The backend provides these endpoints:

```text
GET    /flights/
GET    /flights/<id>/
POST   /auth/register/
POST   /auth/login/
GET    /my-bookings/
POST   /bookings/
POST   /auth/logout/
```

Protected endpoints require:

```text
Authorization: Bearer <access_token>
```

Logout also sends the refresh token in the request body:

```json
{
  "refresh": "your_refresh_token"
}
```

## Backend Setup

From the project root:

```bash
source .venv/bin/activate
pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary
python manage.py migrate
python manage.py runserver
```

The backend runs at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://127.0.0.1:5173/
```

## Backend API URL

The frontend API base URL is configured in:

```text
frontend/src/api/config.js
```

Default value:

```text
http://127.0.0.1:8000/
```

You can also create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/
```

Restart `npm run dev` after changing `.env`.

## CORS

The Django backend allows the local Vite frontend origins in `config/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]
```

If the frontend shows a request error, make sure both servers are running and
restart the Django server after settings changes.

## Seeded Flight Data

The database has example airports and flights such as:

- EBL to BGW
- EBL to IST
- ISU to DXB
- BGW to EBL
- NJF to IST
- EBL to DXB

You can manage airports, flights, and bookings in Django admin.

## Useful Commands

Run backend:

```bash
python manage.py runserver
```

Run frontend:

```bash
cd frontend
npm run dev
```

Build frontend:

```bash
cd frontend
npm run build
```

Lint frontend:

```bash
cd frontend
npm run lint
```

Create Django admin user:

```bash
python manage.py createsuperuser
```

## Notes

- The frontend stores JWT tokens in `localStorage`.
- Flight booking reduces the available seats on the selected flight.
- My Bookings only shows bookings for the logged-in user.
- The frontend is intentionally simple and beginner-friendly, without advanced
  state management libraries.
