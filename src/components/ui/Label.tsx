interface LabelProps {
    children: React.ReactNode
    className?: string
}

const Label = ({ children, className = "" }: LabelProps) => (
    <div className={`text-xs font-semibold uppercase tracking-wider text-muted ${className}`}>{children}</div>
)

export default Label
