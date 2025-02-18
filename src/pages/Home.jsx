import { useState, useEffect } from "react";
import Counter from "../components/Counter";
import UserForm from "../components/UserForm";
import TextEditor from "../components/TextEditor";

const Home = () => {
  const [userData, setUserData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("userData")) || [];
    return savedData;
  });
  const [isFormDirty, setIsFormDirty] = useState(false);

  const handleFormSubmit = (data) => {
    const newData = {
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setUserData((prevData) => {
      const updatedData = [...prevData, newData];
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return updatedData;
    });
    setIsFormDirty(false);
  };

  const handleFormChange = () => setIsFormDirty(true);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFormDirty]);

  return (
    <div className="flex flex-col items-center p-10 gap-8 bg-gray-900 min-h-screen text-white sm:p-10 sm:gap-8">
      <h1 className="text-3xl sm:text-3xl font-bold">
        {" "}
        <a href="/" className="text-orange-400">
          Home
        </a>{" "}
        | <a href="/dashboard">Dashboard</a>{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full sm:w-3/4 lg:w-4/5">
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg min-h-[200px] w-full">
          <Counter />
        </div>
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg min-h-[200px] w-full">
          <TextEditor userData={userData} />
        </div>

        <div className="col-span-1 md:col-span-2 p-4 sm:p-6 bg-gray-800 rounded-lg w-full">
          <UserForm onSubmit={handleFormSubmit} onChange={handleFormChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
