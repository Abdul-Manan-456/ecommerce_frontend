'use client'
import * as React from "react"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Form, Formik } from "formik"
import Input from "@/components/ui/custom/Input"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { login } from "@/lib/redux/slices/auth/authApi"
import { log } from "console"
import { Value } from "@radix-ui/react-select"
import { useToast } from "@/components/ui/use-toast"
interface User {
    email: string
    password: string
}
const Auth = () => {
    const { user, error, isLoading, isLoggedIn } = useAppSelector(state => state.auth)
    console.log("error----------", error)
    const dispatch = useAppDispatch()
    const tabsData = [
        {
            value: 'login',
            label: 'Login',
            description: 'Please enter your credentials to continue.',
        },
        {
            value: 'signup',
            label: 'Sign Up',
            description: 'Sign Up for Exclusive Access and Benefits!',

        },
    ];
    const handleLogin = (value: User) => {
        dispatch(login(value))
    }
    const { toast } = useToast()
    const errorToast = useCallback(() => {
        return toast({
            variant: "destructive",
            title: "Oops! Something went wrong",
            description: error,
        })
    }, [toast, error])

    React.useEffect(() => {
        errorToast()
    }, [error, errorToast])
    return (




        <Formik
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
                handleLogin(values)
                console.log("values----", values)
            }}
        >
            { }
            <Form>
                <Tabs defaultValue="login" className="w-[400px]">
                    <div className="grid grid-cols-2 w-full">
                        {
                            tabsData.map((value, index) =>
                            (
                                <TabsList key={index} className="w-full rounded-none  ">
                                    <TabsTrigger value={value.value} className="rounded-none w-full ">{value.label}</TabsTrigger>
                                </TabsList>
                            )
                            )
                        }
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
                                    <Input label="Email" name="email" placeholder="abc@example.com" />
                                    <Input label="Password" name="password" placeholder="******" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant={"default"} className="hover:bg-success rounded-none w-full tracking-widest">Login</Button>
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
                                    <Input label="Name" name="name" placeholder="Abdul Manan" />
                                    <Input label="Email" name="email" placeholder="abc@example.com" />
                                    <Input label="Password" name="password" placeholder="******" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant={"default"} className="hover:bg-success rounded-none w-full">Create Account</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </Form>
        </Formik>
    )
}

export default Auth
