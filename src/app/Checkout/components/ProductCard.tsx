import React from 'react';
import { Card, CardTitle, CardBody, CardFooter, Button } from '@patternfly/react-core';

interface ProductCardProps {
    product: Record
    addCartItem: Function
}
export const ProductCard: React.FunctionComponent<ProductCardProps> = ({ product, addCartItem }) => {
    if (product.available.length > 0) {
        return product.available.map(item =>
            <Card className='ts--card ts--card--400' key={item.color + item.size + item.quantity}>
                <CardTitle>{product.name} ({product.manufacturer})</CardTitle>
                <CardBody>
                    Color: {item.color} <br />
                    Size: {item.size} <br />
                    Available: {item.quantity}
                </CardBody>
                <CardFooter className='ts--card--price'>
                    <Button variant="secondary" isSmall onClick={() => { addCartItem(product, item) }}>
                        ${product.price}
                    </Button></CardFooter>
            </Card>
        )

    }
    else {
        return <Card className='ts--card ts--card--sold-out'>
            <CardTitle>{product.name} ({product.manufacturer})</CardTitle>
            <CardBody>
                <span className='ts--card--sold-out-text'>Sold out</span>
            </CardBody>
            <CardFooter className='ts--card--price'>
                <Button variant="secondary" isSmall isDisabled>
                    ${product.price}
                </Button>
            </CardFooter>
        </Card>
    }
};
