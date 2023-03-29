import * as React from 'react';
import { Alert, AlertActionCloseButton, AlertGroup, AlertProps, AlertVariant, Button, Grid, GridItem, PageSection, Title, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { PosApi, Configuration } from '@app/api';
import { TimesIcon } from '@patternfly/react-icons';
import { ReceiptsPane } from './components/ReceiptsPane';
import { CustomerPane } from '@app/Checkout/components/CustomerPane';

const Return: React.FunctionComponent = () => {
  const [reset, doReset] = React.useState(0);
  const [product, setProduct] = React.useState();
  const [receipts, setReceipts] = React.useState([]);
  const [customer, setCustomer] = React.useState();
  const [alerts, setAlerts] = React.useState<Partial<AlertProps>[]>([]);

  const addAlert = (title: string, variant: AlertProps['variant'], key: React.Key) => {
    setAlerts(prevAlerts => [...prevAlerts, { title, variant, key }]);
  };

  const removeAlert = (key: React.Key) => {
    setAlerts(prevAlerts => [...prevAlerts.filter(alert => alert.key !== key)]);
  };

  const configuration = new Configuration({ basePath: 'http://localhost:8080' })
  const apiClient = new PosApi(configuration);

  const addCartItem = (product, type) => {
    setCartItems((cartItems) => [...cartItems, { product: product, type: type }])
  }

  const toolbarItems = (
    <React.Fragment>
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

    <Toolbar
      className="pf-m-toggle-group-container"
      collapseListedFiltersBreakpoint="xl"
    >
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>

    <Grid hasGutter>
      <GridItem span={2}>
        <CustomerPane apiClient={apiClient} customer={customer} setCustomer={setCustomer} reset={reset}></CustomerPane>
      </GridItem>

      <GridItem span={4}>
        <ReceiptsPane apiClient={apiClient} receipts={receipts} setReceipts={setReceipts} customer={customer} reset={reset}></ReceiptsPane>
      </GridItem>

    </Grid>
  </PageSection>

}

export { Return };
