import classNames from 'classnames';

export function MainMenu() {
  return (
    <div
      className={classNames(
        'main-menu',
        'w-full h-full fixed top-0 left-0 z-[9] pointer-events-none invisible overflow-hidden',
      )}
    >
      <div
        className={classNames(
          'main-menu-background',
          'bg-sky-100 dark:bg-sky-700 absolute w-0 h-full top-0 right-0',
        )}
      >
        asd
      </div>
    </div>
  );
}

export default MainMenu;
