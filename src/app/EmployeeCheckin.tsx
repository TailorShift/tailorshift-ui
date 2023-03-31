import * as React from 'react';
import { Alert, Button, Card, CardBody, CardTitle, Modal, ModalVariant, SearchInput } from '@patternfly/react-core';

const EmployeeCheckin: React.FunctionComponent = ({ apiClient, showCheckinModal, setShowCheckinModal, employee, setEmployee }) => {
    const [loadedEmployee, setLoadedEmployee] = React.useState();
    const [loadedEmployeeId, setLoadedEmployeeId] = React.useState('');
    const [error, setError] = React.useState<Response | null>(null);

    const checkIn = () => {
        setEmployee(loadedEmployee);
        setShowCheckinModal(false);
    };

    const searchEmployee = (cardId) => {
        setError(null);
        setLoadedEmployee(null);

        apiClient.authorizeEmployee(cardId)
            .then((res) => res.json())
            .then((employee) => setLoadedEmployee(employee))
            .catch((error) => setError(error))
    }

    return (
        <Modal
            variant={ModalVariant.small}
            title="Employee Checkin"
            description="Scan your employee badge in order to checkin. Unless you aren't checked in, you can't use the checkout functionality."
            isOpen={showCheckinModal}
            showClose={false}
            actions={[
                <Button key="create" variant="primary" form="modal-with-form-form" isDisabled={loadedEmployee == null} onClick={checkIn}>
                    Check in
                </Button>,

                <Button key="cancel" variant="tertiary" onClick={() => { setShowCheckinModal(false) }}>
                    Cancel
                </Button>
            ]}
        >
            <SearchInput
                placeholder="Badge ID"
                value={loadedEmployeeId}
                onChange={(value) => setLoadedEmployeeId(value)}
                onSearch={(value) => searchEmployee(value)}
                onClear={() => setLoadedEmployeeId('')}
            />

            {error && <Alert variant="danger" title={error.statusText} />}
            {loadedEmployee && <EmployeeCard employee={loadedEmployee} />}
        </Modal>


    )

}

const EmployeeCard: React.FunctionComponent = ({ employee }) => {

    return (
        <Card className='ts--card'>
            <CardTitle>{employee.name}</CardTitle>
            <CardBody>
                Primary Shop ID: {employee.primaryShopId} <br />
                Card ID: {employee.cardId} <br />
            </CardBody>
        </Card>

    )

}

export { EmployeeCheckin };
