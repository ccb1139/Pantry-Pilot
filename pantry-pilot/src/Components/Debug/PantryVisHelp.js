import React from 'react'
import { Container, Row, Col } from "react-bootstrap";


function PantryVisHelp({ pantry, setPantry }) {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Total Stock</h2>
                    <ul>
                        {pantry[0]?.totalStock.map((item) => (
                            <li key={item._id}>
                                {item.foodName} ({item.category}): {item.quantity}
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col>
                    <h2>Categories</h2>
                    <ul>
                        {pantry[0]?.categories.map((category) => (
                            <li key={category._id}>
                                {category.categoryName}: {category.foodNames.join(", ")}
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col>
                    <h2>Fridge</h2>
                    <ul>
                        {pantry[0]?.fridge.map((item) => (
                            <li key={item._id}>
                                {item.foodName} ({item.category}): {item.expirationDate}
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default PantryVisHelp