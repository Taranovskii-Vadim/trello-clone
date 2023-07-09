import Board from '@/components/Board';
import Header from '@/components/Header';

// action items
// 3) add all client logic (add image, show loading state)
// 4) add auth logic
// 5) components refactor

const Home = (): JSX.Element => (
  <>
    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-400 filter blur-3xl opacity-50 -z-50" />
    <Header />
    <Board />
  </>
);

export default Home;
