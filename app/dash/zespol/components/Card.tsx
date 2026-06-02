type Employee = {
    fullName: string;
    position: string;
    phone: string;
    email: string;

    visits: number;
    income: number;
};

export function Card({ employee }: { employee: Employee }) {
    return (
        <div className='w-full rounded-xl shadow-md p-8 bg-white'>
            <span>{employee.fullName}</span>
            <div>
                <a
                    href={`tel:${employee.phone}`}
                    className='p-1.5 rounded-lg border transition-colors 
                            bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                    title='Zadzwoń'>
                    <i className='fa-solid fa-phone'></i>
                </a>
            </div>
        </div>
    );
}
