import { DOMAttributes } from 'react';

export interface ButtonProps extends DOMAttributes<HTMLButtonElement> {
    className?: string;
    additionalClassName?: string;
}

export default function Button({
    children,
    className,
    additionalClassName,
    ...props
}: ButtonProps) {
    let cn =
        className ??
        'rounded bg-cyan-100 py-2 px-4 font-bold shadow-md shadow-slate-500 hover:bg-cyan-200';
    cn = additionalClassName ? `${cn} ${additionalClassName}` : cn;
    return (
        <button className={cn} {...props}>
            {children}
        </button>
    );
}
