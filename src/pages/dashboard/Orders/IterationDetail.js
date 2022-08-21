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

  const changeStatus = (iterationId, status) => {
    callApi({
      apiUrl: `/orders/${orderId}/iteration/${iterationId}`,
      apiMethod: "patch",
      apiBody: { status },
      errorToastMessage: "Something went wrong, Please try again!",
    });
  };
  return (
    <Card className="my-3 bg-light-base1 dark:bg-dark-base3 text-light-text1 dark:text-dark-text1">
      {iteration.items.map((item) => {
        return (
          <div key={item.item.id} className="grid grid-cols-6 gap-2 mb-5">
            {item.item.imageUrl && (
              <img
                src={item.item.imageUrl}
                alt={item.item.name}
                className="p-0.5 rounded-full"
              />
            )}
            <p className="col-span-4 my-auto font-medium">{item.item.name}</p>
            <div className="flex items-center justify-center w-10 h-10 m-auto rounded bg-light-base2 dark:bg-dark-base2">
              <p className="text-lg font-medium">{item.quantity}</p>
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
        {(iteration.status === "Preparing" ||
          iteration.status === "Completed") && (
          <p className="p-1 rounded text-accent-green">Accepted</p>
        )}
        {iteration.status === "Pending" && (
          <>
            <IconButton
              theme="outline"
              className="mr-4 border border-1 border-accent-green"
              onClick={() => changeStatus(iteration.id, "Preparing")}
            >
              <p className="text-base text-accent-green">Accept Order</p>
            </IconButton>
            <IconButton
              theme="outline"
              className="border border-1 border-accent-red"
              onClick={() => changeStatus(iteration.id, "Rejected")}
            >
              <p className="text-base text-accent-red">Reject Order</p>
            </IconButton>
          </>
        )}
      </div>
    </Card>
  );
}

export default IterationDetail;
