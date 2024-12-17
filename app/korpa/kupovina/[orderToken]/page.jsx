
import Order from "@/app/korpa/kupovina/[orderToken]/Order.jsx";



const FinishedOrder = ({ params: { orderToken } }) => {
  return (
    <main >
      <Order orderToken={orderToken} />
    </main>
  );
};

export default FinishedOrder;
