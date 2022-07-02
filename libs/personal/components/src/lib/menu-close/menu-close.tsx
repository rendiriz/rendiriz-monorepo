import { useCallback } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import styles from './menu-close.module.scss';

export function MenuClose() {
  const handleButtonClick = useCallback(() => {
    const activeLinks = document.querySelector(`.${styles.main}`);

    activeLinks?.classList.remove(styles.mainMenu);

    const logo = document.querySelector(`.logo`);
    const content = document.querySelector(`.content`);
    const mainMenu = document.querySelector(`.main-menu`);
    const mainMenuBg = document.querySelector(`.main-menu-background`);

    gsap.to(logo, {
      opacity: 0,
    });

    gsap.to(content, {
      x: '0%',
      duration: 0.9,
      ease: 'power1.out',
      opacity: 1,
    });

    gsap.to(mainMenu, {
      pointerEvents: 'none',
      visibility: 'hidden',
      delay: 0.8,
    });

    gsap.to(mainMenuBg, {
      width: '0',
      duration: 0.8,
      ease: 'power1.out',
    });
  }, []);

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
          <path d="M21.6181 24.5805L20.8971 25.4217C20.6896 25.3 20.4798 25.2246 20.2677 25.1956C20.0556 25.1666 19.8472 25.1751 19.6426 25.221C19.4379 25.267 19.2435 25.3483 19.0594 25.4649C18.8769 25.5796 18.7101 25.7251 18.5591 25.9013C18.2864 26.2194 18.1222 26.5729 18.0665 26.9617C18.0123 27.3486 18.0774 27.7474 18.2618 28.158C18.4477 28.5668 18.7635 28.9623 19.2093 29.3443C19.6587 29.7295 20.0996 29.9827 20.532 30.1039C20.966 30.2233 21.3699 30.2249 21.7438 30.1089C22.1177 29.9928 22.4394 29.7775 22.709 29.4629C22.8585 29.2886 22.9768 29.1032 23.0641 28.9067C23.1512 28.7069 23.2027 28.5032 23.2186 28.2954C23.2345 28.0877 23.2128 27.882 23.1535 27.6784C23.0939 27.4714 22.9907 27.2754 22.8438 27.0902L23.5675 26.2513C23.8004 26.5289 23.9756 26.8302 24.0929 27.1553C24.21 27.4771 24.265 27.8095 24.2578 28.1525C24.2503 28.4923 24.1814 28.8292 24.051 29.1632C23.9205 29.4973 23.7251 29.8162 23.4647 30.12C23.0549 30.5981 22.5765 30.9271 22.0296 31.1069C21.4809 31.2851 20.9019 31.3002 20.2928 31.1523C19.6853 31.0026 19.0876 30.6759 18.4998 30.1721C17.9103 29.6668 17.4967 29.1252 17.2592 28.5474C17.0198 27.9681 16.9472 27.3945 17.0411 26.8265C17.1333 26.2569 17.3835 25.734 17.7918 25.2577C18.0429 24.9647 18.3194 24.7277 18.6211 24.5466C18.9225 24.3622 19.2412 24.2378 19.5771 24.1734C19.9112 24.1074 20.2511 24.1072 20.597 24.173C20.9411 24.2372 21.2815 24.373 21.6181 24.5805Z" />
          <path d="M27.5868 25.5875L22.7298 20.1743L23.5466 19.4415L27.7727 24.1517L30.2255 21.9509L30.8564 22.6539L27.5868 25.5875Z" />
          <path d="M36.2718 14.2553C36.7105 14.896 36.9704 15.5271 37.0517 16.1486C37.1316 16.7682 37.0523 17.3418 36.8139 17.8694C36.5762 18.3937 36.1984 18.8331 35.6808 19.1875C35.1612 19.5433 34.613 19.7379 34.0362 19.7713C33.46 19.8014 32.8969 19.6662 32.3469 19.3657C31.7968 19.0652 31.3031 18.5956 30.8657 17.9568C30.427 17.3161 30.1677 16.686 30.0878 16.0664C30.0066 15.4449 30.0848 14.872 30.3226 14.3477C30.561 13.8201 30.94 13.3784 31.4596 13.0226C31.9773 12.6682 32.5242 12.4759 33.1004 12.4458C33.6771 12.4123 34.2406 12.5459 34.7906 12.8464C35.3393 13.1449 35.8331 13.6146 36.2718 14.2553ZM35.3751 14.8692C35.0408 14.3809 34.6801 14.0238 34.2932 13.7981C33.9069 13.5692 33.5181 13.4623 33.1269 13.4777C32.7364 13.4898 32.3692 13.6135 32.0254 13.8489C31.6796 14.0856 31.4305 14.3839 31.278 14.7436C31.1242 15.1015 31.0832 15.5025 31.155 15.9468C31.2275 16.3879 31.4309 16.8526 31.7653 17.3409C32.0996 17.8293 32.46 18.1879 32.8463 18.4169C33.2332 18.6426 33.622 18.7494 34.0126 18.7374C34.4018 18.7234 34.7693 18.598 35.115 18.3612C35.4588 18.1258 35.7076 17.8292 35.8615 17.4714C36.0159 17.1103 36.0569 16.7093 35.9844 16.2682C35.9126 15.8239 35.7095 15.3576 35.3751 14.8692Z" />
          <path d="M42.1505 9.17247C41.9646 8.8898 41.7075 8.72825 41.379 8.68782C41.0495 8.64528 40.6989 8.71826 40.3273 8.90678C40.0613 9.04173 39.8526 9.20071 39.7012 9.3837C39.5488 9.56458 39.4556 9.75517 39.4219 9.95547C39.3891 10.1526 39.4194 10.343 39.5126 10.5267C39.5908 10.6808 39.6941 10.7956 39.8227 10.8711C39.9533 10.9455 40.0971 10.9907 40.2539 11.0067C40.4117 11.0196 40.5721 11.0165 40.735 10.9976C40.8969 10.9765 41.0492 10.9497 41.1919 10.9171L41.9088 10.7604C42.1415 10.7061 42.3885 10.6671 42.6498 10.6433C42.9112 10.6196 43.1707 10.6313 43.4282 10.6785C43.6858 10.7257 43.9246 10.8249 44.1446 10.9761C44.3668 11.1262 44.5518 11.3469 44.6996 11.6383C44.8859 12.0056 44.9564 12.38 44.911 12.7614C44.8677 13.1418 44.7084 13.5053 44.433 13.8521C44.1597 14.1978 43.7698 14.4992 43.263 14.7562C42.7775 15.0026 42.3182 15.1387 41.8853 15.1645C41.4525 15.1903 41.064 15.1126 40.7199 14.9315C40.3747 14.7482 40.0925 14.4666 39.8732 14.0868L40.855 13.5887C40.9928 13.8134 41.1679 13.9702 41.3802 14.0589C41.5935 14.1445 41.824 14.1723 42.0715 14.1422C42.3201 14.109 42.5701 14.0287 42.8213 13.9012C43.0979 13.7609 43.3219 13.5928 43.4933 13.397C43.6658 13.198 43.7747 12.9888 43.82 12.7694C43.8642 12.5478 43.8328 12.3315 43.7257 12.1204C43.6282 11.9283 43.4935 11.7988 43.3216 11.7321C43.1518 11.6642 42.9537 11.6373 42.7272 11.6514C42.5028 11.6643 42.259 11.6991 41.9957 11.7557L41.1232 11.9355C40.5321 12.0575 40.0149 12.0584 39.5716 11.9382C39.1305 11.8169 38.7953 11.5303 38.5661 11.0785C38.3765 10.7048 38.3123 10.3272 38.3736 9.94571C38.4349 9.5642 38.5996 9.20855 38.8677 8.87877C39.1347 8.54688 39.4856 8.27061 39.9205 8.04997C40.3597 7.82718 40.7862 7.70769 41.2001 7.69151C41.6161 7.67426 41.9897 7.75149 42.3211 7.92319C42.6513 8.09278 42.9091 8.34961 43.0942 8.69369L42.1505 9.17247Z" />
          <path d="M48.7699 12.1822L46.3542 5.32238L50.655 3.80787L50.9687 4.69884L47.703 5.84888L48.439 7.93898L51.4804 6.86797L51.7929 7.75559L48.7516 8.8266L49.4911 10.9268L52.7971 9.76256L53.1109 10.6535L48.7699 12.1822Z" />
          <path d="M63.8107 2.05704L63.7382 1.11522L69.3502 0.683437L69.4227 1.62526L67.1602 1.79933L67.6456 8.10881L66.5551 8.19271L66.0697 1.88324L63.8107 2.05704Z" />
          <path d="M72.0266 7.93513L72.42 0.673043L73.5157 0.732391L73.3447 3.88828L76.9651 4.08437L77.1361 0.928487L78.2353 0.988026L77.8419 8.25011L76.7427 8.19057L76.9142 5.02405L73.2938 4.82795L73.1223 7.99447L72.0266 7.93513Z" />
          <path d="M81.4742 8.76432L82.8121 1.61571L87.294 2.45449L87.1202 3.38297L83.7169 2.74605L83.3093 4.92414L86.4787 5.5173L86.3056 6.44229L83.1362 5.84913L82.7266 8.0377L86.1717 8.68246L85.998 9.61094L81.4742 8.76432Z" />
          <path d="M99.1838 6.28764L100.385 6.86305L100.03 12.9619L100.107 12.9987L104.638 8.90075L105.839 9.47615L102.696 16.0349L101.755 15.5838L104.029 10.8377L103.968 10.8085L99.764 14.6183L98.9826 14.2439L99.3192 8.57734L99.2584 8.54818L96.9829 13.2975L96.0413 12.8464L99.1838 6.28764Z" />
          <path d="M104.723 17.357L108.695 11.2645L112.514 13.7546L111.998 14.5459L109.098 12.6551L107.888 14.5114L110.589 16.2723L110.075 17.0606L107.374 15.2997L106.158 17.1649L109.094 19.079L108.578 19.8703L104.723 17.357Z" />
          <path d="M119.785 19.6741L115.052 25.196L114.286 24.5397L114.95 18.0842L114.899 18.0403L111.428 22.09L110.595 21.3759L115.328 15.854L116.099 16.5149L115.432 22.9782L115.484 23.0221L118.959 18.9669L119.785 19.6741Z" />
          <path d="M125.372 25.5677L126.107 26.3871L122.547 29.5815C122.168 29.9215 121.752 30.1337 121.3 30.2181C120.85 30.301 120.396 30.2564 119.939 30.0841C119.484 29.9102 119.063 29.6066 118.674 29.1731C118.286 28.7414 118.031 28.29 117.907 27.8189C117.785 27.3462 117.79 26.8905 117.921 26.4516C118.054 26.0112 118.309 25.621 118.688 25.2811L122.249 22.0866L122.981 22.9034L119.487 26.0386C119.242 26.2583 119.073 26.5073 118.979 26.7856C118.887 27.0656 118.875 27.3541 118.945 27.6513C119.016 27.9468 119.174 28.2312 119.419 28.5043C119.666 28.7792 119.932 28.968 120.218 29.0707C120.508 29.1735 120.795 29.1924 121.08 29.1274C121.367 29.0641 121.633 28.9226 121.878 28.7029L125.372 25.5677Z" />
          <path d="M137.074 51.7614L136.706 50.7164C136.916 50.5975 137.086 50.4535 137.217 50.2844C137.348 50.1152 137.445 49.9305 137.507 49.7303C137.57 49.53 137.597 49.3211 137.588 49.1033C137.58 48.8878 137.537 48.6707 137.46 48.4518C137.321 48.0566 137.097 47.7376 136.788 47.495C136.48 47.2546 136.102 47.1116 135.654 47.066C135.207 47.0226 134.707 47.0984 134.153 47.2934C133.595 47.49 133.155 47.7452 132.834 48.0591C132.514 48.3752 132.31 48.7242 132.224 49.106C132.137 49.4879 132.163 49.8742 132.301 50.2649C132.377 50.4815 132.478 50.6768 132.605 50.8506C132.734 51.0259 132.885 51.1723 133.057 51.29C133.229 51.4076 133.418 51.4917 133.624 51.5421C133.833 51.594 134.054 51.6026 134.288 51.568L134.653 52.6142C134.296 52.6771 133.947 52.6781 133.607 52.6172C133.27 52.5578 132.955 52.4392 132.661 52.2614C132.371 52.0851 132.113 51.8569 131.889 51.5769C131.665 51.2969 131.487 50.9682 131.354 50.5909C131.145 49.9969 131.099 49.4181 131.217 48.8546C131.337 48.2902 131.613 47.7813 132.046 47.3278C132.479 46.8765 133.061 46.5222 133.791 46.2651C134.523 46.0072 135.199 45.9198 135.818 46.003C136.44 46.0853 136.973 46.3092 137.418 46.6746C137.865 47.0392 138.193 47.5174 138.401 48.1091C138.529 48.4731 138.596 48.831 138.602 49.1828C138.611 49.5361 138.56 49.8743 138.448 50.1974C138.338 50.5197 138.168 50.8142 137.938 51.0809C137.71 51.3468 137.422 51.5736 137.074 51.7614Z" />
          <path d="M133.218 56.4263L140.334 54.9267L140.561 56.0004L134.368 57.3053L135.048 60.5299L134.124 60.7247L133.218 56.4263Z" />
          <path d="M138.689 69.6139C137.915 69.6734 137.239 69.583 136.66 69.3426C136.083 69.102 135.626 68.7466 135.288 68.2764C134.953 67.8083 134.762 67.2615 134.713 66.6359C134.665 66.0081 134.771 65.436 135.03 64.9198C135.292 64.4058 135.691 63.9857 136.226 63.6596C136.761 63.3334 137.415 63.1407 138.187 63.0813C138.961 63.0217 139.636 63.1122 140.213 63.3528C140.792 63.5932 141.249 63.9475 141.584 64.4155C141.922 64.8858 142.115 65.4349 142.163 66.0628C142.211 66.6883 142.104 67.2581 141.842 67.7721C141.583 68.2883 141.185 68.7095 140.65 69.0356C140.117 69.3615 139.464 69.5543 138.689 69.6139ZM138.606 68.5304C139.196 68.485 139.686 68.3512 140.075 68.1289C140.466 67.9089 140.753 67.6256 140.935 67.2791C141.12 66.9349 141.197 66.555 141.165 66.1396C141.132 65.7218 140.999 65.3569 140.763 65.045C140.53 64.7329 140.204 64.4968 139.783 64.3369C139.365 64.1791 138.861 64.1229 138.27 64.1683C137.68 64.2137 137.19 64.3464 136.798 64.5665C136.409 64.7888 136.122 65.072 135.937 65.4163C135.755 65.7604 135.68 66.1413 135.712 66.5591C135.744 66.9746 135.876 67.3383 136.109 67.6505C136.345 67.9648 136.672 68.2008 137.09 68.3586C137.511 68.5185 138.016 68.5758 138.606 68.5304Z" />
          <path d="M140.152 77.2467C140.49 77.2271 140.758 77.0852 140.957 76.8209C141.159 76.5568 141.271 76.2167 141.293 75.8007C141.31 75.5028 141.276 75.2426 141.194 75.02C141.113 74.7975 140.995 74.6216 140.838 74.4922C140.684 74.3653 140.504 74.2962 140.298 74.2851C140.125 74.2758 139.974 74.3079 139.845 74.3815C139.715 74.4574 139.604 74.5593 139.512 74.6871C139.422 74.8173 139.344 74.9577 139.279 75.1083C139.216 75.259 139.163 75.4044 139.12 75.5443L138.897 76.2435C138.828 76.4721 138.738 76.7055 138.628 76.9437C138.518 77.182 138.378 77.4008 138.209 77.6003C138.039 77.7997 137.834 77.9569 137.593 78.0719C137.352 78.1892 137.068 78.2391 136.742 78.2214C136.331 78.1991 135.971 78.073 135.663 77.8429C135.356 77.6152 135.121 77.2955 134.958 76.8836C134.795 76.4741 134.729 75.9857 134.76 75.4183C134.789 74.8746 134.901 74.4089 135.095 74.0211C135.289 73.6333 135.551 73.3357 135.88 73.1283C136.211 72.921 136.596 72.8173 137.035 72.8174L136.975 73.9166C136.711 73.9237 136.488 73.997 136.305 74.1364C136.124 74.2784 135.985 74.464 135.887 74.6935C135.792 74.9254 135.736 75.182 135.721 75.4633C135.704 75.773 135.738 76.051 135.822 76.2974C135.908 76.5462 136.035 76.7451 136.202 76.8941C136.372 77.0432 136.575 77.1241 136.811 77.1369C137.026 77.1486 137.206 77.0966 137.35 76.9811C137.493 76.868 137.616 76.7099 137.717 76.5067C137.818 76.3059 137.909 76.0773 137.992 75.821L138.273 74.9756C138.463 74.4026 138.72 73.9543 139.046 73.6305C139.372 73.3091 139.787 73.1621 140.293 73.1895C140.712 73.2122 141.071 73.3454 141.371 73.5893C141.67 73.8331 141.896 74.1535 142.048 74.5506C142.202 74.9477 142.265 75.3898 142.239 75.8768C142.212 76.3685 142.103 76.7976 141.91 77.1641C141.717 77.533 141.463 77.818 141.148 78.0191C140.836 78.2203 140.485 78.3151 140.095 78.3034L140.152 77.2467Z" />
          <path d="M134.236 81.4742L141.384 82.8121L140.546 87.294L139.617 87.1202L140.254 83.7169L138.076 83.3093L137.483 86.4787L136.558 86.3056L137.151 83.1362L134.962 82.7266L134.318 86.1717L133.389 85.998L134.236 81.4742Z" />
          <path d="M135.484 99.5622L136.336 99.9703L133.904 105.046L133.052 104.638L134.032 102.592L128.325 99.8574L128.798 98.871L134.505 101.605L135.484 99.5622Z" />
          <path d="M126.285 103.739L132.377 107.71L131.778 108.63L129.13 106.904L127.15 109.941L129.798 111.667L129.197 112.589L123.104 108.617L123.706 107.695L126.362 109.427L128.342 106.39L125.686 104.658L126.285 103.739Z" />
          <path d="M120.844 111.506L126.366 116.239L123.398 119.701L122.681 119.086L124.934 116.457L123.252 115.015L121.153 117.464L120.439 116.851L122.537 114.403L120.847 112.954L118.566 115.615L117.849 115L120.844 111.506Z" />
          <path d="M114.134 128.082L113.035 128.834L107.93 125.478L107.86 125.526L109.144 131.498L108.045 132.251L103.936 126.25L104.797 125.66L107.771 130.003L107.826 129.964L106.629 124.419L107.344 123.93L112.083 127.054L112.139 127.016L109.163 122.671L110.025 122.081L114.134 128.082Z" />
          <path d="M101.778 127.344L105.068 133.829L101.002 135.892L100.574 135.05L103.662 133.484L102.66 131.507L99.7841 132.966L99.3584 132.127L102.234 130.668L101.227 128.683L98.1008 130.268L97.6735 129.426L101.778 127.344Z" />
          <path d="M92.2404 139.229L89.8248 132.369L90.776 132.034L96.0345 135.837L96.0982 135.815L94.3265 130.784L95.3615 130.419L97.7772 137.279L96.8192 137.616L91.555 133.808L91.4914 133.83L93.2654 138.868L92.2404 139.229Z" />
          <path d="M84.3423 141.12L83.2651 141.347L82.2788 136.667C82.1738 136.169 82.1978 135.703 82.3507 135.269C82.5042 134.837 82.7696 134.467 83.1472 134.158C83.5252 133.85 83.9992 133.637 84.5691 133.517C85.1366 133.397 85.6553 133.402 86.1251 133.53C86.5954 133.661 86.9878 133.893 87.3024 134.226C87.6174 134.561 87.8273 134.977 87.9323 135.475L88.9186 140.156L87.8449 140.382L86.8769 135.789C86.809 135.467 86.6781 135.195 86.4841 134.975C86.2877 134.755 86.0435 134.601 85.7515 134.512C85.4599 134.426 85.1346 134.421 84.7756 134.497C84.4142 134.573 84.1175 134.709 83.8855 134.906C83.6517 135.105 83.4916 135.344 83.4054 135.624C83.3168 135.904 83.3064 136.205 83.3743 136.527L84.3423 141.12Z" />
          <path d="M55.807 138.158L56.896 138.362C56.8943 138.602 56.934 138.822 57.0149 139.02C57.0958 139.218 57.2074 139.394 57.3495 139.549C57.4916 139.703 57.6592 139.831 57.8522 139.932C58.0429 140.033 58.2523 140.104 58.4803 140.147C58.8922 140.224 59.2804 140.189 59.645 140.043C60.0072 139.897 60.32 139.641 60.5834 139.276C60.8445 138.911 61.029 138.439 61.137 137.862C61.2459 137.281 61.2447 136.772 61.1334 136.337C61.0199 135.901 60.8193 135.551 60.5319 135.285C60.2444 135.019 59.8971 134.848 59.4898 134.772C59.2641 134.73 59.0444 134.72 58.8306 134.743C58.6141 134.767 58.4119 134.824 58.224 134.915C58.0361 135.005 57.8689 135.126 57.7222 135.279C57.5727 135.435 57.4546 135.622 57.3677 135.842L56.2793 135.634C56.4032 135.294 56.5766 134.992 56.7995 134.727C57.0195 134.465 57.2799 134.251 57.5806 134.086C57.8786 133.923 58.2048 133.814 58.5593 133.76C58.9139 133.706 59.2878 133.716 59.681 133.789C60.3 133.905 60.8241 134.155 61.2532 134.539C61.682 134.925 61.9845 135.418 62.161 136.02C62.3351 136.621 62.351 137.302 62.2086 138.063C62.0658 138.826 61.8035 139.455 61.422 139.95C61.0399 140.447 60.5795 140.796 60.0406 140.999C59.5012 141.204 58.9233 141.249 58.3066 141.133C57.9273 141.062 57.5838 140.941 57.2762 140.771C56.9658 140.602 56.6987 140.388 56.4749 140.129C56.2507 139.873 56.0806 139.579 55.9646 139.246C55.8482 138.916 55.7956 138.553 55.807 138.158Z" />
          <path d="M53.6946 132.486L51.4351 139.399L50.3921 139.058L52.3581 133.043L49.2258 132.019L49.5192 131.121L53.6946 132.486Z" />
          <path d="M39.5386 130.631C39.8741 129.931 40.2907 129.39 40.7883 129.009C41.2849 128.63 41.8212 128.412 42.3974 128.354C42.9703 128.298 43.5397 128.405 44.1055 128.677C44.6734 128.949 45.116 129.326 45.4334 129.809C45.7475 130.293 45.912 130.848 45.9268 131.475C45.9416 132.101 45.7817 132.764 45.4472 133.462C45.1117 134.162 44.6956 134.702 44.199 135.081C43.7014 135.462 43.1661 135.681 42.5932 135.737C42.017 135.794 41.445 135.687 40.8771 135.415C40.3113 135.144 39.8713 134.766 39.5572 134.282C39.2398 133.799 39.0738 133.245 39.059 132.618C39.0432 131.994 39.203 131.331 39.5386 130.631ZM40.5185 131.1C40.2628 131.634 40.1339 132.125 40.132 132.573C40.1268 133.022 40.2287 133.412 40.4376 133.743C40.6433 134.075 40.934 134.331 41.3098 134.512C41.6877 134.693 42.0705 134.759 42.4583 134.711C42.8451 134.666 43.213 134.501 43.5619 134.216C43.9076 133.933 44.2083 133.525 44.464 132.991C44.7198 132.457 44.8502 131.966 44.8554 131.517C44.8574 131.069 44.7555 130.679 44.5498 130.346C44.343 130.016 44.0507 129.761 43.6728 129.58C43.297 129.4 42.9158 129.332 42.529 129.378C42.139 129.425 41.7712 129.59 41.4255 129.873C41.0766 130.158 40.7743 130.567 40.5185 131.1Z" />
          <path d="M32.1974 128.081C32.0456 128.384 32.0342 128.687 32.1635 128.992C32.2914 129.298 32.5299 129.565 32.8789 129.793C33.1288 129.956 33.3708 130.057 33.605 130.097C33.8379 130.138 34.0495 130.124 34.2398 130.053C34.4269 129.983 34.5767 129.861 34.6892 129.689C34.7836 129.544 34.8313 129.397 34.8324 129.248C34.8315 129.098 34.7988 128.951 34.7343 128.807C34.6665 128.664 34.5836 128.526 34.4858 128.395C34.3866 128.265 34.2872 128.146 34.1876 128.039L33.6935 127.497C33.5301 127.322 33.3728 127.128 33.2216 126.913C33.0703 126.699 32.9507 126.468 32.8628 126.222C32.7749 125.975 32.7414 125.719 32.7623 125.453C32.7812 125.185 32.8799 124.915 33.0583 124.641C33.2833 124.296 33.5723 124.048 33.9253 123.896C34.2764 123.743 34.6709 123.7 35.1089 123.765C35.5449 123.829 36.0009 124.016 36.4768 124.326C36.933 124.623 37.2805 124.953 37.5193 125.315C37.7581 125.677 37.885 126.052 37.9002 126.441C37.9141 126.831 37.8113 127.216 37.592 127.596L36.6698 126.995C36.7954 126.763 36.8436 126.533 36.8144 126.305C36.7818 126.078 36.6906 125.864 36.5409 125.665C36.3878 125.466 36.1932 125.29 35.9572 125.136C35.6974 124.967 35.4399 124.857 35.1846 124.806C34.926 124.756 34.6904 124.767 34.4777 124.837C34.2637 124.909 34.0921 125.045 33.9628 125.243C33.8452 125.424 33.8004 125.605 33.8285 125.787C33.8547 125.968 33.9305 126.153 34.0559 126.342C34.1793 126.53 34.3313 126.724 34.512 126.924L35.1039 127.589C35.5052 128.04 35.7645 128.488 35.8821 128.932C35.9976 129.375 35.917 129.808 35.6403 130.232C35.4115 130.583 35.1166 130.828 34.7555 130.966C34.3945 131.103 34.0041 131.138 33.5845 131.071C33.1636 131.006 32.7488 130.84 32.3403 130.574C31.9278 130.305 31.611 129.995 31.3901 129.645C31.1672 129.293 31.0472 128.931 31.0302 128.558C31.012 128.187 31.1055 127.836 31.3109 127.503L32.1974 128.081Z" />
          <path d="M31.4939 120.844L26.761 126.366L23.299 123.398L23.9137 122.681L26.5426 124.934L27.9847 123.252L25.5365 121.153L26.1489 120.439L28.5971 122.537L30.0461 120.847L27.3849 118.566L27.9996 117.849L31.4939 120.844Z" />
          <path d="M15.2054 112.881L14.426 113.414L11.2461 108.77L12.0255 108.237L13.3075 110.109L18.5289 106.534L19.1469 107.436L13.9254 111.011L15.2054 112.881Z" />
          <path d="M16.1881 102.827L9.70225 106.117L9.2058 105.138L12.0243 103.709L10.384 100.475L7.56542 101.905L7.06736 100.923L13.5532 97.6329L14.0512 98.6147L11.2232 100.049L12.8636 103.283L15.6916 101.848L16.1881 102.827Z" />
          <path d="M12.1822 94.2301L5.32238 96.6458L3.80787 92.345L4.69884 92.0313L5.84888 95.297L7.93898 94.561L6.86797 91.5196L7.75559 91.2071L8.8266 94.2484L10.9268 93.5089L9.76256 90.2029L10.6535 89.8891L12.1822 94.2301Z" />
          <path d="M1.18216 80.131L1.08 78.8033L6.53914 76.0611L6.5326 75.9761L0.718232 74.1013L0.616075 72.7735L7.86737 72.2156L7.94746 73.2566L2.70019 73.6603L2.70536 73.7275L8.10656 75.4632L8.17303 76.3271L3.09737 78.8689L3.10255 78.9361L8.35337 78.5322L8.43346 79.5731L1.18216 80.131Z" />
          <path d="M7.99885 69.7998L0.736768 69.4065L0.983377 64.8535L1.9266 64.9046L1.73934 68.3619L3.952 68.4817L4.12639 65.262L5.06607 65.3129L4.89167 68.5326L7.11498 68.653L7.30454 65.1532L8.24776 65.2043L7.99885 69.7998Z" />
          <path d="M2.47481 55.597L9.62342 56.9349L9.4379 57.9262L3.51508 60.5787L3.50266 60.645L8.74544 61.6262L8.54359 62.7048L1.39498 61.3669L1.58181 60.3686L7.51226 57.714L7.52468 57.6476L2.27491 56.6651L2.47481 55.597Z" />
          <path d="M4.78555 47.8119L5.12757 46.7655L9.67424 48.2517C10.158 48.4098 10.5496 48.6635 10.8488 49.0129C11.1458 49.3616 11.3339 49.7767 11.4131 50.2584C11.49 50.7393 11.438 51.2566 11.2571 51.8101C11.0769 52.3615 10.8137 52.8084 10.4676 53.1511C10.1192 53.493 9.72225 53.717 9.27667 53.8229C8.82884 53.928 8.36302 53.9016 7.87921 53.7434L3.33254 52.2573L3.67345 51.2143L8.13573 52.6729C8.44852 52.7751 8.74886 52.7973 9.03676 52.7395C9.32539 52.6794 9.58102 52.545 9.80365 52.3363C10.024 52.1269 10.1912 51.8478 10.3052 51.499C10.42 51.148 10.4503 50.8229 10.3961 50.5237C10.3404 50.2216 10.2132 49.9633 10.0143 49.7489C9.8161 49.5322 9.56062 49.3727 9.24784 49.2704L4.78555 47.8119Z" />
        </svg>
      </div>
      <button
        type="button"
        className={classNames(
          styles.button,
          'bg-stone-100',
          'dark:bg-slate-800',
        )}
        onClick={handleButtonClick}
      >
        <div className={classNames(styles.box)}>
          <div
            className={classNames(
              styles.line,
              styles.first,
              'bg-stone-800',
              'dark:bg-slate-200',
            )}
          />
          <div
            className={classNames(
              styles.line,
              styles.second,
              'bg-stone-800',
              'dark:bg-slate-200',
            )}
          />
        </div>
      </button>
    </nav>
  );
}

export default MenuClose;
