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
interface User {
    email: string;
    password: string;
}
const Auth = () => {
    const { user, error, isLoading, isLoggedIn, message } = useAppSelector(
        (state) => state.auth
    );
    const { toast } = useToast();
    React.useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Ooops! Something went wrong",
                description: error,
            });
        }
        if (user) {
            toast({
                // title: '',
                description: message,
            });
        }
    }, [error, toast, user, message]);
    const dispatch = useAppDispatch();
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

    const handleLogin = (value: User) => {
        dispatch(login(value));
    };
    const handleRegister = (value: User) => {
        dispatch(register(value));
    };

    // ------------- FORMIK COMPONENT ---------------------
    const FormikComp = () => {
        return (
            <Formik
                initialValues={{ name: "", email: "", password: "", action: "login" }}
                onSubmit={(values, { setSubmitting }) => {
                    values.action === "login"
                        ? handleLogin(values)
                        : handleRegister(values);

                    console.log("values----", values);
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

                            <TabsContent value="login">
                                <Card className="rounded-none">
                                    <CardHeader>
                                        <CardTitle>Login</CardTitle>
                                        <CardDescription>
                                            Please enter your credentials to continue.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-6">
                                            <Input
                                                label="Email"
                                                name="email"
                                                placeholder="abc@example.com"
                                            />
                                            <Input
                                                label="Password"
                                                name="password"
                                                placeholder="******"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            onClick={() => props.setFieldValue("action", "login")}
                                            type="submit"
                                            variant={"default"}
                                            className="hover:bg-success rounded-none w-full tracking-widest"
                                        >
                                            Login
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="signup">
                                <Card className="rounded-none">
                                    <CardHeader>
                                        <CardTitle>Sign Up</CardTitle>
                                        <CardDescription>
                                            Sign Up for Exclusive Access and Benefits!
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="">
                                        <div className="space-y-6">
                                            <Input
                                                label="Name"
                                                name="name"
                                                placeholder="Abdul Manan"
                                            />
                                            <Input
                                                label="Email"
                                                name="email"
                                                placeholder="abc@example.com"
                                            />
                                            <Input
                                                label="Password"
                                                name="password"
                                                placeholder="******"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            type="submit"
                                            onClick={() => props.setFieldValue("action", "register")}
                                            variant={"default"}
                                            className="hover:bg-success rounded-none w-full"
                                        >
                                            Create Account
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
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
