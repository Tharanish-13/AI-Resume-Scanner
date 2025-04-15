export const initialResumeState = {
  profile: {
    name: "John Doe",
    label: "Full Stack Developer",
    image: "https://example.com/profile.jpg",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    url: "https://www.johndoe.com",
    summary:
      "A passionate and experienced Full Stack Developer with a strong background in building dynamic web applications. Proficient in both front-end and back-end technologies.",
    location: {
      address: "123 Main St",
      postalCode: "12345",
      city: "Somewhere",
      countryCode: "US",
      region: "California",
    },
    profiles: [
      { network: "LinkedIn", username: "johndoe", url: "https://www.linkedin.com/in/johndoe" },
      { network: "GitHub", username: "johndoe", url: "https://github.com/johndoe" },
    ],
  },
  workExperiences: [
    {
      company: "TechCorp",
      position: "Senior Full Stack Developer",
      website: "https://techcorp.com",
      startDate: "2018-03-01",
      endDate: "2022-08-01",
      summary:
        "Led the development of a highly scalable SaaS application using React, Node.js, and MongoDB. Worked closely with the design and product teams to deliver on business goals.",
      highlights: [
        "Developed an enterprise-level dashboard for internal use",
        "Improved application performance by 30%",
        "Implemented CI/CD pipeline for faster deployment",
      ],
    },
    {
      company: "Web Solutions",
      position: "Full Stack Developer",
      website: "https://websolutions.com",
      startDate: "2015-06-01",
      endDate: "2018-02-01",
      summary:
        "Worked on developing e-commerce platforms and internal tools using Angular and Ruby on Rails. Collaborated with a cross-functional team to deliver high-quality solutions.",
      highlights: [
        "Built an e-commerce platform with over 100K daily active users",
        "Optimized backend code, reducing load times by 20%",
      ],
    },
  ],
  volunteer: [
    {
      organization: "Code for Good",
      position: "Volunteer Developer",
      website: "https://codeforgood.org",
      startDate: "2017-01-01",
      endDate: "2018-12-01",
      summary: "Worked on various open-source projects aimed at social good.",
    },
  ],
  educations: [
    {
      school: "Some University",
      degree: "Bachelor's in Computer Science",
      startDate: "2010-09-01",
      endDate: "2014-06-01",
      courses: [
        "Data Structures and Algorithms",
        "Web Development",
        "Database Management Systems",
        "Operating Systems",
      ],
    },
  ],
  awards: [
    {
      title: "Best Developer Award",
      date: "2021-12-01",
      awarder: "TechCorp",
      summary: "Recognized for outstanding contributions to project X.",
    },
  ],
  certificates: [
    {
      name: "Certified JavaScript Developer",
      date: "2020-04-01",
      issuer: "JavaScript Institute",
      url: "https://www.jsinstitute.com/certifications/12345",
    },
  ],
  publications: [
    {
      name: "Building Scalable Web Applications with React",
      publisher: "DevTech Blog",
      releaseDate: "2021-07-01",
      website: "https://devtechblog.com/2021/07/building-scalable-web-applications",
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "JavaScript" },
      { skill: "React" },
      { skill: "Node.js" },
      { skill: "MongoDB" },
      { skill: "CSS" },
    ],
  },
  languages: [
    { language: "English", fluency: "Native" },
    { language: "Spanish", fluency: "Intermediate" },
  ],
  interests: [
    "Open Source Contributions",
    "Web Performance Optimization",
    "Machine Learning",
  ],
  references: [
    {
      name: "Jane Smith",
      reference: "John is an exceptional developer. Highly recommended!",
      relationship: "Former Manager at TechCorp",
      phone: "(123) 987-6543",
      email: "jane.smith@techcorp.com",
    },
  ],
  projects: [
    {
      project: "Personal Portfolio",
      description:
        "A personal website to showcase my projects and skills. Built using React and hosted on Netlify.",
      highlights: [
        "Developed custom UI components",
        "Integrated contact form using Formspree",
        "Optimized for mobile and desktop",
      ],
      links: [{ label: "View Project", url: "https://www.johndoe.com" }],
    },
  ],
};

