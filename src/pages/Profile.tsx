import { useParams, Link } from 'react-router';
import { useAds } from '../context/AdsContext';
import { AdvertisementCard } from '../components/AdvertisementCard';
import { Button } from '../components/ui/button';
import { ArrowLeft, User } from 'lucide-react';

export function Profile() {
  const { author } = useParams<{ author: string }>();
  const { ads } = useAds();

  const authorAds = ads.filter(ad => ad.author === author);

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Author not found</h1>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 mr-3 text-gray-600" />
            <h2 className="text-3xl font-bold text-gray-900">{author}'s Profile</h2>
          </div>
          <p className="text-gray-600">
            {authorAds.length} {authorAds.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>

        {authorAds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No listings found for this author.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authorAds.map((ad) => (
              <AdvertisementCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;