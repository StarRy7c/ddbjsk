import { Post } from './types';

export const ALLOWED_ADMINS = [
  'dillzycreations@gmail.com',
  'nishkarsh333singh@gmail.com',
  'Samstar9211@gmail.com'
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: "India Pulls Off Miracle Chase at The Gabba",
    excerpt: "In a stunning turn of events, the young Indian brigade has breached the fortress.",
    content: "Detailed match report regarding the historic win... (Full content would go here)",
    images: ["https://picsum.photos/800/600?random=1"],
    author: "Ravi Shastri",
    date: new Date(Date.now() - 10000000).toISOString(),
    isTop: true,
    category: 'Match Report'
  },
  {
    id: '2',
    title: "Kohli Announces Break from T20 Captaincy",
    excerpt: "The legendary batter decides to focus on his batting and ODI leadership.",
    content: "Full statement from the press conference...",
    images: ["https://picsum.photos/800/600?random=2"],
    author: "Harsha Bhogle",
    date: new Date(Date.now() - 20000000).toISOString(),
    isTop: true,
    category: 'News'
  },
  {
    id: '3',
    title: "IPL Auction 2025: Top Buys & Surprises",
    excerpt: "Records shattered as franchises break the bank for fast bowlers.",
    content: "Analysis of the auction dynamics...",
    images: ["https://picsum.photos/800/600?random=3"],
    author: "Ian Bishop",
    date: new Date(Date.now() - 5000000).toISOString(),
    isTop: false,
    category: 'News'
  },
  {
    id: '4',
    title: "The Art of Spin: Ashwin's Variations",
    excerpt: "A deep dive into how Ravichandran Ashwin outfoxes batsmen worldwide.",
    content: "Technical analysis...",
    images: ["https://picsum.photos/800/600?random=4"],
    author: "Nasser Hussain",
    date: new Date(Date.now() - 86400000).toISOString(),
    isTop: false,
    category: 'Stats'
  },
  {
    id: '5',
    title: "World Cup 2027: Venues Announced",
    excerpt: "Africa prepares to host the grandest stage of them all.",
    content: "Venue details and schedule...",
    images: ["https://picsum.photos/800/600?random=5"],
    author: "Graeme Smith",
    date: new Date(Date.now() - 1200000).toISOString(),
    isTop: true,
    category: 'News'
  }
];