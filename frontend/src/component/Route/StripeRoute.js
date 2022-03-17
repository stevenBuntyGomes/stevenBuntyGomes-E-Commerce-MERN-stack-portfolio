import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { Navigate, Outlet } from 'react-router-dom'

const stripePromis = loadStripe("pk_test_51KLlRLGZWH36KSLtX8h3PuMMvnXHRmzyTSKMS0gVoQY3ZCa08CPKRfRx5D1gcL95aDhQrstZ3qshloGo5cjTxGfX00zxyTfEmh");

function StripeRoute() {

  return stripePromis ? (
    <Elements stripe = {stripePromis}>
        <Outlet/>
    </Elements>
  ) : <Navigate to = "/" />
}

export default StripeRoute