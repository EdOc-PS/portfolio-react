import { BrowserRouter } from 'react-router-dom';
import Main from './pages/main';
import ScribbleBackground from './components/ui/ScribbleBackground';

export default function App() {
  return (
    <BrowserRouter>
      <main className='relative min-h-screen bg-neutral-edoc-500 flex flex-col items-center overflow-hidden'>
        {/* Rabiscos decorativos no fundo (laterais) */}
        <ScribbleBackground count={18} variant="sides" className="fixed z-0" />

        <div className="relative z-10 w-full flex flex-col items-center">
          <Main />
        </div>
      </main>
    </BrowserRouter>
  );
}