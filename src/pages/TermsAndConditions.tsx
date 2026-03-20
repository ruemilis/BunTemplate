import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button asChild variant="ghost" className="mr-4">
              <Link to="/login">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">AdPlatform</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <p className="text-sm text-gray-600">Last updated: March 20, 2026</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using AdPlatform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use AdPlatform for personal, non-commercial transitory viewing only.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>As a user of AdPlatform, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Not post illegal, harmful, or offensive content</li>
              <li>Respect other users and their property</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>4. Content Policy</h2>
            <p>
              Users are responsible for the content they post. AdPlatform reserves the right to remove any content that violates these terms.
            </p>

            <h2>5. Prohibited Activities</h2>
            <p>The following activities are strictly prohibited:</p>
            <ul>
              <li>Posting false or misleading information</li>
              <li>Harassing or threatening other users</li>
              <li>Attempting to gain unauthorized access</li>
              <li>Using the platform for illegal purposes</li>
            </ul>

            <h2>6. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
            </p>

            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice, for any reason whatsoever.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall AdPlatform be liable for any damages arising out of the use or inability to use the platform.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the new terms.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at support@adplatform.com.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default TermsAndConditions;