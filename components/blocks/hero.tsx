import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import Terminal, { type TerminalData } from "@/components/terminal";
import { buttonStyles, styleClasses } from "@/components/ui/button-styles";

type ImageItem = { image?: string | null; alt?: string | null };
type Button = { text?: string | null; href?: string | null; style?: string | null };

export type HeroProps = {
  avatars?: ImageItem[] | null;
  title?: string | null;
  description?: string | null;
  buttons?: Button[] | null;
  terminal?: TerminalData | null;
};

export default function Hero({
  avatars,
  title,
  description,
  buttons,
  terminal,
}: HeroProps) {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div
                className="-mx-0.5 flex justify-center -space-x-3"
                data-editable="array"
                data-prop="avatars"
              >
                {(avatars ?? []).map((avatar, index) => (
                  <div key={index} className="flex" data-editable="array-item">
                    {avatar?.image && (
                      <Image
                        className="box-content rounded-full border-2 border-gray-50"
                        src={avatar.image}
                        width={32}
                        height={32}
                        alt={avatar.alt ?? ""}
                        data-editable="image"
                        data-prop-src="image"
                        data-prop-alt="alt"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
              data-editable="text"
              data-prop="title"
            >
              {title}
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
                data-editable="text"
                data-prop="description"
              >
                {description}
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                  data-editable="array"
                  data-prop="buttons"
                >
                  {/* The array item is a wrapper: re-renders update an item's children, not its own attributes. */}
                  {(buttons ?? []).map((button, index) => (
                    <div key={index} className="flex" data-editable="array-item">
                      <a
                        className={[
                          "btn group w-full sm:w-auto",
                          index < buttons!.length - 1 && "mb-4 sm:mb-0",
                          index > 0 && "sm:ml-4",
                          styleClasses(buttonStyles, button.style),
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        href={button.href ?? "#0"}
                      >
                        {button.style === "primary" || !button.style ? (
                          <span className="relative inline-flex items-center">
                            <editable-text data-prop="text">{button.text}</editable-text>{" "}
                            <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                              -&gt;
                            </span>
                          </span>
                        ) : (
                          <editable-text data-prop="text">{button.text}</editable-text>
                        )}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,--theme(--color-slate-300/.8),transparent)1]">
              <Terminal
                terminal={terminal}
                dataProp="terminal"
                linesClassName="font-mono text-gray-500 [&_span]:opacity-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
