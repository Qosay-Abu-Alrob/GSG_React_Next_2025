import TaskDetails from "../TaskDetails";
interface IProps {
  params: Promise<{ id: number }>;
}
const TaskDetail = async ({ params }: IProps) => {
  const { id } = await params;
  return (
    <main className="p-8">
      <TaskDetails id={id} />
    </main>
  );
};

export default TaskDetail;