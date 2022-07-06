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
      delay: LOADING_BACKGROUND,
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

export const animationLoadingInitialEnd = ({
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
      opacity: 1,
      y: 0,
    },
    {
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
      y: 50,
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
      y: 50,
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
  menuClose,
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
  const menuCloseSel = getSel(menuClose);
  const contentSel = getSel(content);
  const mainMenuSel = getSel(mainMenu);
  const mainMenuBackgroundSel = getSel(mainMenuBackground);
  const logoLetterSel = getSelAll(logoLetter);
  const mainMenuItemPrimarySel = getSelAll(mainMenuItemPrimary);
  const mainMenuItemSecondarySel = getSelAll(mainMenuItemSecondary);

  const mouseoverEvent = new Event('mouseenter');
  menuCloseSel?.dispatchEvent(mouseoverEvent);
  menuCloseSel?.classList.add(menuCloseMainMenu);

  const tl = gsap.timeline();

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

  tl.add([contentAni, mainMenuAni, mainMenuBackgroundAni], '<');

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
};

export const animationMenuEnd = ({
  menuClose,
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
  const menuCloseSel = getSel(menuClose);
  const contentSel = getSel(content);
  const mainMenuSel = getSel(mainMenu);
  const mainMenuBackgroundSel = getSel(mainMenuBackground);
  const logoLetterSel = getSelAll(logoLetter);
  const mainMenuItemPrimarySel = getSelAll(mainMenuItemPrimary);
  const mainMenuItemSecondarySel = getSelAll(mainMenuItemSecondary);

  menuCloseSel?.classList.remove(menuCloseMainMenu);

  const tl = gsap.timeline();

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

  tl.add([...primaryAni, ...secondaryAni], '<');

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
};
