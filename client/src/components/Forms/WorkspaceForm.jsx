import React, { useState } from "react";
import Input from "./Input";
import ColorSelector from "./ThemePreference/ColorSelector";
import ThemeSelector from "./ThemePreference/ThemeSelector";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import { useCreateWorkspaceMutation } from "../../features/authSlice/authApiSlice";
import { useNavigate } from "react-router-dom";

const WorkspaceForm = ({ image }) => {
  const [workspaceUsername, setWorkSpaceUsername] = useState(null);
  const [workspaceTitle, setWorkspaceTitle] = useState(null);
  const [color, setColor] = useState(null);
  const [theme, setTheme] = useState(null);
  const [createWorkspace] = useCreateWorkspaceMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (workspaceUsername && workspaceTitle && color && theme) {
      const formData = new FormData();
      formData.append("workspaceUsername", workspaceUsername);
      formData.append("workspaceTitle", workspaceTitle);
      formData.append("colorScheme", color);
      formData.append("theme", theme);
      // formData.append("background", image, image.name);
      await createWorkspace(formData);
      navigate("/dashboard");
    } else {
      toast.error("Can't just leave those fields empty and alone!!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-2 mb-6 w-full">
        <div className="mr-[8px]">
          <Input
            text={"Your name"}
            name={"workspaceUsername"}
            onChange={(e) => setWorkSpaceUsername(e.target.value)}
            normalInput
          />
        </div>
        <div className="ml-[8px]">
          <Input
            text={"Name your workspace"}
            name={"workspaceTitle"}
            onChange={(e) => setWorkspaceTitle(e.target.value)}
            normalInput
          />
        </div>
      </div>
      <ColorSelector
        onChange={(color) => setColor(color)}
        defaultColor={color}
        borderColor="False"
      />
      <div className="mb-6">
        <h1 className="font-bold text-titleLG">Interface theme</h1>
        <p className="text-bodySM text-500 mb-[10px]">
          Customise your workspace theme
        </p>
        <ThemeSelector onChange={(theme) => setTheme(theme)} theme={theme} />
      </div>
      <SubmitButton text={"Lets begin"} />
      <Toaster position="bottom-center" reverseOrder="false" />
    </form>
  );
};

export default WorkspaceForm;
