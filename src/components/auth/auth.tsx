"use client";
import * as React from "react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, Formik } from "formik";
import Input from "@/components/ui/custom/Input";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { login, register } from "@/lib/redux/slices/auth/authApi";
import { useToast } from "@/components/ui/use-toast";
import LoadingComp from "@/components/ui/custom/loadingComp";
import LoginAndRegister from "./loginAndRegister";
import { LoginSchema, RegistrationSchema } from "@/lib/schema/authSchema";
import { useRouter } from "next/navigation";
interface User {
  email: string;
  password: string;

}

const tabsData = [
  {
    value: "login",
    label: "Login",
    description: "Please enter your credentials to continue.",
  },
  {
    value: "signup",
    label: "Sign Up",
    description: "Sign Up for Exclusive Access and Benefits!",
  },
];

const Auth = () => {

  const dispatch = useAppDispatch();

  const { user, error, isLoading, message, statusCode, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter()
  const { toast } = useToast();

  React.useEffect(() => {
    // -------------- INVALID MESSAGE ----------------
    if (error && statusCode === 401) {
      toast({
        title: "Invalid credentials",
        description: "No account found with the provided email. Please check your email or sign up for a new account."

      })
    }
    // -------------- FOR SUCCESSFUL REGISTRATION --------------
    if (statusCode === 201) {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully."

      })
    }

    if (isLoggedIn && statusCode === 200) {
      toast({
        title: "Login",
        description: "Successfully login to your account."

      })
    }
  }, [error, toast, user, statusCode, isLoggedIn]);
  // ------------ HANDLE LOGIN ----------------------------
  const handleLogin = async (value: User) => {
    await dispatch(login(value)).then((response: any) => {
      const user = response.payload?.data?.user;
      if (user && user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user && user.role === "user") {
        router.push("/dashboard/user");
      }
    })

  };
  const handleRegister = (value: User) => {
    dispatch(register(value));
  };

  // ------------- FORMIK COMPONENT ---------------------
  const FormikComp = () => {
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "", action: "login" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          values.action === "login"
            ? handleLogin(values)
            : handleRegister(values);
        }}
      >
        {(props) => (
          <Form>
            <Tabs defaultValue="login" className="w-[400px]">
              <div className="grid grid-cols-2 w-full">
                {tabsData.map((value, index) => (
                  <TabsList key={index} className="w-full rounded-none">
                    <TabsTrigger
                      value={value.value}
                      className="rounded-none w-full "
                    >
                      {value.label}
                    </TabsTrigger>
                  </TabsList>
                ))}
              </div>

              {/*   -------- LOGIN -------- */}
              <LoginAndRegister value={'login'} description={'Please enter your credentials to continue.'} props={props} />
              <LoginAndRegister value={'signup'} description={'Sign Up for Exclusive Access and Benefits!'} props={props} />
            </Tabs>
          </Form>
        )}
      </Formik>
    );
  };

  // -------------RETURN THE COMPONENT ------------------------------
  return isLoading ? <LoadingComp /> : <FormikComp />;
};

export default Auth;
