export interface BlankContainerProps {
  children: React.ReactNode;
}

export function BlankContainer({ children }: BlankContainerProps) {
  return <div>{children}</div>;
}

export default BlankContainer;
