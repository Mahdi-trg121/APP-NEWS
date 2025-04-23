interface Comment {
  id: string;
  userId: string;
  text: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Healthcare',
    summary: 'How AI is revolutionizing medical diagnosis and treatment planning',
    content: 'Artificial Intelligence is making significant strides in healthcare, from improving diagnostic accuracy to streamlining patient care. Recent developments show promising results in early disease detection and personalized treatment plans...',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    author: 'Dr. Sarah Johnson',
    date: '2024-03-15',
    views: 1205,
    likes: 342,
    dislikes: 12,
    comments: [
      {
        id: 'c1',
        userId: 'user1',
        text: 'Fascinating insights into the future of healthcare!',
        date: '2024-03-15T10:30:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Sustainable Energy Breakthrough',
    summary: 'New solar technology achieves record-breaking efficiency',
    content: 'Scientists have developed a new type of solar cell that achieves unprecedented energy conversion rates. This breakthrough could make solar power more accessible and affordable...',
    image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg',
    author: 'Michael Chen',
    date: '2024-03-14',
    views: 856,
    likes: 230,
    dislikes: 8,
    comments: []
  }
];