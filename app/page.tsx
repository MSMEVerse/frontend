import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to <span className="text-primary">MSMEVerse</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect MSMEs with Creators for impactful influencer marketing campaigns
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>For MSMEs</CardTitle>
              <CardDescription>
                Find the perfect creators for your brand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Browse verified creators</li>
                <li>• Launch campaigns easily</li>
                <li>• Track performance</li>
                <li>• Secure escrow payments</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Creators</CardTitle>
              <CardDescription>
                Monetize your content and grow your brand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Find brand collaborations</li>
                <li>• Showcase your portfolio</li>
                <li>• Get paid securely</li>
                <li>• Build your reputation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure & Trusted</CardTitle>
              <CardDescription>
                Enterprise-grade security and escrow protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Escrow payment system</li>
                <li>• KYC verification</li>
                <li>• Secure transactions</li>
                <li>• 24/7 support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
