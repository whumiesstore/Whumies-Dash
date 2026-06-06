import { useEffect, useState } from "react";

const loadingSteps = [
  {
    title: "Initializing",
    subtitle: "Setting up report generation...",
  },
  {
    title: "Reading files",
    subtitle: "Checking orders and payments data...",
  },
  {
    title: "Mapping costs",
    subtitle: "Matching SKUs with product costs...",
  },
  {
    title: "Calculating profit",
    subtitle: "Estimating settlement, fees, returns and COGS...",
  },
  {
    title: "Finalizing",
    subtitle: "Preparing your report dashboard...",
  },
];

function ReportInitializer({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const duration = 10000;
    const intervalTime = 200;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);

        const nextStepIndex = Math.min(
          Math.floor((next / 100) * loadingSteps.length),
          loadingSteps.length - 1,
        );

        setStepIndex(nextStepIndex);

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 300);
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const activeStep = loadingSteps[stepIndex];

  return (
    <section className="report-initializer-box">
      <div className="animated-bar-loader" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <h2>{activeStep.title}</h2>
      <p>{activeStep.subtitle}</p>

      <div className="report-progress-track">
        <div
          className="report-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <small>{Math.round(progress)}% Complete</small>

      <div className="report-step-dots">
        {loadingSteps.map((_, index) => (
          <span key={index} className={index <= stepIndex ? "active" : ""} />
        ))}
      </div>
    </section>
  );
}

export default ReportInitializer;
