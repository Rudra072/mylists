import { useParams } from "react-router-dom";
import {
  useUpdateColumnOrderMutation,
  useHandleDragOverColumnMutation,
} from "../features/columnSlice/columnApiSlice";
import { useUpdateTaskOrderMutation } from "../features/taskSlice/taskApiSlice";
function useDragDrop({ myColumns, filters }) {
  const { id } = useParams();
  const [updateColumnOrder] = useUpdateColumnOrderMutation();
  const [updateTaskOrder] = useUpdateTaskOrderMutation();
  const [handleDragOverColumn] = useHandleDragOverColumnMutation();

  // const reorder = ({ columns, startIndex, endIndex }) => {
  //   const result = Array.from(columns);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  // };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    //if dropped into same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //User moves a column
    if (type === "column") {
      updateColumnOrder({
        columns: myColumns,
        startIndex: source.index,
        endIndex: destination.index,
        id,
        filters,
      });
    }

    //User moves a card
    if (type === "task") {
      const sourceColumn = myColumns.find((c) => c._id === source.droppableId);
      const destColumn = myColumns.find(
        (c) => c._id === destination.droppableId
      );

      if (!sourceColumn || !destColumn) ReadableStreamDefaultController;

      // Moving the card in the same column
      if (source.droppableId === destination.droppableId) {
        updateTaskOrder({
          tasks: sourceColumn.tasks,
          startIndex: source.index,
          endIndex: destination.index,
          id,
          filters,
          columnId: sourceColumn._id,
        });
      } //User moves task to another column
      else {
        const sourceColumnIndex = myColumns.findIndex(
          (c) => c._id === sourceColumn._id
        );
        const destColumnIndex = myColumns.findIndex(
          (c) => c._id === destColumn._id
        );

        handleDragOverColumn({
          sourceColumnIndex,
          destColumnIndex,
          sourceTaskIndex: source.index,
          destTaskIndex: destination.index,
          id,
          filters,
          columnId: sourceColumn._id,
        });
      }
    }
  };

  return {
    onDragEnd,
  };
}

export default useDragDrop;
