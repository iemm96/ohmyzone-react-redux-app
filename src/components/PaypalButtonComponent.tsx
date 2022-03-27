import { PayPalButton } from "react-paypal-button-v2";
import { postRecord } from "../actions/postRecord";
import { useDispatch } from 'react-redux';
import { updateSubscription } from '../actions/subscriptions';
import { subscribe } from "../actions/subscribe";
import { add } from 'date-fns';

const PaypalButtonComponent = ({subscriptionType, user }:{subscriptionType:"free" | "expired" | "proWithFreeTrial" | "proMonthly" | "proAnnual" | "proLifetime", user:string}) => {
    const dispatch = useDispatch();

    return (
      <PayPalButton
        createSubscription={(data:any, actions:any) => {
            return actions.subscription.create({
              plan_id: subscriptionType === 'proAnnual' ? 'P-9MV67954VP388794WMIXHMEQ' : 'P-2HT01121J34452333MIXHLJI'
            });
          }}
        onApprove={(data:any, actions:any) => {
            // Capture the funds from the transaction
            return actions.subscription.get().then( async function(details:any) {
  
              console.log('data paypal ', data);

              const { transaction } = await postRecord( 'transactions', {
                orderIdPaypal: data.orderID,
                subscriptionIdPaypal: data.subscriptionID,
                subscriptionType,
                user
              } );

              let monthsToAdd:number = 0;
              if( subscriptionType === 'proAnnual' ) {
                monthsToAdd = 12
              }

              if( subscriptionType === 'proMonthly' ) {
                monthsToAdd = 1
              }

              const dateModified = add(new Date(), {
                months: monthsToAdd,
              })

              const resultSubscribe = await subscribe(
                user,
                subscriptionType,
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