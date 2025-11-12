'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Send, MessageSquare, HelpCircle, FileText, Mail, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SupportPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [faqSearch, setFaqSearch] = useState('');

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'How do I create a campaign?',
          a: 'Navigate to the Campaigns section and click "Create Campaign". Fill in the campaign details including title, objective, budget, deliverables, and timeline. Once submitted, your campaign will be reviewed and made available to creators.',
        },
        {
          q: 'How does the escrow system work?',
          a: 'When you create a paid campaign, funds are held in escrow. Once the creator completes the deliverables and you approve them, the funds are released. This ensures secure transactions for both parties.',
        },
        {
          q: 'What is the difference between PAID and BARTER campaigns?',
          a: 'PAID campaigns involve monetary compensation for creators, while BARTER campaigns involve product exchange or other non-monetary benefits. You can choose the type that best fits your budget and goals.',
        },
      ],
    },
    {
      category: 'Payments',
      questions: [
        {
          q: 'How do I add funds to my wallet?',
          a: 'Go to Wallet & Transactions section, click "Add Funds", and follow the payment instructions. We support multiple payment methods including credit/debit cards and UPI.',
        },
        {
          q: 'When are creators paid?',
          a: 'Creators are paid after you approve their completed deliverables. The payment is processed automatically from your escrow account within 2-3 business days.',
        },
        {
          q: 'Are there any platform fees?',
          a: 'No, our platform does not charge any commission or fees. All transactions are between you and the creator directly.',
        },
      ],
    },
    {
      category: 'Creators',
      questions: [
        {
          q: 'How do I find the right creators for my campaign?',
          a: 'Use the Creator Marketplace to search and filter creators by niche, follower count, engagement rate, location, and budget. You can view creator profiles and portfolios before making a decision.',
        },
        {
          q: 'Can I work with multiple creators?',
          a: 'Yes! You can select multiple creators for a single campaign. Set your total budget and budget per creator, and the system will calculate how many creators you can work with.',
        },
        {
          q: 'How do I communicate with creators?',
          a: 'You can message creators directly through the chat feature. Once a creator applies or you select them, you can start a conversation to discuss campaign details.',
        },
      ],
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I verify my account?',
          a: 'Complete your profile and submit KYC documents. Our team will review your submission within 24-48 hours. Verified accounts get a badge and increased trust from creators.',
        },
        {
          q: 'Can I change my account type?',
          a: 'Account types (MSME/Creator) are set during registration. If you need to change, please contact support for assistance.',
        },
        {
          q: 'How do I update my profile?',
          a: 'Go to your Profile page and click "Edit". Update your information, upload new images, and save your changes.',
        },
      ],
    },
  ];

  const handleSubmitTicket = async () => {
    if (!ticketSubject || !ticketCategory || !ticketMessage) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Support ticket submitted successfully! We will get back to you soon.');
      setTicketSubject('');
      setTicketCategory('');
      setTicketMessage('');
    } catch (error) {
      toast.error('Failed to submit ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.a.toLowerCase().includes(faqSearch.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight dark:text-[#FFFFFF]">Support</h1>
        <p className="text-muted-foreground dark:text-[#B9BBBE]">
          Get help and contact our support team
        </p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Us
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faqSearch">Search FAQs</Label>
                <Input
                  id="faqSearch"
                  placeholder="Search for questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {filteredFaqs.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.questions.map((faq, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                    <h4 className="font-semibold text-sm">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  support@msmeverse.com
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  We typically respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Phone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  +91 1800-XXX-XXXX
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Mon-Fri, 9 AM - 6 PM IST
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Live Chat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Available 24/7
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Click the chat icon in the bottom right
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>
                Describe your issue and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={ticketCategory} onValueChange={setTicketCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="payment">Payment Issue</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="campaign">Campaign Related</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your issue..."
                  rows={6}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                />
              </div>
              <Button onClick={handleSubmitTicket} disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

