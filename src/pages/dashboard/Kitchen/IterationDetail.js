import { useEffect } from "react";
import Card from "../../menu-ui/components/Card";
import IconButton from "../../menu-ui/components/IconButton";
import useAxios from "../../../shared/hooks/useAxios";

function IterationDetail({ iteration, orderId, updateOrder }) {
  const { response, callApi } = useAxios();

  useEffect(() => {
    if (response) {
      updateOrder(response.data);
    }
  }, [response]);

  const changeStatus = (iterationId) => {
    callApi({
      apiUrl: `/orders/${orderId}/iteration/${iterationId}`,
      apiMethod: "patch",
      apiBody: { status: "Completed" },
      errorToastMessage: "Something went wrong, Please try again!",
    });
  };
  return (
    <Card className="my-3 bg-light-base2 dark:bg-dark-base3 text-light-text1 dark:text-dark-text1">
      <p className="mb-3 text-xl font-medium text-end">Quantity</p>
      {iteration.items.map((item) => {
        return (
          <div key={item.item.id} className="flex justify-between mb-5">
            <div className="flex">
              {item.item.imageUrl && (
                <img
                  src={item.item.imageUrl}
                  alt={item.item.name}
                  className="w-20 rounded-full"
                />
              )}
              <p className="my-auto ml-5 text-xl font-medium">
                {item.item.name}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 my-auto rounded bg-light-base2 dark:bg-dark-base2">
              <p className="text-2xl font-medium">{item.quantity}</p>
            </div>
          </div>
        );
      })}
      {iteration.instruction && (
        <div className="p-2 rounded bg-light-base2 dark:bg-dark-base2">
          {iteration.instruction}
        </div>
      )}
      <div className="flex justify-end mt-2">
        {iteration.status === "Rejected" && (
          <p className="p-1 rounded text-accent-red">Rejected</p>
        )}
        {iteration.status === "Completed" && (
          <p className="p-1 rounded text-accent-green">Completed</p>
        )}
        {iteration.status === "Preparing" && (
          <IconButton
            theme="outline"
            className="border border-1 border-primary"
            onClick={() => changeStatus(iteration.id)}
          >
            <p className="text-base text-primary">Completed</p>
          </IconButton>
        )}
      </div>
    </Card>
  );
}

export default IterationDetail;
