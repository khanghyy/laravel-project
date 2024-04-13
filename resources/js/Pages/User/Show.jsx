import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

export default function Show({ auth, user }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">{`user "${user.name}"`}</h2>
            }
        >
            <Head title={`user "${user.name}" `} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid gap-1 grid-cols-2 mt-2 ml-5">
                            <div>
                                <div>
                                    <label className="font-bold text-lg">
                                        user ID
                                    </label>
                                    <p className="mt-1">{user.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        user Name
                                    </label>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        email
                                    </label>
                                    <p className="mt-1">{user.email}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">
                                        Created At
                                    </label>
                                    <p className="mt-1">{user.created_at}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
