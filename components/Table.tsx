export function Table() {
    return (
        <table className='border-collapse border border-gray-400'>
            <thead>
                <tr>
                    <th className='border border-gray-300'>State</th>
                    <th className='border border-gray-300'>City</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Td>Indiana</Td>
                    <Td>Indianapolis</Td>
                </tr>
                <tr>
                    <Td>Ohio</Td>
                    <Td>Columbus</Td>
                </tr>
                <tr>
                    <Td>Michigan</Td>
                    <Td>Detroit</Td>
                </tr>
            </tbody>
        </table>
    );
}

function Td({ children }: { children: React.ReactNode }) {
    return <td className='border border-gray-300'>{children}</td>;
}
