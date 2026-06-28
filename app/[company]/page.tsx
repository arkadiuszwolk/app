import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { BookingFlowController } from './BookingFlowController';
import { getAvailableSlots } from '@/lib/engine-v2';

interface CompanyPageProps {
    params: Promise<{ company: string }>;
}

export default async function CompanyBookingPage({ params }: CompanyPageProps) {
    const { company: companySlug } = await params;
    const supabase = await createClient();

    const availableSlots = getAvailableSlots(2026, 6, 60);

    // 1. Pobierz dane firmy
    const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id, name, slug')
        .eq('slug', companySlug)
        .single();

    if (companyError || !company) {
        console.log(companySlug);
        console.log(companyError);
        console.log(company);
        notFound();
    }

    // 2. Pobierz aktywne usługi
    const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('id, name, duration, price')
        .eq('company_id', company.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true });

    return (
        <div className='w-full h-dvh overflow-hidden bg-white flex flex-col md:w-80 md:mx-auto md:border-x md:border-gray-50 md:shadow-sm'>
            {/* Przekazujemy dane pobrane z serwera do naszego kontrolera kroków */}
            <BookingFlowController
                company={company}
                services={services || []}
                availableSlots={availableSlots}
            />
        </div>
    );
}
