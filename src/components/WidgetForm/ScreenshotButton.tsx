// => Import do ReactJS
import { useState } from 'react';

// => Import da Lib de Icons 
import { Camera, Trash } from 'phosphor-react';

// => Import da Lib para tirar foto
import html2cavas from 'html2canvas';

// => Import dos Components
import { Loading } from '../Loading';

// => Tipando as props do component
interface ScreenshotButtonProps {
  screenshot: string | null,
  onScreenshotTook: (screenshot: string | null) => void;
};

export  function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot(){
    setIsTakingScreenshot(true);

    const canvas = await html2cavas(document.querySelector('html')!);
    const base64Image = canvas.toDataURL('image/png');

    onScreenshotTook(base64Image);
    setIsTakingScreenshot(false);
  }

  if(screenshot){
    return (  
      <button
        type='button'
        onClick={() => onScreenshotTook(null)}
        className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors duration-200' 
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }} 
      >
        <Trash weight='fill'/>
      </button>
    );
  }

  return (
    <button 
      type='button'
      onClick={handleTakeScreenshot}
      className='p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500'
    > 
      {isTakingScreenshot 
        ? <Loading /> 
        : <Camera className='w-6 h-6 text-zinc-100 opacity-80'/>
      }
       
    </button>
  );
};
