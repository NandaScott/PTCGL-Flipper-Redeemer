import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import AndroidLogo from './assets/icons/android-logo';
import WindowsLogo from './assets/icons/windows-logo';

interface OSSelectorProps {
  defaultValue: string;
}

export default function OSSelector(props: OSSelectorProps) {
  const { defaultValue } = props;
  const [plan, setPlan] = useState(defaultValue);

  return (
    <RadioGroup value={plan} onChange={setPlan} className='flex flex-col gap-4'>
      <RadioGroup.Label className='font-bold text-xl'>
        Choose your target OS
      </RadioGroup.Label>
      <div className='flex w-full items-center justify-evenly gap-4'>
        <RadioGroup.Option value='windows'>
          {({ checked }) => (
            <div
              className={clsx(
                'flex flex-col items-center bg-blue-500 p-6 text-white rounded-lg',
                checked && 'outline outline-3 outline-blue-500 outline-offset-4'
              )}
            >
              <WindowsLogo className='h-[5.5rem] w-[5.5rem] text-white' />
              <span>Windows</span>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value='android'>
          {({ checked }) => (
            <div
              className={clsx(
                'flex flex-col items-center bg-green-500 p-6 text-white rounded-lg',
                checked &&
                  'outline outline-3 outline-green-500 outline-offset-4'
              )}
            >
              <AndroidLogo className='h-[5.5rem] w-[5.5rem] text-white' />
              <span>Android</span>
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
}
