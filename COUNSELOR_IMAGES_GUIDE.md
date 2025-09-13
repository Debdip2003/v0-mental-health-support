# Counselor Images Guide

## Current Setup

Each counselor now has a unique image assigned in the `appointment-booking.tsx` file. Currently using placeholder images that need to be replaced with proper single person headshots.

## Recommended Image Sources

For professional single person headshots, consider these free resources:

1. **Pexels** (https://www.pexels.com/search/professional%20headshot/)

   - High-quality, free professional headshots
   - Search terms: "professional headshot", "business portrait", "counselor"

2. **Unsplash** (https://unsplash.com/s/photos/professional-headshot)

   - Free professional images
   - Search terms: "professional headshot", "business person", "therapist"

3. **Pixabay** (https://pixabay.com/images/search/professional%20headshot/)
   - Free stock photos
   - Search terms: "professional headshot", "business portrait"

## Image Requirements

- **Size**: 200x200px minimum (will be displayed as 80x80px circles)
- **Format**: JPG or PNG
- **Style**: Professional headshot, single person, well-lit
- **Diversity**: Try to get images representing different people for each counselor

## How to Add New Images

1. Download 5 different professional headshot images
2. Save them in the `public` folder with descriptive names:

   - `dr-debangshi-roy.jpg`
   - `dr-debdip-bhattacharya.jpg`
   - `dr-soumalya-bakshi.jpg`
   - `dr-ayush-saha-roy.jpg`
   - `dr-sahil-kumar-singh.jpg`

3. Update the image paths in `appointment-booking.tsx`:

```typescript
const counselors: Counselor[] = [
  {
    // ... other properties
    image: "/dr-debangshi-roy.jpg",
  },
  {
    // ... other properties
    image: "/dr-debdip-bhattacharya.jpg",
  },
  // ... continue for all counselors
];
```

## Current Image Assignments

- Dr. Debangshi Roy: `/professional-counsellor-headshot-.jpg`
- Dr. Debdip Bhattacharya: `/placeholder-user.jpg`
- Dr. Soumalya Bakshi: `/placeholder.jpg`
- Dr. Ayush Saha Roy: `/professional-counsellor-headshot-.jpg`
- Dr. Sahil Kumar Singh: `/placeholder-user.jpg`

## Tips for Image Selection

- Choose images that look professional and trustworthy
- Ensure good lighting and clear visibility of the person's face
- Avoid images with distracting backgrounds
- Consider diversity in age, gender, and ethnicity
- Make sure the person looks approachable and friendly
