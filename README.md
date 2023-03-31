# TailorShift UI

In this repository you can find the code for the TailorShift UI running on on the far-edge PoS device.

It is built on top of [React](https://react.dev/) and is using **Red Hat**'s open source design system [PatternFly](https://www.patternfly.org/v4/)


The openAPI specification for the implemented API can be found in the [edgepos-manager](https://github.com/TailorShift/qiot-retail-edgepos-manager/blob/main/src/main/resources/openapi.yml).

The UI service is available at [http://20.254.120.86:8080/](http://20.254.120.86:8080/)


The UI offers 2 modes:

### Cashier/checkout mode
The cashier/checkout mode resembles a PoS cashier system: The cashier uses it in order to scan items (and the customer's loyality card if available) and shows the items in the cart. 

At the end of the checkout process, the customer can pay and a receipt is created (in the backoffice single-node cluster).

In order to use the cashier/checkout mode, the employee has to scan his/her badge in order to check in. Without checkin, the cashier mode is disabled. The checkin is authorizing the employee with the backend by sending a /pos/authorize-employee request.

### Kiosk/customer mode
The edge device is not just a simple point of sale. It can also offer customer-value service such as "what is the price of?" or "is this product available in other sizes / colors / stores?" features.

Imagine new shop that offers only electronic payment: The device does no longer have to be in a dedicated " authorized-personnel-only" zone. Instead it could be placed or moved freely around in the shop. This allows making more efficient use of stores space. Furthermore it allows employees to get closer to the customer, increasing time available advising and engaging customers in a sale.

The customer can use the UI to search for available products and he is even suggested products that aren't available in the current store, but in other stores.


## Screenshots
Employee Checkin
![Employee Checkin](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/checkout_1.png?raw=true)

Employee scanned badge, employee was found in the DB and can now proceed to check in
![Employee scanned badge, employee was found in the DB and can now proceed to check in](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/checkout_2.png?raw=true)

Employee scans products (and chooses the correct one from the list of available items for this ProductID (items with different sizes/colors have the same barcode/ID))
![Employee scans products (and chooses the correct one from the list of available items for this ProductID (items with different sizes/colors have the same barcode/ID))](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/checkout_3.png?raw=true)

After all the items were scanned the customer can pay (checkout)
![After all the items were scanned the customer can pay (checkout)](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/checkout_4.png?raw=true)

Checkout was successful, a receipt was created
![Checkout was successful, a receipt was created](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/checkout_5.png?raw=true)

In the Kiosk mode, the customer can search for items in the current store and in other stores without the need for a employee checkin
![In the Kiosk mode, the customer can search for items in the current store and in other stores without the need for a employee checkin](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/kiosk_1.png?raw=true)

For a true Kiosk mode experience, the sidebar can be hidden
![For a true Kiosk mode experience, the sidebar can be hidden](https://github.com/TailorShift/tailorshift-ui/blob/main/screenshots/kiosk_2.png?raw=true)

## Quick-start

```bash
git clone https://github.com/TailorShift/tailorshift-ui
cd tailorshift-ui
npm install && npm run start:dev
```

## Development scripts
```sh
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Run a production build (outputs to "dist" dir)
npm run build

# Run the test suite
npm run test

# Run the test suite with coverage
npm run test:coverage

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start the express server (run a production build first)
npm run start

# Start storybook component explorer
npm run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
npm run build:storybook
```