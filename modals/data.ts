export const categoriesObject = {
  competitive_exams: "Competitive Exams Preparation",
  upsc: "UPSC",
  ssc: "SSC",
  bank_exams: "Bank Exams (IBPS, SBI)",
  railway_exams: "Railway Exams",
  defence_exams: "Defence Exams (NDA, CDS, AFCAT)",
  state_psc: "State PSC Exams",
  judiciary_exams: "Judiciary Exams",
  academic_content: "Academic Content",
  school_curriculum: "School Curriculum (Class 1-12)",
  cbse: "CBSE",
  icse: "ICSE",
  state_boards: "State Boards",
  college_subjects: "College/University Subjects",
  engineering: "Engineering",
  commerce: "Commerce",
  arts: "Arts",
  science: "Science",
  professional_courses: "Professional Courses",
  it_software: "IT & Software (Programming, Web Development, App Development)",
  business_finance: "Business & Finance (Accounting, Stock Market, MBA Prep)",
  design: "Design (Graphic Design, UX/UI)",
  marketing: "Marketing (Digital Marketing, SEO)",
  healthcare_medicine: "Healthcare & Medicine",
  skill_development: "Skill Development",
  language_learning: "Language Learning (English, French, Spanish, etc.)",
  personality_development: "Personality Development",
  public_speaking: "Public Speaking",
  leadership_skills: "Leadership Skills",
  creative_writing: "Creative Writing",
  hobbies_extracurricular: "Hobbies and Extracurricular",
  arts_crafts: "Arts & Crafts",
  music_instruments: "Music & Instruments",
  photography: "Photography",
  video_editing: "Video Editing",
  cooking: "Cooking",
  ebooks_study_material: "E-Books and Study Material",
  textbooks: "Textbooks",
  practice_papers: "Practice Papers",
  notes_summaries: "Notes & Summaries",
  ebooks_topics: "E-books on Specific Topics",
  workshops_webinars: "Workshops and Webinars",
  live_classes: "Live Classes",
  recorded_workshops: "Recorded Workshops",
  certification_courses: "Certification Courses",
  programming_technology: "Programming and Technology",
  coding_bootcamps: "Coding Bootcamps",
  machine_learning_ai: "Machine Learning & AI",
  data_science: "Data Science",
  cloud_computing: "Cloud Computing",
  blockchain: "Blockchain",
  mock_tests: "Mock Tests and Practice Modules",
  test_series: "Test Series for Competitive Exams",
  quiz_modules: "Quiz Modules",
  practice_tests: "Time-Bound Practice Tests",
  others: "Others",
  career_guidance: "Career Guidance & Counseling",
  mental_health: "Meditation & Mental Health Resources",
  entrepreneurship: "Entrepreneurship",
  oth: "Other",
} as const;
function createTuple<T extends string>(...args: T[]): [T, ...T[]] {
  return args as [T, ...T[]];
}

export const categoryKeys = createTuple(...(Object.keys(categoriesObject) as (keyof typeof categoriesObject)[]));
  
export const admincongrates = (name: string) => `
<div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; padding: 20px; border-radius: 10px; font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="text-align: center; padding: 30px 0; background-color: #333333; border-radius: 10px;">
    <h1 style="margin: 0; font-size: 22px; color: #4CAF50;">Welcome to the Admin Team!</h1>
    <p style="font-size: 14px; color: #cccccc;">Educational E-Content Marketplace</p>
  </div>
  
  <div style="padding: 25px 20px; font-size: 15px; color: #e0e0e0;">
    <p style="color: #e0e0e0;">Hi ${name},</p>
    <p style="color: #e0e0e0;">Congratulations! You have been granted <strong style="color: #ffffff;">Admin privileges</strong> on <strong style="color: #ffffff;">Educational E-Content Marketplace</strong>. We’re excited to have you on board to help shape the experience for our users and content creators.</p>

    <p style="color: #e0e0e0;">As a Site Admin, you’ll be able to:</p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="padding: 5px 0; color: #e0e0e0;">✅ Manage users and monitor content</li>
      <li style="padding: 5px 0; color: #e0e0e0;">✅ Oversee transactions and listings</li>
      <li style="padding: 5px 0; color: #e0e0e0;">✅ Help maintain a productive community</li>
    </ul>

    <p style="margin-top: 20px; color: #e0e0e0;">We’re looking forward to your contributions. If you have any questions, feel free to contact us at <a href="mailto:support@eecm.vercel.app" style="color: #4CAF50; text-decoration: none;">support@eecm.vercel.app</a>.</p>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://eecm.vercel.app/access-admin" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">Go to Admin Dashboard</a>
    </div>

    <p style="margin-top: 20px; text-align: center; color: #cccccc;">
      If you are unable to access the button above, copy and paste the following link into your browser:
    </p>
    
    <div style="background-color: #333333; padding: 10px; border-radius: 5px; text-align: center;">
      <code style="color: #4CAF50; font-size: 14px; word-break: break-word;">https://eecm.vercel.app/access-admin</code>
      <button onclick="navigator.clipboard.writeText('https://eecm.vercel.app/access-admin')" style="margin-top: 10px; padding: 8px 12px; background-color: #4CAF50; color: #ffffff; border: none; border-radius: 5px; font-size: 14px; cursor: pointer;">Copy Link</button>
    </div>
  </div>
  
  <div style="text-align: center; padding: 15px; font-size: 12px; color: #888888; margin-top: 20px; border-top: 1px solid #333333;">
    <p style="color: #888888;">© 2024 Educational E-Content Marketplace. All rights reserved.</p>
  </div>
</div>
`;

export const paidRevenueEmail = (amount: string | number, name: string ) => {
  return `<div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif;">
  <div style="background: #4CAF50; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Payment Successful</h1>
  </div>
  <div style="padding: 20px; color: #333;">
    <p style="margin: 0 0 10px;">Dear <strong>${name}</strong>,</p>
    <p style="margin: 0 0 10px;">We are pleased to inform you that an amount of <strong>₹${amount}</strong> has been successfully processed as your payout. The amount will be credited to your registered bank account within a few business days.</p>
    <p style="margin: 0 0 10px;">If you have any questions, feel free to contact our support team.</p>
    <a href="https://eecm.vercel.app/contact" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Contact Support</a>
    <p style="margin: 20px 0 0;">Thank you for being a valued partner.</p>
    <p style="margin: 0;">Best Regards,<br>EducationalE-content Marketplace Team</p>
  </div>
  <div style="background: #f1f1f1; padding: 10px; text-align: center; color: #888; font-size: 14px;">
    © 2024 Educational E-content marketplace, All rights reserved.
  </div>
</div>
`
}

export const queryResponse = (name: string ) => {
return `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <header style="text-align: center; margin-bottom: 20px;">
    <h1 style="font-size: 20px; color: #007bff;">Thank You for Contacting Us!</h1>
  </header>
  <main>
    <p style="margin-bottom: 10px;">Hello, ${name}</p>
    <p style="margin-bottom: 10px;">
      We have received your query and are pleased to assist you. Below are the details of your request:
    </p>
    <div style="margin: 20px 0; padding: 15px; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
      <p>Reply Here</p>
    </div>
    <p style="margin-bottom: 10px;">If you have additional questions, feel free to reach out to us again.</p>
  </main>
  <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
    <p>Best regards </p>
    <p><a href="https://eecm.vercel.app">Educational E-content marketplace Team</a></p>
  </footer>
</div>
`}

export const shareLinks = (name: string, slug: string) => {
  const websiteUrl = "https://eecm.vercel.app";
  const productUrl = `${websiteUrl}/product/${slug}`;
  const message = `Discover "${name}" - a valuable educational e-content file on the Educational e-Content Marketplace. Affordable, high-quality files to boost your learning experience!`;

  const whatsapp = `whatsapp://send?text=${encodeURIComponent(
    `${message}\nCheck it out here: ${productUrl}\nBrowse more at ${websiteUrl}`
  )}`;

  const telegram = `https://telegram.me/share/url?url=${encodeURIComponent(
    productUrl
  )}&text=${encodeURIComponent(
    `${message}\nExplore more resources at ${websiteUrl}`
  )}`;

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    productUrl
  )}&quote=${encodeURIComponent(message)}`;

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${message}\nView here: ${productUrl}\nDiscover more on ${websiteUrl}`
  )}`;

  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    productUrl
  )}&title=${encodeURIComponent(
    `Educational Resource: ${name}`
  )}&summary=${encodeURIComponent(
    message
  )}&source=${encodeURIComponent(websiteUrl)}`;


  return { whatsapp, telegram, facebook, twitter, linkedin };
};

