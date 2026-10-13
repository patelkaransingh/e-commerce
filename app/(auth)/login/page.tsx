"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginResolver, TLoginInput } from "@/lib/validations";
import { Spinner } from "@/components/ui/spinner";
import { email } from "zod";

function Login() {
  const seachParams = useSearchParams();
  const redirectTo = seachParams.get("redirect") || "/";

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<TLoginInput>({
    resolver: zodResolver(loginResolver),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: TLoginInput) => {
    console.log(email);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        console.log(response);
        const error = await response.json();
        setServerError(
          typeof error.message === "string"
            ? error.message
            : "Something went wrong while logging in.",
        );
        return;
      }

      router.push(redirectTo);
    } catch (error) {
      setServerError("Something went wrong while logging in.");
    }
  };

  const isLoggingIn = form.formState.isSubmitting;

  return (
    <main className="form-wrapper">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary font-bold">
            Create your account
          </CardTitle>
          <CardDescription>
            Sign up to start shopping and keep track of your orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && (
            <Alert variant="destructive" className="mb-5">
              <TriangleAlert />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="gap-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-email">
                      Email address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    Logging In..
                  </>
                ) : (
                  `Create account`
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="gap-2 justify-center text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="/login"
          >
            Log in
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Login;
