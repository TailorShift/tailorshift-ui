import * as React from 'react';
import { Alert, AlertActionCloseButton, AlertGroup, AlertProps, AlertVariant, Button, Grid, GridItem, PageSection, SearchInput, Title, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { PosApi, Configuration } from '@app/api';
import { TimesIcon } from '@patternfly/react-icons';

const ReceiptsPane: React.FunctionComponent = ({ apiClient, receipts, setReceipts, customer, reset }) => {
    const [receiptId, setReceiptId] = React.useState('');
    const [error, setError] = React.useState<Response | null>(null);

    React.useEffect(() => {
        setReceipts([]);
        setReceiptId('');
    }, [reset])

    React.useEffect(() => {
        if (customer != null) {
            setError(null);
            setReceipts([]);

            apiClient.getCustomerReceipts(customer.id)
                .then((receipts) => setReceipts(receipts))
                .catch((error) => setError(error));
        }

    }, [customer])



    return (
        <>
            <Title headingLevel="h1" size="lg">Customer receipts</Title>

            {error && <Alert variant="danger" title={error.statusText} />}

        </>
    );

}

export { ReceiptsPane };
