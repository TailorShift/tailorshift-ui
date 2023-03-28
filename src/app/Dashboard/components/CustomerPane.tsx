import * as React from 'react';
import { SearchInput, Alert, Gallery, Title, Card, CardTitle, CardBody } from '@patternfly/react-core';

const CustomerPane: React.FunctionComponent = ({ apiClient, customer, setCustomer }) => {

    return (
        <>
            <Title headingLevel="h1" size="lg">Customer</Title>
            <CustomerSearch apiClient={apiClient} customer={customer} setCustomer={setCustomer} />
            {customer && <CustomerInfo customer={customer} />}
        </>
    );
}

const CustomerSearch: React.FunctionComponent = ({ apiClient, customer, setCustomer }) => {
    const [customerId, setCustomerId] = React.useState();
    const [error, setError] = React.useState<Response | null>(null);

    const onChange = (customerId: string) => {
        setCustomerId(customerId);
    };

    const search = async () => {
        setError(null);
        setCustomer(null);

        apiClient.getCustomer(customerId)
            .then((customer) => setCustomer(customer))
            .catch((error) => setError(error));
    }

    return (
        <>
            <SearchInput
                placeholder="Scan customer card"
                value={customerId}
                onChange={(value, _event) => onChange(value)}
                onSearch={(value, _event) => search()}
                onClear={() => onChange('')}
            />
            {error && <Alert variant="danger" title={error.statusText} />}
        </>
    );
}


const CustomerInfo: React.FunctionComponent = ({ customer }) => {

    return (
        <>
            <Card className='ts--card ts--card--customer' key={customer.id}>
                <CardTitle>{customer.name}</CardTitle>
                <CardBody>
                    {customer.street1} {customer.street2} <br />
                    {customer.postcode} {customer.city} <br />

                    Discount: {customer.discount}%
                </CardBody>
            </Card>
        </>
    )
}

export { CustomerPane };
