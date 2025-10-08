'use client';

import * as React from 'react';
import { Check, Crown, Loader2, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type PlanKey = 'early_bird_monthly' | 'early_bird_yearly';

type Props = {
  buttonLabel?: string;
  monthlyLabel?: string;
  yearlyLabel?: string;
  monthlyPrice?: string; // display only
  yearlyPrice?: string;  // display only
  currencySuffix?: string; // e.g. 'AUD'
};

const FEATURES = [
  'Founding-member price locked in',
  'Refundable within 30 days after launch',
  'Priority access at launch',
];

export default function PreSubscribeDialog({
  buttonLabel = 'Pre-Order Now!',
  monthlyLabel = 'Monthly',
  yearlyLabel = 'Yearly',
  monthlyPrice = '$4.90',
  yearlyPrice = '$29.90',
  currencySuffix = 'AUD',
}: Props) {
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PlanKey>('early_bird_yearly'); // default to yearly
  const [loading, setLoading] = React.useState(false);

  async function startCheckout(plan: 'monthly' | 'yearly' | undefined = undefined) {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, plan }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        alert(data?.error ?? 'Something went wrong');
      }
    } catch (e) {
      setLoading(false);
      alert('Something went wrong');
    }
  }

  const plans: Array<{
    key: PlanKey;
    title: string;
    price: string;
    period: string;
    highlight?: boolean;
    blurb?: string;
    icon?: React.ReactNode;
  }> = [
    {
      key: 'early_bird_monthly',
      title: monthlyLabel,
      price: monthlyPrice,
      period: '/mo',
      blurb: 'Start small, cancel anytime',
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      key: 'early_bird_yearly',
      title: yearlyLabel,
      price: yearlyPrice,
      period: '/yr',
      blurb: 'Best value — 50% off premium',
      highlight: true,
      icon: <Crown className="h-4 w-4" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="font-bold">{buttonLabel}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[680px] p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Early Bird Access
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Lock in your founding-member price. Fully refundable within 30 days after we launch.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-4">
          {/* Plan selector */}
          <div className="grid gap-4 sm:grid-cols-2">
            {plans.map((p) => {
              const isActive = selected === p.key;
              return (
                <Card
                  key={p.key}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(p.key)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(p.key)}
                  className={cn(
                    'relative cursor-pointer rounded-2xl border transition-all',
                    'hover:shadow-md',
                    isActive ? 'ring-2 ring-amber-400 border-amber-300 shadow-sm' : ''
                  )}
                >
                  {/* {p.highlight && (
                    <Badge className="absolute right-3 top-3 bg-amber-500 hover:bg-amber-500">
                      Best value
                    </Badge>
                  )} */}

                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      {p.icon}
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      {isActive && <Check className="ml-auto h-5 w-5 text-amber-500" />}
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{p.price}</span>
                      <span className="text-muted-foreground">{p.period}</span>
                      <span className="ml-1 text-xs text-muted-foreground">{currencySuffix}</span>
                    </div>
                    {p.blurb && (
                      <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                    )}

                    {/* <Separator className="my-4" />

                    <ul className="text-sm space-y-2">
                      {FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="sm:mr-auto"
            >
              Not now
            </Button>
            <Button
              onClick={() => startCheckout(selected === 'early_bird_monthly' ? 'monthly' : 'yearly')}
              disabled={loading}
              className="font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting to Stripe…
                </>
              ) : (
                'Continue to Checkout'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
