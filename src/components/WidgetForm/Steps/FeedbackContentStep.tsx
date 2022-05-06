// => Import do ReactJS
import { FormEvent, useState } from 'react';

// => Import da Lib de Icons
import { ArrowLeft } from 'phosphor-react';

// => Import da API
import { api } from '../../../lib/api';

// => Import das tipagens do component PAI 
import { feedbackTypes ,FeedbackType } from '..';

// => Import dos components
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';
import { Loading } from '../../Loading';


// => Tipando as props do Component
interface FeedbackContentStepProps {
  feedbackType: FeedbackType,
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

export function FeedbackContentStep({ 
    feedbackType, 
    onFeedbackRestartRequested, 
    onFeedbackSent 
  }: FeedbackContentStepProps
) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [comment, setComment] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);
  
  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();
    
    setIsSendingFeedback(true);

    await api.post('/createFeedbacks', {
      type: feedbackType, 
      comment,
      screenshot
    });

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header className='flex w-full justify-between items-center'>
        <button type='button' onClick={onFeedbackRestartRequested}> 
          <ArrowLeft weight='bold' className='w-4 h-4 text-zinc-400'/> 
        </button>

        <span className='flex items-center gap-2 text-xl leading-6'> 
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-5 h-5'/>
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className='my-4 w-full' onSubmit={handleSubmitFeedback}>
        <textarea 
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte com detalhes o que está acontecendo...'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className='flex gap-4'>
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type='submit'
            disabled={comment.length === 0 || isSendingFeedback}
            className='flex-1 flex justify-center items-center p-2 bg-brand-500 rounded-md border-transparent text-sm hover:bg-brand-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-30 disabled:hover:bg-brand-500'
          >
            {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>    
  );
};
