"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { registerSchema, TRegisterInput } from "@/lib/validations";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { Input } from "@base-ui/react";

function RegistrationForm() {
  // const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TRegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: TRegisterInput) => {
    console.log(data);
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription className="text-gray-600">
          Share you details so we can get you shopping..
        </CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert className="bg-red-50 border border-red-200 text-red-600">
            <TriangleAlert />
            <AlertTitle>Server Error !</AlertTitle>
            <AlertDescription className="text-red-900">
              {serverError}
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    {field.name}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="gap-3 text-gray-600">
        <p>Already have account ?</p>{" "}
        <Link className="font-bold" href="/login">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}

export default RegistrationForm;
