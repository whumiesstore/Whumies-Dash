function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good morning",
      message: "Start strong — let’s make today productive!",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: "Good afternoon",
      message: "Keep going — you’re doing great today!",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      greeting: "Good evening",
      message: "Almost there — time to review your progress!",
    };
  }

  return {
    greeting: "Good night",
    message: "Wrap it up — great work today!",
  };
}

function DashboardHeader({ userName = "there" }) {
  const { greeting, message } = getGreeting();

  return (
    <section className="dashboard-header">
      <div>
        <h1>
          {greeting}, <span>{userName}!</span>
        </h1>
        <p>{message}</p>
      </div>
    </section>
  );
}

export default DashboardHeader;
