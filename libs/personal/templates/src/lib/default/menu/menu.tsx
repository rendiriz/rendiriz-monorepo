import { useCallback } from 'react';
import classNames from 'classnames';
import { animationMenuStart } from '@rendiriz-ecosystem/personal/utils';
import { useTimelineMenu } from '@rendiriz-ecosystem/personal/contexts';

// Styles
import styles from './menu.module.scss';
import stylesMainMenu from '../main-menu/main-menu.module.scss';
import stylesMenuClose from '../menu-close/menu-close.module.scss';
import stylesLogo from '../logo/logo.module.scss';

export function Menu() {
  const { timelineEnd, handleTimelineStart } = useTimelineMenu();

  const handleButtonClick = useCallback(() => {
    if (timelineEnd) {
      timelineEnd.kill();
    }

    const tl = animationMenuStart({
      menuButton: styles.button,
      menuClose: stylesMenuClose.main,
      menuCloseButton: stylesMenuClose.button,
      menuCloseMainMenu: stylesMenuClose.mainMenu,
      content: 'content',
      mainMenu: stylesMainMenu.main,
      mainMenuBackground: stylesMainMenu.background,
      logoLetter: stylesLogo.letter,
      mainMenuItemPrimary: stylesMainMenu.itemPrimary,
      mainMenuLetterPrimary: stylesMainMenu.letterPrimary,
      mainMenuItemSecondary: stylesMainMenu.itemSecondary,
      mainMenuLetterSecondary: stylesMainMenu.letterSecondary,
    });

    handleTimelineStart(tl);
  }, [timelineEnd, handleTimelineStart]);

  return (
    <nav className={classNames(styles.main, 'link-hover')}>
      <div className={classNames(styles.text)}>
        <svg
          width="143"
          height="142"
          viewBox="0 0 143 142"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M26.3121 21.7437C26.8612 22.2928 27.2328 22.8653 27.427 23.4612C27.6195 24.0555 27.6471 24.6339 27.5098 25.1964C27.3726 25.7555 27.0821 26.2569 26.6385 26.7005C26.1932 27.1458 25.6902 27.4379 25.1294 27.5768C24.5686 27.7124 23.9902 27.6831 23.3943 27.4889C22.7983 27.2948 22.2266 26.924 21.6792 26.3766C21.1301 25.8275 20.7594 25.2558 20.5668 24.6615C20.3727 24.0656 20.3442 23.488 20.4815 22.9289C20.6187 22.3664 20.91 21.8626 21.3553 21.4173C21.7989 20.9737 22.3011 20.684 22.8619 20.5485C23.4227 20.4095 24.0011 20.4371 24.597 20.6313C25.1913 20.8238 25.763 21.1946 26.3121 21.7437ZM25.5437 22.5121C25.1252 22.0936 24.705 21.809 24.2832 21.6583C23.8613 21.5043 23.4596 21.4708 23.0779 21.5579C22.6962 21.6416 22.358 21.8308 22.0634 22.1254C21.7671 22.4217 21.5771 22.7607 21.4934 23.1423C21.408 23.5224 21.4415 23.9241 21.5939 24.3476C21.7462 24.7678 22.0316 25.1872 22.4501 25.6057C22.8686 26.0242 23.2888 26.3104 23.7107 26.4644C24.1325 26.6151 24.5343 26.6486 24.9159 26.5649C25.296 26.4795 25.6341 26.2887 25.9304 25.9924C26.225 25.6977 26.415 25.3604 26.5004 24.9804C26.5858 24.5971 26.5523 24.1953 26.4 23.7751C26.2476 23.3516 25.9622 22.9306 25.5437 22.5121Z" />
          <path d="M31.7144 21.979L27.3376 16.1707L29.4079 14.6106C29.8598 14.2701 30.2961 14.0702 30.7169 14.011C31.1377 13.9519 31.5294 14.0094 31.892 14.1838C32.2532 14.3563 32.5677 14.6202 32.8356 14.9757C33.1048 15.333 33.2724 15.7107 33.3381 16.1088C33.4044 16.5035 33.3508 16.8966 33.1775 17.2881C33.0046 17.6763 32.6931 18.04 32.2431 18.379L30.8194 19.4519L30.2595 18.7088L31.6038 17.6958C31.8893 17.4807 32.0839 17.257 32.1875 17.0248C32.2897 16.7906 32.3176 16.5562 32.2711 16.3214C32.2247 16.0867 32.1188 15.8597 31.9535 15.6403C31.7883 15.421 31.5999 15.2576 31.3885 15.1502C31.1771 15.0427 30.9452 15.0084 30.693 15.0473C30.4426 15.0848 30.1718 15.2133 29.8806 15.4327L28.7802 16.2619L32.5907 21.3186L31.7144 21.979Z" />
          <path d="M39.1551 16.8422L35.6292 10.4814L39.6172 8.2708L40.0751 9.09697L37.0469 10.7756L38.1212 12.7136L40.9413 11.1504L41.3976 11.9735L38.5774 13.5367L39.6569 15.4841L42.7224 13.7848L43.1804 14.611L39.1551 16.8422Z" />
          <path d="M48.8301 4.41774L51.4364 11.2074L50.4949 11.5688L45.1322 7.91409L45.0692 7.93827L46.9807 12.9178L45.9563 13.311L43.3499 6.52137L44.2981 6.1574L49.6666 9.81751L49.7296 9.79333L47.8156 4.80716L48.8301 4.41774Z" />
          <path d="M63.0251 2.18521L62.9427 1.2442L68.5499 0.753643L68.6322 1.69465L66.3717 1.89242L66.9232 8.19647L65.8336 8.29179L65.2821 1.98775L63.0251 2.18521Z" />
          <path d="M71.8511 7.97869L72.2317 0.715934L73.3275 0.773362L73.1621 3.92954L76.7829 4.1193L76.9483 0.963117L78.0476 1.02073L77.667 8.28349L76.5677 8.22588L76.7336 5.05906L73.1129 4.8693L72.9469 8.03612L71.8511 7.97869Z" />
          <path d="M81.8407 8.87853L83.2284 1.73942L87.7043 2.60944L87.5241 3.53669L84.1253 2.87604L83.7025 5.05124L86.8677 5.66649L86.6881 6.59025L83.5229 5.975L83.0981 8.16065L86.5387 8.82943L86.3584 9.75668L81.8407 8.87853Z" />
          <path d="M100.686 7.02219L101.873 7.62676L101.369 13.7151L101.445 13.7538L106.075 9.76774L107.261 10.3723L103.96 16.8524L103.029 16.3784L105.419 11.6892L105.358 11.6586L101.063 15.3645L100.291 14.9711L100.766 9.31451L100.706 9.28388L98.3149 13.9762L97.3846 13.5022L100.686 7.02219Z" />
          <path d="M106.412 18.5234L110.583 12.5659L114.318 15.1812L113.776 15.955L110.94 13.9691L109.669 15.7842L112.31 17.6337L111.771 18.4045L109.129 16.5551L107.852 18.379L110.723 20.3894L110.182 21.1631L106.412 18.5234Z" />
          <path d="M121.82 21.773L116.86 27.0919L116.122 26.4041L117.056 19.982L117.007 19.936L113.369 23.8369L112.567 23.0886L117.527 17.7696L118.27 18.4623L117.333 24.892L117.383 24.938L121.025 21.0319L121.82 21.773Z" />
          <path d="M127.53 28.3792L128.223 29.2347L124.505 32.245C124.11 32.5653 123.684 32.7562 123.228 32.8177C122.774 32.8777 122.323 32.8101 121.876 32.615C121.43 32.4183 121.024 32.0937 120.658 31.6411C120.293 31.1903 120.06 30.7266 119.961 30.2499C119.863 29.7716 119.89 29.3167 120.043 28.885C120.198 28.4519 120.474 28.0752 120.869 27.7548L124.587 24.7446L125.277 25.5973L121.629 28.5517C121.373 28.7588 121.191 28.9989 121.083 29.2721C120.977 29.5471 120.951 29.8347 121.005 30.135C121.061 30.4337 121.205 30.7257 121.436 31.0109C121.668 31.2979 121.925 31.4999 122.205 31.6169C122.489 31.7343 122.775 31.7677 123.063 31.7172C123.353 31.6685 123.626 31.5407 123.881 31.3336L127.53 28.3792Z" />
          <path d="M137.091 57.2973C136.341 57.4983 135.659 57.5339 135.046 57.4041C134.435 57.2737 133.92 57.0084 133.502 56.6083C133.086 56.2099 132.797 55.7076 132.635 55.1016C132.472 54.4934 132.471 53.9117 132.631 53.3565C132.794 52.8031 133.108 52.3168 133.574 51.8978C134.04 51.4788 134.647 51.1691 135.395 50.9687C136.145 50.7678 136.826 50.7325 137.437 50.8629C138.05 50.9927 138.564 51.2568 138.98 51.6553C139.398 52.0554 139.689 52.5596 139.852 53.1679C140.014 53.7738 140.014 54.3536 139.851 54.907C139.691 55.4622 139.378 55.9493 138.912 56.3683C138.448 56.7867 137.841 57.0964 137.091 57.2973ZM136.81 56.2477C137.381 56.0945 137.838 55.8729 138.179 55.5829C138.524 55.2946 138.753 54.9634 138.869 54.5893C138.987 54.2169 138.993 53.8295 138.885 53.427C138.776 53.0223 138.578 52.6882 138.289 52.4249C138.003 52.161 137.638 51.9891 137.195 51.9093C136.755 51.8311 136.249 51.8686 135.677 52.0218C135.106 52.175 134.648 52.3957 134.303 52.6841C133.962 52.9741 133.732 53.3053 133.614 53.6777C133.498 54.0494 133.494 54.4377 133.602 54.8425C133.71 55.2449 133.907 55.5781 134.194 55.8421C134.483 56.1077 134.848 56.2796 135.288 56.3577C135.731 56.4376 136.238 56.4009 136.81 56.2477Z" />
          <path d="M134.186 61.8579L141.404 60.9716L141.72 63.5446C141.789 64.1062 141.744 64.584 141.585 64.978C141.426 65.372 141.18 65.6825 140.848 65.9093C140.518 66.1359 140.132 66.2763 139.69 66.3305C139.246 66.3851 138.835 66.3413 138.458 66.1992C138.083 66.0592 137.769 65.8163 137.517 65.4704C137.267 65.1266 137.108 64.6751 137.039 64.1158L136.822 62.3464L137.745 62.233L137.951 63.9037C137.994 64.2585 138.091 64.5389 138.24 64.7448C138.392 64.9504 138.581 65.0917 138.807 65.1689C139.034 65.246 139.283 65.2678 139.556 65.2344C139.828 65.2009 140.064 65.1195 140.263 64.9901C140.462 64.8608 140.607 64.6771 140.7 64.4392C140.792 64.2036 140.817 63.9048 140.772 63.543L140.604 62.1754L134.32 62.947L134.186 61.8579Z" />
          <path d="M134.914 70.8701L142.186 70.997L142.106 75.556L141.162 75.5395L141.222 72.0777L139.007 72.039L138.95 75.263L138.009 75.2465L138.066 72.0226L135.839 71.9837L135.778 75.4882L134.834 75.4717L134.914 70.8701Z" />
          <path d="M140.836 85.4612L133.653 84.3235L133.811 83.3274L139.657 80.5106L139.668 80.4439L134.4 79.6096L134.571 78.5258L141.755 79.6635L141.596 80.6666L135.742 83.4858L135.731 83.5525L141.006 84.388L140.836 85.4612Z" />
          <path d="M135.672 98.8707L136.528 99.2699L134.149 104.371L133.293 103.972L134.252 101.915L128.517 99.2409L128.979 98.2496L134.715 100.924L135.672 98.8707Z" />
          <path d="M126.242 103.617L132.342 107.579L131.744 108.499L129.093 106.777L127.119 109.818L129.769 111.54L129.17 112.463L123.07 108.502L123.67 107.579L126.329 109.306L128.304 106.265L125.645 104.538L126.242 103.617Z" />
          <path d="M120.468 111.819L125.957 116.59L122.965 120.031L122.252 119.411L124.524 116.798L122.852 115.345L120.736 117.778L120.026 117.161L122.141 114.727L120.461 113.266L118.161 115.912L117.449 115.292L120.468 111.819Z" />
          <path d="M112.653 129.068L111.536 129.793L106.515 126.313L106.444 126.359L107.581 132.361L106.464 133.087L102.503 126.987L103.379 126.419L106.245 130.832L106.302 130.796L105.24 125.223L105.967 124.751L110.628 127.99L110.685 127.954L107.816 123.537L108.692 122.968L112.653 129.068Z" />
          <path d="M99.83 128.275L102.904 134.867L98.7711 136.794L98.3719 135.938L101.51 134.474L100.573 132.466L97.651 133.829L97.2533 132.976L100.176 131.613L99.2347 129.595L96.0581 131.076L95.6589 130.22L99.83 128.275Z" />
          <path d="M89.3115 139.995L87.1852 133.04L88.1496 132.745L93.2443 136.765L93.3088 136.745L91.7493 131.644L92.7987 131.324L94.925 138.278L93.9538 138.575L88.8537 134.55L88.7891 134.569L90.3507 139.677L89.3115 139.995Z" />
          <path d="M80.7351 141.636L79.6478 141.808L78.8995 137.084C78.8199 136.581 78.8674 136.117 79.0421 135.692C79.2171 135.268 79.501 134.912 79.8938 134.622C80.2868 134.334 80.771 134.145 81.3462 134.054C81.9191 133.963 82.4369 133.994 82.8996 134.146C83.3627 134.3 83.7429 134.552 84.0402 134.9C84.3378 135.251 84.5264 135.677 84.6061 136.18L85.3543 140.905L84.2705 141.076L83.5362 136.44C83.4847 136.114 83.3676 135.837 83.185 135.607C83 135.377 82.7639 135.211 82.4767 135.108C82.1899 135.007 81.8653 134.986 81.5029 135.043C81.1381 135.101 80.8349 135.222 80.5933 135.406C80.3497 135.594 80.1777 135.825 80.0774 136.099C79.9748 136.374 79.9492 136.674 80.0007 136.999L80.7351 141.636Z" />
          <path d="M50.9112 135.457C51.1122 134.707 51.4222 134.099 51.8412 133.633C52.2596 133.169 52.7467 132.856 53.3024 132.694C53.8553 132.533 54.4347 132.534 55.0407 132.696C55.649 132.859 56.1535 133.149 56.5542 133.565C56.952 133.983 57.2158 134.499 57.3457 135.112C57.4755 135.725 57.4402 136.405 57.2398 137.153C57.0388 137.903 56.7291 138.51 56.3107 138.974C55.8917 139.44 55.4058 139.754 54.8529 139.914C54.2972 140.077 53.7152 140.076 53.1069 139.913C52.5009 139.751 51.999 139.461 51.6012 139.043C51.2004 138.627 50.9352 138.112 50.8054 137.499C50.675 136.888 50.7102 136.208 50.9112 135.457ZM51.9608 135.739C51.8077 136.31 51.7713 136.817 51.8517 137.257C51.9293 137.7 52.1012 138.064 52.3674 138.351C52.6307 138.64 52.9636 138.838 53.3661 138.946C53.7708 139.055 54.1594 139.05 54.5318 138.931C54.9036 138.815 55.2348 138.585 55.5254 138.242C55.8131 137.9 56.0336 137.443 56.1868 136.871C56.3399 136.299 56.3778 135.792 56.3002 135.35C56.2198 134.909 56.0479 134.545 55.7845 134.256C55.5206 133.97 55.1863 133.772 54.7815 133.664C54.379 133.556 53.9919 133.56 53.6201 133.676C53.2455 133.794 52.9143 134.024 52.6265 134.366C52.3359 134.709 52.114 135.167 51.9608 135.739Z" />
          <path d="M48.4138 130.661L45.5722 137.356L43.1859 136.343C42.6651 136.122 42.2738 135.844 42.0122 135.509C41.7505 135.174 41.6045 134.806 41.5742 134.405C41.543 134.006 41.6143 133.602 41.7882 133.192C41.9631 132.78 42.2064 132.446 42.5182 132.19C42.827 131.935 43.1942 131.785 43.6199 131.74C44.0425 131.695 44.5132 131.783 45.0318 132.003L46.6728 132.7L46.3093 133.556L44.7598 132.898C44.4308 132.759 44.1398 132.702 43.8868 132.729C43.6329 132.757 43.416 132.85 43.2359 133.008C43.0558 133.165 42.9122 133.371 42.8049 133.623C42.6975 133.876 42.6502 134.121 42.6628 134.358C42.6755 134.595 42.7617 134.813 42.9216 135.012C43.0792 135.21 43.3259 135.38 43.6615 135.522L44.9298 136.061L47.4038 130.232L48.4138 130.661Z" />
          <path d="M40.2452 126.786L36.4995 133.02L32.5911 130.671L33.0776 129.862L36.0454 131.645L37.1867 129.745L34.4228 128.085L34.9075 127.278L37.6714 128.939L38.8181 127.03L35.8138 125.225L36.3003 124.415L40.2452 126.786Z" />
          <path d="M24.6477 124.619L29.2246 118.967L30.0084 119.602L29.5246 126.073L29.577 126.116L32.9337 121.971L33.7865 122.661L29.2096 128.313L28.4203 127.674L28.9058 121.195L28.8533 121.152L25.4922 125.303L24.6477 124.619Z" />
          <path d="M15.6171 113.442L14.8433 113.984L11.6149 109.373L12.3887 108.832L13.6902 110.69L18.8739 107.061L19.5013 107.957L14.3176 111.586L15.6171 113.442Z" />
          <path d="M16.2209 102.902L9.74082 106.204L9.24266 105.226L12.0587 103.791L10.4127 100.561L7.59662 101.995L7.09684 101.015L13.5769 97.7128L14.0767 98.6936L11.2511 100.133L12.8972 103.364L15.7227 101.924L16.2209 102.902Z" />
          <path d="M12.0056 93.801L5.12911 96.1687L3.64463 91.8575L4.53777 91.55L5.665 94.8237L7.76018 94.1023L6.71041 91.0535L7.60019 90.7471L8.64996 93.7959L10.7552 93.071L9.61411 89.757L10.5073 89.4494L12.0056 93.801Z" />
          <path d="M0.975147 78.4082L0.905453 77.0784L6.42994 74.4703L6.42548 74.3852L0.658641 72.3689L0.588947 71.0391L7.85171 70.6584L7.90635 71.7011L2.65078 71.9765L2.65431 72.0439L8.01149 73.9109L8.05684 74.7762L2.92062 77.1932L2.92415 77.2606L8.18327 76.985L8.23791 78.0276L0.975147 78.4082Z" />
          <path d="M8.07291 67.6993L0.827859 67.0654L1.22526 62.5231L2.16627 62.6055L1.8645 66.0546L4.07198 66.2478L4.35301 63.0356L5.29048 63.1176L5.00945 66.3298L7.22754 66.5238L7.53302 63.0322L8.47403 63.1145L8.07291 67.6993Z" />
          <path d="M3.18271 52.7304L10.269 54.3664L10.0422 55.3491L4.01348 57.7512L3.9983 57.8169L9.19541 59.0168L8.94857 60.086L1.86224 58.45L2.0907 57.4604L8.12711 55.0564L8.14229 54.9906L2.93826 53.7892L3.18271 52.7304Z" />
          <path d="M6.04887 44.4821L6.44338 43.4544L10.909 45.1686C11.3842 45.351 11.7624 45.6242 12.0436 45.9883C12.3226 46.3515 12.4895 46.7757 12.5442 47.2607C12.5967 47.7449 12.5186 48.2589 12.3099 48.8026C12.102 49.3441 11.8166 49.7772 11.4535 50.1019C11.0883 50.4258 10.6805 50.6293 10.2302 50.7126C9.77758 50.795 9.31369 50.745 8.8385 50.5625L4.37283 48.8483L4.76607 47.8239L9.14886 49.5063C9.45607 49.6242 9.75491 49.6616 10.0454 49.6184C10.3367 49.573 10.5988 49.4517 10.8317 49.2546C11.0624 49.0566 11.2435 48.7863 11.375 48.4437C11.5073 48.0989 11.554 47.7758 11.5151 47.4743C11.4747 47.1697 11.3607 46.9053 11.1729 46.6811C10.9859 46.4546 10.7389 46.2824 10.4317 46.1645L6.04887 44.4821Z" />
        </svg>
      </div>
      <button
        type="button"
        className={classNames(styles.button)}
        onClick={handleButtonClick}
      >
        <div className={classNames(styles.box)}>
          <div className={classNames(styles.line, styles.first)} />
          <div className={classNames(styles.line, styles.second)} />
          <div className={classNames(styles.line, styles.third)} />
        </div>
      </button>
    </nav>
  );
}

export default Menu;
