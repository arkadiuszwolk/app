import { getCompanyDayOffs, getCompanyHours } from './queries';
import { PageClientManager } from './page-client-manager';

export default async function Page() {
    const companyId = '9a17fc45-7d0a-40fd-a2d8-b6cd8879c744';
    const companyHours = await getCompanyHours(companyId);
    const companyDayOffs = await getCompanyDayOffs(companyId);

    return (
        <PageClientManager
            companyId={companyId}
            companyHours={companyHours}
            companyDayOffs={companyDayOffs}
        />
    );
}
