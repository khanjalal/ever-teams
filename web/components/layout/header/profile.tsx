import useAuthenticateUser from "@app/hooks/useAuthenticateUser";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

interface IOption {
  name: string;
  icon: string;
  link: string;
}

export function Capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const Profile = () => {
  const { logOut, user } = useAuthenticateUser();

  const options: IOption[] = [
    {
      name: "Profile",
      icon: "/assets/svg/profile-icon.svg",
      link: `/profile/${user?.id}`,
    },
    { name: "Team", icon: "/assets/svg/teams-icon.svg", link: "" },
    {
      name: "Settings",
      icon: "/assets/svg/settings-icon.svg",
      link: "",
    },
  ];

  return (
    <Popover className="relative border-none no-underline">
      {({ open }) => (
        <>
          <Popover.Button className="p-0 m-0 outline-none mt-1">
            <div className="flex justify-center items-center cursor-pointer">
              <Image
                src={user?.imageUrl || ""}
                alt="User Icon"
                width={48}
                height={48}
                className="rounded-full flex items-center justify-center"
              />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[260px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl shandow">
              <div className="bg-white shadow dark:bg-[#202023] rounded-[10px] text-[14px] font-light px-[39px] pb-[10px]">
                <div className="">
                  <div className="flex pt-[13px] justify-center items-center">
                    <div className="bg-[#D7E1EB] p-1 flex items-center justify-center rounded-full">
                      <Image
                        src={user?.imageUrl || ""}
                        alt="User Icon"
                        width={84}
                        height={84}
                        className="rounded-full flex items-center justify-center"
                      />
                    </div>
                  </div>
                  <div className="text-[18px] mt-[7px] font-medium text-[#293241] dark:text-white flex items-center justify-center">
                    {user?.firstName && Capitalize(user.firstName)}
                    {user?.lastName && " " + Capitalize(user.lastName)}
                  </div>
                  <div className="text-[#B0B5C7] text-[14px] text-center font-normal">
                    {user?.email}
                  </div>
                </div>
                <div className="bg-[#EDEEF2] mt-[27px] h-[1px] w-full"></div>
                <div className="mt-[10px]">
                  {options.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center space-x-2 "
                    >
                      <div className="mt-1 flex items-center justify-center py-2">
                        <Image
                          src={option.icon}
                          alt={option.name + " icon"}
                          width={16}
                          height={16}
                          className="cursor-pointer"
                        />
                      </div>
                      <Link
                        href={option.link}
                        className="hover:text-opacity-75  py-2 mt-1 flex items-center text-[#1B005D] text-[15px] font-normal dark:text-gray-200 justify-start w-full"
                      >
                        {option.name}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="bg-[#EDEEF2] mt-[10px] h-[1px] w-full"></div>
                <div className="mt-[10px]">
                  <div className="flex items-center space-x-2 ">
                    <div className="mt-1 flex items-center justify-center py-2">
                      <Image
                        src="/assets/svg/log-out-icon.svg"
                        alt="logout icon"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={logOut}
                      className="hover:text-opacity-75  py-2 mt-1 flex items-center text-[#DE437B] text-[15px] font-normal justify-start w-full"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>{" "}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Profile;
