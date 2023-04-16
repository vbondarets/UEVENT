import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import classes from './css/Payment.module.css';

const PaymentPage = () => {
  const [status, setStatus] = useState();
  const router = useHistory();
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  useEffect(() => {
    setStatus(query.get("status"));
}, []);
  return (
    <div className={classes.container}>
      {status === "success" &&
        <div className={classes.text_container}>
          <pre className={classes.message}>
            {"Thanks for your purchase\nYou will receive ticket to your email when we confirm your payment\nYou will be redirected to the main page"}
          </pre>
          {
            setTimeout(() => {
              router.goBack();
            }, 2000)
          }
        </div>
      }
      {status === "reject" &&
        <div className={classes.text_container}>
          <pre className={classes.message}>
            {"Unfortunately your payment rejected\nYou will be redirected to the main page"}
          </pre>
          {
            setTimeout(() => {
              router.goBack();
            }, 2000)
          }
        </div>
      }
      {status && status !== "reject" && status !== "success" &&
        <div>
          {router.goBack()}
        </div>
      }
    </div>
  )
}

export default PaymentPage