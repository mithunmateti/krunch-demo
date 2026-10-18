// Everything specific to the gym lives here. Edit this file to adapt the demo.
// Items marked CONFIRM are guesses that must be checked with the owner before going live.
window.GYM = {
  name: "Krunch",
  fullName: "Krunch Fitness Studio",
  area: "Saidabad",
  address: "Saroornagar, Vinay Nagar, Saidabad, Hyderabad, Telangana 500059",
  phoneDisplay: "072869 79797",
  phone: "+917286979797",
  // WhatsApp links only open a pre-filled chat; nothing is sent until someone taps Send.
  whatsapp: "917286979797",
  hours: "Open daily · till 10 PM", // CONFIRM opening time
  lat: 17.3548738,
  lng: 78.5113128,
  mapsUrl: "https://www.google.com/maps/place/Krunch+Fitness+Studio/@17.3548738,78.5113128,17z/data=!4m6!3m5!1s0x3bcb998dd33a9c97:0x303e4bf224371700!8m2!3d17.3548738!4d78.5113128!16s%2Fg%2F11n0kp428x",
  // Opens the listing's reviews. Swap for the official "Ask for reviews" link once the profile is claimed.
  reviewUrl: "https://www.google.com/maps/place/Krunch+Fitness+Studio/@17.3548738,78.5113128,17z/data=!4m8!3m7!1s0x3bcb998dd33a9c97:0x303e4bf224371700!8m2!3d17.3548738!4d78.5113128!9m1!1b1!16s%2Fg%2F11n0kp428x",
  googleRating: 4.2,
  googleReviews: 134,

  // CONFIRM all prices — these are demo numbers.
  plans: [
    { id: "monthly",   name: "Monthly",     months: 1,  price: 1500, perks: ["Full gym floor", "Cardio + strength", "Starter workout plan"] },
    { id: "quarterly", name: "Quarterly",   months: 3,  price: 4000, perks: ["Everything in Monthly", "Body composition check", "Save ₹500"], featured: true },
    { id: "yearly",    name: "Yearly",      months: 12, price: 13000, perks: ["Everything in Quarterly", "2 free PT sessions", "Save ₹5,000"] },
    { id: "pt",        name: "Personal Training", months: 1, price: 5000, perks: ["1-on-1 coach", "Diet plan", "Form correction every set"], note: "/ month" }
  ],

  // Names taken from member reviews. CONFIRM who still works here, their roles and photos.
  trainers: [
    { name: "Prabhu",      role: "Strength & transformation", note: "Training + diet + motivation" },
    { name: "Syed Sohail", role: "Personal training",         note: "Custom routines, form-first" },
    { name: "Saba",        role: "Women's fitness",           note: "Health goals without supplements" },
    { name: "Jiya",        role: "Weight loss",               note: "Fat-loss programmes" },
    { name: "Junaid",      role: "Strength coach",            note: "Pushes you past your limits" },
    { name: "Sarfaraz",    role: "Strength coach",            note: "Floor coaching" }
  ],

  // Google's own review topic counts for this listing (as of Oct 2026).
  reviewThemes: [
    { label: "Cleanliness",       count: 12 },
    { label: "Trainers",          count: 9 },
    { label: "Maintenance",       count: 9 },
    { label: "Personal trainer",  count: 6 },
    { label: "Friendly staff",    count: 5 }
  ]
};
