import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants";

import { Link, router } from "@inertiajs/react";
export default function TasksTable({
    tasks,
    queryParams = null,
    hideProjectColumn = false,
    success,
}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index"), queryParams);
    };
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("task.index"), queryParams);
    };
    const deleteTask = (task) => {
        if (!window.confirm("Are you sure you want to delete the task?")) {
            return;
        }
        router.delete(route("task.destroy", task.id));
    };
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-950 dark:text-gray-600">
                    <thead className="w-full">
                        <tr className="text-nowrap">
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2"></th>
                            {!hideProjectColumn && (
                                <th className="px-3 py-2"></th>
                            )}
                            <th className="px-2 py-2">
                                <TextInput
                                    className="w-full"
                                    placeholder="Search task Name"
                                    defaultValue={queryParams.name}
                                    onBlur={(e) => {
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        );
                                    }}
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th className="px-3 py-2">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2 text-nowrap"></th>
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2 "></th>
                        </tr>
                    </thead>
                    <thead className="w-full">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-3 ">Image</th>
                            {!hideProjectColumn && (
                                <th className="px-3 py-3">Project Name</th>
                            )}

                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Task Name
                            </TableHeading>

                            <TableHeading
                                name="status"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Status
                            </TableHeading>
                            <th>
                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                    Created At
                                </div>
                            </th>
                            <th>
                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                    Updated At
                                </div>
                            </th>
                            <th className="px-3 py-2">Created By</th>
                            <th className="px-3 py-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.data.map((task) => (
                            <tr className="bg-white border-b" key={task.id}>
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                    <img
                                        src={`http://localhost/${task.image_path}`}
                                        alt={task.name}
                                        style={{
                                            width: 60,
                                            borderRadius: 10,
                                        }}
                                    />
                                </td>
                                {!hideProjectColumn && (
                                    <td className="px-3 py-3">
                                        {task.project.name}
                                    </td>
                                )}
                                <td className="px-3 py-3">
                                    <Link
                                        href={route("task.show", task.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        {task.name}
                                    </Link>
                                </td>
                                <td className="px-3 py-2">
                                    <span
                                        className={
                                            "px-2 py-1  rounded-md w-1 text-black" +
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-3">{task.created_at}</td>
                                <td className="px-3 py-3">{task.updated_at}</td>
                                <td className="px-3 py-3">
                                    {task.createdBy.name}
                                </td>
                                <td className="px-3 py-3 ">
                                    <Link
                                        href={route("task.edit", task.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={(e) => deleteTask(task)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination links={tasks.meta.links} />
        </>
    );
}
