import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Advertisement, Comment } from './types';

interface AdsContextType {
  ads: Advertisement[];
  addAd: (ad: Omit<Advertisement, 'id'>) => void;
  addComment: (adId: string, comment: Omit<Comment, 'id'>) => void;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export const useAds = () => {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};

interface AdsProviderProps {
  children: ReactNode;
}

export const AdsProvider: React.FC<AdsProviderProps> = ({ children }) => {
  const [ads, setAds] = useState<Advertisement[]>([
    {
      id: '1',
      name: 'Vintage Guitar',
      description: 'Beautiful vintage guitar in excellent condition. Perfect for collectors and musicians alike.',
      price: 1500,
      date: new Date('2024-03-15'),
      author: 'John Doe',
      pictures: ['https://via.placeholder.com/300x200?text=Guitar+1', 'https://via.placeholder.com/300x200?text=Guitar+2'],
      comments: [
        {
          id: '1',
          author: 'Jane Smith',
          text: 'Is this still available?',
          date: new Date('2024-03-16'),
        },
      ],
    },
    {
      id: '2',
      name: 'MacBook Pro 16"',
      description: 'Latest MacBook Pro with M3 chip. Barely used, comes with original box and all accessories.',
      price: 2500,
      date: new Date('2024-03-18'),
      author: 'Alice Johnson',
      pictures: ['https://via.placeholder.com/300x200?text=MacBook+1', 'https://via.placeholder.com/300x200?text=MacBook+2'],
      comments: [],
    },
    {
      id: '3',
      name: 'Professional Camera Kit',
      description: 'Canon EOS R5 with 24-70mm lens, battery grip, and extra batteries. Perfect for professional photography.',
      price: 3200,
      date: new Date('2024-03-20'),
      author: 'Mike Wilson',
      pictures: ['https://via.placeholder.com/300x200?text=Camera+1', 'https://via.placeholder.com/300x200?text=Camera+2'],
      comments: [
        {
          id: '2',
          author: 'Sarah Davis',
          text: 'What\'s the condition of the lens?',
          date: new Date('2024-03-21'),
        },
        {
          id: '3',
          author: 'Mike Wilson',
          text: 'The lens is in mint condition, barely used!',
          date: new Date('2024-03-21'),
        },
      ],
    },
    {
      id: '4',
      name: 'Gaming PC Setup',
      description: 'High-end gaming PC with RTX 4080, Intel i9, 32GB RAM, and custom water cooling. Includes monitor and peripherals.',
      price: 2800,
      date: new Date('2024-03-22'),
      author: 'Tom Anderson',
      pictures: ['https://via.placeholder.com/300x200?text=PC+1', 'https://via.placeholder.com/300x200?text=PC+2'],
      comments: [],
    },
    {
      id: '5',
      name: 'Vintage Vinyl Record Collection',
      description: 'Over 200 vinyl records from the 60s-80s, including rare Beatles and Rolling Stones albums. All in excellent condition.',
      price: 800,
      date: new Date('2024-03-19'),
      author: 'Emma Thompson',
      pictures: ['https://via.placeholder.com/300x200?text=Vinyl+1', 'https://via.placeholder.com/300x200?text=Vinyl+2'],
      comments: [
        {
          id: '4',
          author: 'David Brown',
          text: 'Do you have a list of the records?',
          date: new Date('2024-03-20'),
        },
      ],
    },
    {
      id: '6',
      name: 'Electric Scooter',
      description: 'Brand new Xiaomi Mi Electric Scooter Pro 2. Top speed 25km/h, range up to 45km. Perfect for city commuting.',
      price: 450,
      date: new Date('2024-03-23'),
      author: 'Lisa Chen',
      pictures: ['https://via.placeholder.com/300x200?text=Scooter+1', 'https://via.placeholder.com/300x200?text=Scooter+2'],
      comments: [],
    },
    {
      id: '7',
      name: 'Designer Watch',
      description: 'Authentic Rolex Submariner, stainless steel case, automatic movement. Comes with box and papers.',
      price: 8500,
      date: new Date('2024-03-17'),
      author: 'Robert Martinez',
      pictures: ['https://via.placeholder.com/300x200?text=Watch+1', 'https://via.placeholder.com/300x200?text=Watch+2'],
      comments: [
        {
          id: '5',
          author: 'Jennifer Lee',
          text: 'Is this price negotiable?',
          date: new Date('2024-03-18'),
        },
        {
          id: '6',
          author: 'Robert Martinez',
          text: 'Slightly negotiable, best offer considered.',
          date: new Date('2024-03-18'),
        },
      ],
    },
    {
      id: '8',
      name: 'Mountain Bike',
      description: 'Trek Fuel EX 9.8, full suspension mountain bike. Size Large, excellent condition with minimal use.',
      price: 2200,
      date: new Date('2024-03-21'),
      author: 'Chris Taylor',
      pictures: ['https://via.placeholder.com/300x200?text=Bike+1', 'https://via.placeholder.com/300x200?text=Bike+2'],
      comments: [],
    },
  ]);

  const addAd = (ad: Omit<Advertisement, 'id'>) => {
    const newAd: Advertisement = {
      ...ad,
      id: Date.now().toString(),
    };
    setAds(prev => [...prev, newAd]);
  };

  const addComment = (adId: string, comment: Omit<Comment, 'id'>) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
    };
    setAds(prev => prev.map(ad =>
      ad.id === adId
        ? { ...ad, comments: [...ad.comments, newComment] }
        : ad
    ));
  };

  return (
    <AdsContext.Provider value={{ ads, addAd, addComment }}>
      {children}
    </AdsContext.Provider>
  );
};