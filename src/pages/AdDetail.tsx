import { useParams, Link } from 'react-router';
import { useAds } from '../context/AdsContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, User, Calendar, DollarSign } from 'lucide-react';

export function AdDetail() {
  const { id } = useParams<{ id: string }>();
  const { ads } = useAds();

  const ad = ads.find(ad => ad.id === id);

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Advertisement not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button asChild variant="ghost" className="mr-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">AdPlatform</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {ad.pictures.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`${ad.name} ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{ad.name}</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary" className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  ${ad.price}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {ad.date.toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-1" />
                Posted by <Link to={`/profile/${ad.author}`} className="text-blue-600 hover:underline ml-1">{ad.author}</Link>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{ad.description}</p>
            </div>

            <Separator />

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Comments ({ad.comments.length})</h3>
              {ad.comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {ad.comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm font-medium">{comment.author}</CardTitle>
                          <span className="text-xs text-gray-500">{comment.date.toLocaleDateString()}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdDetail;