export type AuthFieldProps = {
  id?: string | null;
  label?: string | null;
  type?: string | null;
  placeholder?: string | null;
};

export default function AuthField({ id, label, type, placeholder }: AuthFieldProps) {
  return (
    <>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={id ?? undefined}
        data-editable="text"
        data-prop="label"
      >
        {label}
      </label>
      <input
        id={id ?? undefined}
        className="form-input w-full py-2"
        type={type ?? "text"}
        autoComplete={type === "password" ? "on" : undefined}
        placeholder={placeholder ?? undefined}
        required
      />
    </>
  );
}
