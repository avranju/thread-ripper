import { DOMAttributes } from 'react';

export interface SubTitleProps extends DOMAttributes<HTMLHeadingElement> {
    className?: string;
    additionalClassName?: string;
}

export default function SubTitle({
    children,
    className,
    additionalClassName,
    ...props
}: SubTitleProps) {
    let cn = className ?? 'text-2xl font-bold text-slate-500';
    cn = additionalClassName ? `${cn} ${additionalClassName}` : cn;
    return (
        <h2 className={cn} {...props}>
            {children}
        </h2>
    );
}
