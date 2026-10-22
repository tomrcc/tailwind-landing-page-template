import Link from "next/link";
import Logo from "./logo";
import { headerButtonStyles, styleClasses } from "./button-styles";

type NavItem = { text?: string | null; href?: string | null; style?: string | null };

export default function Header({ items }: { items?: NavItem[] | null }) {

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul
            className="flex flex-1 items-center justify-end gap-3"
            data-editable="array"
            data-prop="items"
          >
            {(items ?? []).map((item, index) => (
              <li key={index} data-editable="array-item">
                <Link
                  href={item.href ?? "#0"}
                  className={`btn-sm ${styleClasses(headerButtonStyles, item.style)}`}
                >
                  <editable-text data-prop="text">{item.text}</editable-text>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
