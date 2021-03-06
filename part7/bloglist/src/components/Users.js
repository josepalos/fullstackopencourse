import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Users = () => {
    const users = useSelector(state => state.user.allUsers);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>User</th><th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`} >
                                    {user.name}
                                </Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;