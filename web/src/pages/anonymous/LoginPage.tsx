import { CreateUserFormSchema } from "@/components/schemas/createUserFormSchema";
import CreateUserForm from "../../forms/CreateUserForm";
import { z } from "zod";
import { Step, Stepper } from "react-form-stepper";
import StepWizard from "react-step-wizard";
import { useState } from "react";
import CreateUserWalletForm from "@/forms/CreateUserWallet";

const LoginPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState("");
  let stepWizardInstance: any = null;

  const onFinish = (v: z.infer<typeof CreateUserFormSchema>) => {
    console.log("Dane formularza:", v);
    setPassword(v.password);
    goToNextStep();
  };

  const goToNextStep = () => {
    if (stepWizardInstance) {
      stepWizardInstance.nextStep();
    }
  };

  const onStepChange = (step: number) => {
    setActiveStep(step - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="Formularz 1" />
        <Step label="Formularz 2" />
        <Step label="Podsumowanie" />
      </Stepper>
      <StepWizard
        instance={(instance) => (stepWizardInstance = instance)} // Ustaw instancję StepWizard
        onStepChange={({ activeStep: stepIndex }: any) => onStepChange(stepIndex)}
      >
        <CreateUserForm onFinish={onFinish} />
        <CreateUserWalletForm password={password} />
        <div>Podsumowanie procesu</div>
      </StepWizard>
    </div>
  );
};

export default LoginPage;
