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
    <div className="flex flex-col items-center p-10 gap-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold"> <a href="/" className="text-orange-400">Home</a> | <a href="/dashboard">Dashboard</a> </h1>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-gray-800 rounded-lg">
          <Counter />
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <TextEditor userData={userData} />
        </div>
        <div className="col-span-2 p-6 bg-gray-800 rounded-lg ">
          <UserForm
            onSubmit={handleFormSubmit}
            onChange={handleFormChange}
            
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
