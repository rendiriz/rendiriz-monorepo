import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useTheme } from 'next-themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import cn from 'classnames';

type ContainerProps = {
  children: React.ReactNode;
};

type NavItemProps = {
  href: string;
  label: string;
};

function NavItem({ href, label }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-semibold text-stone-800 dark:text-slate-200'
            : 'font-normal text-stone-600 dark:text-slate-400',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg transition-all',
          'hover:bg-stone-200 dark:hover:bg-slate-800',
        )}
      >
        <span className="capsize">{label}</span>
      </a>
    </NextLink>
  );
}

export function Container({ children }: ContainerProps) {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="bg-stone-100 text-stone-800 dark:bg-slate-800 dark:text-slate-100">
        <div className="flex flex-col justify-center px-8">
          <nav
            className={cn(
              'flex items-center justify-between w-full relative max-w-8xl mx-auto pt-8 pb-8 sm:pb-16',
              'border-stone-100 dark:border-slate-800 bg-opacity-60 text-stone-800 bg-stone-100 dark:bg-slate-800 dark:text-slate-100',
            )}
          >
            <a href="#skip" className="skip-nav">
              Skip to content
            </a>
            <div className="ml-[-0.60rem]">
              <NavItem href="/" label="Home" />
            </div>
            <div className="flex items-center">
              {!session && (
                <NextLink href="/api/auth/signin/gitlab">
                  <a
                    className={cn(
                      'font-normal text-stone-600 dark:text-slate-400',
                      'inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn('gitlab');
                    }}
                  >
                    <span className="capsize">Login</span>
                  </a>
                </NextLink>
              )}
              {session && (
                <NextLink href="/api/auth/signout/gitlab">
                  <a
                    className={cn(
                      'font-normal text-stone-600 dark:text-slate-400',
                      'inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut({
                        callbackUrl: `${window.location.origin}`,
                      });
                    }}
                  >
                    <span className="capsize">Logout</span>
                  </a>
                </NextLink>
              )}
              <button
                aria-label="Toggle Dark Mode"
                type="button"
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center transition-all ml-4',
                  'bg-stone-200 dark:bg-slate-600 hover:ring-2 ring-gray-300',
                )}
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
              >
                {mounted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-stone-800 dark:text-slate-100"
                  >
                    {resolvedTheme === 'dark' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    )}
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
        <main
          id="skip"
          className="flex flex-col justify-center px-8 bg-stone-100 text-stone-800 dark:bg-slate-800 dark:text-slate-100"
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default Container;
