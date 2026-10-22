import AosInit from "@/components/aos-init";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import navigation from "@/data/navigation.json";
import footer from "@/data/footer.json";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AosInit />

      <editable-component data-component="header" data-prop="@data[navigation]">
        <Header {...navigation} />
      </editable-component>

      <main className="grow">{children}</main>

      <editable-component data-component="footer" data-prop="@data[footer]">
        <Footer {...footer} />
      </editable-component>
    </>
  );
}
