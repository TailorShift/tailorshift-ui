import * as React from 'react';
import { Alert, AlertActionCloseButton, AlertGroup, AlertProps, AlertVariant, Button, Grid, GridItem, PageSection, Title, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { ProductSearch } from './components/ProductSearch';
import { Cart } from './components/Cart';
import { PosApi, Configuration } from '@app/api';
import { CustomerPane } from './components/CustomerPane';
import { TimesIcon, TrashIcon } from '@patternfly/react-icons';
import { EmployeeCheckin } from '@app/EmployeeCheckin';

const Checkout: React.FunctionComponent = () => {
  const [reset, doReset] = React.useState(0);
  const [employee, setEmployee] = React.useState();
  const [product, setProduct] = React.useState();
  const [cartItems, setCartItems] = React.useState([]);
  const [customer, setCustomer] = React.useState();
  const [alerts, setAlerts] = React.useState<Partial<AlertProps>[]>([]);
  const [showCheckinModal, setShowCheckinModal] = React.useState(true);

  const addAlert = (title: string, variant: AlertProps['variant'], key: React.Key) => {
    setAlerts(prevAlerts => [...prevAlerts, { title, variant, key }]);
  };

  const removeAlert = (key: React.Key) => {
    setAlerts(prevAlerts => [...prevAlerts.filter(alert => alert.key !== key)]);
  };

  const configuration = new Configuration({ basePath: process.env.PROXY_HOST_URL })
  const apiClient = new PosApi(configuration);

  const addCartItem = (product, type) => {
    setCartItems((cartItems) => [...cartItems, { product: product, type: type }])
  }

  const toolbarItems = (
    <React.Fragment>
      <ToolbarItem>
        {employee != null ?
          <h1>Welcome, {employee.name}</h1> :
          <Button variant="danger" isSmall onClick={() => { setShowCheckinModal(true) }}>
            Cashier check in
          </Button>
        }

      </ToolbarItem>
      <ToolbarItem className='pf-u-text-align-right'>
        <Button variant="plain" aria-label="sync" onClick={() => { doReset(prev => prev + 1) }}>
          <TimesIcon /> Clear
        </Button>
      </ToolbarItem>
    </React.Fragment>
  );

  return <PageSection>
    <AlertGroup isToast isLiveRegion>
      {alerts.map(({ key, variant, title }) => (
        <Alert
          timeout={5000}
          variant={AlertVariant[variant]}
          title={title}
          actionClose={
            <AlertActionCloseButton
              title={title as string}
              variantLabel={`${variant} alert`}
              onClose={() => removeAlert(key)}
            />
          }
          key={key}
        />
      ))}
    </AlertGroup>

    <EmployeeCheckin apiClient={apiClient} showCheckinModal={showCheckinModal} setShowCheckinModal={setShowCheckinModal} employee={employee} setEmployee={setEmployee}></EmployeeCheckin>
    <Toolbar
      className="pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="xl"
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>

    <Grid hasGutter>
      <GridItem span={7}>
        <ProductSearch apiClient={apiClient} title={"Add products"} allShops={false} product={product} setProduct={setProduct} addCartItem={addCartItem} disabled={employee == null} reset={reset}></ProductSearch>
      </GridItem>
      <GridItem span={2}>
        <CustomerPane apiClient={apiClient} customer={customer} setCustomer={setCustomer} disabled={employee == null} reset={reset}></CustomerPane>
      </GridItem>
      <GridItem span={3}>
        <Cart apiClient={apiClient} cartItems={cartItems} setCartItems={setCartItems} customer={customer} employee={employee} addAlert={addAlert} reset={reset} doReset={doReset}></Cart>
      </GridItem>
    </Grid>
  </PageSection>
}

export { Checkout };
