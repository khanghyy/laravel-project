import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    TASK_STATUS_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
} from "@/constants";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../Tasks/TasksTable";

export default function Show({ auth, task }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">{`TASK "${task.name}"`}</h2>
            }
        >
            <Head title={`task "${task.name}" `} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={`http://localhost/${task.image_path}`}
                                alt={task.name}
                                className="w-full h-64 object-cover object-center rounded-lg shadow-md"
                            />
                        </div>

                        <div className="grid gap-1 grid-cols-2 mt-2 ml-5">
                            <div>
                                <div>
                                    <label className="font-bold text-lg">
                                        ID
                                    </label>
                                    <p className="mt-1">{task.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Name
                                    </label>
                                    <p className="mt-1">{task.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                "px-2 py-1  rounded text-white" +
                                                TASK_STATUS_CLASS_MAP[
                                                    task.status
                                                ]
                                            }
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                "px-2 py-1  rounded text-white" +
                                                TASK_PRIORITY_CLASS_MAP[
                                                    task.priority
                                                ]
                                            }
                                        >
                                            {
                                                TASK_PRIORITY_TEXT_MAP[
                                                    task.priority
                                                ]
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Created By
                                    </label>
                                    <p className="mt-1">
                                        {task.createdBy.name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Project
                                    </label>
                                    <p className="mt-1 ">
                                        <Link
                                            href={route(
                                                "project.show",
                                                task.project.id
                                            )}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {task.project.name}
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">
                                        Due Date
                                    </label>
                                    <p className="mt-1">{task.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Create Date
                                    </label>
                                    <p className="mt-1">{task.created_at}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Update By
                                    </label>
                                    <p className="mt-1">
                                        {task.updatedBy.name}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Assigned User
                                    </label>
                                    <p className="mt-1">
                                        {task.assignedUser.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 ml-5">
                            <label className="font-bold text-lg w-full">
                                Description
                            </label>
                            <p className="mt-1">{task.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
