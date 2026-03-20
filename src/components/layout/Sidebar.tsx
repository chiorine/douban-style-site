type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return <aside className="space-y-6">{children}</aside>;
}