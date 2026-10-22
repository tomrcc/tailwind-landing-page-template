export type ButtonStyle = "primary" | "secondary" | "dark";

export const buttonStyles: Record<ButtonStyle, string> = {
  primary:
    "bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]",
  secondary: "bg-white text-gray-800 shadow-sm hover:bg-gray-50",
  dark: "bg-linear-to-t from-gray-900 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]",
};

// The header's small buttons use a flat dark style.
export const headerButtonStyles: Record<ButtonStyle, string> = {
  ...buttonStyles,
  dark: "bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900",
};

export function styleClasses(
  styles: Record<ButtonStyle, string>,
  style: string | null | undefined,
) {
  return styles[style as ButtonStyle] ?? styles.primary;
}
