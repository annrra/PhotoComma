import { ViewProvider } from '@/src/context/ViewContext/ViewContext';

export default function DefualtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewProvider>
      {children}
    </ViewProvider>
  );
}
