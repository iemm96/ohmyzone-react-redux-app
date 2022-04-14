import { PayPalButton } from "react-paypal-button-v2";
import { postRecord } from "../actions/postRecord";
import { useDispatch } from 'react-redux';
import { updateSubscription } from '../actions/subscriptions';
import { subscribe } from "../actions/subscribe";
import { add } from 'date-fns';
import { updatePlan } from '../actions/plans';

const { REACT_APP_PAYPAL_CLIENT, REACT_APP_ZONER_PRO_ANNUAL_PAYPAL_CODE, REACT_APP_ZONER_PRO_MONTHLY_CODE } = process.env;

const PaypalButtonComponent = ({planName, user }:{planName:"free" | "expired" | "proWithFreeTrial" | "proMonthly" | "proAnnual" | "proLifetime", user:string}) => {
    const dispatch = useDispatch();

    return (
      <PayPalButton
        createSubscription={(data:any, actions:any) => {
            return actions.subscription.create({
              plan_id: planName === 'proAnnual' ? REACT_APP_ZONER_PRO_ANNUAL_PAYPAL_CODE : REACT_APP_ZONER_PRO_MONTHLY_CODE
            });
          }}
        onApprove={(data:any, actions:any) => {
            // Capture the funds from the transaction
            return actions.subscription.get().then( async function(details:any) {
  
              const { transaction } = await postRecord( 'transactions', {
                status: "paid",
                orderIdPaypal: data.orderID,
                subscriptionIdPaypal: data.subscriptionID,
                planName,
                user,
              } );

              let monthsToAdd:number = 0;
              if( planName === 'proAnnual' ) {
                monthsToAdd = 12
              }

              if( planName === 'proMonthly' ) {
                monthsToAdd = 1
              }

              const dateModified = add(new Date(), {
                months: monthsToAdd,
              })

              const resultSubscribe = await subscribe(
                user,
                planName,
                dateModified,
                transaction.uid, 
              );

              console.log( 'resultSubscribe ', resultSubscribe );

              dispatch( updateSubscription(
                resultSubscribe.subscription
              ) );

              dispatch( updatePlan(
                resultSubscribe.plan
              ) );

              return transaction;
            });
          }}
        options={{
            vault: true,
            currency: 'MXN',
            clientId: REACT_APP_PAYPAL_CLIENT
        }}
      />
    );
}

export default PaypalButtonComponent;