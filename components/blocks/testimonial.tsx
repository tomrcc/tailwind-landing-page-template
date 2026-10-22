import Image from "next/image";

export type TestimonialProps = {
  image?: string | null;
  image_alt?: string | null;
  quote?: string | null;
  name?: string | null;
  role?: string | null;
  role_link?: string | null;
};

export default function Testimonial({
  image,
  image_alt,
  quote,
  name,
  role,
  role_link,
}: TestimonialProps) {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            <div className="relative inline-flex">
              <svg
                className="absolute -left-6 -top-2 -z-10"
                width={40}
                height={49}
                viewBox="0 0 40 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
                  fill="#D1D5DB"
                />
              </svg>
              {image && (
                <Image
                  className="rounded-full"
                  src={image}
                  width={48}
                  height={48}
                  alt={image_alt ?? ""}
                  data-editable="image"
                  data-prop-src="image"
                  data-prop-alt="image_alt"
                />
              )}
            </div>
            {quote && (
              <p className="text-2xl font-bold text-gray-900 [&_em]:italic [&_em]:text-gray-500">
                “
                <span
                  data-editable="text"
                  data-type="text"
                  data-prop="quote"
                  dangerouslySetInnerHTML={{ __html: quote }}
                />
                ”
              </p>
            )}
            <div className="text-sm font-medium text-gray-500">
              <span
                className="text-gray-700"
                data-editable="text"
                data-prop="name"
              >
                {name}
              </span>{" "}
              <span className="text-gray-400">/</span>{" "}
              <a className="text-blue-500" href={role_link ?? "#0"}>
                <editable-text data-prop="role">{role}</editable-text>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
