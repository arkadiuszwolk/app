'use client';

interface Service {
    id: string;
    name: string;
    duration: number;
    price: number;
}

interface ProfileViewProps {
    company: { name: string; slug: string };
    services: Service[];
    onSelectService: (service: Service) => void; // Dodany callback dla kontrolera
}

export default function ProfileView({ company, services, onSelectService }: ProfileViewProps) {
    return (
        <div className='w-full flex flex-col pb-8'>
            {/* SEKCJA PROFILU (INSTAGRAM STYLE) */}
            <header className='p-6 border-b border-gray-100 space-y-4 w-full'>
                <div className='flex items-center space-x-5'>
                    <div className='w-16 h-16 bg-linear-to-tr from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0'>
                        {company.name.charAt(0).toUpperCase()}
                    </div>
                    <div className='space-y-0.5'>
                        <h1 className='text-lg font-bold tracking-tight text-gray-900'>
                            {company.name}
                        </h1>
                        <p className='text-xs text-gray-400 font-medium'>
                            minical.pl/{company.slug}
                        </p>
                        <div className='flex space-x-3 pt-1 text-xs text-gray-500'>
                            <div>
                                <span className='font-semibold text-gray-900'>
                                    {services.length}
                                </span>{' '}
                                usług
                            </div>
                            <div>
                                <span className='font-semibold text-gray-900'>5.0</span> ★★★★★
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-xs text-gray-500 leading-relaxed'>
                    Zapraszamy na profesjonalne usługi. Wybierz dogodny termin i zarezerwuj wizytę w
                    30 sekund online! ✨
                </div>

                <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(company.name)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block p-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl transition-all group active:scale-[0.99]'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2.5 text-xs'>
                            <span>📍</span>
                            <span className='font-medium text-gray-700 group-hover:text-gray-900'>
                                Zobacz lokalizację na mapie
                            </span>
                        </div>
                        <span className='text-gray-400 text-xs group-hover:translate-x-0.5 transition-transform'>
                            →
                        </span>
                    </div>
                </a>
            </header>

            {/* SEKCJA LISTY USŁUG */}
            <main className='w-full px-4 pt-6 space-y-3'>
                <h2 className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>
                    Wybierz usługę
                </h2>

                {services.length === 0 ? (
                    <div className='text-center py-12 text-sm text-gray-400'>
                        Ta firma nie konfiguruje jeszcze usług.
                    </div>
                ) : (
                    <div className='space-y-2'>
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => onSelectService(service)}
                                className='w-full text-left p-4 bg-white hover:bg-gray-50/50 border border-gray-100 rounded-xl flex items-center justify-between transition-all group active:scale-[0.99]'>
                                <div className='space-y-0.5'>
                                    <h3 className='font-semibold text-gray-900 text-sm group-hover:text-gray-900'>
                                        {service.name}
                                    </h3>
                                    <p className='text-xs text-gray-400 font-medium'>
                                        ⏱️ {service.duration} min
                                    </p>
                                </div>

                                <div className='flex items-center space-x-2 shrink-0'>
                                    <span className='font-bold text-sm text-gray-950 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100'>
                                        {Number(service.price).toFixed(0)} PLN
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
