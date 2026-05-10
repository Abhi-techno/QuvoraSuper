# **App Name**: Quvora Marketplace

## Core Features:

- User Onboarding & Authentication: Enable new users to sign up, log in with OTP or social accounts, and experience initial language selection and guided onboarding slides.
- Product Discovery: Browse and search for listings across various categories with intelligent AI-powered suggestions, live search results, and comprehensive filtering options.
- Listing Details & Interaction: View comprehensive product details, high-quality images, seller information, and utilize direct contact options such as chat and calls.
- Create Listing Wizard: A multi-step, intuitive wizard for posting new product listings, including image upload, title and description input, and AI price suggester tool.
- Direct Messaging & Offer System: Facilitate real-time, in-app text messaging between users and a structured offer negotiation flow, enhanced with AI-powered safety features.
- User Dashboard & Saved Items: A personal command center to manage active, pending, expired, and drafted listings, track performance, and organize saved/wishlist items.
- Personalized Recommendations: Receive AI-curated product recommendations on the home screen and throughout the app, tailored to user activity, location, and expressed interests.

## Style Guidelines:

- Primary: A vibrant digital blue (#1A6AFF) for calls to action and active states. Accent: An energetic orange (#FF6B2B) for badges, highlights, and the prominent 'Post Ad' button.
- Backgrounds: Utilise the 'iOS Liquid Glass' aesthetic with transparent, frosted surfaces featuring a `backdrop-filter: blur(24px) saturate(180%)` over white/ice-blue for light mode, and deep navy for dark mode.
- Headline font: 'SF Pro Display' (sans-serif) for screen and section titles. Body text font: 'SF Pro Text' (sans-serif) for all primary reading text. Note: currently only Google Fonts are supported.
- Employ 'SF Symbols 6' for iOS and 'Material Symbols Rounded' for Android/Web, leveraging variable weights. Active icons should be filled, inactive icons outlined, all with a minimum 24px tap target.
- Implement a depth-rich, layered interface with glass-morphic cards, sheets, and navigation. A persistent bottom navigation bar with 5 tabs and a central floating action button for posting ads are key.
- Support adaptive theming with distinct Light and Dark modes, enabling system-auto switching and user overrides, ensuring accessibility with a high contrast mode option.
- Incorporate spring physics for fluid panel transitions and micro-interactions (stiffness 280, damping 22). Utilise shared-element hero animations for listing cards and shimmer-effect skeleton loaders.