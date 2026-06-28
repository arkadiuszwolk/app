import Checkbox from '@/components/checkbox';

export default function Page() {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <h1 className='mb-10 text-xl text-blue-600 font-semibold'>Logowanie</h1>
            <form className='flex flex-col space-y-4 items-center'>
                <div className='flex flex-col space-y-1'>
                    <label>Numer telefonu</label>
                    <input
                        type='text'
                        placeholder='np. 000 000 000'
                        className='w-80 px-4 py-2 bg-gray-100 rounded-md focus:outline-4 focus:border-gray-300 border border-gray-100  outline-gray-50'
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label>Hasło</label>
                    <input
                        type='text'
                        placeholder='*******'
                        className='w-80 px-4 py-2 bg-gray-100 rounded-md focus:outline-4 focus:border-gray-300 border border-gray-100  outline-gray-50'
                    />
                </div>
                <button
                    type='submit'
                    className='w-60 px-4 py-2 rounded-md bg-blue-600 text-white mt-8 hover:cursor-pointer hover:bg-blue-700'>
                    Zaloguj się
                </button>
            </form>
        </div>
    );
}
