import { useRef, useState } from 'react';
import './index.css';
import { useForm } from 'react-hook-form';
import main from './create-script';
import OSSelector from './os-selector';
import DownloadIcon from './assets/icons/download-icon';
import clsx from 'clsx';

export default function App() {
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const blobUrl = useRef<string>('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitted },
  } = useForm<{
    codes: string;
    os: 'windows' | 'android';
  }>({
    defaultValues: {
      os: 'windows',
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (showDownload) {
      setShowDownload(false);
    }
    const fileData = main(data);
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    blobUrl.current = url;
    setTimeout(() => setShowDownload(true), 1000);
  });

  return (
    <div className='flex flex-col items-center gap-8 bg-slate-200 px-4 py-16 font-sans text-slate-900 md:px-24'>
      <h1 className='text-center text-3xl font-bold md:max-w-md md:text-4xl'>
        Pokemon TCG Live Auto Redeem Script Generator
      </h1>
      <div className='prose md:prose-base lg:prose-lg xl:prose-2xl'>
        <p>
          This form creates a Bad USB script designed for the Flipper Zero. This
          site was born out of equal parts necessity and spite, because for some
          ungodly reason PTCGL doesn't let you upload a text file of codes to
          redeem. Furthermore, they don't let you enter more than 10 codes at a
          time. This archaic practice has forced me to make something to try and
          automate entering hundreds of codes.
        </p>
        <p>
          Specifically, this script will use the online redeem website since it
          has full keyboard navigation. With the Flipper Zero, there is no way
          to control the mouse via Bad USB. However, this does present the
          opportunity to create Windows and Android versions of this script. For
          now, this only generates the Windows version.
        </p>
        <p className='text-lg xl:text-2xl'>
          <strong>
            Please make sure that you are already logged into the website and
            have passed the cookie permissions box before running the script.
          </strong>
          <br />
          If you want to double check yourself, visit the{' '}
          <a
            href='https://redeem.tcg.pokemon.com/en-us/'
            target='_blank'
            className='text-blue-600'
          >
            site here.
          </a>
        </p>
      </div>

      <form
        className='flex flex-col items-center gap-16 font-sans'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='codes' className='text-xl font-bold'>
              Enter your codes here.
            </label>
            <textarea
              rows={6}
              className='w-full'
              placeholder={'XXX-XXXX-XXX-XXX\n'.repeat(3)}
              {...register('codes', { required: true })}
            />
            <p className='text-sm font-semibold text-slate-600'>
              Please ensure that you are entering each code on a separate line.
              The script won't work otherwise.
            </p>
          </div>
          <OSSelector defaultValue='windows' />
        </div>

        <div className='grid w-full grid-cols-1 grid-rows-1 justify-items-center gap-4 md:grid-cols-2'>
          <button
            className={clsx(
              'w-full rounded bg-purple-600 p-4 font-bold uppercase text-white shadow-lg',
              {
                'md:col-span-2': !showDownload && !isSubmitted,
                'md:w-56': showDownload && isSubmitted,
              }
            )}
          >
            Generate
          </button>
          <div className='flex h-14 flex-col items-center justify-center'>
            <svg
              className={clsx(
                { hidden: !showDownload && !isSubmitted },
                'h-8 w-8 animate-spin text-purple-600'
              )}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                stroke-width='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            <a
              href={blobUrl.current}
              download={`ptcgl-auto-redeem-${getValues('os')}.txt`}
              className={clsx(
                { hidden: !showDownload },
                'flex w-full items-center justify-evenly rounded bg-purple-600 p-4 font-bold uppercase text-white shadow-lg md:gap-2'
              )}
            >
              Download Script
              <DownloadIcon />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
