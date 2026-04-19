import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Project } from './models/Project.js';

dotenv.config();

const projects = [
  {
    title: 'JanMat - Civic Engagement Platform',
    description: 'Built a full-stack platform connecting citizens with government authorities for reporting issues in real time. Implemented session-based authentication and role-based authorization. Key features include issue reporting with geolocation tracking, news updates, a chatbot, and real-time polls.',
    techStack: ['JavaScript', 'React', 'TypeScript', 'PostgreSQL', 'Express.js'],
    githubUrl: 'https://github.com/prathamesh-korde/JanMat.git',
    liveUrl: 'https://janmat.vercel.app/',
    imageUrl: 'https://d13qu023z75971.cloudfront.net/2023/04/Voting-Provider-Image.png'
  },
  {
    title: 'NxtStay - Smart Hotel Listing Platform',
    description: 'Built a full-stack hotel review platform with search, filtering, and rating features. Designed and consumed RESTful APIs for property data, authentication, and management. Implemented secure user sessions with Passport.js authentication and role-based access.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Passport.js'],
    githubUrl: 'https://github.com/prathamesh-korde/NxtStay',
    liveUrl: 'https://nxt-stay2.vercel.app/Listings',
    imageUrl: 'https://www.shutterstock.com/image-vector/trip-travel-hotel-booking-logo-260nw-1016603458.jpg'
  },
  {
    title: 'CDP - Engineering India',
    description: 'Built a secure web platform for uploading, accessing, and managing academic resources. Integrated session-based authentication and role-based authorization. Ensured access control using session-based authentication.',
    techStack: ['Node.js', 'Express.js', 'EJS', 'MongoDB'],
    githubUrl: 'https://github.com/bhushan-madankar/website-ei-cdp',
    liveUrl: 'https://engineeringindia.co.in/',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D560BAQHWtGqHzzTL0w/company-logo_200_200/company-logo_200_200/0/1702483604240?e=2147483647&v=beta&t=1a4kRaxftOmyEi8daNR4Oe6ROIyPcxCEELbl24V46V4'
  },
  {
    title: 'Game Zone',
    description: 'An interactive gaming platform featuring multiple games and user engagement features.',
    techStack: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
    githubUrl: 'https://github.com/prathamesh-korde/Game',
    liveUrl: '',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/002/304/431/non_2x/game-zone-entertainment-banner-game-logo-illustration-free-vector.jpg'
  },
  {
    title: 'Amazon Clone',
    description: 'A full-featured e-commerce clone of Amazon with product listings, shopping cart, and user authentication.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/prathamesh-korde/AmazonClone',
    liveUrl: '',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQF083mMinXCtQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1686067344413?e=2147483647&v=beta&t=nm30MQ8OI-9VSUXR95shyABNZfOmt-f5f9R4zf9_yeU'
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Seeded projects');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
