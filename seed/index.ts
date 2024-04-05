import prisma from '../src/db';

import '../src/config';

async function main(): Promise<void> {
    await prisma.user.create({
        data: {
            auth0_id: 'test|auth0',
            email: 'Alice@prisma.io',
            family_name: 'Alice',
            given_name: 'bob',
            Account: {
                create: {},
            },
        },
    });
    const allUsers = await prisma.user.findMany();
    const allAccounts = await prisma.account.findMany();
    console.log(allUsers, allAccounts);
}

main()
    .then((res) => res)
    .catch((err) => {
        console.log(err);
    });
