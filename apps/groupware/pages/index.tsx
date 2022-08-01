import { Container } from '@rendiriz-ecosystem/groupware/components';
import { useSession } from 'next-auth/react';

export function HomePage() {
  const { data: session } = useSession();

  return (
    <Container>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">
        {!session ? 'Halo!' : `Halo ${session.user?.name}!`}
      </h1>
    </Container>
  );
}

export default HomePage;
