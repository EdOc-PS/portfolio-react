import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

type FormFieldProps = {
    label: string
    multiline?: boolean
} & InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>

const FIELD_CLASS =
    "w-full rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-deep px-5 py-4 text-base text-white placeholder:text-white/40 transition-colors hover:border-line-hover focus:border-line-hover focus:outline-none"

const FormField = ({ label, multiline = false, ...props }: FormFieldProps) => (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        {label}
        {multiline ? (
            <textarea {...props} className={`${FIELD_CLASS} resize-none`} />
        ) : (
            <input {...props} className={FIELD_CLASS} />
        )}
    </label>
)

export default FormField
