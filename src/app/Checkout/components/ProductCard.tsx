import React from 'react';
import { Card, CardTitle, CardBody, CardFooter, Button, Text, TextVariants } from '@patternfly/react-core';

interface ProductCardProps {
    product: Record
    addCartItem: Function
}
export const ProductCard: React.FunctionComponent<ProductCardProps> = ({ product, addCartItem, allShops }) => {
    if (product.available.length > 0) {
        return product.available.map(item => {
            let availability;
            if (allShops) {
                if (process.env.SHOP_ID == item.shopId) {
                    availability = <span className='in-store-availability'>{item.quantity}</span>
                } else
                    availability = <span>{item.quantity}<span className='other-store-availability'> (Available in store {item.shopId})</span></span>
            } else {
                availability = <span >{item.quantity}</span>
            }

            return (
                <Card className='ts--card ts--card--400' key={item.color + item.size + item.quantity}>
                    <CardTitle>{product.name} ({product.manufacturer})</CardTitle>
                    <CardBody>
                        Color: {item.color} <br />
                        Size: {item.size} <br />
                        Available: {availability}
                    </CardBody>
                    <CardFooter className='ts--card--price'>
                        {addCartItem == null ?
                            <Text style={{ "font-weight": "bold" }} component={TextVariants.h2}>${product.price}</Text> :
                            <Button variant="secondary" isSmall onClick={() => { addCartItem(product, item) }}>
                                ${product.price}
                            </Button>
                        }
                    </CardFooter>
                </Card>
            )
        }
        )

    }
    else {
        return <Card className='ts--card ts--card--sold-out'>
            <CardTitle>{product.name} ({product.manufacturer})</CardTitle>
            <CardBody>
                <span className='ts--card--sold-out-text'>Sold out</span>
            </CardBody>
            <CardFooter className='ts--card--price'>
                {addCartItem == null ?
                    <Text component={TextVariants.h2}>${product.price}</Text> :
                    <Button variant="secondary" isSmall isDisabled>
                        ${product.price}
                    </Button>
                }


            </CardFooter>
        </Card>
    }
};
