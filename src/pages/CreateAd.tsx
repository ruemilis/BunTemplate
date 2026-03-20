import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAds } from '../context/AdsContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router';

export function CreateAd() {
  const navigate = useNavigate();
  const { addAd } = useAds();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    pictures: [] as string[],
  });
  const [newPicture, setNewPicture] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Pre-fill author field with logged-in user's name
      setFormData(prev => ({ ...prev, author: user.name }));
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.author) {
      alert('Please fill in all required fields');
      return;
    }

    addAd({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      date: new Date(),
      author: formData.author,
      pictures: formData.pictures,
      comments: [],
    });

    navigate('/');
  };

  const addPicture = () => {
    if (newPicture.trim()) {
      setFormData(prev => ({
        ...prev,
        pictures: [...prev.pictures, newPicture.trim()],
      }));
      setNewPicture('');
    }
  };

  const removePicture = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
  };

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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Advertisement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter advertisement name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your advertisement"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <Label>Pictures</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newPicture}
                    onChange={(e) => setNewPicture(e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <Button type="button" onClick={addPicture} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.pictures.map((pic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input value={pic} readOnly className="flex-1" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePicture(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Advertisement
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default CreateAd;