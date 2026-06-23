import { PageClientManager } from './page-client-manager';
import { getCompanyServices } from './queries';

export default async function Page() {
    const companyId = '9a17fc45-7d0a-40fd-a2d8-b6cd8879c744';
    const companyServices = await getCompanyServices(companyId);

    return <PageClientManager companyId={companyId} companyServices={companyServices} />;
}
