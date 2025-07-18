
  function toggleSkill(id) {
    const allSubskills = document.querySelectorAll(".subskills");
    const allButtons = document.querySelectorAll(".skill-btn");

    allSubskills.forEach(sub => {
      if (sub.id !== id) sub.classList.add("hidden");
    });

    allButtons.forEach(btn => {
      const targetId = btn.getAttribute("onclick").match(/'(.+?)'/)[1];
      if (targetId !== id) btn.classList.remove("active");
    });

    const selectedSubskills = document.getElementById(id);
    const selectedButton = document.querySelector(`button[onclick*="${id}"]`);

    if (selectedSubskills.classList.contains("hidden")) {
      selectedSubskills.classList.remove("hidden");
      selectedButton.classList.add("active");
    } else {
      selectedSubskills.classList.add("hidden");
      selectedButton.classList.remove("active");
    }
  }

