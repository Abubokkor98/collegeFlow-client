# CollegeFlow - College Admission Portal

## 🎓 Overview

CollegeFlow is a modern web application built with React that provides a user-friendly interface for college applications and admissions. The application allows users to explore colleges, view detailed information, apply for admissions, and manage their profiles.

**Note**: This application uses dummy/mock data for demonstration purposes. All displayed content is fictional and created for testing and showcase.

## 🚀 Features

### Core Features

- **College Search & Discovery**: Search for colleges by name with dynamic filtering
- **College Details**: Comprehensive college information including admission dates, events, research history, and sports facilities
- **Admission System**: Complete admission application process with form validation
- **User Authentication**: Email/password and Google OAuth authentication
- **Profile Management**: User profile editing and management (except email updates)
- **Review System**: Add and view college reviews with ratings
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices

### Authentication Features

- ✅ Email/Password authentication
- ✅ Google OAuth integration
- ✅ Password reset functionality
- ❌ Social media authentication (not implemented)
- ❌ Email update in profile (not implemented)

## 🛠 Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10
- **State Management**: TanStack React Query 5.81.2
- **HTTP Client**: Axios 1.10.0
- **Authentication**: Firebase 11.9.1
- **Form Handling**: React Hook Form 7.58.1
- **Routing**: React Router 7.6.2
- **UI Components**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abubokkor98/collegeFlow-client
   cd collegeFlow-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Application Flow

### Admission Process

1. **Admission Landing**: Users visit `/admission` to see available colleges (AdmissionCollegeList)
2. **College Selection**: Users select a college and navigate to `/admission/:collegeId`
3. **Application Form**: Users fill out the admission form (requires authentication)
4. **My College**: After submission, users can view their applications in `/my-college`

### Authentication Flow

- Protected routes use `PrivateRoute` component for authentication
- Users are redirected to login if not authenticated
- Successful authentication grants access to protected features

## 🔗 Routes

| Route                   | Component            | Description                                          | Auth Required |
| ----------------------- | -------------------- | ---------------------------------------------------- | ------------- |
| `/`                     | Home                 | Landing page with search, featured colleges, gallery | No            |
| `/colleges`             | Colleges             | All colleges listing                                 | No            |
| `/admission`            | AdmissionCollegeList | List of colleges available for admission             | No            |
| `/admission/:collegeId` | AdmissionForm        | College admission application form                   | Yes           |
| `/college/:id`          | CollegeDetails       | Detailed college information                         | Yes           |
| `/my-college`           | MyCollege            | User's college applications and reviews              | Yes           |
| `/profile`              | Profile              | User profile information                             | Yes           |
| `/login`                | Login                | User authentication                                  | No            |
| `/register`             | Register             | User registration                                    | No            |
| `/reset-password`       | ResetPassword        | Password reset functionality                         | No            |
| `*`                     | NotFound             | 404 error page                                       | No            |

## 🔐 Authentication

The application uses Firebase Authentication with the following providers:

### Email/Password Authentication

- User registration with email validation
- Login with email and password
- Password reset via email

### Google OAuth

- One-click Google sign-in
- Automatic user profile creation

### Authentication Flow

1. User accesses protected route
2. Redirected to login if not authenticated
3. After successful login, redirected to intended page
4. User context maintains authentication state

## 📱 Responsive Design

The application is fully responsive using Tailwind CSS, ensuring optimal user experience across all device types:

- **Mobile Phones**: Optimized touch interface and navigation
- **Tablets**: Balanced layout for medium-screen devices
- **Desktop**: Full-featured interface with enhanced layouts
- **Large Screens**: Maximized content display and spacing

## 🎯 Key Features Implementation

### Home Page Sections

1. **Navigation Bar**: Home, Colleges, Admission, My College
2. **Search Section**: College name search functionality
3. **Featured Colleges**: 3 college cards with details
4. **Image Gallery**: College graduate pictures
5. **Research Papers**: Links to research publications
6. **Reviews**: User reviews and ratings

### College Management

- View all colleges with filtering
- Detailed college information
- Admission process integration
- Sports and events information

### User Profile

- View profile information
- Edit name, university, and address
- Profile picture management
- ⚠️ **Note**: Email update not implemented

## 🐛 Known Limitations

1. **Social Media Authentication**: Only Google OAuth implemented, no Facebook/Twitter login
2. **Email Update**: Users cannot update their email address in profile settings
3. **Offline Support**: No service worker or offline functionality

## 📈 Performance Optimization

- **Code Splitting**: Implemented with React Router
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed images for faster loading
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Version**: 0.0.0  
**Last Updated**: June 2025  
**Maintained by**: Abu Bokkor Siddik
