import * as React from 'react';
import { Alert, Button, Divider, List, ListItem, PageSection, Split, SplitItem, Title } from '@patternfly/react-core';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});


const Cart: React.FunctionComponent = ({ apiClient, cartItems, setCartItems, customer, employee, addAlert, reset, doReset }) => {

    const [error, setError] = React.useState<Response | null>();

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price, 0)
    const tax = cartItems.reduce((acc, item) => acc + (item.product.price * item.product.taxRate / 100), 0)
    const discount = customer != null ? subtotal * customer.discount / 100 : 0;
    const total = subtotal - discount

    React.useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    React.useEffect(() => {
        setCartItems([])
    }, [reset])


    const checkout = () => {
        setError(null);

        const receipt = {
            customerId: customer ? customer.id : null,
            employeeId: employee.id,
            deliveryShopId: null,
            discountTotal: discount,
            taxTotal: tax,
            amountTotal: total,
            positions: cartItems.map((item, i) => {
                return {
                    productId: item.product.id,
                    position: i + 1,
                    size: item.type.size,
                    color: item.type.color,
                    quantity: 1, // TODO
                    returnedQuantity: 0,
                    price: item.product.price,
                    discount: 0,
                    taxRate: item.product.taxRate
                }
            })
        }

        apiClient.createReceipt(receipt)
            .then((res) => res.json())
            .then((data) => {
                addAlert(`Receipt ${data.id} created successfully`, 'success', new Date().getTime())
                doReset();
            })
            .catch((error) => setError(error));
    }

    return (
        <>
            <Title headingLevel="h1" size="lg">Cart</Title>
            <List isPlain isBordered>
                {cartItems.map(item =>
                    <CartEntry key={item.name} item={item} />
                )}
            </List>

            <br />
            <br />
            {cartItems.length > 0 &&
                <>
                    <Divider />
                    <Divider />
                    <CartSummary items={cartItems} subtotal={subtotal} tax={tax} discount={discount} total={total} />
                    <Button
                        className='ts--cart--cart-checkout--btn'
                        variant="primary"
                        isLarge
                        onClick={() => { checkout() }}
                    >Checkout
                    </Button>

                    {error && <Alert variant="danger" title={error.statusText} />}
                </>
            }


        </>
    )
}

const CartEntry: React.FunctionComponent = ({ item }) => {
    return (
        <>
            <ListItem key={item.product.name}>
                <Split>
                    <SplitItem>
                        <span className='ts--cart--cart-entry--title'>
                            {item.product.manufacturer} {item.product.name}
                        </span><br />
                        <span>{item.type.color} / {item.type.size}</span>
                    </SplitItem>
                    <SplitItem isFilled></SplitItem>
                    <SplitItem>{formatter.format(item.product.price)}</SplitItem>
                </Split>


            </ListItem>
        </>
    )
}

const CartSummary: React.FunctionComponent = ({ items, subtotal, tax, discount, total }) => {
    return (
        <div className='ts--cart--cart-summary pf-u-text-align-right'>
            Subtotal: <span>{formatter.format(subtotal).padStart(20)}</span>
            <br />
            incl. Tax: {formatter.format(tax).padStart(20)}
            <br />
            Discount: {formatter.format(discount == 0 ? discount : -discount).padStart(20)}
            <br />
            <span className='ts--cart--cart-summary--total'>
                Total: {formatter.format(total).padStart(20)}
            </span>
        </div>
    )
}

export { Cart };
