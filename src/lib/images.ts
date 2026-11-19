/**
 * Photography. All images are from Unsplash (free under the Unsplash License:
 * commercial use allowed, attribution appreciated but not required). Files
 * live in /public/images and are optimised by next/image (AVIF/WebP).
 */
export type Photo = { src: string; alt: string; credit: string; url: string };

export const PHOTOS = {
  heroWash: {
    src: "/images/hero-wash.jpg",
    alt: "A washer sprays a foam-covered black SUV with a pressure lance inside a misty wash bay",
    credit: "Avenir Visuals",
    url: "https://unsplash.com/photos/person-washing-a-black-car-with-soap-and-water-9U-_m0dfNuw",
  },
  signIn: {
    src: "/images/auth-signin.jpg",
    alt: "Black sports car being sprayed with foam in a dark garage",
    credit: "Andre Tan",
    url: "https://unsplash.com/photos/sports-car-washing-in-garage-pRppMPh4Zho",
  },
  signUp: {
    src: "/images/auth-signup.jpg",
    alt: "Front of a dark SUV covered in snow foam at a professional wash",
    credit: "mintosko",
    url: "https://unsplash.com/photos/grey-car-in-soap-suds-V4b2j7f1dfc",
  },
  verify: {
    src: "/images/auth-verify.jpg",
    alt: "Close-up of soap suds running down a black car bonnet",
    credit: "Willian Cittadin",
    url: "https://unsplash.com/photos/black-car-covered-in-soap-suds-during-wash-bCQSrcYghJI",
  },
  success: {
    src: "/images/auth-success.jpg",
    alt: "Clean black sedan in profile, rim-lit in a dark studio",
    credit: "Samuele Errico Piccarini",
    url: "https://unsplash.com/photos/black-sedan-FMbWFDiVRPs",
  },
  vehicle: {
    src: "/images/vehicle-profile.jpg",
    alt: "Black car parked under strip lights in a garage",
    credit: "Ville Kaisla",
    url: "https://unsplash.com/photos/parked-black-car-HNCSCpWrVJA",
  },
  ctaFoam: {
    src: "/images/cta-foam.jpg",
    alt: "Two cars covered in foam outside a detailing studio",
    credit: "Willian Cittadin",
    url: "https://unsplash.com/photos/two-cars-being-washed-with-foam-DtrI63-Z46I",
  },
} satisfies Record<string, Photo>;
