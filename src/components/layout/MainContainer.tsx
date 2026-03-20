type MainContainerProps = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: MainContainerProps) {
  return <div className="mx-auto w-full max-w-[1100px] px-4">{children}</div>;
}