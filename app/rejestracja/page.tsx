'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

// 1. Definiujemy interfejs dla stanu formularza
interface FormData {
    fullName: string;
    phone: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

// 2. Definiujemy interfejs dla błędów (pola mogą, ale nie muszą mieć błędu)
interface FormErrors {
    fullName?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
}

export default function RegisterForm() {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Formatowanie telefonu w locie (XXX XXX XXX) z silnym typowaniem zdarzenia
    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value.replace(/\D/g, '');
        const trimmed = rawInput.substring(0, 9);

        let formatted = trimmed;
        if (trimmed.length > 3 && trimmed.length <= 6) {
            formatted = `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`;
        } else if (trimmed.length > 6) {
            formatted = `${trimmed.slice(0, 3)} ${trimmed.slice(3, 6)} ${trimmed.slice(6)}`;
        }

        setFormData({ ...formData, phone: formatted });
        if (errors.phone) setErrors({ ...errors, phone: undefined });
    };

    const validateForm = (): boolean => {
        const tempErrors: FormErrors = {};

        if (!formData.fullName.trim()) tempErrors.fullName = 'Wpisz imię i nazwisko';

        const rawPhone = formData.phone.replace(/\s/g, '');
        if (rawPhone.length !== 9) tempErrors.phone = 'Numer telefonu musi mieć 9 cyfr';

        if (formData.password.length < 6) tempErrors.password = 'Hasło musi mieć min. 6 znaków';
        if (formData.password !== formData.confirmPassword)
            tempErrors.confirmPassword = 'Hasła nie są identyczne';
        if (!formData.acceptTerms) tempErrors.acceptTerms = 'Musisz zaakceptować regulamin';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Przygotowanie czystych danych (usunięcie spacji z telefonu) do wysyłki do API/Supabase
            const payload = {
                fullName: formData.fullName,
                fullPhone: `+48${formData.phone.replace(/\s/g, '')}`,
                password: formData.password,
            };

            console.log('Dane gotowe i otypowane:', payload);
            // Tutaj wejdzie wywołanie Supabase Auth
        }
    };

    return (
        <div className='min-h-screen bg-[#060608] flex items-center justify-center p-6 font-sans antialiased'>
            <div className='w-full max-w-md bg-[#0F0F12] border border-[#1F1F24] rounded-2xl p-8 shadow-xl'>
                <h2 className='text-2xl font-semibold text-left text-white tracking-tight mb-8'>
                    Nowe konto
                </h2>

                <form onSubmit={handleSubmit} className='space-y-6' noValidate>
                    {/* Pole: Imię i nazwisko */}
                    <div>
                        <label className='block text-xs font-medium text-[#7A7C85] uppercase tracking-wider mb-2'>
                            Imię i nazwisko
                        </label>
                        <input
                            type='text'
                            placeholder='np. Jan Kowalski'
                            value={formData.fullName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setFormData({ ...formData, fullName: e.target.value });
                                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                            }}
                            className={`w-full px-4 py-3.5 rounded-xl bg-[#16161A] border text-white text-[15px] placeholder-[#4E5059] focus:outline-none transition-all ${
                                errors.fullName
                                    ? 'border-[#E15241]'
                                    : 'border-[#26262B] focus:border-[#1967D2]'
                            }`}
                        />
                        {errors.fullName && (
                            <p className='text-xs text-[#E15241] mt-1.5 font-medium pl-0.5'>
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Pole: Numer telefonu */}
                    <div>
                        <label className='block text-xs font-medium text-[#7A7C85] uppercase tracking-wider mb-2'>
                            Numer telefonu
                        </label>
                        <div
                            className={`flex items-center w-full rounded-xl bg-[#16161A] border transition-all ${
                                errors.phone
                                    ? 'border-[#E15241]'
                                    : 'border-[#26262B] focus-within:border-[#1967D2]'
                            }`}>
                            {/* Prefiks z okrągłą flagą */}
                            <div className='flex items-center gap-2.5 pl-4 pr-3 py-3.5 border-r border-[#26262B] select-none'>
                                <div className='w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border border-white/5'>
                                    <div className='bg-white h-1/2 w-full'></div>
                                    <div className='bg-[#E15241] h-1/2 w-full'></div>
                                </div>
                                <span className='text-[15px] font-medium text-[#D1D2D6]'>+48</span>
                            </div>
                            <input
                                type='tel'
                                placeholder='000 000 000'
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                className='w-full px-4 py-3.5 bg-transparent text-white text-[16px] placeholder-[#4E5059] focus:outline-none font-medium tracking-wide'
                            />
                        </div>
                        {errors.phone && (
                            <p className='text-xs text-[#E15241] mt-1.5 font-medium pl-0.5'>
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Pole: Hasło */}
                    <div>
                        <label className='block text-xs font-medium text-[#7A7C85] uppercase tracking-wider mb-2'>
                            Hasło
                        </label>
                        <input
                            type='password'
                            placeholder='••••••'
                            value={formData.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setFormData({ ...formData, password: e.target.value });
                                if (errors.password) setErrors({ ...errors, password: undefined });
                            }}
                            className={`w-full px-4 py-3.5 rounded-xl bg-[#16161A] border text-white text-[15px] placeholder-[#4E5059] focus:outline-none transition-all ${
                                errors.password
                                    ? 'border-[#E15241]'
                                    : 'border-[#26262B] focus:border-[#1967D2]'
                            }`}
                        />
                        {errors.password && (
                            <p className='text-xs text-[#E15241] mt-1.5 font-medium pl-0.5'>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Pole: Powtórz hasło */}
                    <div>
                        <label className='block text-xs font-medium text-[#7A7C85] uppercase tracking-wider mb-2'>
                            Powtórz hasło
                        </label>
                        <input
                            type='password'
                            placeholder='••••••'
                            value={formData.confirmPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setFormData({ ...formData, confirmPassword: e.target.value });
                                if (errors.confirmPassword)
                                    setErrors({ ...errors, confirmPassword: undefined });
                            }}
                            className={`w-full px-4 py-3.5 rounded-xl bg-[#16161A] border text-white text-[15px] placeholder-[#4E5059] focus:outline-none transition-all ${
                                errors.confirmPassword
                                    ? 'border-[#E15241]'
                                    : 'border-[#26262B] focus:border-[#1967D2]'
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className='text-xs text-[#E15241] mt-1.5 font-medium pl-0.5'>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Checkbox: Regulamin */}
                    <div className='pt-2'>
                        <label className='flex items-center gap-3 cursor-pointer select-none'>
                            <input
                                type='checkbox'
                                checked={formData.acceptTerms}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setFormData({ ...formData, acceptTerms: e.target.checked });
                                    if (errors.acceptTerms)
                                        setErrors({ ...errors, acceptTerms: undefined });
                                }}
                                className='w-5 h-5 rounded-md border-[#26262B] bg-[#16161A] text-[#1967D2] focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer'
                            />
                            <span className='text-sm text-[#7A7C85]'>
                                Akceptuję{' '}
                                <a
                                    href='/regulamin'
                                    className='text-[#1967D2] font-medium underline underline-offset-4 hover:text-[#2b7de9] transition-colors'>
                                    regulamin
                                </a>
                            </span>
                        </label>
                        {errors.acceptTerms && (
                            <p className='text-xs text-[#E15241] mt-1.5 font-medium pl-0.5'>
                                {errors.acceptTerms}
                            </p>
                        )}
                    </div>

                    {/* Przycisk Premium Blue */}
                    <button
                        type='submit'
                        className='w-full mt-4 bg-[#1967D2] hover:bg-[#1a73e8] text-white font-medium py-3.5 rounded-xl transition-all duration-150 active:scale-[0.99] text-[15px]'>
                        Utwórz konto
                    </button>
                </form>
            </div>
        </div>
    );
}
