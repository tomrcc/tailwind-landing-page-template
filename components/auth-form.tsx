import Link from "next/link";
import AuthField, { type AuthFieldProps } from "@/components/auth-field";
import { buttonStyles, styleClasses } from "@/components/ui/button-styles";

type Button = { text?: string | null; style?: string | null };

export type AuthFormProps = {
  heading?: string | null;
  fields?: AuthFieldProps[] | null;
  buttons?: Button[] | null;
  divider_text?: string | null;
  footer_link?: { text?: string | null; href?: string | null } | null;
  footer_text?: string | null;
};

export default function AuthForm({
  heading,
  fields,
  buttons,
  divider_text,
  footer_link,
  footer_text,
}: AuthFormProps) {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold" data-editable="text" data-prop="heading">
          {heading}
        </h1>
      </div>

      {/* Form */}
      <form>
        <div
          className="space-y-4"
          data-editable="array"
          data-prop="fields"
          data-component="auth-field"
        >
          {(fields ?? []).map((field, index) => (
            <div key={index} data-editable="array-item" data-component="auth-field">
              <AuthField {...field} />
            </div>
          ))}
        </div>
        {/* Each item carries its own divider so the list stays array-pure; the form re-renders to place them. */}
        <div className="mt-6 space-y-3" data-editable="array" data-prop="buttons">
          {(buttons ?? []).map((button, index) => (
            <div key={index} className="space-y-3" data-editable="array-item">
              {index > 0 && divider_text && (
                <div className="text-center text-sm italic text-gray-400">
                  {divider_text}
                </div>
              )}
              <button
                className={`btn w-full ${styleClasses(buttonStyles, button.style)}`}
              >
                <editable-text data-prop="text">{button.text}</editable-text>
              </button>
            </div>
          ))}
        </div>
      </form>

      {/* Bottom link */}
      {footer_link?.text && (
        <div className="mt-6 text-center">
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href={footer_link.href ?? "#0"}
          >
            <editable-text data-prop="footer_link.text">
              {footer_link.text}
            </editable-text>
          </Link>
        </div>
      )}
      {footer_text && (
        <div className="mt-6 text-center">
          <p
            className="text-sm text-gray-500 [&_a]:whitespace-nowrap [&_a]:font-medium [&_a]:text-gray-700 [&_a]:underline [&_a:hover]:no-underline"
            data-editable="text"
            data-type="text"
            data-prop="footer_text"
            dangerouslySetInnerHTML={{ __html: footer_text }}
          />
        </div>
      )}
    </>
  );
}
