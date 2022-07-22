import { Container } from '@rendiriz-ecosystem/groupware/components';
import { trpc } from '../utils/trpc';

export function HomePage() {
  const { data } = trpc.useQuery(['example.hello', { text: 'client' }]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="bg-red-400">
        <div className="py-10">{data.greeting}</div>
      </div>
    </Container>
  );
}

export default HomePage;
