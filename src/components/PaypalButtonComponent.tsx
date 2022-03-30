import { PayPalButton } from "react-paypal-button-v2";
import { postRecord } from "../actions/postRecord";
import { useDispatch } from 'react-redux';
import { updateSubscription } from '../actions/subscriptions';
import { subscribe } from "../actions/subscribe";
import { add } from 'date-fns';

const PaypalButtonComponent = ({planName, user }:{planName:"free" | "expired" | "proWithFreeTrial" | "proMonthly" | "proAnnual" | "proLifetime", user:string}) => {
    const dispatch = useDispatch();

    return (
      <PayPalButton
        createSubscription={(data:any, actions:any) => {
            return actions.subscription.create({
              plan_id: planName === 'proAnnual' ? 'P-9MV67954VP388794WMIXHMEQ' : 'P-2HT01121J34452333MIXHLJI'
            });
          }}
        onApprove={(data:any, actions:any) => {
            // Capture the funds from the transaction
            return actions.subscription.get().then( async function(details:any) {
  
              const { transaction } = await postRecord( 'transactions', {
                orderIdPaypal: data.orderID,
                subscriptionIdPaypal: data.subscriptionID,
                planName,
                user
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

              dispatch( updateSubscription({
                current: ''
              }) );

              return transaction;
            });
          }}
        options={{
            vault: true,
            currency: 'MXN',
            clientId: "AfuBu7MGQ6uUdMn51-SPipIEFOlSWvKIu7SBHYYtJL_pZfDgX0kiFhxLb2_s2eR1kU8Viwz0KFHkYppv"
        }}
      />
    );
}

export default PaypalButtonComponent;