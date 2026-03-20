type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="border-b border-stone-200 pb-3">
      <h2 className="text-base font-semibold tracking-tight text-stone-800">
        {title}
      </h2>
    </div>
  );
}