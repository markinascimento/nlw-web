// => Import de tipagem vindo do component Pai
import { feedbackTypes, FeedbackType } from '..';
import { CloseButton } from '../../CloseButton';

// => Tipando as props do Component
interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
};

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  return (
    <>
      <header className='flex w-full justify-between items-center'>
        <span className='w-full text-center text-xl leading-6'> Deixe seu feedback! </span>
        <CloseButton />
      </header>

      <div className='flex py-9 gap-2 w-full justify-center items-center'> 
        { Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            key={key}
            className='flex flex-col flex-1 w-24 items-center justify-center gap-2 bg-zinc-800 rounded-lg py-6 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none transition-all duration-300'
            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span> {value.title} </span>
          </button>
        ))}
      </div>
    </>    
  );
};
