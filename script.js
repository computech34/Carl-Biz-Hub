/* ========= EmailJS Initialization ========= */
(function () {
  if (!window.emailjs) {
    console.error("EmailJS SDK not loaded. Check script include in HTML.");
    return;
  }
  emailjs.init("JSuicxi6BOaXjpYuJ"); // 🔑 Replace with your real EmailJS public key
})();

/* ========= Helper Functions ========= */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function openForm(id) {
  const m = document.getElementById(id);
  if (m) {
    m.style.display = "block";
    m.setAttribute("aria-hidden", "false");
  }
}

function closeForm(id) {
  const m = document.getElementById(id);
  if (m) {
    m.style.display = "none";
    m.setAttribute("aria-hidden", "true");
  }
}

/* ========= Close modal when clicking outside ========= */
window.addEventListener("click", function (e) {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

/* ========= Email Sending ========= */
const SERVICE_ID = "service_wjmluts";    // ✅ your EmailJS service ID
const TEMPLATE_ID = "template_8hsiqgr";  // ✅ your EmailJS template ID

function setupForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitBtn = form.querySelector('input[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.value = "Sending...";
    }

    // Collect all form data
    const formData = new FormData(form);
    const params = {};
    for (const [key, value] of formData.entries()) {
      params[key] = value;
    }

    // Add service_type fallback
    if (!params.service_type) {
      params.service_type = formId.replace("EmailForm", "");
    }

    // Send using EmailJS
    window.emailjs
      .send(SERVICE_ID, TEMPLATE_ID, params)
      .then((response) => {
        console.log("✅ Email sent successfully:", response);
        alert('✅ Thank you dear Customer Your order has been sent successfully.');
       return emailjs.send("service_wjmluts",  "template_mwb30ux",params);
        // Reset form
        form.reset();

        // Close the corresponding modal
        let modalId = formId.replace(/EmailForm/i, "Form");
        if (modalId === formId)
          modalId = formId.replace(/Email/i, "").replace(/Form$/i, "Form");
        closeForm(modalId);
      })
      .catch((error) => {
        console.error("❌ EmailJS error:", error);
        alert("❌ Failed to send order. Please try again or contact us directly.");
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.value = "Send";
        }
      });
  });
}

/* ========= Attach all forms ========= */
document.addEventListener("DOMContentLoaded", function () {
  setupForm("laundryEmailForm");
  setupForm("juiceEmailForm");
  setupForm("laptopEmailForm");
  setupForm("fashionEmailFormMen");
  setupForm("fashionEmailFormWomen");
});