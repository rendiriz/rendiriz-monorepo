import cn from 'classnames';
import styles from './project.module.scss';

export function Project() {
  const allProject = [
    {
      id: '01',
      title: 'rendiriz-dictionary',
      desc: 'Next.js New Word Order',
      url: 'https://dictionary.rendiriz.com/',
    },
    {
      id: '02',
      title: 'rendiriz-currency',
      desc: 'Fresh.js Currency Rates',
      url: 'https://rendiriz-currency.deno.dev/',
    },
    {
      id: '03',
      title: 'next-gen-image',
      desc: 'Next.js Generate Image',
      url: 'https://gen-image.rendiriz.com/',
    },
    {
      id: '04',
      title: 'jds-bi',
      desc: 'JDS BI Library',
      url: 'https://www.npmjs.com/org/jds-bi',
    },
    {
      id: '05',
      title: 'next-trpc',
      desc: 'Next.js tRPC Typesafe APIs',
      url: 'https://next-trpc-rendiriz.vercel.app/',
    },
    {
      id: '06',
      title: 'next-boilerplate',
      desc: 'Next.js Boilerplate',
      url: 'https://next-boilerplate-rendiriz.vercel.app/',
    },
    {
      id: '07',
      title: 'astro-boilerplate',
      desc: 'Astro.js Boilerplate',
      url: 'https://astro-boilerplate-rendiriz.vercel.app/',
    },
    {
      id: '08',
      title: 'angular-pwa',
      desc: 'Angular.js PWA',
      url: 'https://angular-pwa-rendiriz.vercel.app/',
    },
  ];

  return (
    <div data-scroll-section className={cn(styles.main)}>
      <div className="mb-8">
        <div className={cn('font-mono')}>PROJECTS</div>
      </div>
      <div className="relative py-[25px] md:py-[75px]">
        <div className={cn(styles.background)}></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {allProject.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              className={cn(
                'link-hover',
                'transform hover:scale-[1.05] transition-all w-full p-[1px]',
                'bg-gradient-to-r from-stone-300 via-stone-400 to-stone-300 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700',
              )}
              rel="noreferrer"
            >
              <div className="bg-stone-100 dark:bg-slate-800 p-8">
                <div className="font-mono mb-8 md:mb-16">{project.id}</div>
                <h5 className="font-serif text-lg mb-1">{project.title}</h5>
                <p className="text-sm text-stone-500 dark:text-slate-400">
                  {project.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <a
          href="https://github.com/rendiriz"
          target="_blank"
          className={cn('link-hover', 'font-mono hover:underline')}
          rel="noreferrer"
        >
          SEE ALL PROJECT
        </a>
      </div>
    </div>
  );
}

export default Project;
