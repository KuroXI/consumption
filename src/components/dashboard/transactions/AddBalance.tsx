"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  amount: z.coerce.number().min(0.01),
});

type AddBalanceProps = {
  className?: string;
};

export const AddBalance = ({ className }: Readonly<AddBalanceProps>) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const addTransMutation = api.transaction.add.useMutation();
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    addTransMutation.mutate(
      { amount: data.amount },
      {
        onSuccess: () => toast.success("Added balance successfully"),
        onError: (error) => toast.error(error.message),
				onSettled: () => window.location.reload(),
      },
    );
  };

  return (
    <Form {...form}>
      <form className={cn(className)} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="This will add to your balance" autoComplete="off" />
              </FormControl>
							<FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Add Amount</Button>
      </form>
    </Form>
  );
};
