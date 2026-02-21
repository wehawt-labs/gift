import { CheckCircle, Home, Music } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Order Confirmed | GiftOfSong',
  description: 'Your personalized song order has been placed successfully.',
};

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-md text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle className="h-10 w-10 text-accent" />
        </div>

        {/* Heading */}
        <h1 className="mb-3 font-bold font-heading text-3xl text-foreground">
          Thank You! 🎶
        </h1>
        <p className="mb-2 text-foreground/70 text-lg">
          Your order has been placed successfully.
        </p>
        <p className="mb-8 text-foreground/50 text-sm">
          Our Song Chef is warming up! You&apos;ll receive an email
          confirmation shortly. We&apos;ll notify you when your personalized
          song is ready for review.
        </p>

        {/* Status Card */}
        <div className="mb-8 rounded-2xl border border-accent/20 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Music className="h-5 w-5" />
            <span className="font-semibold text-sm">
              Status: Song Chef Cooking 🍳
            </span>
          </div>
          <p className="mt-2 text-foreground/50 text-xs">
            We&apos;ll send you an email when your song is ready.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: 'default' }),
              'rounded-full bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90',
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
