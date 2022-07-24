import { useMemo } from 'react';
import cn from 'classnames';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  colorScheme?: 'green';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  disabled,
  onClick,
  className,
  children,
  colorScheme = 'blue',
  variant = 'solid',
}) => {
  const buttonStyle = useMemo(() => {
    const styles = new Map<string, string>([
      [
        'solid-blue',
        cn(
          'px-5 py-2.5',
          'text-white bg-sky-700 dark:bg-sky-600',
          'enabled:hover:bg-sky-800 enabled:dark:hover:bg-sky-700',
        ),
      ],
      [
        'outline-blue',
        cn(
          'px-5 py-2.5',
          'text-sky-700 dark:text-sky-600',
          'border border-sky-700 dark:border-sky-600',
          'enabled:hover:bg-sky-100 enabled:dark:hover:bg-sky-200',
        ),
      ],
      [
        'ghost-blue',
        cn(
          'px-5 py-2.5',
          'text-sky-700 dark:text-sky-600',
          'enabled:hover:bg-sky-100 enabled:dark:hover:bg-sky-200',
        ),
      ],
      [
        'link-blue',
        cn(
          'px-0 py-0',
          'text-sky-600 dark:text-sky-500',
          'enabled:hover:underline',
        ),
      ],
    ]);

    return styles.get(`${variant}-${colorScheme}`);
  }, [colorScheme, variant]);

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          className,
          buttonStyle,
          'flex items-center justify-center rounded-lg transition-all',
          'font-medium text-sm',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40',
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
