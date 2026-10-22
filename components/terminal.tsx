import { Fragment } from "react";

export type TerminalData = {
  title?: string | null;
  lines?: (string | null)[] | null;
};

// One class and trailing separator per slot; the code-1…code-6 keyframes reveal the lines in turn.
const slots = [
  { className: "animate-[code-1_10s_infinite] text-gray-200", after: " " },
  { className: "animate-[code-2_10s_infinite]", after: <br /> },
  { className: "animate-[code-3_10s_infinite]", after: " " },
  {
    className: "animate-[code-4_10s_infinite]",
    after: (
      <>
        <br />
        <br />
      </>
    ),
  },
  { className: "animate-[code-5_10s_infinite] text-gray-200", after: <br /> },
  { className: "animate-[code-6_10s_infinite]", after: null },
];

// `dataProp` is the path to the terminal object, for example `terminal` or `@data[auth].terminal`.
export default function Terminal({
  terminal,
  dataProp,
  linesClassName,
}: {
  terminal?: TerminalData | null;
  dataProp: string;
  linesClassName: string;
}) {
  const lines = terminal?.lines ?? [];

  return (
    <>
      <div className="relative mb-8 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,var(--color-gray-600)_4.5px,transparent_0)] after:w-[41px]">
        <span
          className="text-[13px] font-medium text-white"
          data-editable="text"
          data-prop={`${dataProp}.title`}
        >
          {terminal?.title}
        </span>
      </div>
      <div className={linesClassName} data-terminal-lines="">
        {slots.map((slot, index) => (
          <Fragment key={index}>
            {index < lines.length ? (
              <span
                className={slot.className}
                data-editable="text"
                data-prop={`${dataProp}.lines.${index}`}
              >
                {lines[index]}
              </span>
            ) : (
              <span className={slot.className} />
            )}
            {slot.after}
          </Fragment>
        ))}
      </div>
    </>
  );
}
