// => Import do ReactJS
import { useState } from 'react';

// => Import dos Components
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';

// => Import dos Icons
import bugImg from '../../assets/Bug.svg';
import ideaImg from '../../assets/Idea.svg';
import otherImg from '../../assets/Thought.svg';
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep';

// => Criando um const para renderizar as opções
export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImg,
      alt: 'Imagem de um inseto'
    },
  },

  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImg,
      alt: 'Imagem de uma lãmpada'
    },
  },

  OTHER: {
    title: 'Outros',
    image: {
      source: otherImg,
      alt: 'Imagem de um balão de pensamentos'
    },
  },
};

// => Tipando as props do Component
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback (){
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className='flex flex-col items-center bg-zinc-900 p-4 relative rounded-2xl mb-4 shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
      { feedbackSent ? (
        <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )} 
        </>
      ) }

      <footer className='text-xs text-neutral-400'>
      Feito com ♥ por <a target="_blank" href="https://br.linkedin.com/in/marcoss-vinicius" className='underline underline-offset-2'> Marcos Vinicius </a>
      </footer>
    </div>
  );
};
