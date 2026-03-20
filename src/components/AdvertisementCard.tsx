import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Advertisement } from '../types';
import { Link } from 'react-router';
import { Calendar, MessageCircle } from 'lucide-react';

interface AdvertisementCardProps {
  ad: Advertisement;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ ad }) => {
  return (
    <Card className="w-full max-w-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md bg-white overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg overflow-hidden">
          {ad.pictures.length > 0 ? (
            <img
              src={ad.pictures[0]}
              alt={ad.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400 text-sm">No image</div>
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 font-semibold shadow-sm">
            ${ad.price}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors">{ad.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ad.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {ad.date.toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-1" />
            {ad.comments.length}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          By <Link to={`/profile/${ad.author}`} className="text-blue-600 hover:underline font-medium">{ad.author}</Link>
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link to={`/ad/${ad.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};