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
}: any) => {
  const loadingBackgroundSel = getSel(loadingBackground);
  const loadingTextSel = getSel(loadingText);
  const loadingLetterSel = getSelAll(loadingLetter);

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
}: any) => {
  const loadingBackgroundSel = getSel(loadingBackground);
  const loadingTextSel = getSel(loadingText);
  const loadingLetterSel = getSelAll(loadingLetter);

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

  return tl;
};
