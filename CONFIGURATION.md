# Configuration Guide

## Business Information Configuration

This website allows you to easily update your business information and map location through configuration files.

### Method 1: Environment Variables (Recommended)

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Business Information
NEXT_PUBLIC_BUSINESS_NAME=Your Photography Business Name
NEXT_PUBLIC_BUSINESS_ADDRESS=Your Full Address Here
NEXT_PUBLIC_BUSINESS_CITY=Your City
NEXT_PUBLIC_BUSINESS_STATE=Your State/Province
NEXT_PUBLIC_BUSINESS_POSTAL_CODE=Your Postal Code
NEXT_PUBLIC_BUSINESS_COUNTRY=Your Country
NEXT_PUBLIC_BUSINESS_EMAIL=your-email@domain.com
NEXT_PUBLIC_BUSINESS_PHONE=+1 234 567 8900

# Map Configuration
NEXT_PUBLIC_MAP_ZOOM=15
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key (optional)
```

### Method 2: Direct Configuration File

Alternatively, you can directly edit the configuration file at `src/config/business.ts`:

```typescript
export const businessConfig = {
  name: 'Your Photography Business Name',
  address: 'Your Full Address Here',
  city: 'Your City',
  state: 'Your State/Province',
  postalCode: 'Your Postal Code',
  country: 'Your Country',
  email: 'your-email@domain.com',
  phone: '+1 234 567 8900',
  mapZoom: 15,
}
```

## Map Configuration

### Option 1: Google Maps API (Recommended)
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the "Maps Embed API"
3. Add your API key to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. The map will automatically update when you change the address

### Option 2: Fallback Map
If no API key is provided, the system will use a fallback map URL. You can update this in `src/config/business.ts` by modifying the `getFallbackMapUrl` function.

## What Updates Automatically

When you change the address configuration, the following will update automatically:

✅ **Contact Page Map** - Shows the new location pin
✅ **Contact Information** - Displays the new address, email, and phone
✅ **Contact Form** - References the new city in the description
✅ **mailto and tel links** - Updated with new contact information

## Example Configuration

```env
# Example for a New York photography business
NEXT_PUBLIC_BUSINESS_NAME=John Doe Photography
NEXT_PUBLIC_BUSINESS_ADDRESS=123 Fifth Avenue, New York, NY 10003, USA
NEXT_PUBLIC_BUSINESS_CITY=New York
NEXT_PUBLIC_BUSINESS_STATE=NY
NEXT_PUBLIC_BUSINESS_POSTAL_CODE=10003
NEXT_PUBLIC_BUSINESS_COUNTRY=USA
NEXT_PUBLIC_BUSINESS_EMAIL=john@johndoephotography.com
NEXT_PUBLIC_BUSINESS_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_MAP_ZOOM=15
```

## Important Notes

- After making changes, restart your development server (`npm run dev`)
- Environment variables starting with `NEXT_PUBLIC_` are safe to use in client-side code
- The Google Maps API key is optional but recommended for better map functionality
- Make sure your `.env.local` file is in your `.gitignore` to keep sensitive information secure

## Need Help?

If you need assistance with configuration, please refer to the Next.js documentation on [environment variables](https://nextjs.org/docs/basic-features/environment-variables). 