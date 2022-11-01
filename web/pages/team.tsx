import React, { useCallback, useState } from "react";
import TeamLogo from "../components/common/team_logo";
import Footer from "../components/layout/footer/footer";
import FirstStep from "../components/team/steppers/firstStep";
import SecondStep from "../components/team/steppers/secondStep";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { registerUserTeamAPI } from "@app/services/client/api/auth";
import { useQuery } from "@app/hooks/useQuery";
import { authFormValidate } from "@app/helpers/validations";
import { IRegisterDataAPI } from "@app/interfaces/IAuthentication";
import { AxiosError } from "axios";
import { userTimezone } from "@app/helpers/date";

const FIRST_STEP = "STEP1";
const SECOND_STEP = "STEP2";

const initialValues: IRegisterDataAPI = {
  name: "",
  email: "",
  team: "",
  recaptcha: "",
};

const Team = () => {
  const [step, setStep] = useState(FIRST_STEP);
  const [formValues, setFormValues] = useState<IRegisterDataAPI>(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const { queryCall, loading } = useQuery(registerUserTeamAPI);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (step === FIRST_STEP) {
      const { errors, valid } = authFormValidate(["team"], formValues);
      setErrors(errors as any);
      valid && setStep(SECOND_STEP);
      return;
    }

    const { errors, valid } = authFormValidate(
      ["name", "email", "recaptcha"],
      formValues
    );

    if (!valid) {
      setErrors(errors as any);
      return;
    }

    formValues["timezone"] = userTimezone();

    queryCall(formValues)
      .then(() => window.location.reload())
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          setErrors((err.response?.data as any)?.errors || {});
        }
      });
  };

  const handleOnChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      const key = name as keyof IRegisterDataAPI;
      if (errors[key]) {
        errors[key] = "";
      }
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [errors]
  );

  return (
    <div className="flex flex-col h-screen justify-between bg-main_background dark:bg-dark_background_color">
      <div />
      <div
        className="w-[486px] py-[50px] px-[70px] mx-auto rounded-[40px] shadow-2xl bg-white
       dark:bg-dark_card_background_color dark:bg-opacity-30"
      >
        <div className="flex justify-center w-full">
          <TeamLogo />
        </div>
        <div className="flex justify-center text-[#ACB3BB] font-light text-center text-[18px] w-full mt-[10px]">
          Visibility for your Team
        </div>
        <div className="text-[24px]  mt-[30px] font-bold text-primary dark:text-white">
          Create new Team
        </div>
        <form onSubmit={handleSubmit} method="post">
          {step === FIRST_STEP && (
            <FirstStep
              errors={errors}
              handleOnChange={handleOnChange}
              values={formValues}
            />
          )}
          <SecondStep
            errors={errors}
            showForm={step === SECOND_STEP}
            handleOnChange={handleOnChange}
            values={formValues}
          />
          <div className="mt-[40px] flex justify-between items-center">
            <div className="w-1/2 justify-between underline text-primary cursor-pointer hover:text-primary dark:text-gray-400 dark:hover:opacity-90">
              {step === FIRST_STEP && (
                <Link href={"/passcode"}>Joining existed Team?</Link>
              )}

              {step === SECOND_STEP && (
                <ArrowLeftIcon
                  className="h-[30px] text-[#0200074D] hover:text-primary cursor-pointer"
                  aria-hidden="true"
                  onClick={() => {
                    setStep(FIRST_STEP);
                  }}
                />
              )}
            </div>
            <button
              disabled={loading}
              className={`w-1/2 h-[50px] ${
                loading ? "opacity-50" : ""
              } my-4 inline-flex justify-center items-center tracking-wide text-white dark:text-primary transition-colors duration-200 transform bg-primary dark:bg-white rounded-[10px] hover:text-opacity-90 focus:outline-none`}
              type="submit"
            >
              {loading && (
                <span>
                  <Spinner />
                </span>
              )}{" "}
              <span>{step === FIRST_STEP ? "Continue" : "Create Team"}</span>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3 text-white dark:text-primary"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default Team;
