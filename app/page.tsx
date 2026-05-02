'use client';

import { Button } from '@/components/button';
import Checkbox from '@/components/checkbox';
import { EmailInput } from '@/components/email-input';
import { Input } from '@/components/input';

export default function Home() {
    return (
        <div className='min-h-screen w-full flex justify-center items-center flex-col space-y-4'>
            <div className='flex space-x-4'>
                <Input label='Imię' placeholder='Jan' />
                <Input label='Nazwisko' placeholder='Kowalski' />
            </div>
            <Button onClick={() => console.log('LOL')}>Zapisz</Button>
            <div className='animate-ripple'>Test</div>
            <div className='flex flex-col space-y-4'>
                <Checkbox label='Akceptuję regulamin aplikacji' required />
                <Checkbox label='Zapoznałem się z polityką prywatności' required />
                <Checkbox label='Chcę zapisać się do Newslettera' />
            </div>
            <EmailInput />
        </div>
    );
}
