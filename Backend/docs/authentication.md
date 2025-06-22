# The JWT authentication process includes:

User login
JWT token generation
Client-side token storage
Client sending the token in requests
Server verifying the token and user

🧾 Step-by-Step Authentication Flow
## 1. User Login Request
The client sends a POST request to the /login endpoint with credentials:

```js
POST /login
Content-Type: application/json

{
  "email": "santu@example.com",
  "password": "mypassword123"
}
```
## 2. Backend Verifies Credentials

The server finds the user by email in the database.
It compares the provided password with the stored hash using bcrypt.compare().
If valid, it generates a JWT:
```js
jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
```
## 3. JWT Token Response
The server responds with:
```js
{
  "success": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
``` 
## 4. Client Stores Token
The client stores the token in:

Local Storage
Session Storage
In-memory (e.g., Redux, Context)
Secure HTTP-only cookie (recommended for security)

## 5. Sending Authenticated Request
The client includes the token in the Authorization header for protected routes:
```js 
GET /dashboard
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
## 6. Backend Middleware: Token Extraction
The authMiddleware checks the Authorization header:

Verifies it starts with "Bearer ".
Extracts the token:
```js 
const token = authHeader.split(" ")[1];
```
## 7. Token Verification
The middleware uses jwt.verify(token, JWT_SECRET) to:

Validate the token signature.
Decode the payload:
```js
{
  id: "660f1f45b8a1c4e3e943334d",
  iat: 1718288000,
  exp: 1718291600
}
```
## 8. User Lookup
The server queries the database to fetch the user:
const user = await User.findById(payload.id).select("-password");

If found, the user is attached to req.user.
## 9. Continue to Protected Route
The middleware calls next() to pass control to the route handler. The protected route can access user data:
req.user.name
req.user.email

## Example: Protected Route Behavior
Request:
```js
GET /dashboard
Authorization: Bearer <valid JWT>

Response:
{
  "message": "Welcome Santu Pramanik!"
}

```