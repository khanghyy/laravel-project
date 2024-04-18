import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, task, projects, users }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: task.name || "",
        description: task.description || "",
        due_date: task.due_date || "",
        status: task.status || "",
        priority: task.priority || "",
        project_id: task.project_id || "",
        assigned_user_id: task.assigned_user_id || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.update", task.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-800 leading-tight">
                        Create new task
                    </h2>
                </div>
            }
        >
            <Head title="tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white  dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            {task.image_path && (
                                <div className="mb-4">
                                    <img
                                        src={`http://localhost/${task.image_path}`}
                                        className="w-full h-64 object-cover object-center rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_project_id"
                                    value="Project ID"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <SelectInput
                                    name="project_id"
                                    id="task_project_id"
                                    defaultValue={data.project_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("project_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Project ID</option>
                                    {projects.data.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.project_id}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_name"
                                    value="Task Name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_assigned_user"
                                    value="Assigned User"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <SelectInput
                                    name="task_assigned_user"
                                    id="task_assigned_user"
                                    className="mt-1 block w-full"
                                    defaultValue={data.assigned_user_id}
                                    onChange={(e) =>
                                        setData(
                                            "assigned_user_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select User</option>
                                    {users.data.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.assigned_user_id}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_priority"
                                    value="Task Priority"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <SelectInput
                                    name="priority"
                                    id="task_priority"
                                    className="mt-1 block w-full"
                                    defaultValue={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>

                                <InputError
                                    message={errors.task_priority}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_status"
                                    value="Project Status"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                />

                                <SelectInput
                                    name="status"
                                    id="project_status"
                                    defaultValue={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError
                                    message={errors.project_status}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
