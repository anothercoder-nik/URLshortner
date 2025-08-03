# Guest Mode Feature

## Overview
The Guest Mode feature allows users to use the URL shortener application without creating an account or storing any credentials. Users can easily sign in as a guest and access the core functionality of the application.

## Features

### Guest Login
- **No Registration Required**: Users can access the application immediately without creating an account
- **No Credentials Stored**: Guest users don't need to provide email or password
- **Temporary Session**: Guest sessions are temporary and will expire when the user logs out or closes the browser
- **Unique Guest ID**: Each guest user gets a unique identifier for their session

### User Experience
- **Easy Access**: "Continue as Guest" button prominently displayed on the login form
- **Clear Indicators**: Guest mode is clearly indicated throughout the application
- **Warning Messages**: Users are informed that their data is temporary
- **Seamless Transition**: Guest users can still use all core features

### Visual Indicators
- **Guest Badge**: Yellow "Guest" badge displayed in the navbar
- **Dashboard Notice**: Warning message on dashboard explaining guest mode limitations
- **Modified Labels**: "Recent URLs" instead of "Manage URLs" for guest users
- **Exit Button**: "Exit Guest Mode" button instead of "Logout" for guest users

## Technical Implementation

### Backend Changes
1. **Guest Login Service** (`auth.service.js`)
   - Generates unique guest IDs
   - Creates temporary guest user objects
   - Issues guest-specific JWT tokens

2. **Guest Login Controller** (`auth.controller.js`)
   - Handles guest login requests
   - Sets guest-specific cookies
   - Returns guest user data

3. **Auth Middleware** (`auth.middleware.js`)
   - Detects guest tokens
   - Creates temporary guest user objects
   - Handles both regular and guest authentication

4. **API Routes** (`auth.router.js`)
   - Added `/guest-login` endpoint
   - Handles guest authentication requests

### Frontend Changes
1. **Login Form** (`LoginForm.jsx`)
   - Added "Continue as Guest" button
   - Separate loading state for guest login
   - Error handling for guest login

2. **Auth Slice** (`authslice.js`)
   - Added `isGuest` state
   - `guestLogin` action for guest authentication
   - Proper state management for guest users

3. **Navbar** (`Navbar.jsx`)
   - Guest badge display
   - Modified logout button text for guests
   - Guest status indicators

4. **Dashboard** (`DashboardPage.jsx`)
   - Guest mode warning notice
   - Modified descriptions for guest users
   - Clear messaging about temporary data

## Security Considerations
- Guest tokens have the same expiration time as regular tokens (1 hour)
- Guest users are clearly identified in the system
- No permanent data storage for guest users
- Guest sessions are properly cleaned up on logout

## Usage
1. Navigate to the login page
2. Click "Continue as Guest" button
3. Access the dashboard with guest privileges
4. Create and manage URLs (temporarily)
5. Exit guest mode when done

## Benefits
- **Lower Barrier to Entry**: Users can try the application without commitment
- **Quick Access**: No registration process required
- **Full Functionality**: All core features available to guest users
- **Clear Expectations**: Users understand the temporary nature of guest mode 