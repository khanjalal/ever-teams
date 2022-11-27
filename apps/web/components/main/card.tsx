import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Separator from "../common/separator";
// import { PauseIcon } from "../common/main/pauseIcon";
// import { PlayIcon } from "../common/main/playIcon";
import DropdownUser from "@components/common/main/dropdown-user";
import { TimeInput } from "@components/common/main/time-input";
import { IOrganizationTeamList } from "@app/interfaces/IOrganizationTeam";
import useAuthenticateUser from "@app/hooks/useAuthenticateUser";
import { useTeamTasks } from "@app/hooks/useTeamTasks";
import { ITeamTask } from "@app/interfaces/ITask";
import { secondsToTime } from "@app/helpers/date";
import { Spinner } from "@components/common/spinner";
import Link from "next/link";

type IMember = IOrganizationTeamList["members"][number];

/*
const workStatus = {
  working: "bg-[#02b102]",
  offline: "bg-[#de211e]",
  timeroff: "bg-[#DF7C00]",
};
*/

const Card = ({ member }: { member: IMember }) => {
  const { isTeamManager, user } = useAuthenticateUser();
  const { activeTeamTask, updateTask, updateLoading } = useTeamTasks();
  const isAuthUser = member.employee.userId === user?.id;
  const isManager = isAuthUser && isTeamManager;
  const iuser = member.employee.user;
  // const iemployee = member.employee;

  const [nameEdit, setNameEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState(false);
  const [estimateEdit, setEstimateEdit] = useState(false);
  const [memberTask, setMemberTask] = useState<ITeamTask | null>(null);

  const [formValues, setFormValues] = useState({
    devName: `${iuser?.firstName} ${iuser?.lastName || ""}`,
    devTask: "",
    estimateHours: 0,
    estimateMinutes: 0,
  });

  useEffect(() => {
    if (isAuthUser) {
      setMemberTask(activeTeamTask);
    }
  }, [activeTeamTask, isAuthUser]);

  useEffect(() => {
    if (memberTask) {
      const { m, h } = secondsToTime(memberTask.estimate || 0);
      setFormValues((d) => {
        return {
          ...d,
          devTask: memberTask.title,
          estimateHours: h,
          estimateMinutes: m,
        };
      });
    }
  }, [memberTask]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChangeEstimate = useCallback((c: keyof typeof formValues) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const tm = +e.currentTarget.value.trim();
      const isInteger = !isNaN(tm) && Number.isInteger(tm);

      switch (c) {
        case "estimateHours":
          if (!isInteger || tm < 0 || tm > 999) {
            return;
          }
          break;
        case "estimateMinutes":
          if (!isInteger || tm < 0 || tm > 60) {
            return;
          }
          break;
        default:
          return;
      }

      setFormValues((vls) => {
        return {
          ...vls,
          [c]: tm,
        };
      });
    };
  }, []);

  const canEditName = useCallback(() => {
    (isManager || isAuthUser) && setNameEdit(true);
  }, [isManager, isAuthUser]);

  const canEditTaskName = useCallback(() => {
    (isManager || isAuthUser) && setTaskEdit(true);
  }, [isAuthUser, isManager]);

  const handeEditBoth = useCallback(() => {
    canEditName();
    canEditTaskName();
  }, [canEditName, canEditTaskName]);

  const canEditEstimate = useCallback(() => {
    (isManager || isAuthUser) && setEstimateEdit(true);
  }, [isAuthUser, isManager]);

  const handleNameEdit = useCallback(() => {
    setNameEdit(false);
  }, []);

  const handleTaskEdit = async () => {
    if (memberTask) {
      await updateTask({
        ...memberTask,
        title: formValues.devTask,
      });
    }
    setTaskEdit(false);
  };

  /*
  const handleEstimate = useCallback(() => {
    setTaskEdit(false);
  }, []);
  */

  const handleSubmit = useCallback(async () => {
    if (!activeTeamTask) return;

    const hours = +formValues["estimateHours"];
    const minutes = +formValues["estimateMinutes"];
    if (isNaN(hours) || isNaN(minutes) || (hours === 0 && minutes === 0)) {
      return;
    }

    const { h: estimateHours, m: estimateMinutes } = secondsToTime(
      activeTeamTask.estimate || 0
    );

    if (hours === estimateHours && minutes === estimateMinutes) {
      return;
    }

    await updateTask({
      ...activeTeamTask,
      estimateHours: hours,
      estimateMinutes: minutes,
      estimate: hours * 60 * 60 + minutes * 60, // time seconds
    });

    setEstimateEdit(false);
  }, [activeTeamTask, formValues, updateTask]);

  return (
    <div
      className={`w-full rounded-[15px] border ${
        isManager
          ? " border-primary dark:border-gray-100"
          : " hover:border hover:border-primary dark:border-[#202023]"
      } bg-[#FFFFFF] my-[15px] dark:bg-[#202023] flex 
    justify-between text-primary dark:hover:border-gray-100  
    font-bold py-[24px] dark:text-[#FFFFFF]`}
    >
      <div className="w-[60px]  flex justify-center items-center">
        <div className={`rounded-[50%] w-5 h-5 bg-[#02b102]`}></div>
      </div>

      {/* User info */}
      <div className="w-[235px] h-[48px] flex items-center justify-center">
        <div className="flex justify-center items-center">
          <Link href={`/profile/${iuser?.id}`}>
            <div>
              <Image
                src={iuser?.imageUrl || ""}
                alt="User Icon"
                className="rounded-[50%] cursor-pointer"
                width={48}
                height={48}
              />
            </div>
          </Link>
        </div>

        <div className="w-[137px] mx-[20px] h-[48px] flex justify-start items-center cursor-pointer">
          {nameEdit === true ? (
            <input
              value={formValues.devName}
              name="devName"
              onChange={handleChange}
              onKeyPress={(event) => event.key === "Enter" && handleNameEdit()}
              className="w-full h-[40px] rounded-lg px-2 shadow-inner border border-[#D7E1EB] dark:border-[#27272A]"
            />
          ) : (
            <Link href={`/profile/${iuser?.id}`}>
              <div>{formValues.devName}</div>
            </Link>
          )}
        </div>
      </div>
      <Separator />

      {/* Task info */}
      <div
        className={`w-[334px]  h-[48px] font-light text-normal hover:rounded-[8px] hover:cursor-text`}
        onDoubleClick={() => {
          setTaskEdit(true);
        }}
      >
        {taskEdit === true ? (
          <div className="flex items-center">
            <input
              name="devTask"
              value={formValues.devTask}
              onChange={handleChange}
              onKeyPress={(event) => event.key === "Enter" && handleTaskEdit()}
              className="w-full resize-none h-[48px] text-xs rounded-lg px-2 py-2 shadow-inner border border-[#D7E1EB] dark:border-[#27272A]"
            />
            <span className="w-3 h-5 ml-2">
              {updateLoading && <Spinner dark={false} />}
            </span>
          </div>
        ) : (
          <div
            className={`w-[334px] text-center h-[48px]  font-light text-normal px-[14px] border border-white dark:border-[#202023] hover:border-[#D7E1EB] dark:hover:border-[#27272A]  hover:rounded-[8px] hover:cursor-text`}
            onDoubleClick={canEditTaskName}
          >
            {memberTask ? (
              <span className="text-[#9490A0]">
                {`#${memberTask.taskNumber} `}
              </span>
            ) : (
              ""
            )}
            {formValues.devTask}
          </div>
        )}
      </div>
      <Separator />
      <div className="w-[122px]  text-center flex justify-center items-center">
        0h:0m
      </div>
      <Separator />
      <div className="w-[245px]  flex justify-center items-center">
        <div>
          <div className="flex w-[200px]">
            <div className="bg-[#28D581] w-[211px] h-[8px] rounded-l-full"></div>
            <div className="bg-[#E8EBF8] dark:bg-[#18181B] w-[73px] h-[8px] rounded-r-full" />
          </div>
          <div className="text-center text-[14px] text-[#9490A0]  py-1 font-light flex items-center justify-center">
            {!estimateEdit && (
              <div className="flex items-center">
                <div>
                  Estimate : {formValues.estimateHours}h
                  {formValues.estimateMinutes}m
                </div>
                <span
                  className="ml-[15px] flex items-center cursor-pointer"
                  onClick={canEditEstimate}
                >
                  <Image
                    src="/assets/png/edit.png"
                    width={20}
                    height={20}
                    alt="edit icon"
                  />
                </span>
              </div>
            )}
            {estimateEdit && (
              <>
                <div className="flex items-center justify-center">
                  <div className="bg-[#F2F4FB] dark:bg-[#18181B]">
                    <TimeInput
                      value={"" + formValues.estimateHours}
                      type="string"
                      placeholder="h"
                      name="estimateHours"
                      handleChange={onChangeEstimate("estimateHours")}
                      handleDoubleClick={canEditEstimate}
                      handleEnter={handleSubmit}
                      style={`${
                        estimateEdit === true
                          ? " w-[30px] bg-transparent rounded-[6px] h-[30px] px-1 w-[42px]"
                          : "bg-transparent w-[10px]"
                      } `}
                      disabled={!estimateEdit}
                    />
                    /
                    <TimeInput
                      value={"" + formValues.estimateMinutes}
                      type="string"
                      placeholder="m"
                      name="estimateMinutes"
                      handleChange={onChangeEstimate("estimateMinutes")}
                      handleDoubleClick={canEditEstimate}
                      handleEnter={handleSubmit}
                      style={` ${
                        estimateEdit === true
                          ? " w-[30px] bg-transparent rounded-[6px] h-[30px] px-1 w-[42px]"
                          : "bg-transparent w-[10px]"
                      } `}
                      disabled={!estimateEdit}
                    />
                  </div>{" "}
                  <span className="w-3 h-5 ml-2">
                    {updateLoading && <Spinner dark={false} />}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Separator />
      <div className="w-[184px]  flex items-center">
        <div className="w-[177px] text-center text-">0h:0m</div>
        {isTeamManager && (
          <div className="mr-[20px]">
            <DropdownUser
              setEdit={handeEditBoth}
              setEstimateEdit={canEditEstimate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;