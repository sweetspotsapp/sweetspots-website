"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { X } from "lucide-react"; // For close icon

import { AppVersion } from "@/dto/early-users/app-version.enum";
import { createEarlyUser } from "@/api/early-users/endpoints";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
});
type Values = z.infer<typeof schema>;

type EarlyAccessFormProps = {
  onSubmit?: (values: Values) => Promise<void> | void;
  submitLabel?: string;
  submittingText?: string;
  successMessage?: string;
  className?: string;
  autoCloseDelay?: number; // optional, in ms
};

export default function EarlyAccessForm({
  onSubmit,
  submitLabel = "Join Early Access",
  submittingText = "Submitting...",
  successMessage = "Thank you! We'll be in touch soon.",
  className,
  autoCloseDelay = 4000, // default 4 seconds
}: EarlyAccessFormProps) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", email: "" },
  });

  const [phase, setPhase] = React.useState<"idle" | "loading" | "success">("idle");
  const isBusy = phase === "loading";
  const isSuccess = phase === "success";

  // Timeout for auto-closing success message
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setPhase("idle");
        form.reset(); // clear form after success
      }, autoCloseDelay);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, autoCloseDelay, form]);

  async function handleSubmit(values: Values) {
    try {
      setPhase("loading");
      await createEarlyUser({
        name: values.name,
        email: values.email,
        appVersion: AppVersion.Alpha,
      });
      await onSubmit?.(values);
      setPhase("success");
    } catch (e) {
      setPhase("idle"); // back to idle if something fails
    }
  }

  return (
    <LayoutGroup>
      <div className={className}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Chillian McMillian"
                        {...field}
                        disabled={isBusy || isSuccess}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="hiddengem@hunter.com"
                        {...field}
                        disabled={isBusy || isSuccess}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit button */}
            <div className="pt-8">
              <motion.div layoutId="cta-visual" className="inline-flex">
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || isBusy || isSuccess}
                  className="min-w-40"
                  size="lg"
                >
                  {submitLabel}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>

      {/* Overlay with spinner and success window */}
      <AnimatePresence>
        {(isBusy || isSuccess) && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Shared layout element */}
            <motion.div
              layoutId="cta-visual"
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex items-center justify-center"
            >
              {isBusy ? (
                // Loading spinner
                <div className="flex h-10 min-w-40 items-center justify-center rounded-md border bg-background px-4">
                  <span className="mr-2 text-sm">{submittingText}</span>
                  <span
                    className="inline-block size-4 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-muted-foreground"
                    aria-hidden
                  />
                </div>
              ) : (
                // Success message with X button
                <motion.div
                  initial={{ width: 320, height: 48 }}
                  animate={{ width: 420, height: 140 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  className="relative flex items-center justify-center rounded-lg border bg-background px-6 text-center"
                >
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setPhase("idle")}
                    className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="space-y-2">
                    <div className="text-base font-medium">Thank you 🎉</div>
                    <div className="text-sm text-muted-foreground">{successMessage}</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}