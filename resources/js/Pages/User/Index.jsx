import Pagination from "@/Components/Pagination";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
export default function Index({
    auth,
    users,
    queryParams = null,
    success,
    error,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
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
        router.get(route("user.index"), queryParams);
    };

    const deleteuser = (user) => {
        if (!window.confirm("Are you sure you want to delete the user?")) {
            return;
        }
        router.delete(route("user.destroy", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-300 py-1 px-3 text-black rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add User
                    </Link>
                </div>
            }
        >
            <Head title="users" />

            <div className="py-12">
                {error && (
                    <div className="bg-red-500 py-4 px-4 text-white rounded">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-emerald-500 py-4 px-4 text-white rounded">
                        {success}
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-950 dark:text-gray-600">
                                <thead className="w-full">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>

                                        <th className="px-2 py-2">
                                            <TextInput
                                                className="w-full"
                                                placeholder="Search Name"
                                                defaultValue={queryParams.name}
                                                onBlur={(e) => {
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    );
                                                }}
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                placeholder="Search Email"
                                                defaultValue={queryParams.email}
                                                onBlur={(e) => {
                                                    searchFieldChanged(
                                                        "email",
                                                        e.target.value
                                                    );
                                                }}
                                                onKeyPress={(e) =>
                                                    onKeyPress("email", e)
                                                }
                                            />
                                        </th>

                                        <th className="px-3 py-2 text-nowrap"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <thead className="w-full">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>

                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeading>
                                        <TableHeading
                                            name="email"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Email
                                        </TableHeading>
                                        <th>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Created At
                                            </div>
                                        </th>

                                        <th className="px-3 py-2">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.data.map((user) => (
                                        <tr
                                            className="bg-white border-b"
                                            key={user.id}
                                        >
                                            <td className="px-3 py-2">
                                                {user.id}
                                            </td>

                                            <td className="px-3 py-3 hover:underline text-nowrap text-black">
                                                <Link
                                                    href={route(
                                                        "user.show",
                                                        user.id
                                                    )}
                                                >
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-3">
                                                {user.created_at}
                                            </td>

                                            <td className="px-3 py-3 ">
                                                <Link
                                                    href={route(
                                                        "user.edit",
                                                        user.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={(e) =>
                                                        deleteuser(user)
                                                    }
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

                        <Pagination links={users.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
