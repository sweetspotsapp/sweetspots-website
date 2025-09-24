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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { AppVersion } from "@/dto/early-users/app-version.enum";
import { createEarlyUser } from "@/api/early-users/endpoints";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  // appVersion: z.enum(["alpha", "beta", "public"]),
});
type Values = z.infer<typeof schema>;

type EarlyAccessFormProps = {
  onSubmit?: (values: Values) => Promise<void> | void;
  submitLabel?: string;
  submittingText?: string;
  successMessage?: string;
  className?: string;
};

export default function EarlyAccessForm({
  onSubmit,
  submitLabel = "Join Early Access",
  submittingText = "Submitting...",
  successMessage = "Thank you! We’ll be in touch soon.",
  className,
}: EarlyAccessFormProps) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", email: "" },
  });

  const [phase, setPhase] = React.useState<"idle" | "loading" | "success">("idle");
  const isBusy = phase === "loading";
  const isSuccess = phase === "success";

  async function handleSubmit(values: Values) {
    try {
      setPhase("loading");
      await createEarlyUser({
        name: values.name,
        email: values.email,
        appVersion: AppVersion.Alpha,
      });
      // await onSubmit?.(values);
      setPhase("success");
    } catch (e) {
      // If submit fails, return to idle
      setPhase("idle");
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
                    <FormLabel>What&apos;s your name?</FormLabel>
                    <FormControl>
                      <Input placeholder="Chillian McMillian" {...field} disabled={isBusy || isSuccess} />
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
                    <FormLabel>Where can we reach you?</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="hiddengem@hunter.com" {...field} disabled={isBusy || isSuccess} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="appVersion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App version</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isBusy || isSuccess}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a version" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="alpha">Alpha</SelectItem>
                      <SelectItem value="beta">Beta</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Submit button with shared layout wrapper */}
            <div className="pt-8">
              <motion.div layoutId="cta-visual" className="inline-flex">
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || isBusy || isSuccess}
                  className="min-w-40"
                  size='lg'
                >
                  {submitLabel}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>

      {/* Floating overlay: spinner centered during loading, morphs to thank-you on success */}
      <AnimatePresence>
        {(isBusy || isSuccess) && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Shared layout element that moves from button location to center */}
            <motion.div
              layoutId="cta-visual"
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="flex items-center justify-center"
            >
              {isBusy ? (
                // Spinner "text" state
                <div className="flex h-10 min-w-40 items-center justify-center rounded-md border bg-background px-4">
                  <span className="mr-2 text-sm">{submittingText}</span>
                  <span
                    className="inline-block size-4 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-muted-foreground"
                    aria-hidden
                  />
                </div>
              ) : (
                // Success rectangle
                <motion.div
                  initial={{ width: 320, height: 48 }}
                  animate={{ width: 420, height: 120 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  className="flex items-center justify-center rounded-lg border bg-background px-6 text-center"
                >
                  <div className="space-y-1">
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