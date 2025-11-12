import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12 w-full">
      <div className="max-w-5xl mx-auto w-full text-center space-y-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Welcome to <span className="text-primary">MSMEVerse</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect MSMEs with Creators for impactful influencer marketing campaigns
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button asChild size="lg" className="w-full sm:w-auto min-w-[140px]">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[140px]">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto w-full">
          <Card className="flex flex-col h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">For MSMEs</CardTitle>
              <CardDescription className="text-center">
                Find the perfect creators for your brand
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="text-sm text-muted-foreground space-y-2 text-center">
                <li>• Browse verified creators</li>
                <li>• Launch campaigns easily</li>
                <li>• Track performance</li>
                <li>• Secure escrow payments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">For Creators</CardTitle>
              <CardDescription className="text-center">
                Monetize your content and grow your brand
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="text-sm text-muted-foreground space-y-2 text-center">
                <li>• Find brand collaborations</li>
                <li>• Showcase your portfolio</li>
                <li>• Get paid securely</li>
                <li>• Build your reputation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Secure & Trusted</CardTitle>
              <CardDescription className="text-center">
                Enterprise-grade security and escrow protection
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="text-sm text-muted-foreground space-y-2 text-center">
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
