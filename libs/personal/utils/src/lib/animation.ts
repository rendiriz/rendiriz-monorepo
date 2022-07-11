import { gsap } from 'gsap';
import {
  LOADING_BACKGROUND,
  LOADING_LETTER,
} from '@rendiriz-ecosystem/personal/constants';

export const toClass = (className: string) => `.${className}`;
export const getSel = (className: string) => {
  return document.querySelector(toClass(className));
};
export const getSelAll = (className: string) => {
  return document.querySelectorAll(toClass(className));
};

export const animationLoadingInitialStart = ({
  loadingBackground,
  loadingLogo,
  loadingLogoLetter,
}: any) => {
  const loadingBackgroundSel = getSel(loadingBackground);
  const loadingLogoSel = getSel(loadingLogo);
  const loadingLogoLetterSel = getSelAll(loadingLogoLetter);

  const tl = gsap.timeline();
  tl.fromTo(
    loadingBackgroundSel,
    {
      height: '0%',
    },
    {
      delay: LOADING_BACKGROUND,
      height: '100%',
      duration: LOADING_BACKGROUND,
    },
  );
  tl.fromTo(
    loadingLogoLetterSel,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      stagger: 0.2,
      y: 0,
      top: 0,
    },
  );
  tl.to(loadingLogoSel, {
    duration: 1,
    top: 0,
  });

  return tl;
};

export const animationLoadingInitialEnd = ({
  loadingBackground,
  loadingMenuLine,
}: any) => {
  const loadingBackgroundSel = getSel(loadingBackground);
  const loadingMenuLineSel = getSelAll(loadingMenuLine);

  const tl = gsap.timeline();
  tl.fromTo(
    loadingBackgroundSel,
    {
      height: '100%',
    },
    {
      height: '0%',
      duration: LOADING_BACKGROUND + 1,
    },
  );

  const MenuLine = gsap.fromTo(
    loadingMenuLineSel,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: LOADING_LETTER,
    },
  );

  tl.add([MenuLine], '>');

  return tl;
};

export const animationLoadingRouterStart = ({
  loadingBackground,
  loadingText,
  loadingLetter,
}: any) => {
  const loadingBackgroundSel = getSel(loadingBackground);
  const loadingTextSel = getSel(loadingText);
  const loadingLetterSel = getSelAll(loadingLetter);

  const tl = gsap.timeline();
  tl.fromTo(
    loadingBackgroundSel,
    {
      height: '0%',
    },
    {
      height: '100%',
      duration: LOADING_BACKGROUND,
    },
  );
  tl.fromTo(
    loadingTextSel,
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  );
  tl.fromTo(
    loadingLetterSel,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      stagger: LOADING_LETTER,
      y: 0,
    },
  );

  return tl;
};

export const animationLoadingRouterlEnd = ({
  loadingBackground,
  loadingText,
  loadingLetter,
  loadingLogoLetter,
  loadingMenuLine,
}: any) => {
  const loadingBackgroundSel = getSel(loadingBackground);
  const loadingTextSel = getSel(loadingText);
  const loadingLetterSel = getSelAll(loadingLetter);
  const loadingLogoLetterSel = getSelAll(loadingLogoLetter);
  const loadingMenuLineSel = getSelAll(loadingMenuLine);

  const tl = gsap.timeline();
  tl.fromTo(
    loadingLetterSel,
    {
      y: 0,
    },
    {
      delay: LOADING_BACKGROUND * 2 + loadingLetterSel.length * LOADING_LETTER,
      opacity: 0,
      stagger: LOADING_LETTER,
      y: -50,
    },
  );
  tl.fromTo(
    loadingTextSel,
    {
      opacity: 1,
    },
    {
      opacity: 0,
    },
  );
  tl.fromTo(
    loadingBackgroundSel,
    {
      height: '100%',
    },
    {
      height: '0%',
      duration: LOADING_BACKGROUND,
    },
  );

  const logoLetter = gsap.fromTo(
    loadingLogoLetterSel,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      stagger: LOADING_LETTER,
      y: 0,
    },
  );
  const MenuLine = gsap.fromTo(
    loadingMenuLineSel,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: LOADING_LETTER,
    },
  );

  tl.add([logoLetter, MenuLine], '>');

  return tl;
};

export const animationMenuStart = ({
  menuButton,
  menuClose,
  menuCloseButton,
  menuCloseMainMenu,
  content,
  mainMenu,
  mainMenuBackground,
  logoLetter,
  mainMenuItemPrimary,
  mainMenuLetterPrimary,
  mainMenuItemSecondary,
  mainMenuLetterSecondary,
}: any) => {
  const menuButtonSel = getSel(menuButton);
  const menuCloseSel = getSel(menuClose);
  const menuCloseButtonSel = getSel(menuCloseButton);
  const contentSel = getSel(content);
  const mainMenuSel = getSel(mainMenu);
  const mainMenuBackgroundSel = getSel(mainMenuBackground);
  const logoLetterSel = getSelAll(logoLetter);
  const mainMenuItemPrimarySel = getSelAll(mainMenuItemPrimary);
  const mainMenuItemSecondarySel = getSelAll(mainMenuItemSecondary);

  // (menuCloseButtonSel as HTMLElement).style.background = 'transparent';
  // (menuButtonSel as HTMLElement).style.background = 'transparent';

  const mouseoverEvent = new Event('mouseenter');
  menuCloseSel?.dispatchEvent(mouseoverEvent);
  menuCloseSel?.classList.add(menuCloseMainMenu);

  const tl = gsap.timeline();

  const menuButtonAni = gsap.fromTo(
    menuButtonSel,
    {
      opacity: 1,
    },
    {
      opacity: 0,
    },
  );

  const contentAni = gsap.fromTo(
    contentSel,
    {
      width: '100%',
      overflow: 'hidden',
      opacity: 1,
    },
    {
      x: '-100%',
      overflow: 'hidden',
      duration: 0.9,
      ease: 'power1.in',
      opacity: 0,
    },
  );

  const mainMenuAni = gsap.to(mainMenuSel, {
    pointerEvents: 'auto',
    visibility: 'visible',
    duration: 0.8,
  });

  const mainMenuBackgroundAni = gsap.to(mainMenuBackgroundSel, {
    width: '100%',
    duration: 0.8,
    ease: 'power1.in',
  });

  tl.add([menuButtonAni, contentAni, mainMenuAni, mainMenuBackgroundAni], '<');

  const logoLetterAni = gsap.fromTo(
    logoLetterSel,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.1,
    },
  );

  const primary = Array.from(mainMenuItemPrimarySel).map((item: any) => {
    return item.querySelectorAll(toClass(mainMenuLetterPrimary));
  });

  const primaryAni = primary.map((item: any) => {
    return gsap.fromTo(
      item,
      {
        opacity: 0,
        x: 150,
      },
      {
        opacity: 1,
        stagger: 0.1,
        x: 0,
      },
    );
  });

  const secondary = Array.from(mainMenuItemSecondarySel).map((item: any) => {
    return item.querySelectorAll(toClass(mainMenuLetterSecondary));
  });

  const secondaryAni = secondary.map((item: any) => {
    return gsap.fromTo(
      item,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        stagger: 0.1,
        x: 0,
      },
    );
  });

  tl.add([logoLetterAni, ...primaryAni, ...secondaryAni], '>');

  // tl.eventCallback('onComplete', function () {
  //   (menuCloseButtonSel as HTMLElement).style.pointerEvents = 'auto';
  //   (menuButtonSel as HTMLElement).style.pointerEvents = 'none';
  // });

  return tl;
};

export const animationMenuEnd = ({
  menuButton,
  menuClose,
  menuCloseButton,
  menuCloseMainMenu,
  content,
  mainMenu,
  mainMenuBackground,
  logoLetter,
  mainMenuItemPrimary,
  mainMenuLetterPrimary,
  mainMenuItemSecondary,
  mainMenuLetterSecondary,
}: any) => {
  const menuButtonSel = getSel(menuButton);
  const menuCloseSel = getSel(menuClose);
  const menuCloseButtonSel = getSel(menuCloseButton);
  const contentSel = getSel(content);
  const mainMenuSel = getSel(mainMenu);
  const mainMenuBackgroundSel = getSel(mainMenuBackground);
  const logoLetterSel = getSelAll(logoLetter);
  const mainMenuItemPrimarySel = getSelAll(mainMenuItemPrimary);
  const mainMenuItemSecondarySel = getSelAll(mainMenuItemSecondary);

  menuCloseSel?.classList.remove(menuCloseMainMenu);

  const tl = gsap.timeline();

  const menuButtonAni = gsap.fromTo(
    menuButtonSel,
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  );

  const primary = Array.from(mainMenuItemPrimarySel).map((item: any) => {
    return [].slice
      .call(item.querySelectorAll(toClass(mainMenuLetterPrimary)), 0)
      .reverse();
  });

  const primaryAni = primary.map((item: any) => {
    return gsap.fromTo(
      item,
      {
        opacity: 1,
        x: 0,
      },
      {
        opacity: 0,
        stagger: 0.1,
        x: 150,
      },
    );
  });

  const secondary = Array.from(mainMenuItemSecondarySel).map((item: any) => {
    return [].slice
      .call(item.querySelectorAll(toClass(mainMenuLetterSecondary)), 0)
      .reverse();
  });

  const secondaryAni = secondary.map((item: any) => {
    return gsap.fromTo(
      item,
      {
        opacity: 1,
        x: 0,
      },
      {
        opacity: 0,
        stagger: 0.1,
        x: 100,
      },
    );
  });

  tl.add([menuButtonAni, ...primaryAni, ...secondaryAni], '<');

  const contentAni = gsap.to(contentSel, {
    x: '0%',
    overflow: 'hidden',
    duration: 0.9,
    ease: 'power1.out',
    opacity: 1,
  });

  const mainMenuBackgroundAni = gsap.to(mainMenuBackgroundSel, {
    width: '0%',
    duration: 0.8,
    ease: 'power1.out',
  });

  tl.add([contentAni, mainMenuBackgroundAni], '>');

  const logoLetterAni = gsap.fromTo(
    logoLetterSel,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.1,
    },
  );

  tl.add([logoLetterAni], '>');

  tl.to(mainMenuSel, {
    pointerEvents: 'none',
    visibility: 'hidden',
  });

  // tl.eventCallback('onComplete', function () {
  //   (menuCloseButtonSel as HTMLElement).style.background = '';
  //   (menuCloseButtonSel as HTMLElement).style.pointerEvents = 'none';
  //   (menuButtonSel as HTMLElement).style.background = '';
  //   (menuButtonSel as HTMLElement).style.pointerEvents = 'auto';
  // });

  return tl;
};
