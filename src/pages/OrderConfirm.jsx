import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row } from 'reactstrap';
import '../styles/order-confirm.css'
import { Stepper, Step, StepLabel } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function getSteps() {
    return ['Order placed', 'Ready to ship', 'Delivery'];
}

const stepStyle = {
    boxShadow: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 2,
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "var(--primary-color)",
      },
    },
  }


function OrderConfirm() {
    const steps = getSteps();
    const today = new Date().toDateString();

    const isStepOptional = (step) => {
        return step === 0;
    };

    return (
        <Helmet title={"Order Confirmation"}>
            <Container>
                <Row>
                    <div className='order-container'>
                        <h1 className='fw-bold'>Your order has been received</h1>
                        <span ><i class="ri-checkbox-circle-fill"></i></span>
                        <h3>Thank you for your purchase!</h3>
                        <p>We are getting started on your order right away. <br/> In the meantime, explore the latest products and get inspired by new gadgets, just head over to <Link to='/'>MyStore Shop</Link></p>
                        <Link to='/shop'><button className='shop-btn'>CONTINUE SHOPPING</button></Link>
                        <div className='stepper-container'>
                            <Stepper alternativeLabel sx={stepStyle}>
                                {steps.map((label, index) => {
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                        labelProps.optional = <Typography variant="caption">On {today}</Typography>;
                                    }
                                    return (
                                        <Step key={label}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                }
                                )}
                            </Stepper>
                        </div>
                    </div>
                </Row>
            </Container>
        </Helmet>
    )
}

export default OrderConfirm