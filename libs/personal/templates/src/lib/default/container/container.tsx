import { Loading } from '../loading/loading';
import { Cursor } from '../cursor/cursor';
import { Logo } from '../logo/logo';
import { Menu } from '../menu/menu';
import { MenuClose } from '../menu-close/menu-close';
import { MainMenu } from '../main-menu/main-menu';

export interface DefaultContainerProps {
  children: React.ReactNode;
}

export function DefaultContainer({ children }: DefaultContainerProps) {
  return (
    <>
      <Loading />
      <Cursor />
      <Logo />
      <MenuClose />
      <Menu />
      <MainMenu />
      {children}
    </>
  );
}

export default DefaultContainer;