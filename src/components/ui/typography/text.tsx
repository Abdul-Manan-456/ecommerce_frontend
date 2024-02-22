type TextElements =
    | "p"
    | "blockquote"
    | "code"
    | "lead"
    | "large"
    | "small"
    | "muted";

const Text = ({
    children,
    as,
    className,
}: {
    children: React.ReactNode;
    as: TextElements;
    className?: string;
}) => {
    switch (as) {
        case "p":
            return <p className={`leading-7 [&:not(:first-child)]:mt-0 ${className}`}>{children}</p>;
        case "blockquote":
            return (
                <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
                    {children}
                </blockquote>
            );
        case "code":
            return (
                <code className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}>
                    {children}
                </code>
            );
        case "lead":
            return <p className={`text-xl text-muted-foreground ${className}`}>{children}</p>;
        case "large":
            return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
        case "small":
            return (
                <small className={`text-sm font-medium leading-none ${className}`}>{children}</small>
            );
        case "muted":
            return <p className={`text-sm text-muted-foreground ${className}`}>{children}.</p>;
        default:
            return <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>{children}</p>;
    }
};
Text.displayName = 'Text'

export default Text;
