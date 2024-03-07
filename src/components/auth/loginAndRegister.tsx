
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


interface loginAndRegisterProps {
    value: string
    description: string
    props: {
        setFieldValue: (field: string, value: string) => void;
    }
}
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Input from "@/components/ui/custom/Input";
const LoginAndRegister: React.FC<loginAndRegisterProps> = ({ value, description, props }) => {

    return (
        <div>
            <TabsContent value={value}>
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="capitalize">{value}</CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-6">
                            {
                                value === 'signup' && <Input
                                    label="Name"
                                    name="name"
                                    placeholder='Abdul Manan'
                                />
                            }
                            <Input
                                label="Email"
                                name="email"
                                placeholder="abc@example.com"
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="******"
                            />

                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() => props.setFieldValue("action", value)}
                            type="submit"
                            variant={"default"}
                            className="hover:bg-success rounded-none w-full tracking-widest"
                        >
                            {value === 'signup' ? 'Signup' : 'Login'}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </div>
    )
}

export default LoginAndRegister
