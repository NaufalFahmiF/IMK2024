import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ User, handleSuggestionRemove }) => {
  return (
    // <li className='bg-white w-96 overflow-y-scroll max-h-96 rounded-lg shadow-md'>
    <div className="overflow-y-scroll max-h-96">
      {User.map((user) => (
        <Link key={user._id} to={`/profile/${user.username}`}>
          <li
            className="bg-white p-1 transition-all max-h-96 shadow-md cursor-pointer hover:bg-gray-300 "
            onClick={handleSuggestionRemove}
          >
            <div className="flex items-center gap-4 p-2 transition-colors">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-center font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.headline}</p>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
