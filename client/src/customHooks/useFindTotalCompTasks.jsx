const useFindTotalCompTasks = ({ tasks }) => {
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter((t) => t.completed === true);
  return { totalTasks, completedTasks: completedTasks?.length };
};

export default useFindTotalCompTasks;
