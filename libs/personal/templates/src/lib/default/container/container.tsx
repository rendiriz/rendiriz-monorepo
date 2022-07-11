import { Loading } from '../loading/loading';
import { Cursor } from '../cursor/cursor';
import { Logo } from '../logo/logo';
import { Menu } from '../menu/menu';
import { MenuClose } from '../menu-close/menu-close';
import { MainMenu } from '../main-menu/main-menu';
import { Footer } from '../footer/footer';

export interface DefaultContainerProps {
  children: React.ReactNode;
}

export function DefaultContainer({ children }: DefaultContainerProps) {
  return (
    <>
      <Cursor />
      <Logo />
      <Loading />
      <MenuClose />
      <Menu />
      <MainMenu />
      {children}
    </>
  );
}

export default DefaultContainer;
