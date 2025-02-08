import React, { useEffect, useState } from "react";
import ColorSelector from "./ColorSelector";
import { useFormik } from "formik";
import Input from "../Input";
import ActionButton from "../ActionButton";
import CloseButton from "../../Common/CloseButton";
import useGetColorVariants from "../../../customHooks/useGetColorVariants";
import { useUpdatePreferenceMutation } from "../../../features/authSlice/authApiSlice";

const CustomizeForm = ({ pref }) => {
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const [updatePreference] = useUpdatePreferenceMutation();
  let defaultColor = pref?.colorScheme;
  const [editMode, setEditMode] = useState(false);
  const [color, setColor] = useState(pref?.colorScheme);
  const [initial, setInitial] = useState(false);
  const theme = pref?.theme;

  const validate = (values) => {
    const errors = {};
    if (values.workspaceUsername === "")
      errors.workspaceUsername = "workspaceUsername is required";
    if (values.workspaceTitle === "")
      errors.workspaceTitle = "workspaceTitle is required";
    return errors;
  };

  const customize = useFormik({
    initialValues: {
      workspaceUsername: pref?.workspaceUsername,
      workspaceTitle: pref?.workspaceTitle,
    },
    validate,
    onSubmit: (body) => {
      updatePreference(body);
      setEditMode(false);
    },
  });

  const handleCancel = () => {
    setEditMode(false);
    customize.setFieldValue("workspaceUsername", pref?.workspaceUsername);
    customize.setFieldValue("workspaceTitle", pref?.workspaceTitle);
    setColor(defaultColor);
  };

  const handleColor = (color) => {
    setColor(color);
    setInitial(true);
    updatePreference({ colorScheme: color });
  };

  useEffect(() => {
    if (pref?.workspaceUsername) {
      customize.setFieldValue("workspaceUsername", pref?.workspaceUsername);
    }
    if (pref?.workspaceTitle) {
      customize.setFieldValue("workspaceTitle", pref?.workspaceTitle);
    }
  }, [pref?.workspaceUsername, pref?.workspaceTitle]);

  return (
    <>
      <div
        className={`flex justify-between items-center bg-[${
          colorScheme && colorScheme[300]
        }] px-[15px] py-[8px] gap-[5px] rounded-[25px] cursor-pointer`}
        onClick={() => setEditMode((prev) => !prev)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.63822 15.8064L4.07316 16.0392L3.63822 15.8064C3.46299 16.1338 3.39038 16.4975 3.28577 17.0216C3.28131 17.0439 3.27678 17.0666 3.27219 17.0895L2.6568 20.1665C2.65511 20.1749 2.65341 20.1834 2.65169 20.192C2.62293 20.3354 2.59143 20.4925 2.58471 20.6253C2.5771 20.7758 2.59329 21.0166 2.78836 21.2116C2.98342 21.4067 3.22416 21.4229 3.37468 21.4153C3.50744 21.4086 3.66454 21.3771 3.808 21.3483C3.81655 21.3466 3.82505 21.3449 3.83349 21.3432L6.91047 20.7278C6.93341 20.7232 6.95605 20.7187 6.9784 20.7142C7.50243 20.6096 7.8662 20.537 8.19362 20.3618C8.52103 20.1866 8.78322 19.9242 9.16093 19.5462C9.17705 19.5301 9.19338 19.5137 9.20993 19.4972L19.3536 9.35356C19.3765 9.3306 19.3991 9.30799 19.4214 9.28571C19.901 8.80649 20.2288 8.47904 20.4116 8.11004C20.7582 7.4106 20.7582 6.5894 20.4116 5.88996C20.2288 5.52097 19.901 5.19351 19.4214 4.71429C19.3991 4.69201 19.3765 4.6694 19.3536 4.64645C19.3306 4.62349 19.308 4.60086 19.2857 4.57856C18.8065 4.09895 18.479 3.77123 18.11 3.58838C17.4106 3.24178 16.5894 3.24178 15.89 3.58838C15.521 3.77123 15.1935 4.09896 14.7143 4.57857C14.692 4.60087 14.6694 4.6235 14.6464 4.64645L4.50283 14.7901C4.48627 14.8066 4.46993 14.823 4.4538 14.8391C4.07583 15.2168 3.81344 15.479 3.63822 15.8064Z"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M13 6V6C13.5176 8.24307 15.1653 10.0551 17.3492 10.7831L18 11"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <p className="text-[12px] font-medium text-textPrimary">Customize</p>
      </div>
      {editMode && (
        <form
          onSubmit={customize.handleSubmit}
          autoComplete="off"
          className={`bg-backgroundSecondary rounded-md fixed top-[80px] right-[20px] p-[30px] w-[350px] flex flex-wrap flex-col gap-[20px] z-[1]`}
        >
          <div className="flex justify-end">
            <CloseButton theme={theme} setEditMode={setEditMode} />
          </div>
          <Input
            pref={pref}
            theme={theme}
            text={"Your name"}
            workspaceUsername={"workspaceUsername"}
            colorScheme={colorScheme}
            {...customize.getFieldProps("workspaceUsername")}
            error={customize.errors?.workspaceUsername}
          />
          <Input
            pref={pref}
            theme={theme}
            text={"Name your workspace"}
            workspaceUsername={"workspaceTitle"}
            colorScheme={colorScheme}
            {...customize.getFieldProps("workspaceTitle")}
            error={customize.errors?.workspaceTitle}
          />
          <ColorSelector
            theme={theme}
            onChange={(color) => handleColor(color)}
            color={color}
            defaultColor={defaultColor}
            initial={initial}
          />
          <ActionButton
            theme={theme}
            handleCancel={handleCancel}
            setEditMode={setEditMode}
          />
        </form>
      )}
    </>
  );
};

export default CustomizeForm;
