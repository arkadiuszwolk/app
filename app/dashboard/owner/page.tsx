'use client';

import { useForm } from 'react-hook-form';

interface CompanySettingsInputs {
    companyName: string;
    companySlug: string;
}

interface AddEmployeeInputs {
    empName: string;
    empEmail: string;
    empPassword: string;
}

export default function OwnerDashboard() {
    // FORMULARZ 1: Ustawienia firmy (wartości domyślne przekazujemy w defaultValues)
    const {
        register: registerCompany,
        handleSubmit: handleSubmitCompany,
        formState: { errors: companyErrors },
    } = useForm<CompanySettingsInputs>({
        defaultValues: {
            companyName: 'Salon Fryzjerski Bella',
            companySlug: 'fryzjer-bella',
        },
    });

    // FORMULARZ 2: Dodawanie pracownika
    const {
        register: registerEmployee,
        handleSubmit: handleSubmitEmployee,
        reset: resetEmployeeForm,
        formState: { errors: employeeErrors },
    } = useForm<AddEmployeeInputs>();

    const onUpdateCompany = (data: CompanySettingsInputs) => {
        console.log('Zapis danych firmy:', data);
    };

    const onAddEmployee = (data: AddEmployeeInputs) => {
        console.log('Tworzenie pracownika:', data);
        resetEmployeeForm(); // Czyścimy tylko pola pracownika po sukcesie
    };

    return (
        <div className='min-h-dvh bg-gray-50 p-6 max-w-4xl mx-auto space-y-6'>
            <header className='flex justify-between items-center border-b pb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Panel Właściciela</h1>
                    <p className='text-sm text-gray-500'>Zarządzanie strukturą Micro-SaaS</p>
                </div>
                <button className='px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium'>
                    Wyloguj
                </button>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* SEKCJA 1: USTAWIENIA FIRMY */}
                <section className='bg-white p-6 rounded-2xl shadow-sm space-y-4'>
                    <h2 className='text-lg font-semibold text-gray-900'>Dane firmy</h2>
                    <form onSubmit={handleSubmitCompany(onUpdateCompany)} className='space-y-3'>
                        <div>
                            <label className='text-xs font-medium text-gray-500'>Nazwa firmy</label>
                            <input
                                type='text'
                                {...registerCompany('companyName', {
                                    required: 'Nazwa jest wymagana',
                                })}
                                className='w-full border p-2 rounded-xl text-sm'
                            />
                            {companyErrors.companyName && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {companyErrors.companyName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='text-xs font-medium text-gray-500'>Link (slug)</label>
                            <input
                                type='text'
                                {...registerCompany('companySlug', {
                                    required: 'Slug jest wymagany',
                                })}
                                className='w-full border p-2 rounded-xl text-sm'
                            />
                            {companyErrors.companySlug && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {companyErrors.companySlug.message}
                                </p>
                            )}
                        </div>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium'>
                            Zapisz zmiany
                        </button>
                    </form>
                </section>

                {/* SEKCJA 2: DODAWANIE PRACOWNIKA */}
                <section className='bg-white p-6 rounded-2xl shadow-sm space-y-4'>
                    <h2 className='text-lg font-semibold text-gray-900'>Dodaj pracownika</h2>
                    <form onSubmit={handleSubmitEmployee(onAddEmployee)} className='space-y-3'>
                        <div>
                            <label className='text-xs font-medium text-gray-500'>
                                Imię i nazwisko
                            </label>
                            <input
                                type='text'
                                {...registerEmployee('empName', {
                                    required: 'Wpisz imię i nazwisko',
                                })}
                                className='w-full border p-2 rounded-xl text-sm'
                                placeholder='Anna Nowak'
                            />
                            {employeeErrors.empName && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {employeeErrors.empName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='text-xs font-medium text-gray-500'>
                                E-mail logowania
                            </label>
                            <input
                                type='email'
                                {...registerEmployee('empEmail', {
                                    required: 'Wpisz e-mail pracownika',
                                })}
                                className='w-full border p-2 rounded-xl text-sm'
                                placeholder='anna@wp.pl'
                            />
                            {employeeErrors.empEmail && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {employeeErrors.empEmail.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='text-xs font-medium text-gray-500'>
                                Hasło startowe
                            </label>
                            <input
                                type='text'
                                {...registerEmployee('empPassword', {
                                    required: 'Wygeneruj hasło',
                                    minLength: { value: 6, message: 'Min. 6 znaków' },
                                })}
                                className='w-full border p-2 rounded-xl text-sm'
                                placeholder='np. Anna2026!'
                            />
                            {employeeErrors.empPassword && (
                                <p className='text-xs text-red-500 mt-1'>
                                    {employeeErrors.empPassword.message}
                                </p>
                            )}
                        </div>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors'>
                            Utwórz konto pracownika
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
