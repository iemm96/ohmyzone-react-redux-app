import { PayPalButton } from "react-paypal-button-v2";

const PaypalButtonComponent = ({amount, subscriptionType}:{amount:string, subscriptionType:string}) => {
    return (
      <PayPalButton
        createSubscription={(data:any, actions:any) => {
            return actions.subscription.create({
              plan_id: subscriptionType === 'annual' ? 'P-9MV67954VP388794WMIXHMEQ' : 'P-2HT01121J34452333MIXHLJI'
            });
          }}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onApprove={(data:any, actions:any) => {
            // Capture the funds from the transaction
            return actions.subscription.get().then(function(details:any) {
              // Show a success message to your buyer
              alert("Subscription completed");
  
              return fetch("/paypal-subscription-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID,
                  subscriptionID: data.subscriptionID
                })
              });
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