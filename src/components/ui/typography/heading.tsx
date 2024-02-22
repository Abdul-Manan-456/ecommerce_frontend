type HeadingElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Heading = ({
    children,
    className,
    as,
}: {
    children: React.ReactNode;
    className?: string;
    as: HeadingElements;
}) => {
    const baseClassName = "scroll-m-20";

    switch (as) {
        case "h1":
            return (
                <h1 className={`${baseClassName} text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
                    {children}
                </h1>
            );
        case "h2":
            return (
                <h2 className={`${baseClassName} border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${className}`}>
                    {children}
                </h2>
            );
        case "h3":
            return (
                <h3 className={`${baseClassName} text-2xl font-semibold tracking-tight ${className}`}>
                    {children}
                </h3>
            );
        case "h4":
            return (
                <h4 className={`${baseClassName} text-xl font-semibold tracking-tight ${className}`}>
                    {children}
                </h4>
            );
        case "h5":
            return (
                <h5 className={`${baseClassName} text-lg font-semibold tracking-tight ${className}`}>
                    {children}
                </h5>
            );
        case "h6":
            return (
                <h6 className={`${baseClassName} text-base font-semibold tracking-tight ${className}`}>
                    {children}
                </h6>
            );
        default:
            return (
                <h1 className={`${baseClassName} text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
                    {children}
                </h1>
            );
    }
};

export default Heading;
