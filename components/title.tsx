import { DOMAttributes } from 'react';

export interface TitleProps extends DOMAttributes<HTMLHeadingElement> {
    className?: string;
    additionalClassName?: string;
}

export default function Title({
    children,
    className,
    additionalClassName,
    ...props
}: TitleProps) {
    let cn = className ?? 'text-4xl font-bold tracking-wide text-slate-500';
    cn = additionalClassName ? `${cn} ${additionalClassName}` : cn;
    return (
        <h1 className={cn} {...props}>
            {children}
        </h1>
    );
}
