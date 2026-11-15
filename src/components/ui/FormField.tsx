import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"

type FormFieldProps = {
    label: string
    multiline?: boolean
    error?: string
    showCount?: boolean
} & InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>

const BASE =
    "w-full rounded-2xl border bg-gradient-to-br from-surface to-surface-deep px-5 py-4 text-base text-white placeholder:text-white/40 transition-colors focus:outline-none"

const FormField = ({ label, multiline = false, error, showCount = false, ...props }: FormFieldProps) => {
    const [focused, setFocused] = useState(false)
    const length = String(props.value ?? "").length

    const className = `${BASE} ${error ? "border-accent-pink" : "border-line hover:border-line-hover focus:border-line-hover"}`
    const focusProps = {
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        "aria-invalid": !!error,
    }

    return (
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
            <span className="flex justify-between">
                {label}

                {/* Contador */}
                {showCount && props.maxLength && (
                    <span className={`normal-case tracking-normal transition-opacity ${focused ? "opacity-100" : "opacity-0"}`}>
                        {length}/{props.maxLength}
                    </span>
                )}
            </span>

            {multiline ? (
                <textarea {...props} {...focusProps} className={`${className} resize-none`} />
            ) : (
                <input {...props} {...focusProps} className={className} />
            )}

            {/* Erro */}
            {error && <span className="normal-case tracking-normal text-accent-pink">{error}</span>}
        </label>
    )
}

export default FormField
